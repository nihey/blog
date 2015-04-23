var fs = require('fs');
var path = require('path');

/* Explores a directory and return all its tree
 *
 * @param dir Root directory to be explored
 */
function getFiles(dir) {
  return fs.readdirSync(dir).map(function(file) {
    var fullPath = path.join(dir, file);
    var filedata = fs.statSync(fullPath);

    var retval = {
      path: file,
      modified: filedata.mtime,
      created: filedata.birthtime
    };

    if (filedata.isDirectory()) {
      retval.children = getFiles(fullPath);
    }
    return retval;
  });
}

// Get all files on the content folder
var files = JSON.stringify(getFiles('content'));

// Send a minified initializer to the stdout
console.log('(function(global){global.files=' + files + '})(this)');
