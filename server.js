var express = require('express');
var app = express();

var config = require('./utils/config');
var fizzbuzz = require('./fizzbuzz').createString;
var bodyParser = require('body-parser');
var twilio = require('twilio');
var client = twilio(config.accountSid, config.authToken);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/client/views'));

app.post('/phonebuzz', function(req,res) {
  console.log('got here');
  var options = {
    url : config.url + '/phonebuzz'
  };

  if (twilio.validateExpressRequest(req, config.authToken, options)) {

    var resp = new twilio.TwimlResponse();

    resp.say('I\'m slim shady yes im the real shady all you other slim shadies are just imitating')
        .gather({
          action : config.url + '/phonebuzz/results',
          finishOnKey: '#'
        }, function(node) {
          node.say('Please enter a number for phonebuzz')
              .say('Press the # to submit')
        });

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(resp.toString());
  } else {
    console.log('oh no');
    res.status(403).send('Not sent from Twilio');
  }
  //https://demo.twilio.com/welcome/voice/
});

app.post('/phonebuzz/results', function(req,res) {
  var input = req.body.Digits;
  var result = fizzbuzz(input);
  var resp = new twilio.TwimlResponse();

  resp.say(result);
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(resp.toString());

})

app.post('/phonebuzz/call', function(req,res) {
  console.log('!!', req.body.number);
  client.makeCall({
    to: req.body.number,
    from: config.from,
    url: config.url + '/phonebuzz'
  }, function(err, response) {
    if (err) console.log('err:', err);
    console.log(response.from);
  });
})

app.get('/sendText', function(req,res) {

  client.sendMessage({
    to : config.to,
    from: config.from,
    body: 'You\'re awesome.'
  }, function(err, text) {
    if (!err) {
      console.log('You sent:',text.body);
      console.log('Current status of this text message is:', text.status);
    }
  });
});

app.listen(process.env.PORT || 8080);

module.exports = app;
