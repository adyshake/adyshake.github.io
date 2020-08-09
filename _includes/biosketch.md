Hey there, my name is Adnan Shaikh and this is my personal website where I keep
a diary of my various misadventures that roughly fall into the category of
"recreational programming".  

I'm a graduate student at the University of Texas at Dallas pursuing a master's
degree in computer science. As far as my recent career goes, I recently interned
at Amazon this past summer working with the Consumer Payments Team.

I'm well aware there's a wide world outside of computer science too. In my free
time, you can find me experimenting with my fitness regiment or buried in a new
book that I am often told, reading all too slowly.  

The Internet's a big place, banal disclaimers about these being my views and
not my employer's apply.

Some of my featured posts are below:

{% for post in site.posts %}{% if post.featured %}
- [{{ post.title }}]({{ post.url }}) <small>{{ post.date | date_to_long_string }}</small>{% endif %} {% endfor %}
