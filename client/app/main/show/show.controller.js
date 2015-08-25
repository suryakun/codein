'use strict';

angular.module('App')
  .controller('ShowCtrl', function ($scope, list, $stateParams, chat, socket, Auth) {

    var user = Auth.getCurrentUser();
    
    $scope.chats = [];

    // (function(){
    //     var url = "http://localhost:8000/api/videos/streaming";
    //     var context = new Dash.di.DashContext();
    //     var player = new MediaPlayer(context);
    //     player.startup();
    //     player.attachView(document.querySelector("#videoPlayer"));
    //     player.attachSource(url);
    // })();

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
        if ($scope.chat.content == '') return false;
        var data = {
            content: $scope.chat.content,
            user: user,
            list: $scope.list
        }

    	chat.insertChat(data)
            .success(function() {
                $scope.chat.content = '';
            });
    }

  });
