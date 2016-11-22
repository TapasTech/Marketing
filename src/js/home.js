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

    init();

    function init() {
        registerEventListeners();
        renderInitialDOM();
        // newsCarousel();
    }

    function renderInitialDOM() {

        // for PC only
        if (!ISMOBILE) {
            // append video to initial view
            $('#videoWrapper').append('<video autoplay loop width="100%"><source src="videos/video.mp4" type="video/mp4">您的浏览器不支持mp4视频播放</video>');
            var logoCounter = 1;
            // render "allies", all media logos
            /*renderMedia('#hostMedia', 3);
            renderMedia('#officialMedia', 6);
            renderMedia('#strategicPartner', 14);
            renderMedia('#specialMedia', 13);
            renderMedia('#partnerMedia', 25);*/
        }
        $('#video2frame').append('<video controls width="90%" class="video2" id="video2"><source src="http://z.dtcj.com/cbndata/fiesta/2016/assets/video2.mp4" type="video/mp4">您的浏览器不支持mp4视频播放 </video>')

        /*function renderMedia(dom, number) {
            var html = '';
            for (let i = 0; i < number; i++) {
                html += `<div class="logo-unit"><img class="logo-img" src="images/allies/logo${i + logoCounter}.png"></div>`;
            }
            $(dom).append(html);
            logoCounter += number;
        }*/

    }


    function registerEventListeners() {
        $('a.scroll').click(function(e) {
            e.preventDefault();
            $('html,body').animate({scrollTop: $($(this).attr('href')).offset().top}, 500);
        });


        var bgImg = $('#bgImage')[0];
        var $floatObj = $('.float-obj');
        var scrollTriggered = false;
        var currentY = window.scrollY;
        var nextY = currentY;
        var $footer = $('#footer');

        var baseScrollY = $('#page2').offset().top;
        var $btnTop = $('#btnTop');
        // var layer3dWrapper = $('#layer3dWrapper')[0];
        var layer3dWrapper = $('#bgPlanetWrapper')[0];

        var bodyHeight = $('body').height();
        var maxScrollY = bodyHeight - HEIGHT;
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
                        bgImg.style.backgroundPosition = 'left 0 top ' + (currentY-HEIGHT)/3 + 'px';
                        $floatObj[0].style.top = 400 - (currentY-HEIGHT)/3 + 'px';
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