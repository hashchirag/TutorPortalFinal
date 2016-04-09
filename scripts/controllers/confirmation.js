'use strict';

/**
 * @ngdoc function
 * @name angularPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPortalApp
 */

 
 angular.module('angularPortalApp')
 .controller('ConfirmationCtrl', function ($scope,$location,$route) {
 	
// See if logged into fb .If not, redirect to FB Login Page


if(typeof(Storage) !== "undefined") {
	var isLoggedIn = sessionStorage.getItem("loggedIntoFB");
	console.log(isLoggedIn);

	if(isLoggedIn === null){
		$location.path('/'+ 'tologinpage');
		$route.reload();
	}
}
else {
	alert("Use an updated version of the browser to proceed");
}

var $button = document.querySelector('#proceed');
$button.addEventListener('click', function() {
	
	$location.path('/'+ 'policy');
	$route.reload();
});
});
