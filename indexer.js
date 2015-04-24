var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

/* Explores a directory and return all its tree
 *
 * @param dir Root directory to be explored
 */
function getFiles(dir) {
  var directory = {};
  fs.readdirSync(dir).forEach(function(file) {
    if (file[0] === '.') {
      return;
    }

    var fullPath = path.join(dir, file);
    var filedata = fs.statSync(fullPath);
    file = file === 'index.html' ? '' : file;

    directory[file] = {
      modified: filedata.mtime,
      created: filedata.birthtime
    };

    if (filedata.isDirectory()) {
      directory[file].children = getFiles(fullPath);
      return;
    }
    directory[file].title = cheerio.load(fs.readFileSync(fullPath))('#title').text();
  });
  return directory;
}

// Get all files on the content folder
var files = JSON.stringify(getFiles('content'));

// Send a minified initializer to the stdout
console.log('(function(global){global.files=' + files + '})(this)');
