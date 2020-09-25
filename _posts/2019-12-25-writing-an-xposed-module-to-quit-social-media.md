---
layout: post
title: Writing an Xposed Module to Quit Social Media
description: The downside of sharing
featured: true
---

Over the last year, I've been mindfully evaluating my usage of different
services and actively pruning out those that offered more noise over signal. I
started the year off by muting everybody on Facebook and Instagram. This got rid
of the endless feed for me and dramatically reduced the time I spent on the app
and improved my overall mood. What was left of my feed was just a string of
greyed out stories and photos from my own feed populating the main page.

{:align="center"}
![before_xposed]

For the longest time I debated whether removing stories was worth the effort
that it would require. Since Instagram itself wouldn't allow it, I'd have to
write an Xposed module myself to get it done. So I let it remain and I argued
that I might get lose touch if I cut myself off completely--exactly the same way
I felt before muting my feed by the way.

Fast forward a few months and the content on my stories had gotten extremely
political, ripe with both posts containing violence and misinformation. It
reached a point where it genuinely started affecting my mood. It's what finally
drove to me to write the Xposed module once and for all.

I forked [TremendoX's UnclutterIG](https://github.com/TremendoX/UnclutterIG) and
extended it to add more hooks to intercept the `setAdapter()` function while
trying to populate the lists in the MainActivity class. It's a measly bit of code, but
the trouble usually lies in hunting for the right class and method through the
decompiled Java classes.

```java
protected void doStoryHooks() {
    Method setAdapterMethod = null;
    setAdapterMethod = findMethodExact(ListView.class, "setAdapter", ListAdapter.class);
    if (setAdapterMethod != null) {
        XposedBridge.hookMethod(setAdapterMethod, new XC_MethodHook() {
            @Override
            public void beforeHookedMethod(final MethodHookParam param) throws Throwable {
                Object adapter = param.args[0];

                if (adapter == null) {
                    return;
                }
                if (isOnMainPage(param.thisObject, adapter.getClass())) {
                    if (shouldHideStories()) {
                        param.setResult(null);
                    }
                }
            }
        });
    }
}
```

With the module complete, my feed now looks like this. 

{:align="center"}
![after_xposed]

A few people have asked me that wouldn't it just be easier to delete the app
since I've taken out the two biggest features? That's not true, I can still
visit my friends' profiles to see what they're up to every once in a while and
use direct messages to stay in touch. It's a very intentional way of using
social media that removes all the hooks that get you to keep coming back. As
with anyone who's quit social media before can tell you, once you do it, there's
just an abundance of time with which you're not really sure what to do. Writing
this post was my way of reclaiming that time back.

[You can find my forked version of UnclutterIG here](https://github.com/adyshake/UnclutterIG).

[before_xposed]:/images/before_xposed.jpg
{:class="shadow-img" width="40%"}
[after_xposed]:/images/after_xposed.jpg
{:class="shadow-img" width="40%"}