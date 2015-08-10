'use strict';


function videoStream (uploadPath) {	
	
	//declare variable
	var fs, supportedTypes;

	// include filesystem library
	fs = require('fs');

	//describe supported type of video
	supportedTypes = [
	    'video/mp4',
	    'video/webm',
	    'video/ogg'
	];
	
	//function check existing folder of videos. is nothing then create;
	this._checkUploaderDir = function (cb) {
		cb = cb || function() {};
		fs.stat(uploadPath, function(err, stats) {
			if (
				(err && err.errno === 34) || 
				!stats.isDirectory()
				) {
				if (!err) {
					fs.unlinkSync(uploadPath);
				};

				fs.mkdir(uploadPath, cb);
				return;
			};
		});		
	};

	//get list of videos based on upload directory
	this.list = function (stream, meta) {
		this._checkUploaderDir(function(){
			fs.readDir(uploadPath, function (err, files) {
				stream.write({files:files});
			});
		});
	};

	//handle request stream of video
	this.request = function (client, meta) {
		var file = uploadPath + '/' + meta.name;
		client.send(file);
	};


	//function for upload stream video
	this.upload = function (stream, meta) {
		if (!~supportedTypes.indexOf(meta.type)) {
			stream.write({err: 'Unsupported Type' + meta.type});
			stream.end();
			return;
		};

		var file = fs.createWriteStream(uploadPath + '/' + meta.name);
		stream.pipe(file);

		stream.on('data', function (data) {
			stream.write({rx: data.length / meta.size});
		});

		stream.on('end', function(){
			stream.write({end:true});
		});
	}
}

module.exports = new videoStream();