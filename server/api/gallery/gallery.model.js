'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GallerySchema = new Schema({
  _id: {type: String, required: true, unique: true },
  name: String,
  info: String,
  image: String,
  state: String,
  active: Boolean,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gallery', GallerySchema);