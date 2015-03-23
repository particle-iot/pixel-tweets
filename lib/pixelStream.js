var util = require('util');
var stream = require('stream');
var colors = require('colornames');

/**
 * Stream that filters tweets for specified hashtag and converts valid tweets into
 * an object containing a pixel number and something that looks like a color.
 */
function pixelStream(opts) {

	var opts = opts || { };

	if(!opts.filter) { throw new Error("No filter specified"); }

	stream.Transform.call(this);
	this._writableState.objectMode = true;
	this._readableState.objectMode = true;
	this._filter = opts.filter;
}

util.inherits(pixelStream, stream.Transform);

pixelStream.prototype._transform = function _transform(chunk, enc, done) {

	var push = { };
	var words = chunk.text.toLowerCase().replace(this._filter, '').split(' ');
	words.forEach(function findMeaning(val) {

		// pixel number [1..11]
		if(parseInt(val) >= 0 && parseInt(val) < 12) {
			return push.num = parseInt(val);
		}

		// hex value (#rgb|#rrggbb)
		if(val.substr(0, 1) == "#" && (val.length == 4 || val.length == 7)) {
			return push.color = val;
		}

		// color name
		else if(colors(val)) {
			return push.color = colors(val);
		}
		// people will probably say 'off'
		else if (val == "off") {
			return push.color = colors("black");
		}
	});
	if(push.num && push.color) {

		this.push(push);
	}
	done();
}

module.exports = pixelStream;
