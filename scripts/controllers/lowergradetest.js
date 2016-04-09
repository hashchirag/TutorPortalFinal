
'use strict';

/**
 * @ngdoc function
 * @name angularPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPortalApp
 */

 
 angular.module('angularPortalApp')
 .controller('LowergradetestCtrl', function ($scope,$location,$route,$http) {

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

          if(data.state != 6){
            $location.path('/'+ 'tologinpage');
            $route.reload();
          }
        }
      });

// Array of all the questions and choices to populate the questions. This might be saved in some JSON file or a database and we would have to read the data in.
var all_questions = [];
var i = 0;
var phy_score = 0;
var che_score = 0;
var mat_score = 0;
$scope.currentQuestionIndex = 1;
$scope.totalNumberOfQuestions;

var mat_questions = [{
  question_string: "Reema's height is 5'2\",Anita is taller than Reema but she is not taller than Pinky.Pinky is shorter than her cousin Rani,but she is not shorter than Reema.Who is the tallest in the group ?",
  choices: {
    correct: "Rani",
    wrong: ["Anita", "Pinky", "Reema"],
    subject: "mat"
  }
}, {
  question_string: "6 pipes are required to fill a tank in 1 hour 20 min. How long will it take if only 5 pipes of the same type are used?",
  choices: {
    correct: "1 hour 36 minutes",
    wrong: ["	1 hour 48 minutes", "1 hour 24 minutes", "None of these"],
    subject: "mat"

  }
}, {
  question_string: 'On which axis does the point (-8, 0)lie?',
  choices: {
    correct: "x-axis",
    wrong: ["y-axis", "origin", "None"],
    subject: "mat"

  }
}, {
  question_string: 'The factorization of 9(x^2)-3x-20 is',
  choices: {
    correct: "(3x + 4)(3x - 5)",
    wrong: ["(3x - 4)(3x + 5)", "	(3x - 4)(3x - 5)", "(3x + 4)(3x + 5)"],
    subject: "mat"

  }
}, {
  question_string: 'If ∠A = 4∠B = 6∠C, then A : B : C ?',
  choices: {
    correct: "12 : 3 : 2",
    wrong: ["3 : 4 : 6", "2 : 3 : 4", "6 : 4 : 3"],
    subject: "mat"

  }
}, {
  question_string: '△PQR, ∠P=60∘, ∠Q=50∘ and Which side of the triangle is the longest?',
  choices: {
    correct: "PQ",
    wrong: ["PR", "QR", "None"],
    subject: "mat"

  }
}, {
  question_string: 'The Quadrilateral forms by joining the mid-points of the sides of a Quadrilateral PQRS, taken in order, is a Rhombus if',
  choices: {
    correct: "PQRS is a Rhombus",
    wrong: ["	Diagonals of PQRS are equal", "PQRS is a Parallelogram", "None of these"],
    subject: "mat"

  }
}, {
  question_string: 'If ∠A = 4∠B = 6∠C, then A : B : C ?',
  choices: {
    correct: "12 : 3 : 2",
    wrong: ["3 : 4 : 6", "2 : 3 : 4", "6 : 4 : 3"],
    subject: "mat"

  }
}, {
  question_string: 'The construction of a triangle ABC, given that BC = 6 cm, ∠B=45 is not possible when difference of AB and AC is equal to :',
  choices: {
    correct: "6.9 cm",
    wrong: ["	5.0 cm", "	5.2 cm", "	4.0 cm"],
    subject: "mat"

  }
}, {
  question_string: 'If VICTORY is encoded as YLFWRUB,how can SUCCESS be encoded ?',
  choices: {
    correct: "VXFFHVV",
    wrong: ["VXEEIVV", "	VYEEHVV", "	VYEFIVV"],
    subject: "mat"

  }
}];
//MATHS QUESTIONS END


