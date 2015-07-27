'use strict';

angular.module('App')
  .service('photo', function () {
    var photo = {};

    photo.save = function(data) {
    	var fd = new FormData();
    	var xhr = new XMLHttpRequest();

    	fd.append('photo', data.file)
    	xhr.open('POST', '/api/users/uploadPhoto');
    	xhr.setRequestHeader("Authorization", 'Bearer ' + $cookieStore.get("token"));
    	xhr.send(fd);
    }
  });
