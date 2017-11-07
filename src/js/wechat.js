const jsApiList = [
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'onMenuShareQQ',
  'onMenuShareWeibo',
  'onMenuShareQZone'
];

const appId = 'wxeaa18784c86a9864';
// const appId = 'wxc10409226d71fb93';

const shareInfo = {
  title: '未来狂享曲·2017第一财经数据盛典',
  link: 'http://z.cbndata.com/cbndata/fiesta/2017/index.html',
  imgUrl: 'http://z.dtcj.com/cbndata/icons/icon.png',
};

requestSign()
  .then((data) => {
    wx.config({
      debug: true,
      timestamp: data.timestamp + '',
      nonceStr: data.noncestr,
      signature: data.signature,
      appId,
      jsApiList
    });
    
    /*wx.ready(function () {
      jsApiList.forEach(channel => {
        wx[channel](shareInfo);
      })
    });*/
    wx.onMenuShareAppMessage(shareInfo);
    wx.onMenuShareTimeline(shareInfo);
    wx.onMenuShareQQ(shareInfo);
    
  });

function requestSign(url) {
  var url = url || encodeURIComponent(location.href.split('#')[0]);
  var xhr = createCORSRequest('GET', 'http://www.cbndata.com/wechat/signature?url=' + url);
  if (!xhr) {
    throw new Error('CORS not supported');
  }
  
  return new Promise(function (resolve, reject) {
    xhr.onload = function () {
      var responseText = xhr.responseText;
      resolve(JSON.parse(responseText));
    };
    xhr.onerror = function (error) {
      reject(error);
    };
    xhr.send();
  });
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if (typeof window["XDomainRequest"] != "undefined") {
    xhr = new window["XDomainRequest"]();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
}
