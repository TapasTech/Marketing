var share = require('./share');
var TouchPoint = require('./utils/touch');

require('./assets/index.css');

share()
.then(res => {

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
      imgUrl: '',
      link: location.href,
      desc: '',
      title: ''
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
  TouchPoint.init(window);
  var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      direction: 'vertical'
  });
}
