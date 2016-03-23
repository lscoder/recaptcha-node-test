var express   = require('express'),
    http      = require('http'),
    ReCaptcha = require('../lib/reCaptcha'),
    router    = express.Router();

router.post('/', function(req, res, next) {
  var reCaptcha = ReCaptcha.new(),
      data = {
        response: req.body['g-recaptcha-response'],
        remoteIp: req.ip
      };

  reCaptcha.verify(data, function(err, data) {
    if(err) {
      console.log('err: ', err);
      res.end('Error!');
      return;
    }
    res.end(data || 'Success!');
  });
});

module.exports = router;
