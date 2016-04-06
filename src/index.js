var share = require('./share');
var post = require('./post');
var background = require('./background');

require('./assets/index.css');

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
      imgUrl: 'http://z.dtcj.com/dt/data-imagination/summit/2016/cover.png',
      link: location.href,
      desc: '百位大咖云集上海，共议大数据时代的媒体变革',
      title: '数据想象力·2016新媒体创新峰会'
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

    // Calculate the main height.

    renderDesktop();

    $(window).on('resize', function() {
      clearTimeout(window.backgroundTimer)
      renderDesktop();
      skrollrCase.refresh();
    })

  } else {
    handleOrientation();
    $(window).on('resize', handleOrientation);

    $('#root').html(Handlebars.compile($('[data-platform="mobile"]').html())({
      mobile: require('./assets/mobile.png'),
      button: require('./assets/button.png')
    }));
  }

}

function renderDesktop() {
  // Prepare for DOM tree.
  var mainHeight = innerWidth * 10054 / 1440;
  $('#root').html(Handlebars.compile($('[data-platform="pc"]').html())({
    height: innerHeight,
    content: require('./assets/main.png'),
    number: require('./assets/number.png'),
    banner: require('./assets/banner-text.png'),
    cover: require('./assets/cover.jpg'),
    1: require('./assets/1.png'),
    2: require('./assets/2.png'),
    3: require('./assets/3.png'),
    4: require('./assets/4.png'),
    5: require('./assets/5.png'),
    6: require('./assets/6.png'),
    7: require('./assets/7.png')
  }));

  // Set the star falling background.
  background();

  // Init the scrolling behavious.
  window.skrollrCase = window.skrollrCase || skrollr.init({
    forceHeight: false,
    smoothScrolling: false,
    constants: {
        total: mainHeight + innerHeight
    }
  });

  videojs("video", {}, function(){});

  // // 百度地图API功能
  // var map = new BMap.Map("map");
  // var point = new BMap.Point(116.331398,39.897445);
  // map.centerAndZoom(point,12);
  // // 创建地址解析器实例
  // var myGeo = new BMap.Geocoder();
  // // 将地址解析结果显示在地图上,并调整地图视野
  // myGeo.getPoint("上海市浦东新区世纪大道210号", function(point){
  //   if (point) {
  //     map.centerAndZoom(point, 16);
  //     map.addOverlay(new BMap.Marker(point));
  //   }else{
  //     alert("您选择地址没有解析到结果!");
  //   }
  // }, "上海市");
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