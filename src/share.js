module.exports = function(url) {
  var url = url || encodeURIComponent(location.href.split('#')[0]);
  var xhr = createCORSRequest('GET', `http://www.dtcj.com/wechat/signature?url=${url}`);
  if (!xhr) {
    throw new Error('CORS not supported');
  };

  return new Promise((resolve, reject) => {
    xhr.onload = function() {
      var responseText = xhr.responseText;
      resolve(JSON.parse(responseText));
    };
    xhr.onerror = function(error) {
      reject(error);
    };
    xhr.send();
  })
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
}