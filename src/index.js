var share = require('./share');
var post = require('./post');
var background = require('./background');

require('./assets/index.css');

// image

// share().then(res => {

//   wx.config({
//     debug: false,
//     appId: 'wx918e2834917e93dc',
//     timestamp: res.timestamp,
//     nonceStr: res.noncestr,
//     signature: res.signature,
//     jsApiList: [
//       'onMenuShareTimeline',
//       'onMenuShareAppMessage',
//       'onMenuShareQQ',
//       'onMenuShareWeibo',
//       'onMenuShareQZone'
//     ]
//   });
//   wx.ready(()=>{

//     const wxData = {
//       imgUrl: 'http://z.dtcj.com/youshu/cover.png',
//       link: location.href,
//       desc: '大数据“家”沙龙 点击报名',
//       title: '家居那些事，你「有数」吗？| CBNData'
//     }

//     wx.onMenuShareTimeline(wxData);
//     wx.onMenuShareAppMessage(wxData);
//     wx.onMenuShareQQ(wxData);
//     wx.onMenuShareWeibo(wxData);
//     wx.onMenuShareQZone(wxData);

//   });

// })
// .catch(err => {
//   console.log(err)
// })

window.onload = function() {

  if (is.desktop()) {

    var mainHeight = innerWidth * 10054 / 1440;

    $('body').css('height', mainHeight)

    $('#root').html(Handlebars.compile($('[data-platform="pc"]').html())({
      height: innerHeight,
      content: require('./assets/main.png'),
      number: require('./assets/number.png'),
      1: require('./assets/1.png'),
      2: require('./assets/2.png'),
      3: require('./assets/3.png'),
      4: require('./assets/4.png'),
      5: require('./assets/5.png'),
      6: require('./assets/6.png'),
      7: require('./assets/7.png')
    }));
    background();

    var s = skrollr.init({
      forceHeight: false,
      smoothScrolling: false,
      constants: {
          total: mainHeight
      }
    });

  } else {
    handleOrientation();
    $(window).on('resize', handleOrientation)
  }

}

function handleOrientation() {
  if (innerWidth >= innerHeight) {
    $('.landscape').addClass('active');
  } else {
    $('.landscape').removeClass('active');
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