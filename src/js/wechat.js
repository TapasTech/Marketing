const jsApiList = [
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'onMenuShareQQ',
  'onMenuShareWeibo',
  'onMenuShareQZone'
];

// const appId = 'wxeaa18784c86a9864';
const appId = 'wxc10409226d71fb93';

const shareInfo = {
  title: '未来狂享曲·2017第一财经数据盛典',
  desc: '全面洞察商业消费生态 聚力推动数据价值共享',
  link: 'http://z.cbndata.com/cbndata/fiesta/2017/index.html',
  imgUrl: 'http://z.dtcj.com/cbndata/icons/icon.png',
};

requestSign()
  .then((data) => {
    wx.config({
      debug: false,
      timestamp: data.timestamp + '',
      nonceStr: data.noncestr,
      signature: data.signature,
      appId,
      jsApiList
    });
    
    wx.ready(() => {
      wx.onMenuShareAppMessage(shareInfo);
      wx.onMenuShareTimeline(shareInfo);
      wx.onMenuShareQQ(shareInfo);
      wx.onMenuShareWeibo(shareInfo);
      wx.onMenuShareQZone(shareInfo);
    });
    
  });

function requestSign(path) {
  var url = path || encodeURIComponent(location.href.split('#')[0]);
  var apiPath = 'http://www.cbndata.com/api/v2/wechat/signature?url=' + url;
  var xhr = createCORSRequest('GET', apiPath);
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
