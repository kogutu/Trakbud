'use strict';

var app = angular.module('myApp.wszystkie_kursy', ['ngRoute','ngTable'])

.config(['$routeProvider', function($routeProvider) {
 $routeProvider.when('/wszystkie_kursy', {
  templateUrl: 'controllers/wszystkie_kursy/wszystkie_kursy.html',
  controller: 'wszystkie_kursyCtrl'
 });
}])

.controller('wszystkie_kursyCtrl', ['$scope', '$http','$route','NgTableParams', function($scope, $http,$route,NgTableParams) {




 $scope.newSignature = false;

 $scope.show_signature = function() {
  $('body,html').css('overflow', 'hidden');
  $scope.newSignature = true;
 }


 var current_date = new Date();

 $scope.form_kurs = forms.wszystkie_kursy;
 $scope.form_action = 'add';



 $scope.ladunek = [];
 $http.get('https://api.mlab.com/api/1/databases/trakbud/collections/produkty?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx&q={"status":true}').then(function(response) {
   localStorage.setItem('ladunek', JSON.stringify(response.data));
   $scope.ladunek = response.data;
   $scope.changeLadunek($scope.ladunek);

   //console.log($scope.ladunek);
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

   //console.log($scope.miejsca_skad);
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

 $http.get('https://api.mlab.com/api/1/databases/trakbud/collections/kursy?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx&s={"data_utworzenia":-1}').success(function(response) {
  
 
  console.log(response);
   localStorage.setItem('kursy', JSON.stringify(response));
   $scope.kursy = response;
   $scope.data =  $scope.kursy;
   $scope.tableParams = new NgTableParams({}, { dataset: $scope.data});
   $scope.ilosc_produktow=function(){
  return $scope.data.length; 
  setTimeout(()=>{$scope.$apply();},100);
  };
  $scope.ilosc_ilosc=function(){
    var il=0;
    console.log('ilosc-Ilosc');
    angular.forEach($scope.data,function(v){
      il+= parseFloat(v.ilosc);
    })
    console.log(il);
    return il; 
    };
    setTimeout(()=>{$scope.$apply();},200);
   //console.log($scope.kursy);
  },
  function(data) {

   $scope.kursy = JSON.parse(localStorage.getItem('kursy'));
   $scope.data =  $scope.kursy;
   $scope.tableParams = new NgTableParams({}, { dataset: $scope.data});

   // Handle error here
  }).error(function(data, status, headers, config) {
  if (status < 0) {
   $scope.kursy = JSON.parse(localStorage.getItem('kursy'));
  }
 });






 //SUBMIT FORM

 $scope.kurs_save = function(form_action) {
  //console.log($scope);
 }
 $scope.clear_canvas = function() {
  return false;
 }
 $scope.valid_form = function() {

  var canvas = document.getElementById("sig-canvas");
  //console.log(canvas);
  var ctx = canvas.getContext("2d");
  var dataUrl = canvas.toDataURL();
  $scope.podpis = dataUrl;


  var state = true;
  //console.log($scope.podpis);
  if (typeof($scope.podpis) == "undefined") state = false;

  if (!state) {

   alert("Wprowadz podpis");
   return false;
  }

  return true;

 };


 ///CHECK CONNECTION IF STATUS CONNECT SENT DATA TO SERVER
$scope.sent_when_connect=function(){
  console.log(connection_status);
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
        'podpis': k.podpis
    
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
      'podpis': $scope.podpis

     }]).success(function(res) {
      //console.log(res);
      alert('Dodano kurs');
      $scope.kursy.push({
       'ladunek': $scope.kurs.ladunek,
       'ilosc': $scope.kurs.ilosc,
       'miejsce_skad': $scope.kurs.miejsce_skad,
       'miejsce_dokad': $scope.kurs.miejsce_dokad,
       'firma': $scope.kurs.firma,
       'data_utworzenia': current_date,
       'data_modyfikacji': current_date,
       'podpis': $scope.podpis
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
      'podpis': $scope.podpis

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
      'podpis': $scope.podpis
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
     'data_modyfikacji': current_date

    }).success(function(res) {
     //console.log(res);
     alert('Zmieniono kurs');
     $scope.kursy.push($scope.kurs);
     //location.reload();
    });
   }
  }



 };



 $scope.kurs_edit = function(num) {
  $scope.poddet = $scope.kursy[num].podpis;
  $scope.form_action = 'edit';

  $scope.kurs = $scope.kursy[num]
  //console.log($scope.kurs.podpis);

 }

 //DELETE kurs	 

 $scope.kurs_delete = function(num) {


  $scope.kurs = $scope.kursy[num]

  $http.delete('https://api.mlab.com/api/1/databases/trakbud/collections/kursy/' + $scope.kurs._id.$oid + '?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx')
   .success(function(response) {
    //console.log('Deleted');
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
  //console.log('---------------');
  //console.log($scope.lad_id);
 }


 $scope.miejsce_skad_id = [];
 $scope.changeMiejsce_skad = function($array) {

  angular.forEach($array, function(it) {

   $scope.miejsce_skad_id[it._id.$oid] = it.miejsce;

  })
  //console.log('---------------');
  //console.log($scope.miejsce_skad_id);
 }


 $scope.miejsce_dokad_id = [];
 $scope.changeMiejsce_dokad = function($array) {

  angular.forEach($array, function(it) {

   $scope.miejsce_dokad_id[it._id.$oid] = it.miejsce;

  })
  //console.log('---------------');
  //console.log($scope.miejsce_dokad_id);
 }



 $scope.firma_id = [];
 $scope.changeFirma = function($array) {

  angular.forEach($array, function(it) {

   $scope.firma_id[it._id.$oid] = it.firma;

  })
  //console.log('---------------');
  //console.log($scope.firma_id);
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








 });
 

}]);