'use strict';

angular.module('App')
  .service('chat', function ($http, $q) {
  	
  	function chat(){
	    
	    this.insertChat = function(data) {
	    	return $http.post('/api/chats', data);
	    }

	    this.getAllChatByListId = function(id) {
	    	return $http.get('/api/chats/'+id);
	    }
  	}

  	return new chat;
  });
