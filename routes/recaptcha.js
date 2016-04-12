var express   = require('express'),
    http      = require('http'),
    ReCaptcha = require('../lib/reCaptchaWreck'),
    router    = express.Router();

router.post('/wreck', function(req, res, next) {
  res.json({
    contentType: req.get('Content-Type'),
    secret: req.body.secret,
    response: req.body.response
  });
});

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
