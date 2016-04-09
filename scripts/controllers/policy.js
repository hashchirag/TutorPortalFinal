'use strict';

/**
 * @ngdoc function
 * @name angularPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPortalApp
 */

 
 angular.module('angularPortalApp')
 .controller('PolicytestCtrl', function ($scope,$location,$route,$http) {

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

  (function($) {
    $.fn.emc = function(options) {
      var countDownTime = 900;

      var defaults = {
        key: [],
        scoring: "normal",
        progress: true
      },
      settings = $.extend(defaults, options),
      $quizItems = $('[data-quiz-item]'),
      $choices = $('[data-choices]'),
      itemCount = $quizItems.length,
      chosen = [],
      $option = null,
      $label = null;

    // Start the tests


    var count = 0;

    var username = "";
    var jee_test = "";
    var cookie = "";
    emcInit();

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
    if (this.remainingTime == -1) {
      scoreNormal();
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
      if (this.remainingTime === -1) {
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

  if (settings.progress) {
    var $bar = $('#emc-progress'),
    $inner = $('<div id="emc-progress_inner"></div>'),
    $perc = $('<span id="emc-progress_ind">0/' + itemCount + '</span>');
    $bar.append($inner).prepend($perc);
  }

  function emcInit() {
    $quizItems.each(function(index, value) {
      var $this = $(this),
      $choiceEl = $this.find('.choices'),
      choices = $choiceEl.data('choices');
      for (var i = 0; i < choices.length; i++) {
        $option = $('<input name="' + index + '" id="' + index + '_' + i + '" type="radio">');
        $label = $('<label for="' + index + '_' + i + '">' + choices[i] + '</label>');
        $choiceEl.append($option).append($label);

        $option.on('change', function() {
          return getChosen();
        });
      }
    });
  }

  function getChosen() {
    chosen = [];
    $choices.each(function() {
      var $inputs = $(this).find('input[type="radio"]');
      $inputs.each(function(index, value) {
        if ($(this).is(':checked')) {
          chosen.push(index + 1);
        }
      });
    });
    getProgress();
  }

  function getProgress() {
    var prog = (chosen.length / itemCount) * 100 + "%",
    $submit = $('#emc-submit');
    if (settings.progress) {
      $perc.text(chosen.length + '/' + itemCount);
      $inner.css({
        height: prog
      });
    }
    if (chosen.length === itemCount) {
      $submit.addClass('ready-show');
      $submit.click(function() {

        $('#canvasID').hide();

        return scoreNormal();
      });
    }
  }

  function scoreNormal() {
    var wrong = [],
    score = null,
    $scoreEl = $('#emc-score');
    for (var i = 0; i < itemCount; i++) {
      if (chosen[i] != settings.key[i]) {
        wrong.push(i);
      }
    }
    $quizItems.each(function(index) {
      var $this = $(this);
      if ($.inArray(index, wrong) !== -1) {
        $this.removeClass('item-correct').addClass('item-incorrect');
      } else {
        $this.removeClass('item-incorrect').addClass('item-correct');
      }
    });

    score = ((itemCount - wrong.length) / itemCount).toFixed(2) * 100 + "%";
    // console.log(score);

      //More than 5 wrong - Case of failure
      if( wrong.length >= 5 ){

          //Setting state to POLICY_FAILED (4)
          var http = new XMLHttpRequest();
          var url = "http://staging-now.hashlearn.com/api/users/tutor/set-status/";
          var params = "email=" + sessionStorage.getItem('email')+"&state=4";
          http.open("POST", url, true);

          //Send the proper header information along with the request
          http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

          http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
              // alert(http.responseText);
            }
          }
          http.send(params); 

          $scoreEl.html("You scored a " + score + "<br />" + "<a class = 'next'>Proceed</a>").addClass('new-score');
          $scoreEl.click(function(){

            $location.path('/'+ 'sorry');
            $route.reload();

          });
        }

        //Case of pass
        else{

          //Setting state to POLICY_FAILED (4)
          var http = new XMLHttpRequest();
          var url = "http://staging-now.hashlearn.com/api/users/tutor/set-status/";
          var params = "email=" + sessionStorage.getItem('email')+"&state=3";
          http.open("POST", url, true);

          //Send the proper header information along with the request
          http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

          http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
              alert(http.responseText);
            }
          }
          http.send(params); 


          $scoreEl.html("You scored a " + score + "<br />" + "<a class = 'next'>Take the communication Test</a>").addClass('new-score');
          $scoreEl.click(function(){
          // window.location="http://localhost:9000/#/communicationtest";
          $location.path('/'+ 'redirecting');
          $route.reload();
          // window.location="http://localhost:9000/#/communicationtest";

        });
        }

        $('html,body').animate({
          scrollTop: 0
        }, 50);


      //Post
      if (count == 0) {
        var http = new XMLHttpRequest();
        var url = "http://staging-now.hashlearn.com/api/users/tutor/test-result/";
        var correct = (itemCount - wrong.length);
        var params = "email=" + sessionStorage.getItem("email") + "&questions_attempted=15&questions_correct=" + correct + "&test_type=policy";
        // console.log("Parameters are - username=" + sessionStorage.getItem("email") + "&questions_attempted=15&questions_correct=" + correct + "&test_type=policy");

        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // http.setRequestHeader("Content-length", params.length);
        // http.setRequestHeader("Connection", "close");

        http.onreadystatechange = function() { //Call a function when the state changes.
          if (http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
          }
        }
        http.send(params);
        count = count + 1;
        // alert('posting results');
      }
      //End Post
      // $submit = $('#emc-submit');

      $('#emc-submit').removeClass('ready-show');
    }

  }
}(jQuery));


$(document).emc({
  key: ["3", "3", "3", "2", "2", "2", "4", "2", "1", "1", "4", "1", "2", "2", "5"]
});
});