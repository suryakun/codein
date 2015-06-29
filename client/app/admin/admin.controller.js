'use strict';

angular.module('App')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, gallery, socket) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    $scope.galleries = [];
    $scope.casts = [];
    
    gallery.getAll().success(function(data) {
      $scope.galleries = data;
      socket.synctoAdmin('gallery', $scope.galleries);
    });    

    $scope.save = function(form) {
      gallery.save(form).success(function() {
        console.info('saved');
      });
    }

  })

  //======================= controller list =================================
  .controller('AdminListCtrl', function($scope, $http, $stateParams, Auth, User, socket, list, gallery){
    $scope.lists = [];
    $scope.buttonSave = true;
    $scope.confirm = 'Saved';

    list.findByGalleryId($stateParams.id).success(function(data) {
      $scope.lists = data;
      socket.synctoAdmin('list', $scope.lists);
    });

    $scope.setForm = function() {
      $scope.buttonSave = true;
      angular.element("input").val('');
      angular.element("textarea").val('');
    }

    $scope.save = function(form) {
      var progressbar = document.querySelector('.progress-bar');
      var gallery_id = $stateParams.id;

      gallery.findById(gallery_id).success(function(data) {
        if (!data) return false;
        form.gallery_id = gallery_id;
        list.save(form, progressbar);
        // list.save(form).success(function() {
        //   for(var key in form) {
        //     form[key] = '';
        //   }
        //   $scope.confirm = 'Saved';
        // });
      });

    }

    $scope.setUpdate = function(list) {
      $scope.buttonSave = false;
      $scope.form = angular.copy(list);
    }

    $scope.update = function(form) {
      var gallery_id = $stateParams.id;

      gallery.findById(gallery_id).success(function(data) {
        if (!data) return false;
        form.gallery_id = gallery_id;
        list.update(form).success(function() {
          $scope.confirm = 'Updated';
        });
      });
    }

    $scope.delete = function(id){
      list.delete(id).success(function() {
       $scope.confirm = 'Deleted'; 
      });
    }

  });
