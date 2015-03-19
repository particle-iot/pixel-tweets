var Twitter = require('twitter');
var stream = require('stream');
var util = require('util');

/**
 * Stream that reads tweets containing a specified hashtag
 */
function tweetStream(opts) {

	var self = this;
	var opts = opts || { };

	if(!opts.filter) { throw new Error("No filter specified"); }
	if(!opts.consumer_key) { throw new Error("No consumer_key specified"); }
	if(!opts.consumer_secret) { throw new Error("No consumer_secret specified"); }
	if(!opts.access_token_key) { throw new Error("No access_token_key specified"); }
	if(!opts.access_token_secret) { throw new Error("No access_token_secret specified"); }

	stream.Readable.call(this);
	this._readableState.objectMode = true;

	var client = new Twitter({

		consumer_key : opts.consumer_key
		, consumer_secret : opts.consumer_secret
		, access_token_key : opts.access_token_key
		, access_token_secret : opts.access_token_secret
	});

	client.stream('statuses/filter', { track : opts.filter }, function streamReady(filterStream) {

		self._source = filterStream;
		filterStream.on('data', function pushTweet(tweet) {

			self.push({ text : tweet.text });
		});
		filterStream.on('error', function(err) {
			throw new Error(err);
		});
	});
}

util.inherits(tweetStream, stream.Readable);

tweetStream.prototype._read = function _read() {
	return true;
}
module.exports = tweetStream;
