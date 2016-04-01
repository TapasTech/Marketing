import share from './scripts/share';
import app from './scripts/app';

require('./styles/index.css');

// imageList

const imageList = [
  require('./assets/scan.png'),
];

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
        const isEnd = new Date() >= new Date('2016-4-13');
        app.init();
      }
    });
  }
}
