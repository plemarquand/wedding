'use strict';

var animateBird = function animateBird(elem, distance, x, y) {
  var $elem = $(elem);
  var $flying = $elem.find('.flying');
  var $sitting = $elem.find('.sitting');
  var $window = $(window);

  var startX = parseInt($elem.css('margin-left').replace('px', ''), 10);
  var startY = parseInt($elem.css('margin-top').replace('px', ''), 10);

  $window.scroll(function () {
    var scrollTop = $window.scrollTop();
    var scrollStart = 20;
    var isScrolled = scrollTop > scrollStart;

    $flying.css('display', isScrolled ? 'block' : 'none');
    $sitting.css('display', isScrolled ? 'none' : 'block');

    if (isScrolled) {
      var perc = (scrollTop - scrollStart) / distance;
      var nX = startX + x * perc;
      var nY = startY + y * perc + Math.sin(perc * 30) * 5;
      $elem.css('margin-left', nX + 'px');
      $elem.css('margin-top', nY + 'px');
    } else {
      $elem.css('margin-left', startX + 'px');
      $elem.css('margin-top', startY + 'px');
    }
  });
};

var sizeSection = function sizeSection(selector) {
  var maxSize = arguments.length <= 1 || arguments[1] === undefined ? 880 : arguments[1];
  var minSize = arguments.length <= 2 || arguments[2] === undefined ? 550 : arguments[2];

  var containerHeight = $('.nav-container').height();
  var heroHeight = Math.max(Math.max(containerHeight, window.innerHeight - containerHeight - 20), minSize);

  if (window.innerHeight < maxSize) {
    $(selector).css('height', heroHeight);
  }
};

var sizeSections = function sizeSections() {
  sizeSection('.hero-unit');
  sizeSection('.section.us');
  sizeSection('.section.rsvp');
  sizeSection('.section.registry');
};

$(document).ready(function () {
  sizeSections();
  $(window).on('resize', sizeSections);

  var containerHeight = $('.nav-container').height();
  var heroHeight = Math.max(containerHeight, window.innerHeight - containerHeight - 20);
  var $birds = $('.birds');
  animateBird($birds, heroHeight * 0.5, 150, -150);

  $('.show-ceremony').click(function () {
    $('.show-ceremony').toggleClass('hidden');
    $('.ceremony-map').toggleClass('hidden');
  });

  $('.show-reception').click(function () {
    $('.show-reception').toggleClass('hidden');
    $('.reception-map').toggleClass('hidden');
  });

  // Cheezy scroll effect when you click a href
  // var $root = $('html, body');
  // $('a').click(function() {
  //   console.log('dis', this);
  //   var href = $.attr(this, 'href');
  //   $root.animate({
  //       scrollTop: $(href).offset().top
  //   }, 500, () => window.location.hash = href);
  //   return false;
  // });
});
//# sourceMappingURL=index.js.map