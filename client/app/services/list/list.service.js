'use strict';

angular.module('App')
  .service('list', function ($http, $q, $location) {

    function list() {
      this.getAll = function() {
        return $http.get('/api/lists');
      }    

      this.save = function(data, progress) {
        var formData = new FormData();
        formData.append('source', data.source);
        formData.append('gallery_id', data.gallery_id);
        formData.append('title', data.title);
        formData.append('info', data.info);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/lists');
        xhr.onprogress = function(evt) {
          if (evt.lengthComputable) {
            var percentComplete = (evt.loaded / evt.total) * 100;
            progress.style.width = percentComplete + '%';
          };
        }
        xhr.send(formData);

        // return $http.post('/api/lists', formData, {
        //   headers: {'Content-Type' : undefined}
        // });
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
