Hi, my name is Adnan Shaikh, I'm a software engineer living and working in Pune, India

Some of my featured posts are below:

{% for post in site.posts %}{% if post.featured %}
- [{{ post.title }}]({{ post.url }}) <small>{{ post.date | date_to_long_string }}</small>{% endif %} {% endfor %}
