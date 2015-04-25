// Workaround to link each image to a quote (untill i find a better way to do
// this)
var quotes = {
  'mount-corcoran.jpg': "Your mind will answer most questions if you learn to relax and wait for the answer.",
};

module.exports = function(options) {
  // Select one random image from the list of images
  var images = options.files.img.children;
  var max = images.length - 1;
  var image = images[Math.round(Math.random() * max)];

  var html = require('content/image');
  return html({
    img: image,
    quote: quotes[image.path],
  });
};
