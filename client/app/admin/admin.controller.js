'use strict';

angular.module('App')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, gallery, socket) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    $scope.galleries = [];
    $scope.casts = [];
    
    gallery.getAll().success(function(data) {
      $scope.galleries = data;
      socket.synctoAdmin('gallery', $scope.galleries);
    });    

    $scope.save = function(form) {
      gallery.save(form).success(function() {
        console.info('saved');
      });
    }

  })

  //======================= controller list =================================
  .controller('AdminListCtrl', function($scope, $http, $stateParams, Auth, User, socket, list, gallery){
    $scope.lists = [];

    list.findByGalleryId($stateParams.id).success(function(data) {
      $scope.lists = data;
      socket.synctoAdmin('list', $scope.lists);
    });

    $scope.setForm = function() {
      angular.element("input").val('');
    }

    $scope.save = function(form) {
      var gallery_id = $stateParams.id;

      gallery.findById(gallery_id).success(function(id) {
        form.gallery_id = gallery_id;
        list.save(form).success(function() {
          for(var key in form) {
            form[key] = '';
          }
        });
      });

    }

    $scope.setUpdate = function(list) {
      $scope.form = angular.copy(list);
    }

    $scope.update = function(form, gallery) {
      var gallery_id = $stateParams.id;

      gallery.findById(gallery_id).success(function(id) {
        form.gallery_id = gallery_id;
        list.update(form).success(function() {
          console.log('saved');
        });
      });
    }

  });
