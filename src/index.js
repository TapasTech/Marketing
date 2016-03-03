var share = require('./share');
var post = require('./post');

require('./assets/index.css');

// image

var imageList = [
  require('./assets/1/1_1.png'),
  require('./assets/1/1_2.png'),
  require('./assets/1/1_3.png'),
  require('./assets/1/1_4.png'),
  require('./assets/2/2.png'),
  require('./assets/3/3.png'),
  require('./assets/4/4_1.png'),
  require('./assets/4/4_2.png'),
  require('./assets/4/4_3.png'),
  require('./assets/4/4_4.png'),
  require('./assets/4/4_5.png'),
  require('./assets/4/4_6.png'),
  require('./assets/6/6_1.png'),
  require('./assets/6/6_2.png'),
  require('./assets/message.png')
]

share().then(res => {

  wx.config({
    debug: false,
    appId: 'wx918e2834917e93dc',
    timestamp: res.timestamp,
    nonceStr: res.noncestr,
    signature: res.signature,
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone'
    ]
  });
  wx.ready(()=>{

    const wxData = {
      imgUrl: 'http://z.dtcj.com/youshu/cover.png',
      link: location.href,
      desc: '大数据“家”沙龙 点击报名',
      title: '家居那些事，你「有数」吗？| CBNData'
    }

    wx.onMenuShareTimeline(wxData);
    wx.onMenuShareAppMessage(wxData);
    wx.onMenuShareQQ(wxData);
    wx.onMenuShareWeibo(wxData);
    wx.onMenuShareQZone(wxData);

  });

})
.catch(err => {
  console.log(err)
})

window.onload = function() {

  if (is.desktop()) {
    $('#root').html($('[data-platform="pc"]').html());
    $('#qrcode').qrcode(location.href);
  } else {

    var queue = new createjs.LoadQueue(true);
    var loaded = 0;
    queue.loadManifest(imageList);
    queue.on("fileload", function(event) {
      loaded++;
      if (loaded < imageList.length) {
        $('.process').text(Math.round(loaded / imageList.length * 100)+'%');
      } else {
        $('#root').html($('[data-platform="mobile"]').html());

        var isEnd = new Date() >= new Date('2016-3-8');

        var showApply = getParameterByName('apply');
        if (showApply === '✓') {
          $('.form').css('display', 'block');
        }

        $('.apply').css('height', innerWidth * 110 / 1080);

        if (isEnd) {
          $('.apply-container').addClass('disabled');
          $('.submit').addClass('disabled').html('报名已截止');
        }

        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            direction: 'vertical',
            onTouchStart: function(swiper) {
              if (swiper.activeIndex == 1 || swiper.activeIndex == 2) {
                $('.swiper-container').addClass('no-background');
              } else {
                $('.swiper-container').removeClass('no-background');
              }
            },
            onTouchMove: function(swiper) {
              if (-swiper.translate >= swiper.height) {
                $('.swiper-container').addClass('no-background');
              } else {
                $('.swiper-container').removeClass('no-background');
              }
            },
            onSlideChangeEnd: function(swiper) {
              switch(swiper.activeIndex) {
                case 3:
                  $('.page-4').addClass('run');
                  break;
                case 4:
                  $('.page-5').addClass('run');
                  break;
                default:
                  break;
              }
            }
        });

        handleOrientation();

        $(window).on('resize', handleOrientation)

        $('.form').on('submit', function(e) {
          e.preventDefault();
          if ($('.submit').hasClass('disable')) {
            return;
          }
          var name = $('#name').val(), 
              mobile = $('#mobile').val(), 
              occupation = $('#occupation').val(), 
              topic = $('input[name="topic"]:checked').val();
          if (!name) {
            return alert('请填写您的姓名');
          }
          if (!/^1[3|4|5|7|8]\d{9}$/.test(mobile)) {
            return alert('请正确填写手机号码');
          }
          if (!occupation) {
            return alert('请选择您的职业');
          }
          $('.submit').addClass('disabled').html('提交中...');
          post({
            name: name,
            mobile: mobile,
            occupation: occupation,
            topic: topic
          })
          .then(res => {
            $('.submit').removeClass('disabled').html('点击报名');

            if (res.error === 'db') {
              alert('您已提交过申请，请耐心等待工作人员与您取得联系。');
              $('.form').css('display', 'none');
              return;
            }

            if (res.error === 'end') {
              alert('对不起，报名已经截止，请期待下次活动。')
            }

            if (res.message === 'Saved.') {
              $('.success').css('display', 'block');
            }

          })
          .catch(err => {
            console.log(err);
          })
        });

        $('.apply').on('click', function(e) {
          e.preventDefault();
          if (isEnd) return;
          $('.form').css('display', 'block');
        });

        $('.success').on('click', function(e) {
          e.preventDefault();
          if (showApply === '✓') {
            return window.close();
          }
          $(this).css('display', 'none');
          $('.form').css('display', 'none');
        })
      }
    });

  }

}

function handleOrientation() {
  if (innerWidth >= innerHeight) {
    $('.landscape').css('display', 'block');
  } else {
    $('.landscape').css('display', 'none');
  }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}