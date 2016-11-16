/**
 * Created by kgd on 25/10/2016.
 */

$(function(){


    var docHeight = $(document).height();
    var WINDTH = window.innerWidth || document.documentElement.clientWidth;
    var HEIGHT = window.innerHeight || document.documentElement.clientHeight;
    var isMobile;
    if (WINDTH > 720 ) {
        isMobile = false;
    } else {
        isMobile = true;
    }

    init();


    function init() {
        registerEventListeners();
        renderInitialDOM();

    }


    function renderInitialDOM() {

        if (!isMobile) {
            var leaderInfo;
            $.getJSON('../json/leaders-info.json', '', function (data) {
                leaderInfo = data.data;
                var domLeaders = '';
                var numPeople = 18;
                var numColumns = 6;
                var numRows = 3;
                var counter = 0;
                var order;
                for (var i = 0; i < numColumns; i++) {
                    domLeaders += `<div class="hex-column">`;
                    for (var j = 0; j < numRows; j++) {
                        counter++;
                        order = i + 1 + j * numColumns;
                        domLeaders +=
                            `<div class="hex-unit"><div class="image-wrapper" style="background-image:url(../images/leaders/person${order}.png)">
                            <div class="leader-name description">${leaderInfo[counter - 1].name}</div>
                            <div class="leader-info description">${leaderInfo[counter - 1].brief}</div>
                        </div>
                    </div>`;
                    }
                    domLeaders += `</div>`;
                }
                $('#leadersWrapper').append(domLeaders);
            });
        }

        var logoCounter = 1;
        function renderMedia(dom, number) {
            var html = '';
            for (let i = 0; i < number; i++) {
                html += `<div class="logo-unit"><img class="logo-img" src="images/allies/logo${i + logoCounter}.png"></div>`;
            }
            $(dom).append(html);
            logoCounter += number;
        }

        // render "allies", all media logos
        renderMedia('#hostMedia', 3);
        renderMedia('#officialMedia', 6);
        renderMedia('#strategicPartner', 14);
        renderMedia('#specialMedia', 13);
        renderMedia('#partnerMedia', 25);

    }


    function registerEventListeners() {

        $('a[href!=""]').click(function(e) {
            e.preventDefault();
            $('html,body').animate({scrollTop: $($(this).attr('href')).offset().top}, 500);
        });

        // only for PC device
        if ( window.innerWidth > 720 ) {
            var scrollTriggered = false;
            var currentY = window.scrollY;
            var nextY = currentY;
            var $footer = $('#footer');
            var baseScrollY = $('#page2').offset().top;
            var $btnTop = $('#btnTop');
            var layer3dWrapper = $('#layer3dWrapper')[0];
            $(window).on('scroll', function () {
                if (scrollTriggered) return;
                scrollTriggered = true;
                setTimeout(function () {
                    scrollTriggered = false;
                    nextY = window.scrollY;
                    // parallax scroll for background planet image
                    if (nextY > baseScrollY && nextY < docHeight - HEIGHT) {
                        // scrolling both up and down
                        var gapY = currentY - baseScrollY;
                        var layer3dTop =  gapY/2;
                        layer3dWrapper.style.transform = 'translate3d(0, ' + layer3dTop + 'px, 0)';
                    }

                    // decide whether to show 'go-to-top button' or not
                    if (currentY > window.innerHeight * 0.8) {
                        $btnTop.fadeIn(1200);
                    } else {
                        $btnTop.fadeOut(600);
                    }

                    currentY = nextY;
                }, 0.02 * 1000);

            });
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