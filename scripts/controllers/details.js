'use strict';

/**
 * @ngdoc function
 * @name angularPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPortalApp
 */

 
 angular.module('angularPortalApp')
 .controller('DetailsCtrl', function ($scope,$location,$route,$http) {


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


 	// Get the state of the user, if not 1, Redirect to FB Login Page.
 	$.ajax({
 		async: false,
 		type: 'GET',
 		url: "http://staging-now.hashlearn.com/api/users/tutor/get-status/?email="+sessionStorage.getItem("email"),
 		success: function(data) {
          //callback
          // console.log("Current state is " + data.state);

          if(data.state !=1){
          	$location.path('/'+ 'tologinpage');
          	$route.reload();
          }
      }
  });



 	$scope.listOfColleges = [];
 	$scope.listOfDegrees = [];
 	$scope.listOfExams = [];
 	$scope.listOfLanguages =[];


	//HIDE
	$('#studentPics').hide();
	$('#graduatePics').hide();
	$('#customCollege').hide();
	$('#customDegree').hide();


 	//GETTING LIST OF COLLEGES
 	$http({
 		method: 'GET',
 		url: 'http://staging-now.hashlearn.com/api/users/collegeList'
 	}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    var jsonString = JSON.stringify(response);

    var obj = JSON.parse(jsonString);
    var objData = obj.data;

    for (var i=0; i<objData.length; i++){;
    	$scope.listOfColleges[objData[i].name] = objData[i].id;
    }

     	//POPULATING COLLEGE DROP DOWN
     	$scope.addOptionToDropDown("college", "Other");

     	for(var nameOfCollege in $scope.listOfColleges){
     		$scope.addOptionToDropDown("college", nameOfCollege);
     	}
     }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    // alert("An error has occured. Please contact HashLearn Now");
});

 	//GETTING LIST OF EXAMS
 	$http({
 		method: 'GET',
 		url: 'http://staging-now.hashlearn.com/api/exams'
 	}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    var jsonString = JSON.stringify(response);

    var obj = JSON.parse(jsonString);
    var objData = obj.data;

    for (var i=0; i<objData.length; i++){;
    	$scope.listOfExams[objData[i].name] = objData[i].id;
    }

     	//POPULATING COLLEGE DROP DOWN

     	for(var nameOfCollege in $scope.listOfExams){
     		$scope.addCheckbox('#examGroups', nameOfCollege, "exam");
     	}
     }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    alert("An error has occured. Please contact HashLearn Now");
});


 	//Getting List of Languages
 	$http({
 		method: 'GET',
 		url: 'http://staging-now.hashlearn.com/api/users/language-list/'
 	}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    var jsonString = JSON.stringify(response);

    var obj = JSON.parse(jsonString);
    var objData = obj.data;

    for (var i=0; i<objData.length; i++){;
    	$scope.listOfLanguages[objData[i].name] = objData[i].id;
    }

     	//POPULATING COLLEGE DROP DOWN

     	for(var nameOfLanguage in $scope.listOfLanguages){
     		$scope.addCheckbox('#languages', nameOfLanguage, "language");
     	}
     }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    alert("An error has occured. Please contact HashLearn Now");
});


 	//GETTING LIST OF DEGREES
 	$http({
 		method: 'GET',
 		url: 'http://staging-now.hashlearn.com/api/users/degreeList'
 	}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    var jsonString = JSON.stringify(response);

    var obj = JSON.parse(jsonString);
    var objData = obj.data;

    for (var i=0; i<objData.length; i++){
    	$scope.listOfDegrees[objData[i].name] = objData[i].id;
    }

    	//POPULATING COLLEGE DROP DOWN
    	$scope.addOptionToDropDown("degree", "Other");

    	for(var nameOfDegree in $scope.listOfDegrees){
    		$scope.addOptionToDropDown("degree", nameOfDegree);
    	}
    }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    alert("An error has occured. Please contact HashLearn Now");
});

	// HELPER FUNCTIONS
	$scope.addCheckbox = function(container,text,name){
		var container = $(container);
		var inputs = container.find('input');
		var id = inputs.length+1;

		$('<input />', { type: 'checkbox', id: 'cb'+id, value: text, name : name ,class : 'material_checkbox'}).appendTo(container);
		$('<label />', { 'for': 'cb'+id, text: text}).appendTo(container);
	}

	$scope.addOptionToDropDown = function(parent,text){
		var x = document.getElementById(parent);
		var option = document.createElement("option");
		option.text = text;
		x.add(option);
	}
	//END OF HELPER FUNCTIONS


	$scope.graduationYears= ["1950","1951","1952","1953","1954","1955","1956","1957","1958","1959","1960","1961","1962","1963","1964","1965","1966","1967","1968","1969","1970","1971","1971","1972","1973","1974","1975","1976","1977","1978","1979","1980","1981","1982","1983","1984","1985","1986","1987","1988","1989","1990","1991","1992","1993","1994","1995","1996","1997","1998","1999","2000","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022"];
 	//POPULATING GRADUATION YEAR DROP DOWN

 	for(var i =0 ; i < $scope.graduationYears.length ; i ++ ){
 		$scope.addOptionToDropDown("year", ($scope.graduationYears[i]));
 	}


 	// HIDE AND DISPLAY PICTURE UPLOADING SECTIONS
 	$('#mForm input:radio').on('change', function() {
 		if (($('input[name="studentOrGraduate"]:checked', '#mForm').val()) == 'student')
 		{
 			$('#graduatePics').hide();
 			$('#studentPics').show();
 		}
 		else{
 			$('#studentPics').hide();
 			$('#graduatePics').show();
 		}
 	});



 	$scope.addImagePickerEvents = function (name){
	// Image inputs
	var media = $('#'+ name);
	if (media.length) {
		var mediaDefaultValue = $('.file span.value').text();
		var mediaCharLimit = 20;

		$('.file .bt-value').click(function(){
			media.click();
		});

		media.on('change', function() {
			var value = this.value.replace("C:\\fakepath\\", "");
			var newValue;
			var valueExt;
			var charLimit;

			if (value) {
				newValue = value;
				valueExt = value.split('.').reverse()[0];
				if (newValue.length > mediaCharLimit) {
					charLimit = mediaCharLimit - valueExt.length;

	                // truncate chars.
	                newValue = $.trim(value).substring(0, charLimit) + '…';

	                // if file name has extension, add it to newValue.
	                if (valueExt.length) {
	                	newValue += valueExt;
	                }
	            }
	        }
	        else {
	        	newValue = mediaDefaultValue;
	        }
	        $(this).parent().find('span.value').text(newValue);
	    });
	}
}
$scope.addImagePickerEvents('id_front_student');
$scope.addImagePickerEvents('id_back_student');
$scope.addImagePickerEvents('certificate_graduate');
$scope.addImagePickerEvents('id_graduate');




