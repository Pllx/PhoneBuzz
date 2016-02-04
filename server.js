var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// import routes
var phonebuzz = require('./routes/phonebuzz');
var phonebuzz_call = require('./routes/phonebuzz_call');
var phonebuzz_results = require('./routes/phonebuzz_results');

app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static(__dirname + '/client'));

// POST routes
app.post('/phonebuzz', phonebuzz);
app.post('/phonebuzz/results', phonebuzz_results);
app.post('/phonebuzz/call', phonebuzz_call);

app.listen(process.env.PORT || 8080);

module.exports = app;
