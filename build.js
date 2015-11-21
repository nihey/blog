var fs = require('fs'),
    path = require('path'),
    $ = require('cheerio').load(fs.readFileSync('./index.html'));
    chokidar = require('chokidar');

var callback = function(file) {
  var html = '';
  var extension = file.split('.');
  if (extension[extension.length - 1] === 'js') {
    delete require.cache[path.join(process.cwd(), file)];
    var func = require('./' + file);
    html += func();
  } else {
    html += fs.readFileSync(file);
  }

  $('.main-content').html(html);
  var distPath = file.replace('content/', 'dist/').replace(/.js$/, '.html');
  fs.writeFileSync(distPath, $.html());

  console.log('built: ', file);
};

chokidar.watch('content/').on('add', callback).on('change', callback);
