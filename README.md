pixel-tweets
============
Stream tweet events and convert them to pixel data for a Spark Internet Button!

### Summary

1. Clone this repository and run `npm install` inside the root of the project directory.
2. Configure your Twitter API keys (see [Keys & Secrets](#keys--secrets) below).
3. Run `npm start`.
4. Tweet! (see [Usage](#usage) below).

### Configuration

#### Keys & Secrets

You must create your own application to use the API. Please do so by going to the [Twitter Application Management](https://apps.twitter.com/) page.

* CONSUMER_KEY
* CONSUMER_SECRET
* ACCESS_TOKEN_KEY
* ACCESS_TOKEN_SECRET

You need all four of these to run the twitter stream included in `npm start`. Configuration options are detected via `nconf`, and you may specify them in your config.json file (placed at the root of the project directory):


#### Configuration file format
  ```js
  {
  	"consumer_key": "",
  	"consumer_secret": "",
  	"access_token_key": "",
  	"access_token_secret": "",
    "spark_username": "",
    "spark_password": "",
    "filter": ""
  }
  ```
  
### Installation
#### Firmware

The easiest way to flash the firmware is to use the Spark CLI to directly flash the firmware binary to your Core:

```bash
spark flash --usb ./firmware/bin/firmware.bin 
```

#### JavaScript

Just use npm to start the server!
```bash
npm start
```

### Usage

Once you have your Spark Core flashed, your Twitter application created, and your Node process running; you may tweet at your Internet Button! Use the following format:

```
<hashtag> <pixel number> <color>
```

Any of the following tweets are valid:
```
#pixeltweets 1 blue
#pixeltweets green 9
#pixeltweets 3 #ff00ff
11 #fff #pixeltweets
#pixeltweets 5 off
```

The order of hashtag, pixel number, and color are irrelevant. Any tweet that can be parsed to find a number between 1-11 and a valid CSS color name or hex value (in 3 or 6 digit format) will work. The filter can also be something other than a hashtag!
