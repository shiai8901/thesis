var app = require('./../app.js');

var CLIENT_ID;
var CLIENT_SECRET;

if ( app.get('env') === 'development' ) {
  CLIENT_ID = '476dca26b617b2c27a23';
  CLIENT_SECRET = 'd9a82187bf260d1f78211e403b5c1892d3283e41';
} else {
  CLIENT_ID = '85106edf149ff2c63847';
  CLIENT_SECRET = 'bef136331482c2a10c0efd1d05c98d0461147a75';
}

module.exports.CLIENT_ID = CLIENT_ID;
module.exports.CLIENT_SECRET = CLIENT_SECRET;