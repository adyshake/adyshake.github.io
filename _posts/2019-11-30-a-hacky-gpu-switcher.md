---
layout: post
title: A Hacky GPU Switcher
description: Should've gone with NVIDIA
featured: true
---

With the arrival of my Razer Core X eGPU enclosure, I was pretty excited to get
back into some video editing and gaming, but there was a massive issue. My
video and audio streams were both stuttering as soon as I'd plug it in. A bit of
googling led to me to the solution to disable my integrated GPU from the Device
Manager. That's odd though, I don't see any complaints from users with dedicated
NVIDIA GPUs in their machines. I figure NVIDIA Optimus must have something to do
with this. Anyway with a working solution, I could finally begin automating this
procedure.

Windows provides a pretty powerful interface to instrument your plugged in
hardware through WMI -- Windows Management Interface. Here's the powershell
script I wrote that's spawned everytime Windows boots up. It's pretty neat since
it works on events and not constant polling, so it's pretty efficient too.


```powershell
# Check to see if we are currently running "as Administrator"
if (!(Verify-Elevated)) {
    Start-Process powershell -Verb runAs -ArgumentList @("-NoExit", "-Command `"cd `'$(([string](Get-Location)).TrimEnd('\'))`'; $($myInvocation.MyCommand.Definition)`"")
    exit
}

Unregister-Event -SourceIdentifier graphicsCardChanged -ErrorAction SilentlyContinue
Register-WmiEvent -Class Win32_DeviceChangeEvent -SourceIdentifier graphicsCardChanged

# Get inital eGPU state
$GPUConnected = $null
if ($null -ne (Get-PnpDevice | Where-Object {($_.friendlyname) -like "Radeon RX 590*" -and ($_.status) -like "Ok"})) {
    # Write-Host("eGPU is initially connected")
    $GPUConnected = $true
}
else {
    Get-PnpDevice| Where-Object {$_.friendlyname -like "Intel(R) Iris(R) Plus Graphics*"} | Enable-PnpDevice -Confirm:$false
    $GPUConnected = $false
}
do{
    $newEvent = Wait-Event -SourceIdentifier graphicsCardChanged
    $eventType = $newEvent.SourceEventArgs.NewEvent.EventType
    #Write-Host($eventType)
    
    if ($GPUConnected -eq $false) {
        $isEGPUConnected = $null -ne (Get-PnpDevice | Where-Object {($_.friendlyname) -like "Radeon RX 590*" -and ($_.status) -like "Ok"})
        if ($eventType -eq 2 -and $isEGPUConnected) {
            #Event - Device Arrival
            # Write-Host("Device Arrived")
            Get-PnpDevice| Where-Object {$_.friendlyname -like "Intel(R) Iris(R) Plus Graphics*"} | Disable-PnpDevice -Confirm:$false
            $GPUConnected = $true
        }
    }

    if ($GPUConnected -eq $true -and $eventType -eq 1 -or $eventType -eq 3) {
        #Event - Device config changed
        # For some reason when I plug out the Razer Core X, it doesn't send an
        # event type 3 signal, so I'm working with config changed instead.
        # Write-Host("Device config changed")
        $isEGPUUnknown = $null -ne (Get-PnpDevice | Where-Object {($_.friendlyname) -like "Radeon RX 590*" -and ($_.status) -like "Unknown"})
        if ($isEGPUUnknown) {
            # Write-Host("eGPU is Unknown")
            Get-PnpDevice| Where-Object {$_.friendlyname -like "Intel(R) Iris(R) Plus Graphics*"} | Enable-PnpDevice -Confirm:$false
            $GPUConnected = $false
        }
    }	
    Remove-Event -SourceIdentifier graphicsCardChanged
} while (1-eq1) #Loop until next event
Unregister-Event -SourceIdentifier graphicsCardChanged
```

With the main script out of the way, here's the script to register it to spawn
upon boot with Task Scheduler.

```powershell
$installGPU = Read-Host "Register Raden RX 590 GPU switcher task? (y/n)"

if ($installGPU -eq 'y') {
    $taskName = "GPU switcher"
    $userName = $env:UserName

    $password = Read-Host "Password"

    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -Erroraction SilentlyContinue

    $profileDirPath = Split-Path -parent $profile
    $gpuScript = Join-Path $profileDirPath "gpu_switcher.ps1"
    $action = New-ScheduledTaskAction -Execute powershell.exe -Argument "`"$gpuScript`""
    $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries

    Register-ScheduledTask -Action $action -TaskName $taskName -Settings $settings  -Description "Switches to the Radeon RX 590 eGPU when plugged in" -User $userName -Password $password

    # Now add a special trigger to it with COM API.
    # Get the service and task
    $ts = New-Object -ComObject Schedule.Service
    $ts.Connect()
    $task = $ts.GetFolder("\").GetTask($taskName).Definition

    # Create the trigger
    $TRIGGER_TYPE_STARTUP=8
    $startTrigger=$task.Triggers.Create($TRIGGER_TYPE_STARTUP)
    $startTrigger.Enabled=$true
    $startTrigger.Id="StartupTrigger"

    # Re-save the task in place.
    $TASK_CREATE_OR_UPDATE=6
    $TASK_LOGIN_PASSWORD=1
    $ts.GetFolder("\").RegisterTaskDefinition($taskName, $task, $TASK_CREATE_OR_UPDATE, $userName, $password, $TASK_LOGIN_PASSWORD)

    Start-ScheduledTask -TaskName $taskName
}
```