//PHYSICS QUESTIONS
var phy_questions = [{
  question_string: "The resulting force due to action of muscles is known as",
  choices: {
    correct: "Muscular Force",
    wrong: ["Static Force", "Gravitation Force", "Magnetic Force"],
    subject: "phy"

  }
}, {
  question_string: "Electric circuit provides a complete path for?",
  choices: {
    correct: "Current to flow",
    wrong: ["	Heat to flow", "Proton to flow", "Neutron to flow"],
    subject: "phy"

  }
}, {
  question_string: 'Suppose a planet starts shrinking the value of g starts',
  choices: {
    correct: "Increasing",
    wrong: ["Decreasing", "Remains constant", "Becomes zero"],
    subject: "phy"

  }
}, {
  question_string: 'What is the resistivity of Nichrome',
  choices: {
    correct: "10^13",
    wrong: ["12.9×10^-8", "	10×10^-8", "1.60×10^-8"],
    subject: "phy"

  }
}, {
  question_string: 'The far point of a healthy person is',
  choices: {
    correct: "Infinity",
    wrong: ["100m", "150m", "15cm"],
    subject: "phy"

  }
}, {
  question_string: 'The S.I unit of linear magnification is',
  choices: {
    correct: "No Unit",
    wrong: ["m", "m^(-1)", "m^(2)"],
    subject: "phy"

  }
}, {
  question_string: 'One Pascal is ',
  choices: {
    correct: "Newton per square meter",
    wrong: ["Newton per kg", "Newton per meter", "Newton per square cm"],
    subject: "phy"

  }
}, {
  question_string: 'In due given food chain, suppose the amount of energy available at third trophic level is 50 KJ, what will be the energy available at due producer level?',
  choices: {
    correct: "5000KJ",
    wrong: ["50 KJ", "5000 KJ", "5 KJ"],
    subject: "phy"

  }
}, {
  question_string: 'Most of the sources of energy we use represent stored solar energy. Which of the following is not ultimately derived from the suns energy?',
  choices: {
    correct: "Nuclear Energy",
    wrong: ["GeoThermal Energy", "Biomass", "Fossil Fuels"],
    subject: "phy"

  }
}, {
  question_string: 'Mass of electron',
  choices: {
    correct: "9.1 x 10^(-31) kg ",
    wrong: ["9.1 x 10^(-31) g", "9.8 x 10^(-31) kg", "6.23 x 10^(-34) kg"],
    subject: "phy"

  }
}];
// PHYSICS QUESTIONS END

//CHEMISTRY QUESTIONS
var che_questions = [{
  question_string: "Which of the following substance should not be added to distilled water to make it good conductor?",
  choices: {
    correct: "Salts",
    wrong: ["Acids", "Bases", "Alcohols"],
    subject: "che"

  }
}, {
  question_string: "Presence of unwanted gases and particles in air is called?",
  choices: {
    correct: "Air Pollution",
    wrong: ["	Heat to flow", "Proton to flow", "Neutron to flow"],
    subject: "che"

  }
}, {
  question_string: 'Preservatives or additives are :',
  choices: {
    correct: "Both natural and artificial",
    wrong: ["only mixture of spices", "only artificial", "only natural"],
    subject: "che"

  }
}, {
  question_string: 'A hard substance when bent produces a tinkling sound. Predict its nature.',
  choices: {
    correct: "Metal",
    wrong: ["Compound", "Non-metal", "None of these"],
    subject: "che"

  }
}, {
  question_string: 'What is the atomic number of the first element of the lanthanide series?',
  choices: {
    correct: "57",
    wrong: ["89", "87", "67"],
    subject: "che"

  }
}, {
  question_string: 'The most commonly used bleaching agent is',
  choices: {
    correct: "Chlorine",
    wrong: ["Carbon dioxide", "Sodium Chloride", "Alcohols"],
    subject: "che"

  }
}, {
  question_string: 'The mass number of a nucleus is',
  choices: {
    correct: "the sum of the number of protons and neutrons present in the nucleus",
    wrong: ["always more than the atomic weight", "a fraction", "negative"],
    subject: "che"

  }
}, {
  question_string: 'The mass number of an atom is equal to',
  choices: {
    correct: "the number of nucleons",
    wrong: ["the number of protons and electrons", "the number of protons", "the number of neutrons"],
    subject: "che"

  }
}, {
  question_string: 'The chemical formula for HydroChloric Acid is ?',
  choices: {
    correct: "HCl",
    wrong: ["HyCl", "HCh", "HCr"],
    subject: "che"

  }
}, {
  question_string: 'Boiling is the change in state of a',
  choices: {
    correct: "liquid to a gas",
    wrong: ["solid to a liquid.", "solid to a gas", "gas to a liquid"],
    subject: "che"

  }
}];
//CHEMISTRY QUESTIONS END

$('#proceed').hide();

