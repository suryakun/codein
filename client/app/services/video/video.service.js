'use strict';

angular.module('App')
  .factory('video', function () {
    
    return {
      download: download,
      request: request,
      upload: upload
    };

    function download (stream, callback) {
      var parts = [];

      stream.on('data', function(data){
        parts.push(data);
      });

      stream.on('error', function (err) {
        callback(err);
      });

      stream.on('end', function () {
        var src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));

        callback(null, src);
      });
    }

    function request (name) {
      
    }

    function upload (client, file) {
      client.send(file, file);
    }

  });
