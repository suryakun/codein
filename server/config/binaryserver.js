module.exports = function(bs) {		

	bs.on('connection', function(client) {
		client.on('data', function (stream, meta) {
			console.log(meta);
		});
	});
}
