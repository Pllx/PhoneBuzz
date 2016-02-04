var config = require('../utils/config');
var client = require('twilio')(config.accountSid, config.authToken);

function call(req,res) {

  // invalid numbers will return undefined
  var number = parseNumber(req.body.number);

  if (number) {
    client.makeCall({
      to: number,
      from: config.from,
      url: config.url + '/phonebuzz'
    }, function(err, response) {
      res.sendStatus(err ? 500 : 200);
    });
  } else {
    res.sendStatus(400);
  }
};

function parseNumber(number) {
  // removes non digits
  var parsed = number.replace(/\D/g,'');

  // without a country code, a number has to be 10 digits long.
  // with a country code, a number can be up to 13 digits long.
  // return undefined if number is invalid
  if (parsed.length < 10 || parsed.length > 13) return;

  // defaults to U.S. if country code isn't provided
  var prefix = (parsed.length === 10) ? '+1' : '+';
  return prefix + parsed;
}

module.exports = call;
