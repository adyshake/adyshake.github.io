---
layout: post
title: Yet another minimalist library
description: Minimalist libraries
featured: true
---

After working with large libraries like
[Kafka](https://github.com/edenhill/librdkafka) and spending hours with my nose
stuck in the documentation, I wanted to learn what it takes to design an API
from scratch. At what point you decide a library is minimalistic or not is
completely subjective and arbitary. But I think I have a few guidelines, so in
honor of that I'm christening my very own header-only libary and I call it...

```
    ___ __         __          _ __   __  
   / (_) /_  _____/ /_  ____ _(_) /__/ /_ 
  / / / __ \/ ___/ __ \/ __ `/ / //_/ __ \
 / / / /_/ (__  ) / / / /_/ / / ,< / / / /
/_/_/_.___/____/_/ /_/\__,_/_/_/|_/_/ /_/ 
                                          
```

## libshaikh
libshaikh is intended to be a little helper header library to quickstart
projects in C. With support for features like dynamic strings and common data
structures like linked lists and hash maps. A trivial project yet one that's
been done time and time again. Here are a few design goals I have in mind while
going about this.

## Design Goals

1. **As few functions as possible**  
  This one's fairly straight forward, keep the interface concise and simple.

2. **No dynamic memory allocations**  
  Any dynamic allocation that needs to happen happens outside of the library.

3. **No input/output**  
   Just like memory management, leave I/O to the application and not to the
   library. Helps eliminate more error conditions.


4. **Few public datatypes**  
   The idea is that the implementation can use as many data types as required,
   but expose as little as possible. All data structures that need to be
   allocated are of opaque types, however it isn't so simple if the library
   doesn't allocate memory.
