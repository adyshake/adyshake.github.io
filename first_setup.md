# Update and install dependencies

Install the following dependencies required for rbenv and Ruby

```bash
sudo apt-get update
sudo apt-get install autoconf bison build-essential libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm3 libgdbm-dev
```

Complete these steps from the user account from which you plan to run Ruby.

```bash
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
```

From here, you should add ~/.rbenv/bin to your $PATH so that you can use rbenv's command line utility. Also adding ~/.rbenv/bin/rbenv init to your ~/.bash_profile will let you load rbenv automatically.

```bash
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
```

Next, source rbenv by typing:
```bash
 source ~/.bashrc
```

You can check to see if rbenv was set up properly by using the type command, which will display more information about rbenv:
```bash
type rbenv
```

In order to use the rbenv install command, which simplifies the installation process for new versions of Ruby, you should install ruby-build, which we will install as a plugin for rbenv through git:

```bash
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

At this point, you should have both rbenv and ruby-build installed, and we can move on to installing Ruby.

# Install Ruby
With the ruby-build rbenv plugin now installed, we can install whatever versions of Ruby that we may need through a simple command. First, let's list all the available versions of Ruby:

```bash
rbenv install -l
```

```bash
rbenv install 2.5.0
rbenv global 2.5.0
```

If you would like to install and use a different version, simply run the rbenv commands with a different version number, as in rbenv install 2.3.0 and rbenv global 2.3.0.

Verify that Ruby was properly installed by checking your version number:

```bash
ruby -v
```

```bash
sudo apt-get install ruby-bundler

sudo apt-get install ruby-dev
```

Run this to download all necessary packages

```bash
bundle install
```

Create a new jekyll repo and begin serving

```bash
jekyll new adnanshaikh

cd adnanshaikh

jekyll serve
```

The page is hosted on localhost:4000

use this for linking to blog posts

[{{page.web}} Blog Post]({% post_url 2017-02-19-cwru-love %})  

also had trouble gening static pages, complained about missing jekyll-paginate


move gem file over to actual serve dir with both paginate and github pages gem listed
gem uninstall --all
gem install github-pages
bundler list | grep pagin
jekyll serve

Also copy over CNAME into the _site folder