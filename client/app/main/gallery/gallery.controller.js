'use strict';

angular.module('App')
  .controller('GalleryCtrl', function ($scope, gallery, socket) {
    var AllGalleries = gallery.getAll();
    AllGalleries.then(function(data) {
    	$scope.galleries = data;
    });
    $scope.message = "helo";
  });