// An object for a Quiz, which will contain Question objects.
var Quiz = function(quiz_name) {
  // Private fields for an instance of a Quiz object.
  this.quiz_name = quiz_name;

  // This one will contain an array of Question objects in the order that the questions will be presented.
  this.questions = [];
}

// A function that you can enact on an instance of a quiz object. This function is called add_question() and takes in a Question object which it will add to the questions field.
Quiz.prototype.add_question = function(question) {
  // Randomly choose where to add question
  var index_to_add_question = i;
  this.questions.splice(index_to_add_question, 0, question);
  i++;
}

// A function that you can enact on an instance of a quiz object. This function is called render() and takes in a variable called the container, which is the <div> that I will render the quiz in.
Quiz.prototype.render = function(container) {
  // For when we're out of scope
  var self = this;

  // Hide the quiz results modal
  $('#quiz-results').hide();

  // Write the name of the quiz
  // $('#quiz-name').text(this.quiz_name);

  // Create a container for questions
  var question_container = $('<div>').attr('id', 'question').insertAfter('#quiz-name');

  // Helper function for changing the question and updating the buttons
  function change_question() {
    self.questions[current_question_index].render(question_container);
    $('#prev-question-button').prop('disabled', current_question_index === 0);
    $('#next-question-button').prop('disabled', current_question_index === self.questions.length - 1);

    // Determine if all questions have been answered
    var all_questions_answered = true;
    for (var i = 0; i < self.questions.length; i++) {
      if (self.questions[i].user_choice_index === null) {
        all_questions_answered = false;
        break;
      }
    }
    $('#submit-button').prop('disabled', !all_questions_answered);
  }

  // Render the first question
  var current_question_index = 0;
  change_question();

  // Add listener for the previous question button
  $('#prev-question-button').click(function() {
    if (current_question_index > 0) {
      current_question_index--;
      $scope.currentQuestionIndex = $scope.currentQuestionIndex -1;
      $('#preview').text('Question Number : ' + $scope.currentQuestionIndex + " / " + $scope.totalNumberOfQuestions);

      change_question();
    }
  });

  // Add listener for the next question button
  $('#next-question-button').click(function() {
    if (current_question_index < self.questions.length - 1) {
      current_question_index++;
      $scope.currentQuestionIndex = $scope.currentQuestionIndex + 1;
      $('#preview').text('Question Number : ' + $scope.currentQuestionIndex + " / " + $scope.totalNumberOfQuestions);
      change_question();
    }
  });

  function submitButtonFunction() {

    // Determine how many questions the user got right
    var score = 0;
    for (var i = 0; i < self.questions.length; i++) {
      if (self.questions[i].user_choice_index === self.questions[i].correct_choice_index) {
        score++;

        if (self.questions[i].subject == "phy") {
          phy_score++;
        }
        if (self.questions[i].subject == "che") {
          che_score++;
        }
        if (self.questions[i].subject == "mat") {
          mat_score++;
        }
      }
    }



    // console.log("phy score is " + phy_score);
    // console.log("chem score is " + che_score);
    // console.log("mat score is " + mat_score);

    // Display the score with the appropriate message
    var percentage = score / self.questions.length;
    // console.log(percentage);
    var message;
    // if (percentage === 1) {
    //   message = 'Great job!'
    // } else if (percentage >= .75) {
    //   message = 'You did alright.'
    // } else if (percentage >= .5) {
    //   message = 'Better luck next time.'
    // } else {
    //   message = 'Maybe you should try a little harder.'
    // }
    $('#preview').hide();
    question_container.hide();
    $('#quiz-results-message').text(message);
    $('#proceed').show();

    var consolidated_results;
    var mat_score_string = "";
    var che_score_string = "";
    var che_score_string = "";

    consolidated_results = "Your marks stand as follows - <br/>";

    if (sessionStorage.getItem("mat") === "true") {
      consolidated_results = consolidated_results + mat_score_string + "Mathematics : <b>" + mat_score + "/10 </b>" + "<br/>";
      $scope.uploadResultsToServer("77",mat_score);

    }
    if (sessionStorage.getItem("phy") === "true") {
      consolidated_results = consolidated_results + che_score_string + "Physics : <b>" + phy_score + "/10 </b>" + "<br/>";
      $scope.uploadResultsToServer("75",phy_score);

    }
    if (sessionStorage.getItem("che") === "true") {
      consolidated_results = consolidated_results + che_score_string + "Chemistry : <b>" + che_score + "/10 </b>" + "<br/>";
      $scope.uploadResultsToServer("76",che_score);
    }
    $('#quiz-results-score').html(consolidated_results);
    $('#canvas').hide();


    // $('#quiz-results-score').html('You got <b>' + score + '/' + self.questions.length + '</b> questions correct.');
    $('#quiz-results').slideDown();
    $('#quiz button').slideUp();

    //POST TO SERVER

    //End of POST to Server

  }

  $scope.uploadResultsToServer = function(catId, scoreScored) {
      //Post
      var http = new XMLHttpRequest();
      var url = "http://staging-now.hashlearn.com/api/users/tutor/topic-test-result/";
      // var params = "lorem=ipsum&name=binny";
      var params = "email=" + sessionStorage.getItem('email') + "&questions_attempted=10&questions_correct=" + scoreScored + "&chapter_id=" + catId+ "&exam_id="+sessionStorage.getItem("examId");
      // console.log("email=" + sessionStorage.getItem('email') + "&questions_attempted=3&questions_correct=" + scoreScored + "&chapter_id=" + catId + "&exam_id="+sessionStorage.getItem("examId"));

      http.open("POST", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      // http.setRequestHeader("Content-length", params.length);
      // http.setRequestHeader("Connection", "close");

      http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
          // console.log(http.responseText);
        }
      }
      http.send(params);
      //End Post
    }


    $('#submit-button').click(function(e) {
      submitButtonFunction();
    });

  // Add a listener on the questions container to listen for user select changes. This is for determining whether we can submit answers or not.
  question_container.bind('user-select-change', function() {
    var all_questions_answered = true;
    for (var i = 0; i < self.questions.length; i++) {
      if (self.questions[i].user_choice_index === null) {
        all_questions_answered = false;
        break;
      }
    }
    $('#submit-button').prop('disabled', !all_questions_answered);
  });
}

