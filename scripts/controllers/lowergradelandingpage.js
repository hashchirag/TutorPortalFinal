/**
 * @fileoverview FlipCard Engine.
 * @author Jason Mayes - www.jasonmayes.com
 */
 'use strict';

/**
 * @ngdoc function
 * @name angularPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularPortalApp
 */

 
 angular.module('angularPortalApp')
 .controller('LowergradelandingCtrl', function ($scope,$location,$route,$http) {

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

var selected_subjects = [];

var flipCard = function() {
  return {
    /**
     * Attach desired event handler. Cross browser.
     */
     addEventHandler: function(elem, eventType, handler) {
      if (elem.addEventListener) {
        elem.addEventListener(eventType, handler, false);
      } else if (elem.attachEvent) {
        elem.attachEvent('on' + eventType, handler);
      }
    },

    /**
     * Set the innerHTML of a specified element.
     */
     setHtmlById: function(elementId, html) {
      document.getElementById(elementId).innerHTML = html;
    },

    /**
     * Set an element to have a class.
     */
     setClasses: function(elementId, classes) {
      document.getElementById(elementId).className = classes;
    },

    /**
     * Handle continue button click.
     */
     continueButtonClick: function(event) {
      var event = event || window.event;
      event.preventDefault();
      // alert('Do something');

      var array = (document.getElementsByClassName('selected'));

      if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem("mat", "false");
        sessionStorage.setItem("che", "false");
        sessionStorage.setItem("phy", "false");

        for (var i = 0; i < array.length; i++) {
          var innterhtml = document.getElementsByClassName('selected')[i].innerHTML;
          var selected_atleast_one = false;

          if (innterhtml.includes('Maths')) {
            selected_subjects.push('Maths');
            sessionStorage.setItem("mat", "true");
            selected_atleast_one = true;
          }

          if (innterhtml.includes('Physics')) {
            selected_subjects.push('Physics');
            sessionStorage.setItem("phy", "true");
            selected_atleast_one = true;
          }

          if (innterhtml.includes('Chemistry')) {
            selected_subjects.push('Chemisty');
            sessionStorage.setItem("che", "true");
            selected_atleast_one = true;
          }
        }

      } else {
        alert('Oops! No web storage feature found.Try a different browser');
      }


      // console.log(selected_subjects);
      // console.log(sessionStorage.getItem('phy'));
      // console.log(sessionStorage.getItem('che'));
      // console.log(sessionStorage.getItem('mat'));

      if (selected_atleast_one){
        // window.location = "lowergradetest.html";
        $location.path('/'+ 'lowergradetest');
        $route.reload();
      }

      else {
        alert("Choose atleast one subject");
      }
    },



    /**
     * Handle close button click.
     */
     closeButtonClick: function(event) {
      var event = event || window.event;
      event.preventDefault();
      // alert('Handle close');
    },

    /**
     * Count how many fields we have selected and update UI.
     */
     countSelected: function() {
      var elemCount = document.getElementsByClassName('selected');
      var elemCountReq = document.getElementsByClassName('required');
      var total = elemCount.length + elemCountReq.length;
      if (total !== 1) {
        flipCard.setHtmlById('selected', '(' + total + ') subjects selected');
      } else {
        flipCard.setHtmlById('selected', '(1) subject selected');
      }
    },

    /**
     * Handle a flipclard click toggle state.
     */
     handleClick: function(event) {
      var event = event || window.event;
      event.preventDefault();

      if (this.className.indexOf('selected') === -1) {
        this.className = this.className + ' selected';
      } else if (this.className.indexOf('selected') != -1) {
        this.className = this.className.replace('selected', '');
      }

      var array = (document.getElementsByClassName('selected'));

      // for (var i = 0; i < array.length; i++) {
      //
      //   var a = document.getElementsByClassName('selected')[i].innerHTML;
      //
      //   if (a.includes('Maths')) {
      //     selected_subjects.push('Maths');
      //     console.log('Pushed maths');
      //   } else {
      //     selected_subjects.pop('Maths');
      //   }
      //   console.log(selected_subjects);
      // }



      flipCard.countSelected();
    }
  };
}();

// Initialise everything.
var elems = document.getElementsByClassName('flipper');
var x = elems.length;
while (x--) {
  flipCard.addEventHandler(elems[x], 'click', flipCard.handleClick);
}
flipCard.addEventHandler(document.getElementById('close'), 'click', flipCard.closeButtonClick);
flipCard.addEventHandler(document.getElementById('continue'), 'click', flipCard.continueButtonClick);
flipCard.countSelected();
});