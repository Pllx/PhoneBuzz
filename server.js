var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var twilio = require('twilio');
var config = require('./utils/config');
var fizzbuzz = require('./fizzbuzz').createString;
var client = twilio(config.accountSid, config.authToken);

app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static(__dirname + '/client/views'));


//config, twilio
app.post('/phonebuzz', function(req,res) {
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
});

//twilio, fizzbuzz
app.post('/phonebuzz/results', function(req,res) {
  var input = req.body.Digits;
  var result = fizzbuzz(input);
  var resp = new twilio.TwimlResponse();

  resp.say(result)
      .say('Thank you, and have a great day!')
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(resp.toString());
})

// twilio client
app.post('/phonebuzz/call', function(req,res) {
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
});

app.listen(process.env.PORT || 8080);

module.exports = app;
