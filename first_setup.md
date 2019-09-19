# Update and install dependencies

Update packages and then run the following commands to install Ruby

```bash
sudo apt-get update
sudo apt install ruby-full
ruby -v
```

```bash
sudo apt-get install ruby-bundler
sudo apt-get install ruby-dev
sudo gem update --system
```

Run this to download all necessary packages

```bash
bundler install
```

Begin serving by running

```bash
sudo jekyll serve
```
