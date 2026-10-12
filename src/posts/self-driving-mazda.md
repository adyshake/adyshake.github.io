---
date: 2026-10-07
title: Making my 2023 Mazda3 drive itself
wideImages: true
---

Moving to the Bay Area hasn't been without its issues. My main complaint has been how bad the traffic is out here. So, in an attempt to fix that issue, I'm going to install the [Comma 4](https://comma.ai/shop/comma-four) in my unsupported 2023 Mazda3. Hopefully this won't kill me.

To set up this in the Mazda3, we'll need a [torque interceptor](https://torqueinterceptor.com/en-us/products/torque-interceptor-2) and a [Konik Harness box](https://konik.ai/shop/harness-box/). The TI2 is required for reasons I don't fully understand yet -- I believe its to override the torque safety limits on the EPS. The Konik harness box is required to connect the TI2's 26 pin male 'CN4' connector to the Konix harness box's female input. Comma used to provide an older harness box with the 26 pin female connector but now they provide a more simplified input with fewer pins, so a separate harness box is required.

Hooking up the Torque Interceptor's wiring harness is pretty simple. The CN1 goes to the TI2 device. 

![Torque interceptor wiring diagram][ti2-wire-diagram]

The CN2 and CN3 pair go to the torque sensor cable under the steering wheel and connect to the power steering motor. There's a female and a male connector so you're just tapping the connection essentially.

![Torque sensor connector on the EPS motor][eps]


We'll need to do the same thing with the BCM pair, CN5 and CN6, that's located near the cabin fuse box for the car as well.

![BCM connectors CN5 and CN6 beside the cabin fuse box][bcm]

Finally the CN4 goes to the Konik Harness box, and a USB-C cable goes from the harness box to the Comma 4 device.

After wiring it all up and starting the car, I got every dashboard error light to pop up and the ignition wouldn't turn on. :sigh:

![Dashboard warning lights after the first start][dash-lights]

Turns out the TI2's CN4 wire was pinned incorrcetly. The green and blue wires were initially on pins 2 and 4. I had to repin it to pins 4 and 6.

![Repinned torque interceptor connector][wire-repinning]

After repinning, the car started up without any warning lights!

Once connected, I installed the `moretore/StarPilot-dev` branch on the Comma 4.

StarPilot comes with a web interface to control additional settings on the port `8082` which can be accessed from your phone. On the settings page, I'd disabled automatic fingerprinting and selected my car make to `Mazda` and the model to `3 2019-2024`.

After which, the device finally recognized all the CAN bus signals being sent to it.

I took it for a test drive on StarPilot's default model `Regret Driven Framework v4` but it didn't work well. It ping ponged quite a bit within the lane and required a lot of corrections from me.

I switched out the model to Pop v2 and the car drove as well as I would've driven it.

![Test drive with the Pop v2 model][mazda-self-drive]

[eps]: /images/eps.avif
[bcm]: /images/bcm.jpg
[ti2-wire-diagram]: /images/ti2_wire_diagram.jpg
[dash-lights]: /images/dash_lights.jpg
[wire-repinning]: /images/wire_repinning.jpg
[mazda-self-drive]: /images/mazda_self_drive.gif
