angular.module('angularPortalApp')
.controller('ToexamdashboardCtrl', function ($scope,$location,$route,$http) {
	$location.path('/'+ 'examdashboard');
	$route.reload();
});