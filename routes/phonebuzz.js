var twilio = require('twilio');
var config = require('../utils/config');

function phonebuzz (req,res) {
  var options = {
    url : config.url + '/phonebuzz'
  };

  if (twilio.validateExpressRequest(req, config.authToken, options)) {

    var resp = new twilio.TwimlResponse();

    resp.say('Welcome to PhoneBuzz!')
        .gather({
          action : config.url + '/phonebuzz/results',
          finishOnKey: '#'
        }, function(node) {
          node.say('Please enter a number')
              .say('Then, press the # to submit');
        });

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(resp.toString());
  } else {
    console.log('Request validation failed');
    res.status(403).send('Validation failed: Not sent from Twilio');
  }
  //https://demo.twilio.com/welcome/voice/
};

module.exports = phonebuzz;
