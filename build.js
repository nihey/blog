var chokidar = require('chokidar');

var callback = function(file) {
  // Build/Rebuild the project here
  console.log('file:', file);
};

chokidar.watch('content/').on('add', callback).on('change', callback);
