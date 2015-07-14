'use strict';

angular.module('App')
  .controller('ShowCtrl', function ($scope, list, $stateParams) {
    list.findById($stateParams.id)
    	.success(function(data) {
    		$scope.list = data;
    	});
  });
