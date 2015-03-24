var util = require('util');
var stream = require('stream');
var color = require('color');
var spark = require('spark');

/**
 * Stream that takes pixel data and calls the pixel function
 * on the specified Spark device
 */
function deviceStream(opts) {

	var opts = opts || { };

	if(!opts.id) { throw new Error("No ID specified"); }
	if(!opts.username) { throw new Error("No username specified") }
	if(!opts.password) { throw new Error("No password specified") }

	var self = this;
	stream.Writable.call(this);
	this._writableState.objectMode = true;
	this._device = undefined;

	spark.login({ username : opts.username, password: opts.password });
	spark.on('login', function() {
		console.log("Logged in.");
		spark.getDevice(opts.id, function(err, dev) {

			if (err) { throw err }
			console.log("Retrieved device.");
			if(dev && dev.functions.indexOf('pixel') >= 0) {
				self._device = dev;
			}
		})
	});
	spark.on('error', function(err) {
		throw err;
	})
}

util.inherits(deviceStream, stream.Writable);

deviceStream.prototype._write = function _write(chunk, enc, done) {

	if(chunk.rainbow) {
		this._device.callFunction("rainbow", null, function(err, dat) {
			if(err) { throw err; }
		});
		return done();
	}

	var rgb = color(chunk.color).rgb();
	var str = util.format("%s:%s,%s,%s",
		chunk.num,
		rgb.r,
		rgb.g,
		rgb.b
	);

	if(!this._device) { return done(); }
	this._device.callFunction("pixel", str, function(err, dat) {

		if(err) { throw err; }
	})
	done();
};

module.exports = deviceStream;