// An object for a Question, which contains the question, the correct choice, and wrong choices. This block is the constructor.
var Question = function(question_string, correct_choice, wrong_choices, subject) {
  // Private fields for an instance of a Question object.
  this.question_string = question_string;
  this.choices = [];
  this.user_choice_index = null; // Index of the user's choice selection
  this.subject = subject;
  // Random assign the correct choice an index
  this.correct_choice_index = Math.floor(Math.random() * wrong_choices.length + 1);

  // Fill in this.choices with the choices
  var number_of_choices = wrong_choices.length + 1;
  for (var i = 0; i < number_of_choices; i++) {
    if (i === this.correct_choice_index) {
      this.choices[i] = correct_choice;
    } else {
      // Randomly pick a wrong choice to put in this index
      var wrong_choice_index = Math.floor(Math.random(0, wrong_choices.length));
      this.choices[i] = wrong_choices[wrong_choice_index];

      // Remove the wrong choice from the wrong choice array so that we don't pick it again
      wrong_choices.splice(wrong_choice_index, 1);
    }
  }
}

// A function that you can enact on an instance of a question object. This function is called render() and takes in a variable called the container, which is the <div> that I will render the question in. This question will "return" with the score when the question has been answered.
Question.prototype.render = function(container) {
  // For when we're out of scope
  var self = this;

  // Fill out the question label
  var question_string_h2;
  if (container.children('h2').length === 0) {
    question_string_h2 = $('<h2>').appendTo(container);
  } else {
    question_string_h2 = container.children('h2').first();
  }
  question_string_h2.text(this.question_string);

  // Clear any radio buttons and create new ones
  if (container.children('input[type=radio]').length > 0) {
    container.children('input[type=radio]').each(function() {
      var radio_button_id = $(this).attr('id');
      $(this).remove();
      container.children('label[for=' + radio_button_id + ']').remove();
    });
  }
  for (var i = 0; i < this.choices.length; i++) {
    // Create the radio button
    var choice_radio_button = $('<input>')
    .attr('id', 'choices-' + i)
    .attr('type', 'radio')
    .attr('name', 'choices')
    .attr('value', 'choices-' + i)
    .attr('checked', i === this.user_choice_index)
    .appendTo(container);

    // Create the label
    var choice_label = $('<label>')
    .text(this.choices[i])
    .attr('for', 'choices-' + i)
    .appendTo(container);
  }

  // Add a listener for the radio button to change which one the user has clicked on
  $('input[name=choices]').change(function(index) {
    var selected_radio_button_value = $('input[name=choices]:checked').val();

    // Change the user choice index
    self.user_choice_index = parseInt(selected_radio_button_value.substr(selected_radio_button_value.length - 1, 1));

    // Trigger a user-select-change
    container.trigger('user-select-change');
  });
}

