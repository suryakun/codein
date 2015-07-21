'use strict';

angular.module('App')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window, $http) {
    $scope.user = {};
    $scope.errors = {};

    angular.element("input").bind("keydown", function() {
      angular.element(".confirm-error").addClass("hide");
    });

    $scope.register = function(form) {
      $scope.submitted = true;
      if ($scope.user.password !== $scope.user.confirm) {
        angular.element(".confirm-error").removeClass("hide");
        return false 
      };
      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }

      $scope.facebookAuth = function() {
        
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
