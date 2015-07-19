'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChatSchema = new Schema({
  list: Object,
  user: Object,
  content: String,
  info: String,
  active: Boolean,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);