'use strict';

/**
 * @ngdoc function
 * @name angularPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPortalApp
 */

 
 angular.module('angularPortalApp')
 .controller('examdashboardCtrl', function ($scope,$location,$route,$http) {

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

 	$scope.listOfExams = [];

//Getting state
$.ajax({
  async: false,
  type: 'GET',
  url: "http://staging-now.hashlearn.com/api/users/tutor/get-status/?email="+sessionStorage.getItem("email"),
  success: function(data) {
          //callback
          // console.log("Current state is " + data.state);

          if(data.state !=6){
            $location.path('/'+ 'tologinpage');
            $route.reload();
          }
        }
      });


//Getting list of EXAMS
$.ajax({
 async: false,
 type: 'GET',
 url: "http://staging-now.hashlearn.com/api/users/tutor/get-exams/?email="+sessionStorage.getItem("email"),
 success: function(data) {
          //callback
          var jsonString = JSON.stringify(data);
          // console.log(jsonString);

          var obj = JSON.parse(jsonString);
          // console.log(obj);

          for (var i=0; i < obj.length; i++){
          	$scope.listOfExams[obj[i].name] = obj[i].id;
          	$("#exams").append("<input id='r" + i + "'type='radio' name='exam' value='" + obj[i].id +"'><label for='r" + i + "'><i></i>" + obj[i].name + "</label>");
          }
        }
      });


 	// var arr = ["asdasd","bbob","gjdlfsdf","rfspa"];

 	// for (var i=0;i<arr.length;i++)
 	// {
 	// 	$("#exams").append("<input id='r" + i + "'type='radio' name='exam' value='" + arr[i] +"'><label for='r" + i + "'><i></i>" + arr[i] + "</label>");

 	// }

 	var $button = document.querySelector('#taketest');
 	$button.addEventListener('click', function() {

    // alert($('input[name=exam]:checked', '#exams').val());

    if ($('input[name=exam]:checked', '#exams').val() !=null){
      if($('input[name=exam]:checked', '#exams').val() == "1" ){
        sessionStorage.setItem("examId","1");
        $location.path('/'+ 'lowergradelanding');
        $route.reload();
      }
      if($('input[name=exam]:checked', '#exams').val() == "2"){
        sessionStorage.setItem("examId","2");
        $location.path('/'+ 'iittest');
        $route.reload();
      }
    }
    else{
      alert("Select an exam to proceed");
    }
 		// window.location="http://localhost:8000/#/examdashboard";
 		// $location.path('/'+ 'examdashboard');
 		// $route.reload();
 	});

 	$('#exams input').on('change', function() {
 		//Listen to change in radio buttons
 	});

 });