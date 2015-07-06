const animateBird = (elem, distance, x, y) => {
  const $elem = $(elem);
  const $flying = $elem.find(".flying");
  const $sitting = $elem.find(".sitting");
  const $window = $(window);

  const startX = parseInt($elem.css("margin-left").replace("px", ""), 10);
  const startY = parseInt($elem.css("margin-top").replace("px", ""), 10);

  const animate = () => {
    let perc = 0;
    window.requestAnimationFrame(() => {

    })
  }

  $window.scroll(() => {
    const scrollTop = $window.scrollTop();
    const scrollStart = 20;
    const isScrolled = scrollTop > scrollStart;

    $flying.css("display", isScrolled ? "block" : "none");
    $sitting.css("display", isScrolled ? "none" : "block");

    if(isScrolled) {
      const perc = (scrollTop - scrollStart) / distance;
      const nX = startX + x * perc;
      const nY = startY + y * perc + Math.sin(perc * 30) * 5;
      $elem.css("margin-left", nX + "px");
      $elem.css("margin-top", nY + "px");

      console.log(scrollTop, scrollStart, distance);
    } else {
      $elem.css("margin-left", startX + "px");
      $elem.css("margin-top", startY + "px");
    }
  });

}

$(document).ready(() => {
    var titleHeight = $('.hero-title').height();
    var containerHeight = $('.nav-container').height();
    var heroHeight = Math.max(containerHeight, window.innerHeight - containerHeight - 20);
  if(window.innerHeight < 880) {

    console.log("title", titleHeight, containerHeight, heroHeight);

    $('.hero-unit').css('height', heroHeight);
  }

  const $birds = $(".birds");
  animateBird($birds, heroHeight * 0.5, 150, -150);
});
