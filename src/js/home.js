/**
 * Created by kgd on 25/10/2016.
 */

$(function(){

    var docHeight = $(document).height();
    var WINDTH = window.innerWidth || document.documentElement.clientWidth;
    var HEIGHT = window.innerHeight || document.documentElement.clientHeight;
    var ISMOBILE;
    if (WINDTH > 720 ) {
        ISMOBILE = false;
    } else {
        ISMOBILE = true;
    }

    if ('ontouchstart' in window && ISMOBILE) {
        var click = 'touchstart';
    }
    else {
        var click = 'click';
    }

    init();

    function init() {
        renderInitialDOM();
        registerEventListeners();
      if (ISMOBILE) {
        activateMobileNav();
      }
        // newsCarousel();
      recordVisitHistory();
    }
    
    function recordVisitHistory() {
      if (!location.hash && ISMOBILE) {
        location.hash = '#back_flag';
        location.hash = '#';
      }
      
    }

    function renderInitialDOM() {

        // for PC only
        if (!ISMOBILE) {
            // append video to initial view
            $('#videoWrapper').append('<video autoplay loop width="100%"><source src="./videos/video.mp4" type="video/mp4">您的浏览器不支持mp4视频播放</video>');
        }
        $('#video2frame').append('<video preload="automatic" controls width="90%" class="video2" id="video2"><source src="http://z.dtcj.com/cbndata/fiesta/2016/assets/video2.mp4" type="video/mp4">您的浏览器不支持mp4视频播放 </video>')

    }


    function registerEventListeners() {
        $('a.scroll').on(click, function(e) {
            // alert('scroll');
            e.preventDefault();
            $('html,body').animate({scrollTop: $($(this).attr('href')).offset().top}, 500);
        });

        // var bgImg = $('#bgImage')[0];
        var $floatObj = $('.float-obj');
        var scrollTriggered = false;
        var currentY = window.scrollY;
        var nextY = currentY;

        var $btnTop = $('#btnTop');

        $(window).on('scroll', function () {
            if (scrollTriggered) return;
            scrollTriggered = true;
            setTimeout(function () {
                scrollTriggered = false;
                nextY = window.scrollY;

                // add parallax scroll only for PC device
                if (!ISMOBILE) {
                    // parallax scroll for background planet image
                    if (currentY > HEIGHT) {  // from 2nd page
                        $floatObj[0].style.top = 200 - (currentY-HEIGHT)/3 + 'px';
                        $floatObj[1].style.top = 600 - (currentY-HEIGHT)/2 + 'px';
                    }
                    // decide whether to show 'go-to-top button' or not
                    if (currentY > window.innerHeight * 0.8) {
                        $btnTop.fadeIn(1200);
                    } else {
                        $btnTop.fadeOut(600);
                    }
                }
                currentY = nextY;
            }, 0.015 * 1000);

        });
    }

    function newsCarousel() {
        var _counter = 0;
        var $newsContainer = $('.news-container');
        setInterval(function() {
            console.log('carousel changes');
            $('.news-item:eq(0)').addClass('hidden').appendTo($newsContainer);
            $('.news-item.hidden:eq(0)').removeClass('hidden');
            _counter++;
        }, 2.5 * 1000)
    }
  
  
  function activateMobileNav() {
    $('div.burger').on(click, function () {
    
      if (!$(this).hasClass('open')) {
        openMenu();
      }
      else {
        closeMenu();
      }
    
    });
  
    // close menu once menu-item clicked
    $('div.menu ul li a').on(click, function (e) {
      e.preventDefault();
      closeMenu();
    });
  
    // effects of opening menu
    function openMenu() {
      $('#circleNavArea').addClass('cover-height');
      $('div.circle').addClass('expand');
    
      $('div.burger').addClass('open');
      $('div.x, div.y, div.z').addClass('collapse');
      $('.menu li').addClass('animate');
    
      setTimeout(function () {
        $('div.y').hide();
        $('div.x').addClass('rotate30');
        $('div.z').addClass('rotate150');
      }, 70);
      setTimeout(function () {
        $('div.x').addClass('rotate45');
        $('div.z').addClass('rotate135');
      }, 120);
    }
  
  
    function closeMenu() {
      $('div.burger').removeClass('open');
      $('div.x').removeClass('rotate45').addClass('rotate30');
      $('div.z').removeClass('rotate135').addClass('rotate150');
      $('div.circle').removeClass('expand');
      $('.menu li').removeClass('animate');
    
      setTimeout(function () {
        $('div.x').removeClass('rotate30');
        $('div.z').removeClass('rotate150');
      }, 50);
      setTimeout(function () {
        $('div.y').show();
        $('div.x, div.y, div.z').removeClass('collapse');
      
      }, 70);
    
      setTimeout( function() {
        $('#circleNavArea').removeClass('cover-height');
      }, 200)
    }
  }

});

$.fn.isVisible = function (offset) {
    var rect = this[0].getBoundingClientRect();
    return (
        (rect.height > 0 || rect.width > 0) &&
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight - offset || document.documentElement.clientHeight - offset) &&
        rect.left <= (window.innerWidth - offset || document.documentElement.clientWidth - offset)
    );
};