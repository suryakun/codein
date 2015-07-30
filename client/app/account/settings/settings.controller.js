'use strict';

angular.module('App')
  .controller('SettingsCtrl', function ($scope, User, Auth, $http, $cookieStore, $stateParams) {

    $scope.user = [];
    var current_user = Auth.getCurrentUser();
    var userid = $stateParams.id;
    $scope.isOwner = (current_user._id == userid );
    console.log($scope.isOwner);
    $scope.errors = {};
    $scope.showCropSection = false;
    $scope.editable = false;

    $scope.dataUser = {}

    $scope.setEditable = function(){
      $scope.editable = true;
    }

    $http.get('/api/users/'+userid).success(function(data){
      $scope._id = current_user._id;
      $scope.user = data;
      $scope.user.picture_path = '/assets/images/profile/' + current_user._id + '/' + data.picture_path;
    });

    /*
    * Change Password function
    */
    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

    $scope.myImage='';
    $scope.myCroppedImage='';    
    var handleFileSelect = function(evt) {
      var file=evt.currentTarget[0].files[0];
      var reader = new FileReader();
        reader.onload = function (evt) {
          $scope.$apply(function($scope){
            $scope.myImage=evt.target.result;
          });
        };
        reader.readAsDataURL(file);
        $scope.showCropSection = true;
    };

    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

    var dataURItoBlob = function(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(dataURI.split(',')[1]);
      else
          byteString = unescape(dataURI.split(',')[1]);
      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], {type:mimeString});
    }    

    $scope.upload_pic = function(){
      var blob = dataURItoBlob($scope.myCroppedImage);
      var formData = new FormData();          
      formData.append('image', blob);      
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/users/pic_upload');
      xhr.setRequestHeader("Authorization", 'Bearer ' + $cookieStore.get("token"));
      xhr.send(formData); 
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 201) {
          $('#uploadPhoto').modal('hide');
        };
      }
    }

  });
