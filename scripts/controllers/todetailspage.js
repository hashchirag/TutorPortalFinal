 angular.module('angularPortalApp')
 .controller('todetailspageCtrl', function ($scope,$location,$route,$http) {
 	// window.location="http://localhost:9000";
 	$location.path('/'+ 'details');
 	$route.reload();
 });