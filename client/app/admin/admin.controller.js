'use strict';

angular.module('App')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, gallery, socket) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    $scope.galleries = [];
    
    gallery.getAll().then(function(data){
      $scope.galleries = data;      
    });

    $scope.save = function(form) {
      gallery.save(form).then(function(status) {
        socket.syncUpdates('gallery', $scope.galleries);
      });
    }

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });
