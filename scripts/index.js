var hljs = require('highlight.js');

window.d3 = require('d3');
window.nvd3 = require('nvd3');

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

  // Add loading animation to page changing buttons
  Array.prototype.slice.call(document.querySelectorAll('[href^="#!/"]')).forEach(function(button) {
    button.addEventListener('click', function() {
      button.innerHTML = '<i class="fa fa-refresh fa-spin"></i>';
    });
  });

  // Format code
  Array.prototype.slice.call(document.querySelectorAll('pre code')).forEach(function(pre) {
    console.log('XXX', pre);
    hljs.highlightBlock(pre);
  });

  // Make sure all post scripts are executed
  var execute = function(scripts) {
    var index = -1;
    var next = function() {
      index += 1;
      var script = scripts[index];
      if (script) {
        script(next);
      }
    };

    next();
  };

  var scripts = Array.prototype.slice.call(document.querySelectorAll('.main-content script')).map(function(script) {
    return function(next) {
      if (!script.getAttribute('src')) {
        eval(script.text);
        return next();
      }

      fetch(script.getAttribute('src')).then(function(response) {
        return response.text();
      }).then(function(script) {
        eval(script);
        next();
      });
    }
  });

  execute(scripts);

  if (document.querySelector('#disqus_thread') && window.DISQUS) {
    window.DISQUS.reset({
      reload: true,
      config: function() {
        this.page.identifier = location.hash;
        this.page.url = location.href;
      }
    });
  }

  if (!DEBUG) {
    // Send Google Analytics Statistics
    ga('create', 'UA-72558392-1', 'auto');
    ga('send', 'pageview');
  }
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
    var loading = document.querySelector('.fa.fa-refresh.fa-spin');
    if (!loading) {
      document.querySelector('.main-content').innerHTML = '<i class="fa fa-refresh fa-spin"></i>';
    }

    // Non-Index routes, fetch the content
    return fetch(location.hash.substr(3)).then(function(response) {
      return response.text();
    }).then(function(html) {
      // Put it on the '.main-content' <div>
      document.querySelector('.main-content').innerHTML = html;

      // Add generic content like back button and comments section
      var back = '<div><a class="link" href="#!/">back</a></div>';
      var post = document.querySelector('.post');
      post.innerHTML = back + post.innerHTML + back + '<div id="disqus_thread"></div>';

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
