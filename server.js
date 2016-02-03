var app = require('express')();

var config = require('./utils/config');
var fizzbuzz = require('./fizzbuzz').createString;
var bodyParser = require('body-parser');
var twilio = require('twilio');
var client = twilio(config.accountSid, config.authToken);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/', function(req,res) {
  var options = {
    url : config.url
  };

  if (twilio.validateExpressRequest(req, config.authToken, options)) {

    var resp = new twilio.TwimlResponse();

    resp.say('There must be some kind of way out of here')
        .gather({
          action : config.url + '/phonebuzz',
          finishOnKey: '#'
        }, function(node) {
          node.say('Please enter a number for phonebuzz')
              .say('Press # to submit')
        });

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(resp.toString());
  } else {
    console.log('oh no');
    res.status(403).send('Not sent from Twilio');
  }
  //https://demo.twilio.com/welcome/voice/
});

app.post('/phonebuzz_results', function(req,res) {
  var input = req.body.Digits;
  var result = fizzbuzz(input);
  var resp = new twilio.TwimlResponse();

  resp.say(result);
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(resp.toString());

})

app.get('/sendText', function(req,res) {
  //res.sendFile(__dirname + '/client/views/part1.html');

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
