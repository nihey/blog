var imageLoad = require('image-load'),
    fetch = require('exports?self.fetch!whatwg-fetch'),
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

var applyFormatters = function() {
  // Format all post dates
  Array.prototype.slice.call(document.querySelectorAll('.post-date')).forEach(function(date) {
    date.innerHTML = new Date(date.innerHTML).toDateString();
  });
};

var onHashChange = function() {
  // Add speech
  var speak = function() {
    var speeches = require('speeches');
    var speech = speeches[Math.floor(speeches.length * Math.random())];
    document.getElementById('speech').innerHTML = speech;
  };

  speak();
  document.getElementById('scenario').addEventListener('click', speak);

  if (location.hash.substr(3) !== '') {
    // Non-Index routes, fetch the content
    return fetch(location.hash.substr(3)).then(function(response) {
      return response.text();
    }).then(function(html) {
      // Put it on the '.main-content' <div>
      document.querySelector('.main-content').innerHTML = html;
      applyFormatters();
    });
  }

  fetch('main.html').then(function(response) {
    return response.text();
  }).then(function(html) {
    // Put it on the '.main-content' <div>
    document.querySelector('.main-content').innerHTML = html;

    // Index Route, replace post links into hash based ones
    Array.prototype.slice.call(document.querySelectorAll('.post.brief > a')).forEach(function(link) {
      link.setAttribute('href', '#!/' + link.getAttribute('href'));
    });
    applyFormatters();
  });
};

onHashChange();
window.onhashchange = onHashChange;
