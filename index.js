var nconf = require('nconf');
var domain = require('domain');
var Tweets = require('./lib/tweetStream');
var Device = require('./lib/deviceStream');
var Pixels = require('./lib/pixelStream');
var util = require('util');

nconf.file({ file : 'config.json', dir : process.cwd(), search : true });

var twitterConfig = {
	access_token_secret : nconf.get('access_token_secret'),
	access_token_key : nconf.get('access_token_key'),
	consumer_secret : nconf.get('consumer_secret'),
	consumer_key : nconf.get('consumer_key'),
	filter : nconf.get('filter')
}

var pixelConfig = {
	filter : nconf.get('filter')
}

var deviceConfig = {
	username : nconf.get('username'),
	password : nconf.get('password'),
	id : nconf.get('id')
}


var tweetStream = new Tweets(twitterConfig);
var pixelStream = new Pixels(pixelConfig);
var deviceStream = new Device(deviceConfig);

tweetStream
	.pipe(pixelStream)
	.pipe(deviceStream)
;
