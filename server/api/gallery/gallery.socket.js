/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Gallery = require('./gallery.model');

exports.register = function(socket) {
  Gallery.schema.post('save', function (doc) {
    sendToAdmin(socket, doc);
  });
  Gallery.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function sendToAdmin(socket, doc, cb){
    console.log(doc);
	socket.emit('gallery:toAdmin', doc);
}

function onSave(socket, doc, cb) {
  socket.emit('gallery:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('gallery:remove', doc);
}