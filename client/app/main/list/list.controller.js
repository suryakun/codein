'use strict';

angular.module('App')
  .controller('ListCtrl', function ($scope, $stateParams) {
  	$scope.param = $stateParams.state;
  });
