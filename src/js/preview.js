$(function() {
  var $wrapper = $('.preview-video-wrapper');
  var $container = $wrapper.find('.preview-video');
  var $close = $wrapper.find('.close-btn');
  var player = videojs('preview-video', {
    width: IS_MOBILE ? WIDTH : '800px',
    controls: true,
    autoplay: false,
    preload: 'auto',
    aspectRatio: '16:9',
    fluid: true,
  });
  window.player = player;
  var $btn = $('.info-wrapper > .preview');
  $btn.on(CLICK, function () {
    $wrapper.addClass('visible');
    $('body').css('overflow', 'hidden');
    setTimeout(function () {
      player.play();
    }, 200);
  });

  bindClose($close);

  function bindClose($dom) {
    $dom.on(CLICK, function (e) {
      $wrapper.removeClass('visible');
      $('body').css('overflow', 'auto');
      player.pause();
    });
  }
})
