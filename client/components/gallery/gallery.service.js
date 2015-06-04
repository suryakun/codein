'use strict';

angular.module('App')
  .service('gallery', function ($http, $q) {
  	var defer = $q.defer();
  	$http('/')
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
