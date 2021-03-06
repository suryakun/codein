'use strict';

var _ = require('lodash');
var Chat = require('./chat.model');

// Get list of chats
exports.index = function(req, res) {
  Chat.find(function (err, chats) {
    if(err) { return handleError(res, err); }
    return res.json(200, chats);
  });
};

// Get a single chat
exports.show = function(req, res) {
  Chat.findById(req.params.id, function (err, chat) {
    if(err) { return handleError(res, err); }
    if(!chat) { return res.send('404'); }
    return res.json(chat);
  });
};

// Creates a new chat in the DB.
exports.create = function(req, res) {
  Chat.create(req.body, function(err, chat) {
    if(err) { return handleError(res, err); }
    return res.json(201, chat);
  });
};

// Updates an existing chat in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Chat.findById(req.params.id, function (err, chat) {
    if (err) { return handleError(res, err); }
    if(!chat) { return res.send(404); }
    var updated = _.merge(chat, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, chat);
    });
  });
};

// Deletes a chat from the DB.
exports.destroy = function(req, res) {
  Chat.findById(req.params.id, function (err, chat) {
    if(err) { return handleError(res, err); }
    if(!chat) { return res.send(404); }
    chat.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.findByListId = function(req, res) {
  Chat.find({'list._id': req.params.id}, function(err, data) {
    if (err) { return handleError(res, err) };
    if (!data) { return res.send(404); }
    return res.json(200, data)
  });
};

function handleError(res, err) {
  return res.send(500, err);
}