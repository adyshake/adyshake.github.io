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
sudo apt-get install ruby-bundler ruby-dev make gcc g++ zlib1g-dev make
sudo gem update --system
sudo gem install bundler
sudo bundler update --bundler
```

To update gems run,
```bash
bundle update
```

In the event that `sudo gem update --system` does not work. It's probably
because api.rubygems.org is unreachable by IPV6. Resolving this address works in
most browsers because they implement the Happy Eyeballs algorithm. OS X
implements this on the system level, where as Linux does not.
Happy Eyeballs is an algorithm that makes dual-stack applications more
responsive by attempting to connect to both IPV4 and IPV6 at the same time
(prefers IPV6).
Disabling IPV6 is one solution, another faster one is simply running 
`dig api.rubygems.org +short` and appending one of the address into the
`/etc/hosts/` file like, `151.101.192.70 rubygems.org`

Run this to download all necessary packages

```bash
bundler install
```

Begin serving by running

```bash
sudo jekyll serve
```

Note: WSL2 with Ubuntu 20.04 seems to have broken the filesystem watcher so jekyll 
serve does not work. A work around for this would be to move your project files 
to the native filesystem.
```bash
sudo cp -r /mnt/c/Users/adnan/JD/10-19_Projects/11_Github/adyshake.github.io ~/ && cd ~/adyshake.github.io && jekyll serve
```
Another alternative is to stop the file watcher altogether,
```bash
jekyll serve --no-watch
```