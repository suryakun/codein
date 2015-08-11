'use strict';

angular.module('App')
  .controller('ListCtrl', function ($scope, $stateParams, $window, $location, gallery, list, Auth) {

  	list.findByGalleryId($stateParams.id)
  		.success(function(data) {
  			$scope.data = data;
  		});

  	$scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  	$scope.isLoggedIn = Auth.isLoggedIn;

  	$scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
