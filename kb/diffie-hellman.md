---
title: Diffie-Hellman Key Exchange
layout: contentbase
---
Diffie-Hellman Key Exchange
======

The Diffe-Hellman key exchange was one of the first public-key protocols that
aimed at public key exchange over an insecure channel.

A basic analogy based on colored paints works like this,

{:align="center"}
![diffie-hellman](/images/diffie-hellman.png)

## Original Implementation

1. Pick integers `g` and `p`, such that `p` is prime
2. Alice chooses a private integer `a` and sends over `A = g^a mod p`
3. Bob chooses a private integer `b` and sends over `B = g^b mod p`
4. Alice computes `B^a mod p`
5. Bob computes `A^b mod p`
6. They both arrive at the same number.

This works since `B^a mod p = g^b^a mod p => g^a^b mod p = A^b mod p`

A prime number p of at least 600 digits would be intractable even by the fastest
modern computers today. Given `A`, `g` and `p`, finding `a` is known as the
discrete logarithm problem. And `g^a mod p` is known as modular exponentiaion
and can be done very efficiently.