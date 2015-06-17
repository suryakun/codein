'use strict';

angular.module('App')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, gallery, socket) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    $scope.galleries = [];
    
    gallery.getAll().success(function(data) {
      $scope.galleries = data;
      socket.synctoAdmin('gallery', $scope.galleries);
    });    

    $scope.save = function(form) {
      gallery.save(form).success(function() {
        console.log('saved');
      });
    }

  });
