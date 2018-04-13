'use strict';

angular.module('myApp.firmy', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/firmy', {
    templateUrl: 'controllers/firmy/firmy.html',
    controller: 'firmyCtrl'
  });
}])

.controller('firmyCtrl', ['$scope','$http', function($scope,$http) {
  var current_date = new Date();
  $scope.form_firmy = forms.firmyCtrl;
  console.log(forms.firmyCtrl);
  $scope.firma=[];
  $scope.form_action='add';
  //GET firma
  
  
    $scope.firmy=[];
    $http.get('https://api.mlab.com/api/1/databases/trakbud/collections/firmy?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx').success(function(response) {
        $scope.firmy=response;
      console.log($scope.firmy);
    });
     
  
  
  
  //SAVE firma
  $scope.firma_save = function(form_action){
    
    console.log($scope.form_action=="add",$scope.form_action);
  if($scope.form_action=="add"){
      console.log($scope.form_action);
    $http.post('https://api.mlab.com/api/1/databases/trakbud/collections/firmy?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx',
      [{ 
      'firma':$scope.firma.firma,
      'status':$scope.firma.status ||false,
      'data_utworzenia':current_date
      
      }]).success(function(res) {
      console.log(res);
          alert('Dodano pracownika:'+$scope.firma.firma);

          $scope.firmy.push({ 
            'firma':$scope.firma.firma,
            'status':$scope.firma.status ||false,
            'data_utworzenia':current_date
            
            });
      //    location.reload();
        });
          
  }else{
      $http.put('https://api.mlab.com/api/1/databases/trakbud/collections/firmy/'+$scope.firma._id.$oid+'/?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx',
      { 
      'firma':$scope.firma.firma,
 
      'status':$scope.firma.status || false,
      'data_utworzenia':current_date
    

      
      }).success(function(res) {
      console.log(res);
          alert('Zmieniono pracownika:'+$scope.firma.firma);
          $scope.firmy.push($scope.firma);
          //location.reload();
        });
  }
     
  
     
  };
  //EDIT firma	 
  
  $scope.firma_edit = function(num){
    $scope.form_action ='edit';
    alert(num);
    $scope.firma= $scope.firmy[num]
    
    console.log($scope.firma);
  
  }
  
  //DELETE firma	 
  
  $scope.firma_delete = function(num){
  

    $scope.firma= $scope.firmy[num]
    
   $http.delete('https://api.mlab.com/api/1/databases/trakbud/collections/firmy/'+$scope.firma._id.$oid+'?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx')
              .success(function(response) {
                  console.log('Deleted');
        alert('usunieto');
        $scope.firmy.splice(num, 1);
     //   location.reload();
              });
  
    
  }
  
  }]);