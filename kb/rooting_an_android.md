---
title: Rooting an Android Phone
layout: contentbase
---
Rooting an Android Phone
======

## Download prerequisites
* [Magisk Manager](https://magiskmanager.com/downloading-magisk-manager)
* [Magisk](https://github.com/topjohnwu/Magisk/releases/)
* [TWRP Recovery](https://dl.twrp.me/)
* [TWRP Recovery OP6](https://forum.xda-developers.com/oneplus-6/development/recovery-unofficial-twrp-touch-recovery-t3860815)
* [EdXposed Manager](https://github.com/ElderDrivers/EdXposedManager/releases) 

## Installation
First, copy over all the downloaded files on to the phone. Next, hold the Volume
Down and Power button till phone vibrates. Then reboot into fastboot by
navigating through the following menus, `English -> Advanced -> Reboot to
Fasboot`

Once in fastboot, run the following command to boot into TWRP
```bash
fastboot boot ./twrp-3.3.1-2-enchilada.img
```

Now run the following steps,
* Install the TWRP Recovery zip
* Install Magisk
* Reboot, and install the Magisk Manager and the EdXposed Installer APK
* Open Magisk Manager, and download `Riru - Core` and `Riru - EdXposed (SandHook)`
* Reboot


# Some caveats
Deleting magisk modules doesn't work sometimes, so you can delete them manually
by navigating to `/data/adb/modules`
