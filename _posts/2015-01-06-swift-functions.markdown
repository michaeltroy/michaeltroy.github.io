---
layout: post
title:  "Swift: Functions"
date:   2015-01-06
categories:
--- 

<div class="image-container image-container--intro rg-Unit rg-Unit--center rg-4of4">
  <img src="/assets/feet-and-skateboard.jpg" />
</div>

<div class="">
  You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve --watch`, which launches a web server and auto-regenerates your site when a file is updated.

  To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

  Jekyll also offers powerful support for code snippets:

  {% highlight javascript %}
  var list = document.body.querySelectorAll('span[data-html="Amount"]');

  for (i = 0; i < list.length; i++) {
   
    // var done = amount.className += " red" 
    var item    = list[i];
    var content = item.innerHTML;
    var amount  = content.match(/^-[$]?/);

    // Log to the console.
    console.log(content);
  }
  {% endhighlight %}



  Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll’s dedicated Help repository][jekyll-help].


  [jekyll]:      http://jekyllrb.com
  [jekyll-gh]:   https://github.com/jekyll/jekyll
  [jekyll-help]: https://github.com/jekyll/jekyll-help
</div>