//FORM SUBMIT BUTTON
$("#submit").click(function(){

	var canSubmit=true;

	var selectedExams = $scope.getListOfExams();

	var selectedExamIds = [];
	var selectedLangsIds = []


	//Getting string form exams
	for(var i = 0 ; i < selectedExams.length ; i++){
		selectedExamIds[i] = $scope.listOfExams[selectedExams[i]];
	}
	var selectedExamIdsString = selectedExamIds.join(',');



	var selectedLangs = $scope.getListOfLanguages();

	//Getting string form exams
	for(var i = 0 ; i < selectedLangs.length ; i++){
		selectedLangsIds[i] = $scope.listOfLanguages[selectedLangs[i]];
	}
	var selectedLangsIdsString = selectedLangsIds.join(',');


	var selectedCollege = $scope.listOfColleges[$scope.getCollegeName()];


	var selectedDegree = $scope.listOfDegrees[$scope.getDegreeName()];

	var alternative_college_name  = $('#customCollegeText').val();
	var alternative_degree_name  = $('#customDegreeText').val();

	// console.log(alternative_college_name);
	// console.log(alternative_degree_name);



	var selectedGraduationYear = $scope.getGraduationYear();

	// Validating Phone number and Email id
	if(!$scope.checkNumberField() || !$scope.checkEmailField()){
		canSubmit=false;		
	}

	if(selectedExams.length == 0){
		alert('Choose atleast one exam');
		canSubmit = false;
	}

	if(selectedLangs.length == 0){
		alert('Choose atleast one language');
		canSubmit = false;
	}

	if(selectedCollege ==''){
		canSubmit=false;
		alert('Please select your college');
	}

	if(selectedDegree ==''){
		canSubmit=false;
		alert('Please select your Degree');
	}

	if(selectedGraduationYear ==''){
		canSubmit=false;
		alert('Please select your Graduation Year');
	}

	//Case of no radio button selected
	if ( ! $('[name="studentOrGraduate"]').is(':checked')){
		alert('Choose if you are a student or graduate');
		canSubmit = false;
	}
	//Case of one selected
	else{
		//Case of student selected
		if( $('#student').is(':checked') ){
			var id_front_student = $('#id_front_student').val(); 
			var id_back_student = $('#id_back_student').val(); 
			if( !(id_front_student !='' && id_back_student !='') ) 
			{ 
				alert("Please upload Front and Back Images of your ID Card"); 
				canSubmit = false;
			} 

		}

		if( $('#graduate').is(':checked') ){
			var id_graduate = $('#id_graduate').val(); 
			var certificate_graduate = $('#certificate_graduate').val(); 
			if( !(id_graduate =='' && certificate_graduate =='') ) 
			{ 
				alert("Please upload your latest graduation certificate and an ID proof"); 
				canSubmit = false;
			} 

		}

	}




	//SUBMITTING THE FORM


	// canSubmit = false;
	if(canSubmit){
		// alert("SUBMITTED");
		// alert(selectedExamIdsString);
		$scope.postExams($scope,selectedExamIdsString);

		// console.log("Email is " + $('#email').val() );
		// console.log("Phone number is " + $('#phone').val() );

		// console.log("selected college is " + selectedCollege);
		// console.log("selected degree is " + selectedDegree);
		// console.log("selected graduation year is " + selectedGraduationYear);

		// console.log("selected exam ids string is"+selectedExamIdsString);

		// console.log("selected lang ids string is"+selectedLangsIdsString);



		//Setting state to USER CREATE (2)
		var http = new XMLHttpRequest();
		var url = "http://staging-now.hashlearn.com/api/users/tutor/set-status/";
		var params = "email=" + sessionStorage.getItem("email")+"&state=2";
		http.open("POST", url, true);

            //Send the proper header information along with the request
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            http.onreadystatechange = function() {//Call a function when the state changes.
            	if(http.readyState == 4 && http.status == 200) {
            		// alert(http.responseText);
            	}
            }
            http.send(params);


		//Form Upload
		var id_front_student = $('#id_front_student')[0].files[0];
		var id_back_student = $('#id_back_student')[0].files[0];


		var fd = new FormData();
		fd.append("image_front", id_front_student);
		fd.append("image_back",id_back_student);
		fd.append("primary_email",sessionStorage.getItem("email"));
		fd.append("email_id",$("#email").val());
		fd.append("graduation_year",selectedGraduationYear);
		fd.append("phone_number",$("#phone").val());
		fd.append("list_of_languages",selectedLangsIdsString);


		if($('#customDegreeText').val()=='')
			fd.append("degree_id",selectedDegree);
		else{
			fd.append("degree_name",$('#customDegreeText').val());
			// alert('custom degree');
		}

		if($('#customCollegeText').val()=='')
			fd.append("college_id",selectedCollege);
		else{
			fd.append("college_name",$('#customCollegeText').val());
			// alert('custom college');
		}


		$.ajax({
			url: "http://staging-now.hashlearn.com/api/users/tutor/update-profile/",
			type: "POST",
			data: fd,
			processData: false,
			contentType: false,
			success: function(response) {
				$location.path('/'+ 'policy');
				$route.reload();
			},
			error: function(jqXHR, textStatus, errorMessage) {
           console.log(errorMessage); // Optional
           alert('Retry again later');
       }
   });
        //End of Form Upload    




    }



}); 


