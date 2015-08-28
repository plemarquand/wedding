const animateBird = (elem, distance, x, y) => {
  const $elem = $(elem);
  const $flying = $elem.find('.flying');
  const $sitting = $elem.find('.sitting');
  const $window = $(window);

  const startX = parseInt($elem.css('margin-left').replace('px', ''), 10);
  const startY = parseInt($elem.css('margin-top').replace('px', ''), 10);

  $window.scroll(() => {
    const scrollTop = $window.scrollTop();
    const scrollStart = 20;
    const isScrolled = scrollTop > scrollStart;

    $flying.css('display', isScrolled ? 'block' : 'none');
    $sitting.css('display', isScrolled ? 'none' : 'block');

    if(isScrolled) {
      const perc = (scrollTop - scrollStart) / distance;
      const nX = startX + x * perc;
      const nY = startY + y * perc + Math.sin(perc * 30) * 5;
      $elem.css('margin-left', nX + 'px');
      $elem.css('margin-top', nY + 'px');
    } else {
      $elem.css('margin-left', startX + 'px');
      $elem.css('margin-top', startY + 'px');
    }
  });
};

const sizeSection = (selector, maxSize = 880, minSize = 550) => {
  var containerHeight = $('.nav-container').height();
  var heroHeight = Math.max(Math.max(containerHeight, window.innerHeight - containerHeight - 20), minSize);
  console.log("hero height", heroHeight);
  if(window.innerHeight < maxSize) {
    $(selector).css('height', heroHeight);
  }
};

const sizeSections = () => {
  sizeSection('.hero-unit');
  sizeSection('.section');
};

$(document).ready(() => {
  sizeSections();
  $(window).on('resize', sizeSections);

  var containerHeight = $('.nav-container').height();
  var heroHeight = Math.max(containerHeight, window.innerHeight - containerHeight - 20);
  const $birds = $('.birds');
  animateBird($birds, heroHeight * 0.5, 150, -150);

  $('.show-ceremony').click(() => {
    $('.show-ceremony').toggleClass('hidden');
    $('.ceremony-map').toggleClass('hidden');
  });

  $('.show-reception').click(() => {
    $('.show-reception').toggleClass('hidden');
    $('.reception-map').toggleClass('hidden')
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
