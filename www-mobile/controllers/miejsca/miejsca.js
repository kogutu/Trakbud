'use strict';

angular.module('myApp.miejsca', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/miejsca', {
    templateUrl: 'controllers/miejsca/miejsca.html',
    controller: 'MiejscaCtrl'
  });
}])

.controller('MiejscaCtrl', ['$scope','$http', function($scope,$http) {

  $scope.form_miejsca = forms.MiejscaCtrl;
  console.log(forms.MiejscaCtrl);
  $scope.miejsce=[];
  $scope.form_action='add';
  //GET miejsce
  
  
    $scope.miejsca=[];
    $http.get('https://api.mlab.com/api/1/databases/trakbud/collections/miejsca?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx').success(function(response) {
        $scope.miejsca=response;
      console.log($scope.miejsca);
    });
     
  
  
  
  //SAVE miejsce
  $scope.miejsce_save = function(form_action){
    var current_date = new Date();
    console.log($scope.form_action=="add",$scope.form_action);
    console.log(current_date);
  if($scope.form_action=="add"){
      console.log($scope.form_action);
    $http.post('https://api.mlab.com/api/1/databases/trakbud/collections/miejsca?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx',
      [{ 
      'miejsce':$scope.miejsce.miejsce,
      'skad_dokad':$scope.miejsce.skad_dokad ||false,
      'data_utworzenia':current_date
      
      }]).success(function(res) {
      console.log(res);
          alert('Dodano pracownika:'+$scope.miejsce.miejsce);
          $scope.miejsca.push({ 
            'miejsce':$scope.miejsce.miejsce,
            'skad_dokad':$scope.miejsce.skad_dokad ||false,
            'data_utworzenia':current_date
            
            });
      //    location.reload();
        });
          
  }else{
      $http.put('https://api.mlab.com/api/1/databases/trakbud/collections/miejsca/'+$scope.miejsce._id.$oid+'/?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx',
      { 
      'miejsce':$scope.miejsce.miejsce,
 
      'skad_dokad':$scope.miejsce.skad_dokad || false,
      'data_utworzenia':current_date
    

      
      }).success(function(res) {
      console.log(res);
          alert('Zmieniono pracownika:'+$scope.miejsce.miejsce);
          $scope.miejsca.push($scope.miejsce);
          //location.reload();
        });
  }
     
  
     
  };
  //EDIT miejsce	 
  
  $scope.miejsce_edit = function(num){
    $scope.form_action ='edit';
    alert(num);
    $scope.miejsce= $scope.miejsca[num]
    
    console.log($scope.miejsce);
  
  }
  
  //DELETE miejsce	 
  
  $scope.miejsce_delete = function(num){
  

    $scope.miejsce= $scope.miejsca[num]
    
   $http.delete('https://api.mlab.com/api/1/databases/trakbud/collections/miejsca/'+$scope.miejsce._id.$oid+'?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx')
              .success(function(response) {
                  console.log('Deleted');
        alert('usunieto');
        $scope.miejsca.splice(num, 1);
     //   location.reload();
              });
  
    
  }
  
  }]);