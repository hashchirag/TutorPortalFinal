 angular.module('angularPortalApp')
 .controller('TologinpageCtrl', function ($scope,$location,$route,$http) {
 	// window.location="http://localhost:8000";
 	$location.path('/');
 	$route.reload(); 
 });