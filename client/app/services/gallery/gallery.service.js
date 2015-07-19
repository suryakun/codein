'use strict';

angular.module('App')
  .service('gallery', function ($http, $q) {

  	function gallery() {
  		this.getAll = function() {
		  	return $http.get('/api/gallery');
  		}

  		this.save = function(data) {
  			return $http.post('/api/gallery', data);
  		}

      this.findById = function(id) {
        return $http.get('/api/gallery/'+id);
      }

      this.update = function(id) {
        return $http.get('/api/gallery/'+id);
      }
      
  	}

  	return new gallery;

  });
