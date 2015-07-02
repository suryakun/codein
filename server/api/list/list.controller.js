'use strict';

var _ = require('lodash');
var List = require('./list.model');
var multiparty = require('multiparty');
var fs = require('fs');
var path = require('path');

// Get list of lists
exports.index = function(req, res) {
  List.find(function (err, lists) {
    if(err) { return handleError(res, err); }
    return res.json(200, lists);
  });
};

// Get a single list
exports.show = function(req, res) {
  List.findById(req.params.id, function (err, list) {
    if(err) { return handleError(res, err); }
    if(!list) { return res.send(404); }
    return res.json(list);
  });
};

// Creates a new list in the DB.
exports.create = function(req, res) {
  var form = new multiparty.Form();  
  var size, filename;

  form.on('part', function(part) {
    if (!part.filename) return false;
    size = part.byteCount;
    filename = part.filename;
  });

  form.on('file', function(name, file) {
    var tmp_path = file.path;
    var target_path = path.resolve(__dirname, '../../../client/assets/upload');
    fs.renameSync(tmp_path, target_path + '/' + filename)
    console.log(file, target_path + filename);
  });

  form.parse(req, function(err, fields, files) {
    if (err) console.log(err);
    var list = {
      'title' : fields.title[0],
      'gallery_id' : fields.gallery_id[0],
      'info' : fields.info[0]
    }
    List.create(list, function(err, list) {
      if(err) { return handleError(res, err); }
      res.send(201,fields);
    });
  });
};

// Updates an existing list in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  List.findById(req.params.id, function (err, list) {
    if (err) { return handleError(res, err); }
    if(!list) { return res.send(404); }
    var updated = _.merge(list, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, list);
    });
  });
};

// Deletes a list from the DB.
exports.destroy = function(req, res) {
  List.findById(req.params.id, function (err, list) {
    if(err) { return handleError(res, err); }
    if(!list) { return res.send(404); }
    list.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// find data by gallery id
exports.findByGalleryId = function(req, res) {
  List.find({'gallery_id': req.params.id}, function(err, list) {
    if (err) { return handleError(res, err) };
    if (!list) { return res.send(404); };
    return res.json(list);
  })
}


function handleError(res, err) {
  return res.send(500, err);
}