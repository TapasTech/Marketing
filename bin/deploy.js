var upload = require('../utils/upload');

var name = process.env.TRAVIS_BRANCH;
var commit = process.env.TRAVIS_COMMIT;
if (/^dev\//.test(name)) {
  name = `${name}/${commit.slice(0,8)}`;
} else if (/^feature\//.test(name)) {
  name = name.substr(8);
} else {
  throw new Error('Config the `.travis.yml` only for branch `dev/*` or `feature/*`');
}

// set default values of config
var config = {
  accessKey: process.env.QINIU_ACCESS_KEY,
  secretKey: process.env.QINIU_SECRET_KEY,
  rewrite: ['build/', ''],
  log: 'qiniu.log',
  prefix: name
};

upload(config, 'build')
