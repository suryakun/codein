module.exports = function(bs) {		

	bs.on('connection', function(client) {
		client.on('stream', function (stream, meta) {
			console.log(meta);
		});
	});
}
