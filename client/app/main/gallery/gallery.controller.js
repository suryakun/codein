'use strict';

angular.module('App')
  .controller('GalleryCtrl', function ($scope, gallery, socket) {
    $scope.galleries = [];
    gallery.getAll().success(function(data) {
        $scope.galleries = data;
    })
    $scope.message = "helo";
  });
