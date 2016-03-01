module.exports = function(data) {
  var xhr = createCORSRequest('POST', `http://zserver.dtcj.com/youshu/data-salon/001/applicants`);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
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
    xhr.send(JSON.stringify(data));
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