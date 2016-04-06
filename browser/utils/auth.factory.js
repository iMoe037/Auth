'use strict';

app.factory('Auth', function ($http, $rootScope, User) {
	var me = new User();
	$rootScope.isLoggedIn = function () {
		return !!me._id;
	};
	$rootScope.isAdmin = function () {
		return !!me.isAdmin;
	};
	$rootScope.isMe = function (user) {
		return !!user && (me._id == user._id || me == user);
	};
	function toData (response) {
		return response.data;
	}
	function setMe (user) {
		me = new User(user);
		return me;
	}
	function removeMe () {
		me = new User();
		return me;
	} 

	var someObj = { value: "Some Value"};

	return {
		signup: function (credentials) {
			return $http.post('/auth/signup', credentials, someObj)
			.then(toData)
			.then(setMe);
		},
		login: function (credentials) {
			return $http.post('/auth/login', credentials, someObj)
			.then(toData)
			.then(setMe);
		},
		logout: function () {
			return $http.delete('/auth/me')
			.then(removeMe);
		},
		refreshMe: function () {
			return $http.get('/auth/me')
			.then(toData)
			.then(setMe);
		}
	};
});