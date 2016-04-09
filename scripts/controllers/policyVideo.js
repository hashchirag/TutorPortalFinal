'use strict';

/**
 * @ngdoc function
 * @name angularPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPortalApp
 */

 
 angular.module('angularPortalApp')
 .controller('PolicyCtrl', function ($scope,$location,$route) {

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

$.ajax({
	async: false,
	type: 'GET',
	url: "http://staging-now.hashlearn.com/api/users/tutor/get-status/?email="+sessionStorage.getItem("email"),
	success: function(data) {
          //callback
          // console.log("Current state is " + data.state);

          if(data.state !=2){
          	$location.path('/'+ 'tologinpage');
          	$route.reload();
          }
      }
  });

var $button = document.querySelector('#taketest');
$button.addEventListener('click', function() {
	$location.path('/'+ 'policytest');
	$route.reload();
});
});
