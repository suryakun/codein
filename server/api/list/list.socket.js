/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var List = require('./list.model');

exports.register = function(socket) {
  List.schema.post('save', function (doc) {
    sendToAdmin(socket, doc);
  });
  List.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function sendToAdmin(socket, doc, cb){
	socket.emit('list:toAdmin', doc);
}

function onSave(socket, doc, cb) {
  socket.emit('list:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('list:remove', doc);
}