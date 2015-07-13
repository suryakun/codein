'use strict';

angular.module('App')
  .controller('ListCtrl', function ($scope, $stateParams, gallery, list) {

  	list.findByGalleryId($stateParams.id)
  		.success(function(data) {
  			$scope.data = data;
  		});
  });
