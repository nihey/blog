var imageLoad = require('image-load'),
    Sprite = require('exports?window.Sprite!sprite-js/dist/sprite.min');

imageLoad([require('../assets/images/me.png')], function(image) {
  var me = new Sprite({
    canvas: document.getElementById('me'),
    image: image,
    rows: 4,
    columns: 3,
    rowIndex: 2,
    columnIndex: 1,
    columnFrequency: 1,
  });

  var context = me.context;
  setInterval(function() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    me.draw(0, 0);
  }, 200);
});
