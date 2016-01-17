var fs = require('fs'),
    path = require('path'),
    glob = require('glob').sync,
    cheerio = require('cheerio');


var ContentPlugin = function(pattern, index) {
  this.index = index;
  this.files = glob(pattern, {nodir: true});
};

ContentPlugin.prototype.apply = function(compiler) {
  this.compiler = compiler;
  this.posts = [];

  this.files.forEach(function(file) {
    compiler.plugin('emit', this.compile.bind(this, file));
  }, this);

  compiler.plugin('after-emit', function(compilation, next) {
    var $ = cheerio.load(global.htmls[this.index]);
    $('.main-content').html(this.posts.map(function(post) {
      return [
        '<div class="post brief">',
        '  <span class="title">' + post.title + '</span>',
        '  <div class="post-date">' + post.date + '</div>',
        '  <p class="post-abstract">' + post.abstrakt + '</p>',
        '  <a href="' + post.file + '">leia mais</a>',
        '</div>',
      ].join('');
    }).join(''));

    var file = path.join(compiler.outputPath, this.index);
    var mainPath = path.join(compiler.outputPath, 'main.html');
    fs.writeFileSync(file, $.html());
    fs.writeFileSync(mainPath, $('.main-content').html());
    this.posts = [];

    next();
  }.bind(this));
};

ContentPlugin.prototype.compile = function(file, compilation, next) {
  // Make sure this script is reloaded once this file is changed
  if (compilation.contextDependencies.indexOf(file) === -1) {
    compilation.contextDependencies.push(file);
  }

  var content = fs.readFileSync(file);
  var $ = cheerio.load(content);
  this.write(compilation, file, content);

  this.posts.push({
    title: $('.title').html(),
    date: $('.post-date').html(),
    abstrakt: $('.content p:first-child').html(),
    content: $('.content').html(),
    file: file,
  });

  next();
};

ContentPlugin.prototype.write = function(compilation, filename, content) {
  compilation.assets[filename] = {
    source: function() {
      return content;
    },
    size: function() {
      return content.length;
    },
  };
};

module.exports = ContentPlugin;
