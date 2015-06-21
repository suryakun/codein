/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Gallery = require('../api/gallery/gallery.model');
var List = require('../api/list/list.model');
var User = require('../api/user/user.model');

Gallery.find({}).remove(function() {
  Gallery.create({
    _id : 'AGR20015',
    name: 'AngularJS',
    info: 'AngularJS adalah framework di sisi client side yang sangat powerfull untuk pembuatan single page application',
    image: 'assets/images/angularjs.png',
    state: 'angular'
  }, {
    _id : 'NDJ20015',
    name: 'NodeJs',
    info: 'NodeJS adalah javascript yang berjalan di sisi server',
    image: 'assets/images/nodejs.png',
    state: 'node'
  }, {
    _id : 'JVS20015',
    name: 'Javascript',
    info: 'Javascript adalah bahasa pemrograman yang berjalan di sisi client',
    image: 'assets/images/javascript.png',
    state: 'javascript'
  }, {
    _id : 'PHP20015',
    name: 'PHP',
    info: 'PHP adalah bahasa pemrograman yang di jalankan di sisi server',
    image: 'assets/images/php.png',
    state: 'php'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
    console.log('finished populating users');
  });
});