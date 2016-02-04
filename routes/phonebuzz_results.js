var twilio = require('twilio');
var fizzbuzz = require('../fizzbuzz').createString;

//twilio, fizzbuzz
function results (req,res) {
  var input = req.body.Digits;
  var result = fizzbuzz(input);
  var resp = new twilio.TwimlResponse();

  resp.say(result)
      .say('Thank you, and have a great day!')
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(resp.toString());
};

module.exports = results;
