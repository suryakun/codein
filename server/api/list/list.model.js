'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ListSchema = new Schema({
	gallery_id: { 
		type: Schema.Types.ObjectId,
		ref: 'Gallery'
	},
  name: String,
  info: String,
  creator: String,
  source: String,
  state: String,
  active: Boolean,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('List', ListSchema);