(function() {

  var app = angular.module('angularPortalApp');
  app.directive('mathJaxBind', function() {
    var refresh = function(element) {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, element]);
    };
    return {
      link: function(scope, element, attrs) {
        scope.$watch(attrs.mathJaxBind, function(newValue, oldValue) {
          element.text(newValue);
          refresh(element[0]);
        });
      }
    };
  });

  app.controller('IitCtrl', ['$scope', '$http', '$sce','$location','$route', function($scope, $http, $sce,$location,$route,$routeProvider) {

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

$scope.finalScore =[];

alert("Please note that each question can be viewed and anwered only once. Clicking on an answer selects and submits it automatically.");

$scope.finalBackEndMappingArray = [41, 37, 31, 35, 36, 42, 43, 32, 37, 38, 40, 29, 9, 9, 15, 14, 10, 16, 11, 19, 19, 17, 20, 20, 21, 21, 23, 22, 22, 26, 24,
25, 47, 48, 46, 51, 53, 54, 58, 59, 60, 65, 67, 63,49,49, 52, 54, 56,57,60,62,66, 68, 69, 70, 72, 71, 55, 68, 78 ,79,80,81,82,83,84,85,86,87,88,89,90
];

$scope.finalArrayIndex = [94, 88, 31, 92, 175, 98, 57, 29, 35, 96, 65,
103, 261, 262, 106, 107, 108,
263,
110,
112,
266,
114,
251,
252,
253,
254,
117,
255,
256,
119,
257,
160,
122,
124,
132,
126,
128,
272,
134,
135,
136,
142,
141,
139,
123,
267,
127,
269,
131,
133,
268,
138,
143,
144,
145,
146,
147,
149,
130,
270,150,151,152,153,154,155,156,157,158,159,220,221,222
]

$scope.finalArray = ["Limit, Continuity and Differentiability", "Sets, Relations and Functions", "Complex Numbers",
"Bionomial Theorem and Simple Applications",
"Sequences and Series",
"3-D Geometry",
"Inverse Trigonometric Functions",
"Applications of Matrices and Determinants",
"Integral Calculus and its applications",
"Differential Equations",
"Vector Algebra", "Units and Measurement",
"Motion in a Straight Line",
"Motion in a Plane",
"Work, Power and Energy",
"System of Particles and Rotational Motion",
"Gravitation",
"Mechanical Properties of Solids",
"Thermodynamics",
"Oscillations",
"Waves",
"Current Electricity",
"Moving Charges and Magentism",
"Magnetism and Matter",
"Electromagnetic Induction",
"Alternating Current",
"Electromagnetic Waves",
"Ray Optics and Optical Instruments",
"Wave Optics",
"Dual Nature of Matter and Radiation",
"Atoms",
"Semiconductor Materials and Electronic Devices",
"Some Basic concepts in Chemistry",
"Atomic Structure",
"Classification of Elements and Periodicity in Properties",
"Chemical Thermodynamics",
"Equilibrium",
"Redox Reactions",
"Hydrogen",
"s-Block Elements",
"p-Block Elements",
"Hydrocarbons",
"Some Basic principles of Organic chemistry",
"Environmental Chemistry",
"States of Matter: Liquids and Gases",
"States of Matter: Solid State",
"Solutions",
"Electrochemistry",
"Surface Chemistry",
"General Principals and Processes of Isolation of Metals",
"p-Block elements (Group-15 to Group-18)",
"Co-ordination Compounds",
"Halogens",
"Oxygen: Alchohols, Phenols and Ethers",
"Nitrogen",
"Polymers",
"Biomolecules",
"Practical Chemistry",
"Chemical Kinetics",
"Oxygen: Aldehydes, Ketones and Carboxylic Acids",
"Diversity in Living World",
"Structural Organisation in Animals and Plants",
"Cell Structure and Formation",
"Plant Physiology",
"Human Physiology",
"Reproduction",
"Genetics and Evolution",
"Biology in Human Welfare",
"Biotechnology and its Applications",
"Ecology and Environment",
"Human Health and Disease",
"Strategies for Enhancement in Food Production",
"Microbes in Humal Welfare"
];

$scope.selected = [];
$scope.answersArray = [];
$scope.totalQuestions ;
$scope.ended = true;

$scope.selectedTopicsLength = 0;

$scope.drawCanvas = (function drawCanvas() {
  var canvas = document.getElementById('mycanvas');
  var ctx = canvas.getContext('2d');
  var cWidth = canvas.width;
  var cHeight = canvas.height;

  $scope.countTo = $scope.selectedTopicsLength * 180 * 3;
  $scope.counToTime = $scope.selectedTopicsLength * 180 * 3 ;

  var min = Math.floor($scope.countTo / 60);
  var sec = $scope.countTo - (min * 60);
  $scope.counter = 0;
  var angle = 270;
  var inc = 360 / $scope.countTo;


  function drawScreen() {



        //======= reset canvas

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, cWidth, cHeight);

        //========== base arc

        ctx.beginPath();
        ctx.strokeStyle = "#252424";
        ctx.lineWidth = 14;
        ctx.arc(cWidth / 2, cHeight / 2, 100, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
        ctx.stroke();
        ctx.closePath();

        //========== dynamic arc

        ctx.beginPath();
        ctx.strokeStyle = "#df8209";
        ctx.lineWidth = 14;
        ctx.arc(cWidth / 2, cHeight / 2, 100, (Math.PI / 180) * 270, (Math.PI / 180) * angle, false);
        ctx.stroke();
        ctx.closePath();

        //======== inner shadow arc

        grad = ctx.createRadialGradient(cWidth / 2, cHeight / 2, 80, cWidth / 2, cHeight / 2, 115);
        grad.addColorStop(0.0, 'rgba(0,0,0,.4)');
        grad.addColorStop(0.5, 'rgba(0,0,0,0)');
        grad.addColorStop(1.0, 'rgba(0,0,0,0.4)');

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 14;
        ctx.arc(cWidth / 2, cHeight / 2, 100, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
        ctx.stroke();
        ctx.closePath();

        //======== bevel arc

        grad = ctx.createLinearGradient(cWidth / 2, 0, cWidth / 2, cHeight);
        grad.addColorStop(0.0, '#6c6f72');
        grad.addColorStop(0.5, '#252424');

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.arc(cWidth / 2, cHeight / 2, 93, (Math.PI / 180) * 0, (Math.PI / 180) * 360, true);
        ctx.stroke();
        ctx.closePath();

        //====== emboss arc

        grad = ctx.createLinearGradient(cWidth / 2, 0, cWidth / 2, cHeight);
        grad.addColorStop(0.0, 'transparent');
        grad.addColorStop(0.98, '#6c6f72');

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.arc(cWidth / 2, cHeight / 2, 107, (Math.PI / 180) * 0, (Math.PI / 180) * 360, true);
        ctx.stroke();
        ctx.closePath();

        //====== Labels

        var textColor = '#646464';
        var textSize = "12";
        var fontFace = "helvetica, arial, sans-serif";

        ctx.fillStyle = textColor;
        ctx.font = textSize + "px " + fontFace;
        ctx.fillText('MIN', cWidth / 2 - 46, cHeight / 2 - 15);
        ctx.fillText('SEC', cWidth / 2 + 25, cHeight / 2 - 15);

        //====== Values



        ctx.fillStyle = '#6292ae';

        // if (min>9) {
        //   ctx.font='84px '+fontFace;
        //   ctx.fillText('9' ,cWidth/2-55,cHeight/2+35);
        //
        //   ctx.font='24px '+fontFace;
        //   ctx.fillText('+' ,cWidth/2-72,cHeight/2-5);
        // }
        // else {
          {
            ctx.font = '60px ' + fontFace;
            ctx.fillText(min, cWidth / 2 - 60, cHeight / 2 + 35);
          }

          ctx.font = '50px ' + fontFace;
          if (sec < 10) {
            ctx.fillText('0' + sec, cWidth / 2 + 10, cHeight / 2 + 35);
          } else {
            ctx.fillText(":" + sec, cWidth / 2 + 10, cHeight / 2 + 35);
          }


          if (sec <= 0 && $scope.counter < $scope.countTo) {
            angle += inc;
            $scope.counter++;
            min--;
            sec = 59;
          } else
          if ($scope.counter >= $scope.countTo) {
            sec = 0;
            min = 0;
            $scope.activeQuestion = $scope.totalQuestions;

          } else {
            angle += inc;
            $scope.counter++;
            sec--;
          }
        }


        setInterval(drawScreen, 1000);

      });

    //Loading Maths List Items
    $http.get('cat-math.json').then(function(mathData) {

      $scope.mathList = mathData.data;
      $scope.mathListLength = $scope.mathList.length;
    });

    $scope.toggle = function(item, list) {
      var idx = list.indexOf(item.info.cid);
      if (idx > -1) list.splice(idx, 1);
      else list.push(item.info.cid);
    };
    $scope.exists = function(item, list) {
      return list.indexOf(item.info.cid) > -1;
    };

    //Loading BIO List Items
    $http.get('cat-bio.json').then(function(mathData) {

      $scope.bioList = mathData.data;
      $scope.bioListLength = $scope.bioList.length;
    });

    $scope.toggle = function(item, list) {
      var idx = list.indexOf(item.info.cid);
      if (idx > -1) list.splice(idx, 1);
      else list.push(item.info.cid);
    };
    $scope.exists = function(item, list) {
      return list.indexOf(item.info.cid) > -1;
    };


    //Loading Physics List Items
    $http.get('cat-phy.json').then(function(physicsData) {

      $scope.physicsList = physicsData.data;
      $scope.physicsListLength = $scope.physicsList.length;
    });

    $scope.toggle = function(item, list) {
      var idx = list.indexOf(item.info.cid);
      if (idx > -1) list.splice(idx, 1);
      else list.push(item.info.cid);
    };


    $scope.exists = function(item, list) {
      return list.indexOf(item.info.cid) > -1;
    };

    //Loading Chemistry List Items
    $http.get('cat-chem.json').then(function(chemData) {

      $scope.chemList = chemData.data;
      $scope.chemListLength = $scope.chemList.length;
    });

    $scope.toggle = function(item, list) {
      var idx = list.indexOf(item.info.cid);
      if (idx > -1) list.splice(idx, 1);
      else list.push(item.info.cid);
    };

    $scope.exists = function(item, list) {
      return list.indexOf(item.info.cid) > -1;
    };


    $scope.finalJSON = {};
    $scope.simpleJSON = [];

    $scope.randomfn = function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - 1 - min + 1)) + min;
    }

    $scope.formatJSONToCorrectForm = function(questionList, i) {

      var first = $scope.selected[i].toString();

      first = [];

      for (var k = 0; k < 3; k++) {
        temp = [];
        optionsArray = [];
        displayingJSONTemp = {};

        var randomNumber = $scope.randomfn(0, questionList.length);

        optionA = {
          'text': questionList[randomNumber].text.opts.optA,
          'id': 0
        };
        optionB = {
          'text': questionList[randomNumber].text.opts.optB,
          'id': 1
        };
        optionC = {
          'text': questionList[randomNumber].text.opts.optC,
          'id': 2
        };
        optionD = {
          'text': questionList[randomNumber].text.opts.optD,
          'id': 3
        };

        var answer;

        if (questionList[randomNumber].text.opts.answer == 'A') {
          answer = 0;
        } else if (questionList[randomNumber].text.opts.answer == 'B') {
          answer = 1;
        } else if (questionList[randomNumber].text.opts.answer == 'C') {
          answer = 2;
        } else if (questionList[randomNumber].text.opts.answer == 'D') {
          answer = 3;
        }


        optionsArray.push(optionA);
        optionsArray.push(optionB);
        optionsArray.push(optionC);
        optionsArray.push(optionD);

        tmp = {
          'uuid': questionList[randomNumber].uuid,
          'question': questionList[randomNumber].text.t,
          'answers': optionsArray,
          'correct': answer
        };

        first.push(tmp);
        // console.log("test" + first[k].answers[0].text);


        displayingJSONTemp = {
          'question': questionList[randomNumber].text.t,
          'answers': optionsArray,
          'correct': answer
        };
        $scope.simpleJSON.push(displayingJSONTemp);
        // console.log("correct answer in global" + questionList[k].text.opts.answer);
        // console.log("correct answer in local" + displayingJSONTemp.correct);

      }

      var firstField = $scope.selected[i].toString();
      $scope.finalJSON[firstField] = first;
      // console.log(JSON.stringify($scope.finalJSON));

      // console.log("debug " + JSON.stringify($scope.finalJSON));
      // console.log("random question" + questionList[0].text.t);
    };

    $scope.loadAndPopulate = function(categoryId, i) {
      $scope.url = "http://staging-now.hashlearn.com/v1/content/practice/tutor/categoryQuestions/?catid=";
      $scope.url = $scope.url + categoryId;
      // console.log("url is " + $scope.url);


      $http.get($scope.url).then(function(questionData) {

        $scope.questionList = questionData.data.data;
        $scope.questionListLength = $scope.questionList.length;
        // alert("" + $scope.questionList);
        $scope.formatJSONToCorrectForm($scope.questionList, i);

      });

    }
    

    $scope.redirect= function(){
      $location.path('/'+ 'toexamdashboard');
      $route.reload();
    }


    $scope.startQuiz = function(selLength) {
      if (selLength >=5 && selLength <=15 ) {

        $scope.selectedTopicsLength = selLength;

        $scope.totalQuestions = selLength * 3;
        $scope.activeQuestion = 0;
        $scope.drawCanvas();
        for (var i = 0; i < selLength; i++) {
          // console.log($scope.selected[i]);
          $scope.loadAndPopulate($scope.selected[i], i);
        }
      } else {
        alert("Please choose more alteast 5 topics and a maximum of 15 topics");
      }
    }

    //Question Related stuff
    $scope.score = 0;
    $scope.activeQuestion = -1;
    $scope.activeQuestionAnswered = 0;
    $scope.percentage = 0;

    $scope.selectAnswer = function(qIndex, aIndex) {

      var questionState = $scope.simpleJSON[qIndex].questionState;

      if (questionState != 'answered') {
        $scope.simpleJSON[qIndex].selectedAnswer = aIndex;
        var correctAnswer = $scope.simpleJSON[qIndex].correct;
        $scope.simpleJSON[qIndex].correctAnswer = correctAnswer;

        if (aIndex === correctAnswer) {
          $scope.simpleJSON[qIndex].correctness = 'correct';
          $scope.answersArray[qIndex] = 1;
          $scope.finalScore[qIndex / 3]++;
          // alert($scope.finalScore[qIndex / 3]);
          // console.log(qIndex);
          // $scope.finalJSON[$scope.selected[qIndex / 3]].success = 'true';
          // console.log(JSON.stringify($scope.finalJSON));
          $scope.score += 1;
        } else {
          $scope.simpleJSON[qIndex].correctness = 'incorrect';
          $scope.answersArray[qIndex] = 0;
        }
        $scope.simpleJSON[qIndex].questionState = 'answered';

      }

      $scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(2);

    }

    $scope.isSelected = function(qIndex, aIndex) {
      return ($scope.simpleJSON[qIndex].selectedAnswer === aIndex);
    }

    $scope.isCorrect = function(qIndex, aIndex) {
      return ($scope.simpleJSON[qIndex].correctAnswer === aIndex);
    }

    $scope.uploadResultsToServer = function(catId, scoreScored) {
      //Post
      var http = new XMLHttpRequest();
      var url = "http://staging-now.hashlearn.com/api/users/tutor/topic-test-result/";
      // var params = "lorem=ipsum&name=binny";
      var params = "email=" + sessionStorage.getItem('email') + "&questions_attempted=3&questions_correct=" + scoreScored + "&chapter_id=" + catId+ "&exam_id="+sessionStorage.getItem("examId");
      // console.log("email=" + sessionStorage.getItem('email') + "&questions_attempted=3&questions_correct=" + scoreScored + "&chapter_id=" + catId catId+ "&exam_id="+sessionStorage.getItem("examId"));

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


    $scope.selectContinue = function() {


      $scope.activeQuestion += 1;

      $scope.x = 0;
      $scope.y = 0;

      if ($scope.activeQuestion == $scope.totalQuestions) {


        $('#progress').hide();
        for(var i = 0 ; i < $scope.totalQuestions/3; i ++ ) {
          $scope.uploadResultsToServer($scope.finalBackEndMappingArray[$scope.finalArrayIndex.indexOf($scope.selected[i])],Number($scope.answersArray[$scope.y++]  + $scope.answersArray[$scope.y++] + $scope.answersArray[$scope.y++]));
          $( "#result" ).append( "<p>"+  $scope.finalArray[$scope.finalArrayIndex.indexOf($scope.selected[i])] + "-" +  Number($scope.answersArray[$scope.x++]  + $scope.answersArray[$scope.x++] + $scope.answersArray[$scope.x++]) + "/3"+"<br /></p>" );
        }
      }


      // if ($scope.activeQuestion == $scope.totalQuestions) {
      //   $scope.uploadResultsToServer(catId, scoreScored)ToServer($scope.finalBackEndMappingArray[$scope.finalArrayIndex.indexOf($scope.selected[0])], 0 + $scope.answersArray[0] + $scope.answersArray[1] + $scope.answersArray[2]);
      //   $scope.uploadResultsToServer($scope.finalBackEndMappingArray[$scope.finalArrayIndex.indexOf($scope.selected[1])], 0 + $scope.answersArray[3] + $scope.answersArray[4] + $scope.answersArray[5]);
      //   $scope.uploadResultsToServer($scope.finalBackEndMappingArray[$scope.finalArrayIndex.indexOf($scope.selected[2])], 0 + $scope.answersArray[6] + $scope.answersArray[7] + $scope.answersArray[8]);
      //   $scope.uploadResultsToServer($scope.finalBackEndMappingArray[$scope.finalArrayIndex.indexOf($scope.selected[3])], 0 + $scope.answersArray[9] + $scope.answersArray[10] + $scope.answersArray[11]);
      //   $scope.uploadResultsToServer($scope.finalBackEndMappingArray[$scope.finalArrayIndex.indexOf($scope.selected[4])], 0 + $scope.answersArray[12] + $scope.answersArray[13] + $scope.answersArray[14]);
      // }

      return $scope.activeQuestion;
    }

  }]);

})();
