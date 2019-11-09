adyshake.github.io
==================

[![Build Status](https://travis-ci.org/adyshake/adyshake.github.io.svg)](https://travis-ci.org/adyshake/adyshake.github.io)

My personal little space on the internet

## Update and install dependencies

Update packages and then run the following commands to install Ruby

```bash
sudo apt-get update
sudo apt install ruby-full
ruby -v
```

```bash
sudo apt-get install ruby-bundler ruby-dev make gcc g++ zlib1g-dev
sudo gem update --system
sudo gem install bundler
bundler update --bundler
```

Run this to download all necessary packages

```bash
bundler install
```

Begin serving by running

```bash
sudo jekyll serve
```
