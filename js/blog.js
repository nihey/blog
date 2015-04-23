var helpers = {
  'format-date': function(date) {
    if (typeof date === 'string') {
      date = moment(date);
    }
    return date.format('LL');
  },
}

function registerRoutes(files, basePath) {
  files.forEach(function(file) {
    var path = basePath + '/' + file.path.replace(/.html$/g, '');
    if (file.children) {
      registerRoutes(file.children, path);
    }
    routie(path, function() {
      var html = require('content/' + path.substr(1));
      $('#content').html(html({
        now: moment(),
        file: file,
        files: window.files,
      }));
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
  registerRoutes(files, '');
});
