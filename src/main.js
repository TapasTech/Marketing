import share from './scripts/share';
import app from './scripts/app';
import fingerScan from './scripts/finger-scan';

if (process.env.NODE_ENV !== 'production') {
  require('./index.html'); // for reload
}

require('./styles/index.css');

// imageList
const imageList = [
  require('./assets/game/game0.png'),
  require('./assets/game/game1.png'),
  require('./assets/game/game2.png'),
  require('./assets/game/game3.png'),
  require('./assets/game/game4.png'),
  require('./assets/game/game5.png'),
  require('./assets/game/game6.png'),
  require('./assets/game/game7.png'),
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
  calcREM();

  window.addEventListener('resize', calcREM, false);

  function calcREM() {
    var html = document.documentElement;
    var windowWidth = html.clientWidth;
    if (windowWidth > 640) windowWidth = 640;
    html.style.fontSize = windowWidth / 6.4 + 'px';
  }

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
        setTimeout(() => {
          fingerScan.init()
        }, 300);
      }
    });
  }
}
