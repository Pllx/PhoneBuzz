# PhoneBuzz
Play FizzBuzz over the phone!

## Running locally

### Setting up on Twilio
1. Sign up for [Twilio](https://www.twilio.com/)
2. Get a Twilio phone number

### Use ngrok to create a secure public url to a local webserver on your machine.

1. Download [ngrok](https://ngrok.com/)
2. Unzip the file, and in the same folder, run `./ngrok http 8080`
3. Copy the https URL and enter it as the request url under 'Voice' for your Twilio number. When someone cal

### Configure and run
1. Rename utils/sample_config.js to config.js
1. Update config.js with the ngrok url and API keys
2. Install dependencies with `npm install`
3. Start the server with `npm start`

Now, just visit the URL ngrok created and play PhoneBuzz!
