'use strict';

angular.module('App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('gallery', {
      	url: '/gallery',
      	templateUrl: 'app/main/gallery/gallery.html',
      	controller: 'GalleryCtrl',
        ncyBreadcrumb: {
          label: 'Gallery Screencast'
        }
      })
      .state('list', {
      	url: '/list/:id',
      	templateUrl: 'app/main/list/list.html',
      	controller: 'ListCtrl'
      })
      .state('show', {
      	url: '/show/:id',
      	templateUrl: 'app/main/show/show.html',
      	controller: 'ShowCtrl',
        authenticate: true
      });
  });