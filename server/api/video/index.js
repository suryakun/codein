'use strict';

var express = require('express');
var controller = require('./video.controller');

var router = express.Router();

router.get('/streaming', controller.streamvideo);

module.exports = router;