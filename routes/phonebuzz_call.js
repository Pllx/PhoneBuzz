var config = require('../utils/config');
var client = require('twilio')(config.accountSid, config.authToken);

function call(req,res) {
  // removes non digits
  var number = req.body.number.replace(/\D/g,'');
  // defaults to U.S. if country code isn't provided
  var prefix = (number.length === 10) ? '+1' : '+';
  number = prefix + number;

  //if number.length < 12 or invalidated
  client.makeCall({
    to: number,
    from: config.from,
    url: config.url + '/phonebuzz'
  }, function(err, response) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = call;
