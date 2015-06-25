'use strict';

angular.module('App')
  .service('list', function ($http, $q) {

    function list() {
      this.getAll = function() {
        return $http.get('/api/lists');
      }    

      this.save = function(data) {
        var formData = new FormData();
        formData.append('file', data.source);
        return $http.post('/api/lists', formData, {
          headers: {'Content-Type' : undefined}
        });
      }

      this.findById = function(id) {
        return $http.get('/api/lists/'+id )
      }

      this.update = function(data) {
        return $http.put('/api/lists/'+ data._id, data);
      }

      this.findByGalleryId = function(id) {
        return $http.get('/api/lists/gallery/'+ id);
      }

      this.delete = function(id) {
        return $http.delete('/api/lists/'+ id);
      }

    }

    return new list;

  });
