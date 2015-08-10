var BinaryServer = require('binaryjs').BinaryServer;
var video = require('./video');

module.exports = function(server) {
	
	var bs = new BinaryServer({port: 3000});

	bs.on('connection', function(client) {
		client.on('stream', function (stream, meta) {
			switch(meta.event) {
			    // list available videos
	            case 'list':
	                video.list(stream, meta);
	                break;

	            // request for a video
	            case 'request':
	                video.request(client, meta);
	                break;

	            // attempt an upload
	            case 'upload':
	            default:
	                video.upload(stream, meta);
			}
		});
	});
}
