# Personal Blog

[Nihey](http://nihey.github.io)'s personal [blog](http://nihey.github.io/blog/#!/)

This project relies heavily on [webpack](http://webpack.github.io/) to bundle
javascript code and blog content. You should take a look at it.

# Setup

You should download all this project's dependencies

```
$ npm install
$ bower install
```

After that, you should build you should build the project with:

```
$ webpack
```

Then, you should use some static files server to visualize the content, for
example:


```
$ python -m SimpleHTTPServer
```

Then access your content on http://localhost:8000 (or your static server's address)

# Building

To build the example content of this repository, run:

```
$ node indexer.js > js/index.js
$ mkdir dist
$ webpack
```

indexer.js builds a index file so that the application know it's content.

webpack bundles everything into dist/blog.js file.

# Adding a new post

To write a post, you may consider using:

```
$ webpack --watch
```

So that you won't need to retrigger webpack generation every time you save your
post.

After that, you should create a file on 'content/posts/' directory, for
example:

```
$ vim content/posts/lipsum.html
```

Then, generate an index.js file with:

```
$ node indexer.js > js/index.js
```

You can now write your post on the file you have created, it should be available
at http://localhost:8000/#!/posts/lipsum (on this example).

# Further reading

For a bit more information on this blog, visit [this
post](http://nihey.github.io/blog/#!/posts/how-i-have-built-this-blog)
