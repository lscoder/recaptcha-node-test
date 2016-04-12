var _       = require('lodash'),
    http    = require('http'),
    url     = require('url'),
    Wreck   = require('wreck');

function ReCaptcha(options) {
  this.options = _.extend({}, options, {
    secret: process.env.RECAPTCHA_SECRET,
    url: process.env.RECAPTCHA_URL
  });
}

_.extend(ReCaptcha.prototype, {
  getVerifyUrl: function(data) {
    return this.options.url + '?secret=' + this.options.secret + '&response=' + data.response;
  },

  verify: function(data, callback) {
    var url = this.getVerifyUrl(data);

    Wreck.post(url, {}, function(err, response, payload) {
      payload = JSON.parse(new String(payload || '{}'));

      if(!err) {
        if(!payload.success) {
          var errorCodes = payload['error-codes'] || [];
          err = errorCodes.length > 0 ? errorCodes.join(', ') : 'Challenge failed';
        }
      }

      callback(err);
    });
  }
});

_.extend(ReCaptcha, {
  new: function(options) {
    return new ReCaptcha(options);
  }
})

module.exports = ReCaptcha;