---
layout: post
title: Wallpaper Algorithm
description: Wallpapers for ages
featured: false
---

I'm currently reading The New Turing Omnibus and one of the first exercises
mentioned in Chapter 1 was implementing the Wallpaper algorithm with 3 colors.
Although the premise of the chapter was to simply get acquainted with the
conventions of how algorithms would be written in the book, they picked a pretty
mesmerizing one. Here’s the algorithm, straight from the book.

```
input side
for i ← 1 to 100
    for j ← 1 to 100
        x ← i * side/100
        y ← j * side/100
        c ← int(x*x + y*y)
        if c == 0
            then plot(x, y, red)
        else if c == 1
            then plot(x, y, green)
        else
            then plot(x, y, blue)
```

At the core of function is the statement <b>_x<sup>2</sup> + y<sup>2</sup>_</b>,
the circular function. At low side values you can see concentric circles
forming.

{: align="center"}
![conc-circles]

As the side value increases, the concentric circles get denser and moiré
patterns begin forming like so. Colors begin to overlap leading to some very
cool patterns as the algorithm iterates over the side value.

{: align="center"}
![conc-moire-patterns]

Here's a dynamic version implemented in JavaScript. I spent more time trying to
get dynamic resizing to work than implementing the actual algorithm itself. _Yay
software engineering_.

<center>
<canvas class="shadow-img" id="wallpaperCanvas" width="100" height="500"></canvas>
</center>

<script>
    const canvas = document.getElementById("wallpaperCanvas")
    var ctx = canvas.getContext("2d")

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    function resizeCanvas() {
        const maxWidth = 500
        const minMarginPercent = 0.10

        var W = window.innerWidth
        var w = maxWidth
        var x = (W - w) / 2
        
        if (x/W < minMarginPercent) {
            canvas.width = (1 - 2*minMarginPercent) * window.innerWidth;
        }
        else {
            canvas.width = maxWidth;
        }
        ctx = canvas.getContext("2d")
        ctx.scale(2, 2);
        draw();
    }

    async function main() {
        if(!ctx) {
            alert("Couldn't grab canvas context")
            return
        }
        
        window.addEventListener('resize', resizeCanvas, false);
        resizeCanvas();
        while(true) {
            draw();
            await sleep(500)
        }
    }

    function draw() {
        if ( typeof draw.side == 'undefined' ) {
            draw.side = 1
        }
        
        var r, g, b
        var x, y, c
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw.side += 1
        for (var i = 0; i < canvas.width/2; i++) {
            for (var j = 0; j < canvas.height/2; j++) {
                x = i * draw.side/100
                y = j * draw.side/100
                c = Math.floor(x*x + y*y)
                if (c % 3 == 0) {
                    r = 255
                    g = 0
                    b = 0
                }
                else if (c % 3 == 1) {
                    r = 0
                    g = 255
                    b = 0
                }
                else {
                    r = 0
                    g = 0
                    b = 255
                }
                ctx.fillStyle = "rgba("+r+","+g+","+b+","+1+")"
                ctx.fillRect(i, j, 1, 1)
            }
        }
    }

    main();
</script>

[conc-circles]: /images/conc-circles.png
{:class="shadow-img"  width="70%"}
[conc-moire-patterns]: /images/conc-moire-patterns.png
{:class="shadow-img"  width="70%"}
