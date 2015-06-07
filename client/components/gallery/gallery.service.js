'use strict';

angular.module('App')
  .service('gallery', function ($http, $q) {

  	function gallery() {
  		this.getAll = function() {
		  	var defer = $q.defer();
		  	$http.get('/api/gallerys').success(function(data) {
		  		defer.resolve(data);
		  	}).error(function(err) {
		  		defer.reject(err);
		  	});
		  	return defer.promise;  			
  		}

  		this.save = function(data) {
  			var deferer = $q.defer();
  			$http.post('/api/gallery', data).success(function(status) {
  				deferer.resolve(data);
  			}).error(function(err) {
  				deferer.reject(err)
  			})
  			return deferer.promise;
  		}
  	}

  	return new gallery;

  });
