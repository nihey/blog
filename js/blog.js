var helpers = {
  'format-date': function(date) {
    if (typeof date === 'string') {
      date = moment(date);
    }
    return date.format('LL');
  },
  'disqus-comments': function() {
    var html = require('content/disqus');
    return new Handlebars.SafeString(html());
  },
}

function getFileList(fileObject) {
  var files = [];
  for (var key in fileObject) {
    if (!fileObject.hasOwnProperty(key)) {
      return;
    }

    fileObject[key].path = key.replace(/.html$/, '');
    if (fileObject[key].children) {
      fileObject[key].children = getFileList(fileObject[key].children);
    }

    files.push(fileObject[key]);
  }
  return files;
}

function registerRoutes(files, basePath) {
  files.forEach(function(file) {
    var path = basePath + '/' + (file.path || 'index');
    if (file.children) {
      registerRoutes(file.children, path);
    }

    routie('!' + path.replace('index', ''), function() {
      var html = require('content/' + path.substr(1));
      $('#content').html(html({
        now: moment(),
        file: file,
        files: Files,
      }));
      $('a').removeClass('active');
      $('a[href="#!' + path.replace('index', '') + '"]').addClass('active');

      // HightlightJS initialization
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });

      // disqus reload
      window.DISQUS && $('#disqus_thread').length && DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = location.hash;
          this.page.url = location.href;
        }
      });
    });
  });
}

$(document).ready(function() {
  // Register each helper on the 'helpers' object
  for (var key in helpers) {
    if (helpers.hasOwnProperty(key)) {
      Handlebars.registerHelper(key, helpers[key]);
    }
  }

  // Register routes according to our file index
  registerRoutes(getFileList(Files), '');
  routie('*', function() {
    location.hash = "#!/";
  });
});