//POST EXAM DATA - 
$scope.postExams= function ($scope,selectedExamIdsString) {
	

	var http = new XMLHttpRequest();
	var url = "http://staging-now.hashlearn.com/api/users/tutor/register-exams/";
	var params = "email=" + sessionStorage.getItem("email")+"&exams="+selectedExamIdsString;
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			// alert(http.responseText);
		}
	}
	http.send(params);	


}
//END OF POST EXAM DATA

// $scope.getSelectedExamIds = function(selectedExams){

// 	var selectedExamIds =[];
// 	for(var i =0 ; i < selectedExams.length;i++){

// 	}

// }


$scope.checkNumberField = function(){
	var phone = $('#phone').val(),
	intRegex = /[0-9 -()+]+$/;
	if((phone.length != 10) || (!intRegex.test(phone)))
	{
		alert('Please enter a valid phone number.');
		return false;
	}
	return true;

}

$scope.getCollegeName = function(){
	return $('#college :selected').text();
}

$scope.getDegreeName = function(){
	return $('#degree :selected').text();
}

$scope.getGraduationYear = function(){
	return $('#year :selected').text();
}

$scope.checkEmailField = function(){
	var email = $('#email').val();

	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if(!regex.test(email) || email == '')
	{
		alert('Please enter a valid email address.');
		return false;
	}
	return true;

}

$scope.getListOfExams = function(){
	var selected = [];
	$("input[name='exam']:checked").each(function() {
		selected.push($(this).val());
	});

	return selected;
}

$scope.getListOfLanguages = function(){
	var selectedLangs = [];
	$("input[name='language']:checked").each(function() {
		selectedLangs.push($(this).val());
	});

	return selectedLangs;
}


$("#college").change(function (){
	if(($(this).val() == 'Other')){
		$('#customCollege').show();
	}
	else{
		$('#customCollege').hide();
		$('#customCollegeText').val('');
	}
});

$("#degree").change(function (){
	if(($(this).val() == 'Other')){
		$('#customDegree').show();
	}
	else{
		$('#customDegree').hide();
		$('#customDegreeText').val('');
	}
});

});
