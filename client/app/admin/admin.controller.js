'use strict';

angular.module('App')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, gallery, socket) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    $scope.galleries = [];
    $scope.casts = [];
    
    gallery.getAll.success(function(data) {
      $scope.galleries = data;
      socket.synctoAdmin('gallery', $scope.galleries);
    });    

    $scope.save = function(form) {
      gallery.save(form).success(function() {
        console.info('saved');
      });
    }

  })

  .controller('AdminListCtrl', function($scope, Auth, User, socket, list){
    $scope.lists = [];

    list.getAll().success(function(data) {
      $scope.lists = data;
    });

    $scope.save = function(form) {
      list.save(form).success(function() {
        console.log('saved');
      });
    }

    $scope.update = function(id, form) {
      list.update(form).success(function() {
        console.log('saved');
      });
    }

  });
