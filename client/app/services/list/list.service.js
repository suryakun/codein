'use strict';

angular.module('App')
  .service('list', function ($http) {
    
    function list() {
      
      this.getAll = function() {
        return $http.get('/api/lists');
      }    

      this.save = function(data) {
        return $http.post('/api/lists', data);
      }

      this.findById = function(id) {
        return $http.get('/api/lists/'+id )
      }

      this.update = function(data) {
        return $http.put('/api/lists/', data);
      }

    }

    return list();

  });
