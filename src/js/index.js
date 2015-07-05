console.log('hi', $)

$(document).ready(() => {
  if(window.innerHeight < 880) {
    var titleHeight = $('.hero-title').height();
    var containerHeight = $('.nav-container').height();
    var heroHeight = Math.max(containerHeight, window.innerHeight - containerHeight - 20);

    console.log("title", titleHeight, containerHeight, heroHeight);

    $('.hero-unit').css('height', heroHeight);
  }
  console.log('load!ed', window.innerHeight);
})