var countDownTime = 0;


// "Main method" which will create all the objects and render the Quiz.
$(document).ready(function() {
  // Create an instance of the Quiz object
  var quiz = new Quiz('My Quiz');

  if (sessionStorage.getItem("mat") === "true") {
    console.log("maths selected");
    all_questions = all_questions.concat(mat_questions);
    countDownTime += 600;
  }

  if (sessionStorage.getItem("phy") === "true") {
    console.log("physics selected");
    all_questions = all_questions.concat(phy_questions);
    countDownTime += 600;
  }

  if (sessionStorage.getItem("che") === "true") {
    console.log("chem selected");
    all_questions = all_questions.concat(che_questions);
    countDownTime += 600;
  }

  $scope.totalNumberOfQuestions = all_questions.length;
  $('#preview').text('Question Number : ' + $scope.currentQuestionIndex + " / " + $scope.totalNumberOfQuestions);


  // console.log(all_questions);

  $('#proceed').click(function(){
    // alert("aSome");
    $location.path('/'+ 'toexamdashboard');
    $route.reload();
  });


  //Timer part
  function CountDown(container, time) {
    this.container = container;
    this.display = container.querySelector('.timer-display');
    this.bar = container.querySelector('.timer-bar');
    this.time = time;
    this.remainingTime = this.time;
    this.elapsedTime = 0;

    this.updateDisplay();
  }

  CountDown.fn = CountDown.prototype;

  CountDown.fn.updateCounters = function() {
    this.remainingTime -= 1;
    this.elapsedTime += 1;

    //Case of time ended. Display Results
    if (this.remainingTime == 0) {
      $('#quiz button').click();
    }

  };

  CountDown.fn.updateDisplay = function() {
    this.display.innerText = parseInt(this.remainingTime / 60, 10) + ':' + ('0' + (this.remainingTime % 60)).substr(-2);
  };

  CountDown.fn.updateCanvasColor = function() {
    var remainingTimePercentage = this.remainingTime / this.time;
    var transition, duration;

    if (remainingTimePercentage <= 0.7) {
      transition = 'green-to-orange';
      duration = 0.2 * this.time;
    }

    if (remainingTimePercentage <= 0.5) {
      transition = 'orange-to-yellow';
      duration = 0.1 * this.time;
    }

    if (remainingTimePercentage <= 0.4) {
      transition = 'yellow-to-red';
      duration = 0.4 * this.time;
    }

    if (transition && duration) {
      this.container.style['-webkit-animation-duration'] = duration + 's';
      this.container.classList.add(transition);
    }
  };

  CountDown.fn.updateBarWidth = function() {
    this.bar.style.width = (this.elapsedTime / this.time * 100) + '%';
  };

  CountDown.fn.checkFinalTime = function() {
    if (this.remainingTime === 10) {
      this.display.classList.add('finishing');
    }
  };

  CountDown.fn.init = function() {
    var tid = setInterval(function() {
      if (this.remainingTime === 0) {
        return clearInterval(tid);
      }

      this.updateCounters();
      this.updateDisplay();
      this.updateCanvasColor();
      this.updateBarWidth();
      this.checkFinalTime();
    }.bind(this), 1000);

    // this.button.innerText = 'Done!';
  };


  var mCountDownTimer = new CountDown(document.querySelector('.canvas'),countDownTime);
  mCountDownTimer.init();
  //End of timer



  // Create Question objects from all_questions and add them to the Quiz object
  for (var i = 0; i < all_questions.length; i++) {
    // Create a new Question object
    var question = new Question(all_questions[i].question_string, all_questions[i].choices.correct, all_questions[i].choices.wrong, all_questions[i].choices.subject);

    // Add the question to the instance of the Quiz object that we created previously
    quiz.add_question(question);
  }

  // Render the quiz
  var quiz_container = $('#quiz');
  quiz.render(quiz_container);
});
});
