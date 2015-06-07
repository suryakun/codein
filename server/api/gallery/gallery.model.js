'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GallerySchema = new Schema({
  name: String,
  info: String,
  image: String,
  state: String,
  active: Boolean
});

module.exports = mongoose.model('Gallery', GallerySchema);