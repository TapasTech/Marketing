/**
 * Created by kgd on 25/10/2016.
 */

$(function(){

    init();


    function init() {
        registerEventListeners();

        renderInitialDOM();

    }


    function renderInitialDOM() {
        var json;
        $.getJSON('../json/leaders-info.json','', function(data) {
            console.log(data);
            json = data;
        });
        var domLeaders = '';
        var numPeople = 18;
        var numColumns = 6;
        var numRows = 3;
        var counter = 0;
        for (var i = 0; i < numColumns; i++) {
            domLeaders += `<div class="hex-column">`;
            for (var j = 0; j < numRows; j++) {
                domLeaders +=
                    `<div class="hex-unit"><div class="image-wrapper">
                            <div class="leader-name description">Bill Gates</div>
                            <div class="leader-info description">CEO of Apple, chief designer of iPhone.</div>
                        </div>
                    </div>`;
                counter++;
            }
            domLeaders += `</div>`;
        }
        $('#leadersWrapper').append(domLeaders);
    }


    function registerEventListeners() {

        $('a[href!=""]').click(function(e) {
            e.preventDefault();
            $('html,body').animate({scrollTop: $($(this).attr('href')).offset().top}, 500);
        });


        var scrollTriggered = false;
        var firstFlip = true;
        var currentY = window.scrollY;
        var nextY = currentY;

        var $footer = $('#footer');
        var baseScrollY = $('#page2').offset().top;
        $(window).on('scroll', function () {
            if (scrollTriggered) return;
            scrollTriggered = true;
            setTimeout(function () {
                scrollTriggered = false;
                nextY = window.scrollY;

                console.log($footer.isVisible(160));

                if (nextY > baseScrollY && !$footer.isVisible(160)) {
                    // scrolling both up and down
                    var gapY = currentY - baseScrollY;
                    var layer3dTop =  gapY/2;
                    // $('#layer3dWrapper').css('top',  currentY - layer3dTop);
                    $('#layer3dWrapper')[0].style.transform = 'translate3d(0, ' + layer3dTop + 'px, 0)';
                }

                currentY = nextY;
            }, 0.02 * 1000);


            // trigger only once
            /*if (firstFlip && window.scrollY < $('#page1').height()) {
                $('html,body').animate({scrollTop: $('#page2').offset().top}, 500);
                firstFlip = false;
            }*/

        });

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