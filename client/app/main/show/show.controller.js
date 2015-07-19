'use strict';

angular.module('App')
  .controller('ShowCtrl', function ($scope, list, $stateParams, chat, socket, Auth) {

    var user = Auth.getCurrentUser();
    $scope.chats = [];

    list.findById($stateParams.id)
    	.success(function(data) {
    		$scope.list = data;
    	});

    chat.getAllChatByListId($stateParams.id)
    	.success(function(data) {
    		$scope.chats = data;
    		socket.joinroom($stateParams.id);
            socket.syncUpdates('chat',$scope.chats);
    	});

    $scope.addChat = function() {
        if ($scope.chat.content == null) return false;
        var data = {
            content: $scope.chat.content,
            user: user,
            list: $scope.list
        }

    	chat.insertChat(data)
            .success(function() {
                console.log('sent');
                $scope.chat.content = '';
            });
    }

  });
