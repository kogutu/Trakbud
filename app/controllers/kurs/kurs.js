'use strict';

var app = angular.module('myApp.kurs', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/kurs', {
    templateUrl: 'controllers/kurs/kurs.html',
    controller: 'kursCtrl'
  });
}])

.controller('kursCtrl', ['$scope','$http', function($scope,$http) {

  
  $scope.newSignature = false;

  $scope.show_signature=function(){
    $('body,html').css('overflow','hidden');
    $scope.newSignature = true;
  }


  var current_date = new Date();

  $scope.form_kurs = forms.kursCtrl;
  $scope.form_action='add';



  $scope.ladunek =[];
  $http.get('https://api.mlab.com/api/1/databases/trakbud/collections/produkty?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx&q={"status":true}').then(function(response) {
    $scope.ladunek=response.data;
    $scope.changeLadunek($scope.ladunek);
    
  console.log($scope.ladunek);
});




$scope.miejsca_skad =[];
$http.get('https://api.mlab.com/api/1/databases/trakbud/collections/miejsca?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx&q={"skad_dokad":"skad"}').then(function(response) {
  $scope.miejsca_skad=response.data;

  $scope.changeMiejsce_skad($scope.miejsca_skad);

console.log($scope.miejsca_skad);
});

$scope.miejsca_dokad =[];
$http.get('https://api.mlab.com/api/1/databases/trakbud/collections/miejsca?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx&q={"skad_dokad":"dokad"}').then(function(response) {
  $scope.miejsca_dokad=response.data;
$scope.changeMiejsce_dokad($scope.miejsca_dokad);
});
$scope.firmy =[];
$http.get('https://api.mlab.com/api/1/databases/trakbud/collections/firmy?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx&q={"status":true}').then(function(response) {
  $scope.firmy=response.data;
    $scope.changeFirma($scope.firmy);

});

  //GET produkt
  
  
    $scope.kursy=[];
    $http.get('https://api.mlab.com/api/1/databases/trakbud/collections/kursy?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx').success(function(response) {
        $scope.kursy=response;

      console.log($scope.kursy);
    });
     


  $scope.kurs_save = function(form_action){
  console.log($scope);
  }
$scope.clear_canvas=function(){
  return false;
}
  $scope.valid_form = function(){

    var canvas = document.getElementById("sig-canvas");
    console.log(canvas);
    var ctx = canvas.getContext("2d");
      var dataUrl = canvas.toDataURL();
          $scope.podpis = dataUrl;


    var state = true;
console.log($scope.podpis);
   if( typeof($scope.podpis)=="undefined") state =  false;

   if(!state){
     
     alert("Wprowadz podpis");
     return false;
   } 

   return true;

  };

  //SAVE kurs
  $scope.kurs_save = function(form_action){
    


   if( $scope.valid_form()){


  if($scope.form_action=="add"){
      
    $http.post('https://api.mlab.com/api/1/databases/trakbud/collections/kursy?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx',
      [{ 
        'ladunek':$scope.kurs.ladunek,
        'ilosc':$scope.kurs.ilosc,
        'miejsce_skad':$scope.kurs.miejsce_skad,
        'miejsce_dokad':$scope.kurs.miejsce_dokad,
        'firma':$scope.kurs.firma,
        'data_utworzenia':current_date,
        'data_modyfikacji':current_date,
        'podpis':$scope.podpis
      
      }]).success(function(res) {
      console.log(res);
          alert('Dodano kurs');
          $scope.kursy.push({ 
            'ladunek':$scope.kurs.ladunek,
            'ilosc':$scope.kurs.ilosc,
            'miejsce_skad':$scope.kurs.miejsce_skad,
            'miejsce_dokad':$scope.kurs.miejsce_dokad,
            'firma':$scope.kurs.firma,
            'data_utworzenia':current_date,
            'data_modyfikacji':current_date,
            'podpis':$scope.podpis
            });
      //    location.reload();
        });
          
  }else{


      $http.put('https://api.mlab.com/api/1/databases/trakbud/collections/kursy/'+$scope.kurs._id.$oid+'/?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx',
      { 
        'ladunek':$scope.kurs.ladunek,
        'ilosc':$scope.kurs.ilosc,
        'miejsce_skad':$scope.kurs.miejsce_skad,
        'miejsce_dokad':$scope.kurs.miejsce_dokad,
        'firma':$scope.kurs.firma,
        'data_modyfikacji':current_date
      
      }).success(function(res) {
      console.log(res);
          alert('Zmieniono kurs');
          $scope.kursy.push($scope.kurs);
          //location.reload();
        });
  }}
     
  
     
  };



  $scope.kurs_edit = function(num){
        $scope.poddet=$scope.kursy[num].podpis;
    $scope.form_action ='edit';

    $scope.kurs= $scope.kursy[num]
console.log($scope.kurs.podpis);
  
  }
  
  //DELETE kurs	 
  
  $scope.kurs_delete = function(num){
  

    $scope.kurs= $scope.kursy[num]
    
   $http.delete('https://api.mlab.com/api/1/databases/trakbud/collections/kursy/'+$scope.kurs._id.$oid+'?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx')
              .success(function(response) {
                  console.log('Deleted');
        alert('usunieto');

        $scope.kursy.splice(num, 1);
     //   location.reload();
              });
  
    
  }
  


$scope.lad_id=[];
$scope.changeLadunek=function($array){

  angular.forEach($array,function(it){

    $scope.lad_id[it._id.$oid]=it.produkt;

  })
  console.log('---------------');
console.log($scope.lad_id);
}


$scope.miejsce_skad_id=[];
$scope.changeMiejsce_skad=function($array){

  angular.forEach($array,function(it){

    $scope.miejsce_skad_id[it._id.$oid]=it.miejsce;

  })
  console.log('---------------');
console.log($scope.miejsce_skad_id);
}


$scope.miejsce_dokad_id=[];
$scope.changeMiejsce_dokad=function($array){

  angular.forEach($array,function(it){

    $scope.miejsce_dokad_id[it._id.$oid]=it.miejsce;

  })
  console.log('---------------');
console.log($scope.miejsce_dokad_id);
}



$scope.firma_id=[];
$scope.changeFirma=function($array){

  angular.forEach($array,function(it){

    $scope.firma_id[it._id.$oid]=it.firma;

  })
  console.log('---------------');
console.log($scope.firma_id);
}

	// Set up the canvas
 $scope.$on('$viewContentLoaded', function(){
   
	// Get a regular interval for drawing to the screen
	window.requestAnimFrame = (function (callback) {
		return window.requestAnimationFrame || 
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimaitonFrame ||
					function (callback) {
					 	window.setTimeout(callback, 1000/60);
					};
	})();

setTimeout(()=>{
  var canvas = document.getElementById("sig-canvas");
  canvas.width=$(window).width();
canvas.height=$(window).height();
	var ctx = canvas.getContext("2d");
	ctx.strokeStyle = "#222222";
	ctx.lineWith = 2;

	// Set up the UI
	var sigText = document.getElementById("sig-dataUrl");
	var sigImage = document.getElementById("sig-image");
	var clearBtn = document.getElementById("sig-clearBtn");
	var submitBtn = document.getElementById("sig-submitBtn");
	clearBtn.addEventListener("click", function (e) {
    clearCanvas();
    $scope.podpis = "";
		sigText.innerHTML = "Data URL for your signature will go here!";
		sigImage.setAttribute("src", "");
	}, false);
	submitBtn.addEventListener("click", function (e) {
    $scope.newSignature = false;

    console.log($scope.newSignature);
		var dataUrl = canvas.toDataURL();
    sigText.innerHTML = dataUrl;
    $scope.podpis = dataUrl;
    $('body,html').css('overflow-y','scroll');
    $scope.$apply();
    sigImage.setAttribute("src", dataUrl);

	}, false);

	// Set up mouse events for drawing
	var drawing = false;
	var mousePos = { x:0, y:0 };
	var lastPos = mousePos;
	canvas.addEventListener("mousedown", function (e) {
		drawing = true;
		lastPos = getMousePos(canvas, e);
	}, false);
	canvas.addEventListener("mouseup", function (e) {
		drawing = false;
	}, false);
	canvas.addEventListener("mousemove", function (e) {
		mousePos = getMousePos(canvas, e);
	}, false);

	// Set up touch events for mobile, etc
	canvas.addEventListener("touchstart", function (e) {
		mousePos = getTouchPos(canvas, e);
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousedown", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);
	canvas.addEventListener("touchend", function (e) {
		var mouseEvent = new MouseEvent("mouseup", {});
		canvas.dispatchEvent(mouseEvent);
	}, false);
	canvas.addEventListener("touchmove", function (e) {
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousemove", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);

	// Prevent scrolling when touching the canvas
	document.body.addEventListener("touchstart", function (e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, false);
	document.body.addEventListener("touchend", function (e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, false);
	document.body.addEventListener("touchmove", function (e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, false);

	// Get the position of the mouse relative to the canvas
	function getMousePos(canvasDom, mouseEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
			x: mouseEvent.clientX - rect.left,
			y: mouseEvent.clientY - rect.top
		};
	}

	// Get the position of a touch relative to the canvas
	function getTouchPos(canvasDom, touchEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
			x: touchEvent.touches[0].clientX - rect.left,
			y: touchEvent.touches[0].clientY - rect.top
		};
	}

	// Draw to the canvas
	function renderCanvas() {
		if (drawing) {
			ctx.moveTo(lastPos.x, lastPos.y);
			ctx.lineTo(mousePos.x, mousePos.y);
			ctx.stroke();
			lastPos = mousePos;
		}
	}

	function clearCanvas() {
		canvas.width = canvas.width;
	}

	// Allow for animation
	(function drawLoop () {
		requestAnimFrame(drawLoop);
		renderCanvas();
	})();
},1000);
});
// END CANVAS SIGN

  }]);

  