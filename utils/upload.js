/**
 * Module dependencies
 */
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var qiniu = require('qiniu');

// upload
module.exports = function upload(config, dirname) {
  qiniu.conf.ACCESS_KEY = config.accessKey;
  qiniu.conf.SECRET_KEY = config.secretKey;
  var rewrite = config.rewrite;
  var prefix = config.prefix;
  var logFile = path.join(process.cwd(), config.log);
  var filesToUpload = trace(dirname, rewrite);

  if (_.isEmpty(prefix)) {
    throw new Error('Must provide the directory name. Checkout the package.json property `config`')
  };
  if (!/\/$/.test(prefix)) {
    prefix += '/'
  };
  if (!_.isPlainObject(filesToUpload)) {
    throw new Error('Arguments should be an plain object')
  }

  // upload every file
  _.forEach(filesToUpload, function(file, key) {
    // add backend prefix before every file
    uploadFile(file, prefix + key, uptoken('marketing:' + prefix + key), logFile);
  });
};
/**
 * @description
 * get an uptoken
 *
 * @reference
 * http://developer.qiniu.com/docs/v6/sdk/nodejs-sdk.html#upload-token
 *
 * @param bucketname
 */
function uptoken(bucketname) {
  var putPolicy = new qiniu.rs.PutPolicy(bucketname);
  return putPolicy.token();
}
/**
 * @description
 * core upload method
 *
 * @reference
 * http://developer.qiniu.com/docs/v6/sdk/nodejs-sdk.html#put-extra
 *
 * @param localFile
 * @param key
 * @param uptoken
 * @param logFile
 */
function uploadFile(localFile, key, uptoken, logFile) {
  var extra = new qiniu.io.PutExtra();
  qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
    if (err) return console.log(err);
    // upload successfully
    fs.appendFileSync(logFile, new Date() + ' | ' + ret.key + ' | ' + ret.hash + '\n');
    console.log(ret.key + '\t' + ret.hash);
  });
}
/**
 * @description
 * return a hash of key-value pair about files to upload
 *
 * @param {String} dirname for now only support one diractory
 * @param {Array} rewrite replace rewrite[0] with rewrite[1] in file path
 * @returns {{}}
 *
 * @example
 *
 * // Suppose `process.cwd()` is '/Users/leeching/Hugo/HugoPage',
 * // and there is an directory named 'release'
 *
 * trace('release', 'release', 'backend');
 *
 * // return all files in this directory as following
 *
 * { 'backend/css/angulr-10b25305.css': '/Users/leeching/tapas/hugo_writer/release/css/angulr-10b25305.css',
 *   'backend/css/kitty-50fdbf6e.css': '/Users/leeching/tapas/hugo_writer/release/css/kitty-50fdbf6e.css',
 *   'backend/js/kitty-35c6ad61.js': '/Users/leeching/tapas/hugo_writer/release/js/kitty-35c6ad61.js',
 *   'backend/js/templates-d9ff0575.js': '/Users/leeching/tapas/hugo_writer/release/js/templates-d9ff0575.js' }
 *
 */
function trace(dirname, rewrite) {
  var files = {};
  // check if `dirname` is a file
  if (fs.statSync(path.join(process.cwd(), dirname)).isFile()) {
    files[dirname.replace(rewrite[0], rewrite[1])] = path.join(process.cwd(), dirname);
    return files;
  }
  // if `dirname` is not a file, then it is a directory defaultly
  var dirs = fs.readdirSync(path.join(process.cwd(), dirname));
  dirs.forEach(function(value) {
    var filePath = path.join(dirname, value);
    var isDir = fs.statSync(path.join(process.cwd(), filePath)).isDirectory();
    if (isDir) _.defaults(files, trace(filePath, rewrite));
    else files[filePath.replace(rewrite[0], rewrite[1])] = path.join(process.cwd(), filePath);
  });
  return files;
};