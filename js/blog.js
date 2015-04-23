function registerRoutes(files, basePath) {
  files.forEach(function(file) {
    var path = basePath + '/' + file.path.replace(/.html$/g, '');
    if (file.children) {
      registerRoutes(file.children, path);
    }
    routie(path, function() {
      var html = require('content/' + path.substr(1));
      $('#content').html(html());
    });
  });
}

$(document).ready(function() {
  registerRoutes(files, '');
});
