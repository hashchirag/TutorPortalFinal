'use strict';

/**
 * @ngdoc function
 * @name angularPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPortalApp
 */

 
 angular.module('angularPortalApp')
 .controller('SorryCtrl', function ($scope,$location,$route,$http) {

// See if logged into fb .If not, redirect to FB Login Page


if(typeof(Storage) !== "undefined") {
	var isLoggedIn = sessionStorage.getItem("loggedIntoFB");
	// console.log(isLoggedIn);

	if(isLoggedIn === null){
		$location.path('/'+ 'tologinpage');
		$route.reload();
	}
}
else {
	alert("Use an updated version of the browser to proceed");
}

$(document).ready(function() {

	$('#okay').click(function(){
		window.location="http://now.hashlearn.com/";
	});


});
});