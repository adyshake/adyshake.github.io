---
layout: post
title: A Journey Through 4 Years of WhatsApp Data
description: I ought to plot a lot
featured: true
---

I've always managed to keep my WhatsApp database backups through the years ever
since I got my first Android device, the Nexus 5 _(rip)_ and WhatsApp was pretty
accepting of my manual backups too. Download a fresh copy of WhatsApp from the
play store, make sure the backup exists in the
```InternalStorage/WhatsApp/Databases/``` directory and it should recognize the
backup file during initialization. Sometime in 2015, an update came out for the
app allowing android users to backup their chat history, voice messages and
media to Google Drive. This was all fine but after a while I noticed that it
would prefer Google Drive backups over manual ones. That was alright with me, as
long as my texts would make it, I really didn't care. Over the past few years
I've been flashing different ROMs and kernels and rooting/unrooting my phone,
involving alot of reinstallations and one fine day, my backups failed to
restore from the cloud. *yay*. So I thought to myself, _'Ha I prepared for this.
Time to bust out my manual backups'_ &nbsp; but this didn't work either. After
some more fiddling around to get it to read from my .crypt12 backup, it kept
failing. I had to try something else. If I could decrypt the database and put it
WhatsApp's app folder, it should work without any complaining.

I was able to decrypt the cypt12 file using this wonderful tool
[whatsapp-viewer][whatsapp-viewer]. You will need the crypt key file for this.
It's located in ```/data/data/com.whatsapp/files/key``` and accesssing root
storage requires -- _you guessed it_ -- root permissions. One SuperSU and a trip
over to XDA later and we're ready to decrypt. With the decrypted db in hand the
next thing I was going to do was simply 
 
 1. Initialize WhatsApp with an empty database
 2. Force stop the app
 3. Replace the decyrpted db with the one present in ```/data/data/com.whatsapp/```
 4. Launch WhatsApp and hope for the best

{: align="middle"}
![ct]

{: align="middle"}
 *It didn't work* 
 
 WhatsApp pops up an eror message that it couldn't read the database and was
 going to nuke the database for a fresh one again. _sigh_ Perhaps there was
 something up with the database integrity? I decided to dig deeper and tried to
 inspect the database with sqlite

 ```ERROR: SQLite databse is malformed```

 A little more googling later and I found out that running the following
 commands should fix it

 ```bash
sqlite3 ./msgstore.decrypted.db "pragma integrity_check"
sqlite3 ./msgstore.decrypted.db "reindex nodes"
sqlite3 ./msgstore.decrypted.db "reindex pristine"
 ```

Running an integrity check now returns a very _verbose_ message

 ``` ok ```

So something must've worked. I tried replacing the internal db in the app folder
with the fixed one and it didn't work again. But then
[whatsapp-viewer][whatsapp-viewer] has a feature to load in decrypted databases
as well. I tried it out and it actually worked! I couldn't recover my messages
on my phone but atleast I recovered every text on my computer. I suspect the
tool skips over corrupted entries it can't read. It loaded every single one of
my chats and has an option to export to json!


### Ephemeral relationships
So now I've got a 70MB database on my computer filled with 4 years of chats
throughout my time at college. Let's see what kind of interesting analytics
we can pull. The first thing I wanted to see was how transient my friendships
have been over the years.

Here's the first graph I came up with. The controls to zoom and scroll around
are in the bottom left corner, also the graph isn't responsive to different
resolutions, so if you're on mobile try requesting for the desktop site. Names
have been censored for anonymity.

{% include everyone.html %}

Person A and Person C have been my closest friends throughout college. So our
texting patterns have been pretty consistent. The others happen to be people I was
dating at the time. It's a little sad to see how some plots just taper off.

And here's the code for it. mpld3 is a pretty cool library for generating
online embeddable SVG plots.

```python
import os
import json
import dateutil.parser
from dateutil.relativedelta import relativedelta

import mpld3
from mpld3 import plugins
import numpy as np

import matplotlib.pyplot as plt
from scipy.interpolate import spline

TOTAL_X = []
TOTAL_Y = []
NAMES = []

for fname in os.listdir('./'):
    with open(fname, "r", encoding="utf8") as f:
        data = json.load(f)
        x_axis = []
        y_axis = []

        print(data['contactName'])
        NAMES.append(data['contactName'])

        date2 = dateutil.parser.parse('2013-12-15T23:59:59Z')
        num_weeks = 0
        num_messages = 0
        week_dict = {"weeks": []}
        for msg in data['messages']:
            if msg['fromMe'] is False:
                cur_date = dateutil.parser.parse(msg["timestamp"])
                if cur_date < date2:
                    num_messages += 1
                elif cur_date > date2:
                    while cur_date > date2:
                        date2 = date2 + relativedelta(days=7)
                        num_weeks += 1
                        date_str = str(date2.year) \
                                   + "{0:0=2d}".format(date2.month) \
                                   + "{0:0=2d}".format(date2.day)
                        #print(int(date_str))
                        #x_axis.append(int(date_str))
                        x_axis.append(num_weeks)
                        y_axis.append(int(num_messages))
                        week_dict["weeks"].append({num_weeks: num_messages})
                        num_messages = 0

        TOTAL_X.append(x_axis)
        TOTAL_Y.append(y_axis)

FIG, AX = plt.subplots(figsize=(7, 4))
AX.grid(True, alpha=0.3)

L_ARR = []

for i in range(len(NAMES)):
    x = np.array(TOTAL_X[i])
    y = np.array(TOTAL_Y[i])

    x_smooth = np.linspace(x.min(), x.max(), 300)
    y_smooth = spline(x, y, x_smooth)

    line_collections = AX.plot(x_smooth, y_smooth, label=NAMES[i])
    L_ARR.append(line_collections)

INTERACTIVE_LEGEND = plugins.InteractiveLegendPlugin(L_ARR, NAMES,
                                                     alpha_unsel=0.5,
                                                     alpha_over=1.8,
                                                     start_visible=False)

plugins.connect(FIG, INTERACTIVE_LEGEND)

plt.ylim(-10, 700)
plt.subplots_adjust(right=.8)

AX.set_ylabel('Messages', size=18)
AX.set_xlabel('Weeks', size=18)
AX.set_title('Messages per week', size=20)

mpld3.show()

html_file = mpld3.fig_to_html(FIG)

fh = open('everyone.html', 'w')
fh.write(html_file)
fh.close()

```

### Saturdays are for the bois - ΩπΩ
I also wanted to drill down and see the activity in the group chat filled with
my closest friends, see who talked the most and check for any _riveting_
patterns.

{% include all_stars.html %}

You can see clusters of activity in different spots. The whole group just comes
to life when anyone sends a text. Spikes were a lot taller in the initial weeks
too. I got my first Android around the December of 2013--my first winter
break--so that explains the burst of spikes because it was the first time
we were away from each other. At about week 120--March 27th 2016, the group
settles into dormancy, with two men down, one leaving the group and the other
leaving the country, there were only 4 of us left. Most of us just stuck to
private chats but we met pretty often anyway. The final spike can be seen at
around week 160--January 1st 2017, my final semester at college after my return
from a semester wide internship.

### Closing points
It sucks that I can't reference old texts in the app anymore but hey, atleast
WhatsApp doesn't hang up on me when it backs itself up every night at 2:00 a.m.
anymore

[whatsapp-viewer]: https://github.com/andreas-mausch/whatsapp-viewer
[ct]: /images/ct.jpg
{: width="70%"}