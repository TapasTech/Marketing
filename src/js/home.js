/**
 * Created by kgd on 25/10/2016.
 */

$(function () {
    
    var WIDTH = window.innerWidth || document.documentElement.clientWidth;
    var HEIGHT = window.innerHeight || document.documentElement.clientHeight;
    var ISMOBILE = WIDTH <= 720;
    var CLICK = 'ontouchstart' in window && ISMOBILE ? 'touchstart' : 'click';
    
    init();
    
    function init() {
        renderInitialDOM();
        registerEventListeners();
        if (ISMOBILE) {
            activateMobileNav();
            recordVisitHistory();
        }
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
        
        // add news content
        var newsArray = [
            ['2016.12.22', 'CBNData D9报告：精细化内容成获取用户关键', 'http://www.yicai.com/news/5189088.html'],
            ['2016.12.21', 'CBNData D9报告：广东2016年线上消费金额居首', 'http://www.yicai.com/news/5188196.html'],
            ['2016.12.16', 'CBNData D9报告：DT时代的效能提升', 'http://www.yicai.com/news/5184665.html'],
            ['2016.12.14', '万有引力·第一财经数据盛典', 'http://www.yicai.com/image/5182865.html'],
            ['2016.12.13', '蚂蚁聚宝黄浩：互联网理财不是开金融超市', 'http://www.yicai.com/news/5182037.html'],
            ['2016.12.13', '杨现领：卖房还是收租？大数据告诉你怎样更划算', 'http://www.yicai.com/news/5182039.html'],
            ['2016.12.11', '大优酷杨伟东：爆款可以用大数据“算计” 保持内容匠心是前提', 'http://www.yicai.com/news/5180190.html'],
            ['2016.12.11', '豌豆荚总经理张博：大数据破解长尾分发之困', 'http://www.yicai.com/news/5180186.html'],
            ['2016.12.11', '阿里巴巴董本洪：挖掘阿里独有的数据能源价值', 'http://www.yicai.com/news/5180177.html'],
            ['2016.12.11', '飞猪总裁李少华：用数据服务旅行', 'http://www.yicai.com/news/5180189.html'],
            ['2016.12.11', '菜鸟网络丁宏伟：依靠数据的深度应用提高物流体系效率', 'http://www.yicai.com/news/5180179.html'],
            ['2016.12.9', '万有引力·第一财经数据盛典-主旨演讲Ⅲ', 'http://www.yicai.com/video/5179735.html'],
            ['2016.12.9', '万有引力·第一财经数据盛典-主旨演讲Ⅱ&圆桌', 'http://www.yicai.com/video/5179642.html'],
            ['2016.12.9', '万有引力·第一财经数据盛典-主旨演讲Ⅰ', 'http://www.yicai.com/video/5179636.html'],
            ['2016.12.9', 'CBNData重磅发布《D9报告》：数据连接开启消费洞察新视野', 'http://www.yicai.com/news/5179176.html'],
            ['2016.12.9', 'CBNData数据盛典：中国互联网消费大数据时代来临', 'http://www.yicai.com/news/5179143.html'],
            ['2016.12.9', '苏芒：数据是时尚最好的保障', 'http://www.yicai.com/news/5179133.html'],
            ['2016.12.9', 'CBNData数据盛典|阿里移动事业群总裁何小鹏：所有流量公司都在焦虑这三件事', 'http://www.yicai.com/news/5178912.html'],
            ['2016.12.9', 'CBNData数据盛典|阿里文娱集团杨伟东:中国“硅谷+好莱坞”时代已来', 'http://www.yicai.com/news/5178910.html'],
            ['2016.12.9', 'CBNData数据盛典：连接大数据 探索商业新价值', 'http://www.yicai.com/news/5178833.html'],
            ['2016.12.8', 'CBNData数据盛典：中国互联网消费大数据时代来临', 'http://www.yicai.com/news/5178679.html'],
            ['2016.12.8', 'CBNData 黄磊：通过数据连接提升中国商业社会能级', 'http://www.yicai.com/news/5178676.html'],
            ['2016.12.8', 'CBNData重磅发布《D9报告》：数据连接开启消费洞察新视野', 'http://www.yicai.com/news/5178671.html'],
            ['2016.12.8', '杨伟东：中国“硅谷+好莱坞”模式惊喜无限', 'http://www.yicai.com/news/5178477.html'],
            ['2016.12.8', '黄磊：通过数据连接提升中国商业社会能级', 'http://www.yicai.com/news/5178379.html'],
            ['2016.12.8', '黄浩：智能理财开始互联网理财新时代', 'http://www.yicai.com/news/5178372.html'],
            ['2016.12.8', '董本洪：新零售时代天猫淘宝扮演赋能角色', 'http://www.yicai.com/news/5178158.html'],
            ['2016.12.8', 'CBNData数据盛典，打破数据孤岛的第一步', 'http://www.yicai.com/news/5178107.html'],
            ['2016.12.7', '华视携手CBNData数据盛典，点燃移动数据狂欢', 'http://www.yicai.com/news/5177540.html'],
            ['2016.12.7', '凤凰都市传媒助力CBNData数据盛典掀起全民数据狂欢', 'http://www.yicai.com/news/5177535.html'],
            ['2016.12.7', '第一财经数据盛典：搭建数据开放平台，洞察线上经济全景', 'http://www.yicai.com/news/5177529.html'],
            ['2016.12.7', '第一财经试水数据商业化：CBNData这一年', 'http://www.yicai.com/news/5177520.html'],
            ['2016.12.7', 'CBNData年度洞察|数据共享红利乍现金融业期待擦出更多火花', 'http://www.yicai.com/news/5177506.html'],
            ['2016.12.6', 'CBNData年度洞察|智慧旅行时代玩转旅游大数据', 'http://www.yicai.com/news/5176741.html'],
            ['2016.12.5', '人民数字助力第一财经数据盛典点燃数据狂欢', 'http://www.yicai.com/news/5175592.html'],
            ['2016.12.5', 'CBNData年度观察|优质内容、扩展场景两招让内容消费升级', 'http://www.yicai.com/news/5175531.html'],
            ['2016.12.4', 'CBNData年度洞察|“出行+电商”试水新零售', 'http://www.yicai.com/news/5174548.html'],
            ['2016.12.3', 'CBNData年度洞察|大数据开启智能物流新时代', 'http://www.yicai.com/news/5174172.html'],
            ['2016.12.1', 'CBNData年度洞察|大数据勾勒应用商店分发渠道新蓝图', 'http://www.yicai.com/news/5172921.html'],
            ['2016.11.30', 'CBNData年度洞察|互联网数据重构电影市场', 'http://www.yicai.com/news/5171255.html'],
            ['2016.11.29', 'CBNData年度洞察|精准找房只是开胃菜 互联网数据互通为房企打开秘密花园', 'http://www.yicai.com/news/5170272.html'],
            ['2016.11.28', 'CBNData年度洞察|大数据锁定高频用户 网红激活电商潜能', 'http://www.yicai.com/news/5169229.html'],
            ['2016.11.22', 'CBNData：谁能追上消费热点？互联网数据互通或将成为关键赛点', 'http://www.yicai.com/news/5164866.html'],
            ['2016.11.10', '数据连接共赢 第一财经举办首届数据盛典', 'http://www.yicai.com/news/5155159.html'],
        ];
        
        var html = '';
        var numNews = newsArray.length;
        for (let j = 0; j < numNews; j++) {
            html += `<a class="news-item carousel" href="${newsArray[j][2]}" target="_blank">
            <span class="news-title">${newsArray[j][1]}</span>
        <span class="news-date">${newsArray[j][0]}</span>
        </a>`
        }
        
        $('#newsContainer').append(html);
        newsCarousel(3);
    }
    
    
    function registerEventListeners() {
        $('a.scroll').on(CLICK, function (e) {
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
                        $floatObj[0].style.top = 200 - (currentY - HEIGHT) / 3 + 'px';
                        $floatObj[1].style.top = 600 - (currentY - HEIGHT) / 2 + 'px';
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
    
    function newsCarousel(interval) {
        var _counter = 0;
        var $newsContainer = $('.news-container');
        setInterval(function () {
            console.log('carousel changes');
            // $('.news-item.carousel:eq(0)').addClass('hidden').appendTo($newsContainer);
            $('.news-item.carousel:eq(0)').fadeOut('slow').appendTo($newsContainer).fadeIn();
            $('.news-item.carousel.hidden:eq(0)').removeClass('hidden');
            _counter++;
        }, interval * 1000)
    }
    
    
    function activateMobileNav() {
        $('div.burger').on(CLICK, function () {
            
            if (!$(this).hasClass('open')) {
                openMenu();
            }
            else {
                closeMenu();
            }
            
        });
        
        // close menu once menu-item clicked
        $('div.menu ul li a').on(CLICK, function (e) {
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
            
            setTimeout(function () {
                $('#circleNavArea').removeClass('cover-height');
            }, 200)
        }
    }
    
});
