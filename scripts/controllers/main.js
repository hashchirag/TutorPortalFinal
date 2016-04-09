'use strict';

/**
 * @ngdoc function
 * @name angularPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPortalApp
 */

 
 angular.module('angularPortalApp')
 .controller('MainCtrl', function ($scope,$location,$route,$http) {


 	//Pushing the access token, writing to local storage.
 	$scope.sendData = function ($scope,access_token) {
 		


 		$http({
 			url: 'http://staging-now.hashlearn.com/api/users/tutorFacebookLogin/',
 			method: "POST",
 			data: $.param({ 'access_token' : access_token }),
 			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
 		})
 		.then(function(response) {
            // success
            // console.log("State is " + response.data.state);
            // console.log("email id is " + response.data.email); 

            //Writing to session data
            if(typeof(Storage) !== "undefined") {

            	// sessionStorage.setItem("accessToken", "Smith");
            	sessionStorage.setItem("loggedIntoFB","true");
            	sessionStorage.setItem("email",response.data.email);

            	
                // See which page to redirect to, based on the STATE
                switch(response.data.state){
                  case 0:
                        //Setting state to USER CREATE (1)
                        var http = new XMLHttpRequest();
                        var url = "http://staging-now.hashlearn.com/api/users/tutor/set-status/";
                        var params = "email=" + response.data.email+"&state=1";
                        http.open("POST", url, true);

                        //Send the proper header information along with the request
                        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                        http.onreadystatechange = function() {//Call a function when the state changes.
                            if(http.readyState == 4 && http.status == 200) {
                                // alert(http.responseText);
                            }
                        }
                        http.send(params); 
                        $location.path('/'+ 'details');
                        $route.reload();

                        break;

                        case 1:
                            $location.path('/'+ 'details');
                            break;

                            case 2:
                                $location.path('/'+ 'policy');
                                $route.reload();
                                break;

                                case 3:
                                    $location.path('/'+ 'communicationtest');
                                    $route.reload();
                                    break;       

                                    case 4:
                                        $location.path('/'+ 'sorry');
                                        $route.reload();
                                        break;

                                        case 5:
                                            $location.path('/'+ 'sorry');
                                            $route.reload();
                                            break;

                                            case 6:
                                                $location.path('/'+ 'examdashboard');
                                                $route.reload();
                                                break;
                                            }

            	// $route.reload();

            } else {
            	alert("No web storage support,try a different browser");
            }	


        }, 
    function(response) { // optional
            // failed
            alert('failed');
        });
 	}

 	$scope.doLogin = function(){
 		FB.login(function(response) {
 			if (response.authResponse) {
 				// console.log('Welcome!  Fetching your information.... ');
 				$scope.sendData($scope,response.authResponse.accessToken);

 				console.log(response.authResponse);	
 				FB.api('/me', function(response) {
 					// console.log('Good to see you, ' + response.name + '.');

 				});
 			} else {
 				console.log('User cancelled login or did not fully authorize.');
                alert('Failed Login In.');
            }
        }, {scope: 'public_profile,email'});
 	}

 	window.fbAsyncInit = function() {
 		FB.init({
 			appId      : '1726590084223735',
 			xfbml      : true,
 			version    : 'v2.1'
 		});

 		FB.getLoginStatus(function (response) {
 			if (response.status === 'connected') {
                // the user is logged in and has authenticated your
                // app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed
                // request, and the time the access token 
                // and signed request each expire
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
            } else if (response.status === 'not_authorized') {
                // the user is logged in to Facebook, 
                // but has not authenticated your app
            } else {
                // the user isn't logged in to Facebook.
            }
        });
 	};

 	(function(d, s, id){
 		var js, fjs = d.getElementsByTagName(s)[0];
 		if (d.getElementById(id)) {return;}
 		js = d.createElement(s); js.id = id;
 		js.src = "//connect.facebook.net/en_US/sdk.js";
 		fjs.parentNode.insertBefore(js, fjs);
 	}(document, 'script', 'facebook-jssdk'));


//Animation
var image_default = 350;

$(document).ready(function() {
	$('#facebook-button').mouseenter(function(button) {
		$(this).animate({
			width: '+=12px',
			height: '+=12px',
			borderRadius: '+=6px',
			marginLeft: '-=6px',
			marginTop: '-=6px'
		}, 100, 'swing');
	}).mouseleave(function(button) {
		$(this).animate({
			width: image_default,
			height: image_default,
			borderRadius: image_default/2,
			marginLeft: -(image_default/2),
			marginTop: -(image_default/2)
		}, 100, 'swing');
	}).click(function(button) {
		$(this).animate({
			width: '-=24px',
			height: '-=24px',
			borderRadius: '-=12px',
			marginLeft: '+=12px',
			marginTop: '+=12px'
		}, {
			duration: 100,
			complete: function() {
				$(this).animate({
					width: 10000,
					height: 10000,
					borderRadius: 5000,
					marginLeft: -5000,
					marginTop: -5000
				}, {

				});
			}
		});
	});

});
//Animation Ending


});
