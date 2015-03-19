var util = require('util');
var stream = require('stream');
var Device = require('./lib/deviceStream');
var Pixels = require('./lib/pixelStream');
var names = require('colornames');
var nconf = require('nconf');

nconf.file({ file : 'config.json', dir : process.cwd(), search : true });

var id = nconf.get('id');
var filter = nconf.get('filter');
var username = nconf.get('username');
var password = nconf.get('password');

var deviceStream = new Device({ id : id, username : username, password : password });
var pixelStream = new Pixels({ filter : filter });


function x() {

	stream.Readable.call(this);
	this._readableState.objectMode = true;
	var self = this;
	setInterval(function emit() {

		var num = Math.floor(Math.random() * 12);
		var color = names.get.css()[Math.floor(Math.random() * 138)].value;
		self.push({ text : util.format("", filter, color, num) })

	}, 4000);
}
util.inherits(x, stream.Readable);

x.prototype._read = function _read() { return false; };

var testStream = new x();

testStream.pipe(pixelStream).pipe(deviceStream);