'use strict';

/**
 * @ngdoc overview
 * @name angularPortalApp
 * @description
 * # angularPortalApp
 *
 * Main module of the application.
 */
 angular
 .module('angularPortalApp', [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngMaterial'
  ])
 .config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .when('/details', {
    templateUrl: 'views/details.html',
    controller: 'DetailsCtrl'
  })
  .when('/policy', {
    templateUrl: 'views/policyVideo.html',
    controller: 'PolicyCtrl'
  })
  .when('/confirmation', {
    templateUrl: 'views/confirmation.html',
    controller: 'ConfirmationCtrl'
  })
  .when('/sorry', {
    templateUrl: 'views/sorry.html',
    controller: 'SorryCtrl'
  })
  .when('/policytest', {
    templateUrl: 'views/policy.html',
    controller: 'PolicytestCtrl'
  })
  .when('/communicationtest', {
    templateUrl: 'views/communication.html',
    controller: 'CommunicationtestCtrl'
  })
  .when('/iittest', {
    templateUrl: 'views/academicTest.html',
    controller: 'IitCtrl'
  })
  .when('/lowergradelanding', {
    templateUrl: 'views/lowergradelandingpage.html',
    controller: 'LowergradelandingCtrl'
  })
  .when('/redirecting', {
    templateUrl: 'views/redirecting.html',
    controller: 'RedirectingCtrl'
  })  
  .when('/tologinpage', {
    templateUrl: 'views/tologinpage.html',
    controller: 'TologinpageCtrl'
  })
  .when('/toexamdashboard', {
    templateUrl: 'views/toexamdashboard.html',
    controller: 'ToexamdashboardCtrl'
  })  
  .when('/examdashboard', {
    templateUrl: 'views/examdashboard.html',
    controller: 'examdashboardCtrl'
  })  
  .when('/todetailspage', {
    templateUrl: 'views/todetailspage.html',
    controller: 'todetailspageCtrl'
  })  
  .when('/lowergradetest', {
    templateUrl: 'views/lowergradetest.html',
    controller: 'LowergradetestCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});
