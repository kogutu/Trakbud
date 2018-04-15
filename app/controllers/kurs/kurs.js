'use strict';

var app = angular.module('myApp.kurs', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
 $routeProvider.when('/kurs', {
  templateUrl: 'controllers/kurs/kurs.html',
  controller: 'kursCtrl'
 });
}])

.controller('kursCtrl', ['$scope', '$http','$route','$cookies','$rootScope', function($scope, $http,$route,$cookies,$rootScope) {

$scope.is_admin = $rootScope.is_admin;
 $scope.newSignature = false;

 $scope.show_signature = function() {
  $('body,html').css('overflow', 'hidden');
  $scope.newSignature = true;
 }


 var current_date = new Date();

 $scope.form_kurs = forms.kursCtrl;
 $scope.form_action = 'add';



 $scope.ladunek = [];
 $http.get('https://api.mlab.com/api/1/databases/trakbud/collections/produkty?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx&q={"status":true}').then(function(response) {
   localStorage.setItem('ladunek', JSON.stringify(response.data));
   $scope.ladunek = response.data;
   $scope.changeLadunek($scope.ladunek);

   ////console.log($scope.ladunek);
  },
  function(data) {
   $scope.ladunek = JSON.parse(localStorage.getItem('ladunek'));
   $scope.changeLadunek($scope.ladunek);
   // Handle error here
  });




 $scope.miejsca_skad = [];
 $http.get('https://api.mlab.com/api/1/databases/trakbud/collections/miejsca?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx&q={"skad_dokad":"skad"}').then(function(response) {
   localStorage.setItem('miejsca_skad', JSON.stringify(response.data));
   $scope.miejsca_skad = response.data;

   $scope.changeMiejsce_skad($scope.miejsca_skad);

   ////console.log($scope.miejsca_skad);
  },
  function(data) {
   $scope.miejsca_skad = JSON.parse(localStorage.getItem('miejsca_skad'));
   $scope.changeMiejsce_skad($scope.miejsca_skad);
   // Handle error here
  });


 $scope.miejsca_dokad = [];
 $http.get('https://api.mlab.com/api/1/databases/trakbud/collections/miejsca?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx&q={"skad_dokad":"dokad"}').then(function(response) {
   localStorage.setItem('miejsca_dokad', JSON.stringify(response.data));
   $scope.miejsca_dokad = response.data;
   $scope.changeMiejsce_dokad($scope.miejsca_dokad);
  },
  function(data) {
   $scope.miejsca_dokad = JSON.parse(localStorage.getItem('miejsca_dokad'));
   $scope.changeMiejsce_dokad($scope.miejsca_dokad);
   // Handle error here
  });

  if($scope.is_admin==1){
 //GET PRACOWNICY

 $scope.pracownicy = [];
 $http.get('https://api.mlab.com/api/1/databases/trakbud/collections/pracownicy?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx&q').then(function(response) {
   localStorage.setItem('firmy', JSON.stringify(response.data));
   $scope.pracownicy = response.data;
   $scope.changePracownicy($scope.pracownicy);

  },
  function(data) {

   $scope.pracownicy = JSON.parse(localStorage.getItem('pracownicy'));
   $scope.changePracownicy($scope.pracownicy);
  });
}


 //GET FIRMY
 $scope.firmy = [];
 $http.get('https://api.mlab.com/api/1/databases/trakbud/collections/firmy?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx&q={"status":true}').then(function(response) {
   localStorage.setItem('firmy', JSON.stringify(response.data));
   $scope.firmy = response.data;
   $scope.changeFirma($scope.firmy);

  },
  function(data) {

   $scope.firmy = JSON.parse(localStorage.getItem('firmy'));
   $scope.changeFirma($scope.firmy);
  });


 //GET KURSY


 $scope.kursy = [];
var url="";
url = 'https://api.mlab.com/api/1/databases/trakbud/collections/kursy?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx&s={"data_utworzenia":-1}';
console.log($scope.is_admin);
 if($scope.is_admin=="true"){
  console.log($scope.is_admin);
   url = 'https://api.mlab.com/api/1/databases/trakbud/collections/kursy?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx&s={"data_utworzenia":-1}';
 
 } 
  if($scope.is_admin=="false"){
    console.log('asdsd',$cookies.get("user_id"));
    url = 'https://api.mlab.com/api/1/databases/trakbud/collections/kursy?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx&q={"user_id":"'+$cookies.get("user_id")+'"}$s={"data_utworzenia":-1}';

  } 

 $http.get(url).success(function(response) {
  
 
  //console.log(response);
   localStorage.setItem('kursy', JSON.stringify(response));
   $scope.kursy = response;

   ////console.log($scope.kursy);
  },
  function(data) {

   $scope.kursy = JSON.parse(localStorage.getItem('kursy'));
   // Handle error here
  }).error(function(data, status, headers, config) {
  if (status < 0) {
   $scope.kursy = JSON.parse(localStorage.getItem('kursy'));
  }
 });






 //SUBMIT FORM

 $scope.kurs_save = function(form_action) {
  ////console.log($scope);
 }
 $scope.clear_canvas = function() {
  return false;
 }
 $scope.valid_form = function() {

  var canvas = document.getElementById("sig-canvas");
  ////console.log(canvas);
  var ctx = canvas.getContext("2d");
  var dataUrl = canvas.toDataURL();
  $scope.podpis = dataUrl;


  var state = true;
  ////console.log($scope.podpis);
  if (typeof($scope.podpis) == "undefined") state = false;

  if (!state) {

   alert("Wprowadz podpis");
   return false;
  }

  return true;

 };



 ///CHECK CONNECTION IF STATUS CONNECT SENT DATA TO SERVER
$scope.sent_when_connect=function(){
  //console.log(connection_status);
if(connection_status && localStorage.getItem('kursy_nc')){
  var kursy_local= false;
  if(localStorage.getItem('kursy_nc')) kursy_local= JSON.parse(localStorage.getItem('kursy_nc'))
  if(kursy_local){
   //WHEN CONNECTION STATUS TRUE - NEED ADD LOCALSTORAGE DATA
    angular.forEach(kursy_local,function(k){
    if(!k.hasOwnProperty('_id')){
      $http.post('https://api.mlab.com/api/1/databases/trakbud/collections/kursy?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx', [{
        'ladunek': k.ladunek,
        'ilosc':k.ilosc,
        'miejsce_skad': k.miejsce_skad,
        'miejsce_dokad':k.miejsce_dokad,
        'firma': k.firma,
        'data_utworzenia': k.data_utworzenia,
        'data_modyfikacji': current_date,
        'podpis': k.podpis,
        'user_id':$cookies.get('user_id')
    
       }]).success(function(res) {
      //  $route.reload();
       });
    }
    localStorage.setItem("kursy_nc","");
    })

  }
}
}
setInterval(()=>{$scope.sent_when_connect()},2000);

 ///// END CHECK CONNECT

 $scope.anuluj = function(){
  $scope.form_action='add';
  $scope.kurs=[];

 }

 //SAVE kurs
 $scope.kursy_nc = [];
 $scope.kurs_save = function(form_action) {

  var cs = connection_status;

  if ($scope.valid_form()) {


   if ($scope.form_action == "add") {
    if (cs) {
     $http.post('https://api.mlab.com/api/1/databases/trakbud/collections/kursy?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx', [{
      'ladunek': $scope.kurs.ladunek,
      'ilosc': $scope.kurs.ilosc,
      'miejsce_skad': $scope.kurs.miejsce_skad,
      'miejsce_dokad': $scope.kurs.miejsce_dokad,
      'firma': $scope.kurs.firma,
      'data_utworzenia': current_date,
      'data_modyfikacji': current_date,
      'podpis': $scope.podpis,
      'user_id':$cookies.get('user_id')

     }]).success(function(res) {
      ////console.log(res);
      console.log(res);
      alert('Dodano kurs');
      $scope.kursy.push({
       'ladunek': $scope.kurs.ladunek,
       'ilosc': $scope.kurs.ilosc,
       'miejsce_skad': $scope.kurs.miejsce_skad,
       'miejsce_dokad': $scope.kurs.miejsce_dokad,
       'firma': $scope.kurs.firma,
       'data_utworzenia': current_date,
       'data_modyfikacji': current_date,
       'podpis': $scope.podpis,
       'user_id':$cookies.get('user_id')
      });
      //    location.reload();
     });
    } else {
   
     $scope.kursy_nc.push({
      'ladunek': $scope.kurs.ladunek,
      'ilosc': $scope.kurs.ilosc,
      'miejsce_skad': $scope.kurs.miejsce_skad,
      'miejsce_dokad': $scope.kurs.miejsce_dokad,
      'firma': $scope.kurs.firma,
      'data_utworzenia': current_date,
      'data_modyfikacji': current_date,
      'podpis': $scope.podpis,
      'user_id':$cookies.get('user_id')

     });
     localStorage.setItem('kursy_nc', JSON.stringify($scope.kursy_nc));

     alert($scope.kurs.ladunek);
     //Dodaj do tablicy
     $scope.kursy.push({
      'ladunek': $scope.kurs.ladunek,
      'ilosc': $scope.kurs.ilosc,
      'miejsce_skad': $scope.kurs.miejsce_skad,
      'miejsce_dokad': $scope.kurs.miejsce_dokad,
      'firma': $scope.kurs.firma,
      'data_utworzenia': current_date,
      'data_modyfikacji': current_date,
      'podpis': $scope.podpis,
      'user_id':$cookies.get('user_id')
     });
     localStorage.setItem('kursy',JSON.stringify($scope.kursy));
    }

   } else {


    $http.put('https://api.mlab.com/api/1/databases/trakbud/collections/kursy/' + $scope.kurs._id.$oid + '/?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx', {

      'ladunek': $scope.kurs.ladunek,
      'ilosc': $scope.kurs.ilosc,
      'miejsce_skad': $scope.kurs.miejsce_skad,
      'miejsce_dokad': $scope.kurs.miejsce_dokad,
      'firma': $scope.kurs.firma,
      'data_utworzenia': current_date,
      'data_modyfikacji': current_date,
      'podpis': $scope.podpis,
      'user_id':$cookies.get('user_id')

    }).success(function(res) {
    
     ////console.log(res);
     alert('Zmieniono kurs');
     $scope.kursy.push($scope.kurs);
     $scope.form_action='add';
     //location.reload();
    });
   }
  }



 };



 $scope.kurs_edit = function(num) {
  $scope.poddet = $scope.kursy[num].podpis;
  $scope.form_action = 'edit';

  $scope.kurs = $scope.kursy[num]
  ////console.log($scope.kurs.podpis);

 }

 //DELETE kurs	 

 $scope.kurs_delete = function(num) {


  $scope.kurs = $scope.kursy[num]

  $http.delete('https://api.mlab.com/api/1/databases/trakbud/collections/kursy/' + $scope.kurs._id.$oid + '?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx')
   .success(function(response) {
    ////console.log('Deleted');
    alert('usunieto');

    $scope.kursy.splice(num, 1);
    //   location.reload();
   });


 }



 $scope.lad_id = [];
 $scope.changeLadunek = function($array) {

  angular.forEach($array, function(it) {

   $scope.lad_id[it._id.$oid] = it.produkt;

  })
  ////console.log('---------------');
  ////console.log($scope.lad_id);
 }


 $scope.miejsce_skad_id = [];
 $scope.changeMiejsce_skad = function($array) {

  angular.forEach($array, function(it) {

   $scope.miejsce_skad_id[it._id.$oid] = it.miejsce;

  })
  ////console.log('---------------');
  ////console.log($scope.miejsce_skad_id);
 }


 $scope.miejsce_dokad_id = [];
 $scope.changeMiejsce_dokad = function($array) {

  angular.forEach($array, function(it) {

   $scope.miejsce_dokad_id[it._id.$oid] = it.miejsce;

  })
  ////console.log('---------------');
  ////console.log($scope.miejsce_dokad_id);
 }



 $scope.firma_id = [];
 $scope.changeFirma = function($array) {

  angular.forEach($array, function(it) {

   $scope.firma_id[it._id.$oid] = it.firma;

  })
  ////console.log('---------------');
  ////console.log($scope.firma_id);
 }


 $scope.pracownicy_id = [];
 $scope.changePracownicy = function($array) {

  angular.forEach($array, function(it) {

   $scope.pracownicy_id[it._id.$oid] = it.pracownik;

  })
  ////console.log('---------------');
  ////console.log($scope.firma_id);
 }




 // Set up the canvas
 $scope.$on('$viewContentLoaded', function() {

  // Get a regular interval for drawing to the screen
  window.requestAnimFrame = (function(callback) {
   return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimaitonFrame ||
    function(callback) {
     window.setTimeout(callback, 1000 / 60);
    };
  })();








  //CANVAS......................................

  setTimeout(() => {
   var canvas = document.getElementById("sig-canvas");
   canvas.width = $(window).width();
   canvas.height = $(window).height();
   var ctx = canvas.getContext("2d");
   ctx.strokeStyle = "#222222";
   ctx.lineWith = 2;

   // Set up the UI
   var sigText = document.getElementById("sig-dataUrl");
   var sigImage = document.getElementById("sig-image");
   var clearBtn = document.getElementById("sig-clearBtn");
   var submitBtn = document.getElementById("sig-submitBtn");
   clearBtn.addEventListener("click", function(e) {
    clearCanvas();
    $scope.podpis = "";
    sigText.innerHTML = "Data URL for your signature will go here!";
    sigImage.setAttribute("src", "");
   }, false);
   submitBtn.addEventListener("click", function(e) {
    $scope.newSignature = false;

    ////console.log($scope.newSignature);
    var dataUrl = canvas.toDataURL();
    sigText.innerHTML = dataUrl;
    $scope.podpis = dataUrl;
    $('body,html').css('overflow-y', 'scroll');
    $scope.$apply();
    sigImage.setAttribute("src", dataUrl);

   }, false);

   // Set up mouse events for drawing
   var drawing = false;
   var mousePos = {
    x: 0,
    y: 0
   };
   var lastPos = mousePos;
   canvas.addEventListener("mousedown", function(e) {
    drawing = true;
    lastPos = getMousePos(canvas, e);
   }, false);
   canvas.addEventListener("mouseup", function(e) {
    drawing = false;
   }, false);
   canvas.addEventListener("mousemove", function(e) {
    mousePos = getMousePos(canvas, e);
   }, false);

   // Set up touch events for mobile, etc
   canvas.addEventListener("touchstart", function(e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
     clientX: touch.clientX,
     clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
   }, false);
   canvas.addEventListener("touchend", function(e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
   }, false);
   canvas.addEventListener("touchmove", function(e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
     clientX: touch.clientX,
     clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
   }, false);

   // Prevent scrolling when touching the canvas
   document.body.addEventListener("touchstart", function(e) {
    if (e.target == canvas) {
     e.preventDefault();
    }
   }, false);
   document.body.addEventListener("touchend", function(e) {
    if (e.target == canvas) {
     e.preventDefault();
    }
   }, false);
   document.body.addEventListener("touchmove", function(e) {
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
   (function drawLoop() {
    requestAnimFrame(drawLoop);
    renderCanvas();
   })();
  }, 1000);
 });
 // END CANVAS SIGN

}]);