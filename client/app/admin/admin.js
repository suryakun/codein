'use strict';

angular.module('App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.gallery.html',
        controller: 'AdminCtrl'
      })
      .state('listgallery', {
      	url: '/admin/:id',
      	templateUrl: 'app/admin/admin.list.html',
      	controller: 'AdminListCtrl'
      })
  });