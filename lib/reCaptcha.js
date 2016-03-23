var _       = require('lodash'),
    http    = require('http'),
    url     = require('url'),
    request = require('request');

function ReCaptcha(options) {
  this.options = _.extend({}, options, {
    secret: process.env.RECAPTCHA_SECRET,
    url: process.env.RECAPTCHA_URL
  });
}

_.extend(ReCaptcha.prototype, {
  verify: function(data, callback) {
    var opts = {
      url: this.options.url,
      json: true,
      form: {
        secret: this.options.secret,
        response: data.response,
        remoteip: data.remoteIp
      }
    };

    console.log('opts: ' + JSON.stringify(opts, null, 2));

    request.post(opts, function(error, verifyResponse, verifyData) {
      if(!error) {
        console.log(JSON.stringify(verifyData, null, 2));
        if(!verifyData) error = 'Response is missing';
        else if(!verifyData.success) {
          var errorCodes = verifyResponse.body['error-codes'] || [];
          error = errorCodes.length > 0 ? errorCodes.join(', ') : 'Challenge failed';
        }
      } 

      callback(error);
    });
  }
});

_.extend(ReCaptcha, {
  new: function(options) {
    return new ReCaptcha(options);
  }
})

module.exports = ReCaptcha;