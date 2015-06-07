'use strict';

angular.module('App')
  .controller('GalleryCtrl', function ($scope, gallery) {
    var AllGalleries = gallery.getAll();
    AllGalleries.then(function(data) {
    	$scope.galleries = data;
    });
    $scope.message = "helo";
  });
