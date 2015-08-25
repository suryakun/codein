'use strict';

var _ = require('lodash');
var Video = require('./video.model');
var path = require('path');
var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');

exports.streamvideo = function (req, res) {
  res.contentType('video/mp4');

  var pathToVideo = path.resolve(__dirname, '../../videos/video.mp4');
  var proc = ffmpeg(pathToVideo)
    .preset('flashvideo')
    .on('end', function () {
      console.log('file has been converted successfully');
    })
    .on('error', function(err) {
      console.log('an error happened: ' + err.message, pathToVideo);
    })
    .pipe(res, {end: true});
}

function handleError(res, err) {
  return res.send(500, err);
}