/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Chat = require('./chat.model');

exports.register = function(io, socket) {
  Chat.schema.post('save', function (doc) {
    onSave(io, socket, doc);
  });
  Chat.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

exports.room = function(socket) {
	socket.on('subscribe', function(room) { 
      socket.join(room); 
    });

    socket.on('unsubscribe', function(room){
    	socket.leave(room);
    });
}

function onSave(io, socket, doc, cb) {
  io.sockets.to(doc.list._id).emit('chat:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('chat:remove', doc);
}