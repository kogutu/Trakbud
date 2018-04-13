'use strict';

angular.module('myApp.produkty', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/produkty', {
    templateUrl: 'controllers/produkty/produkty.html',
    controller: 'ProduktyCtrl'
  });
}])

.controller('ProduktyCtrl', ['$scope','$http', function($scope,$http) {
  $scope.form_produkty = forms.ProduktyCtrl;
  console.log(forms.ProduktyCtrl);
  $scope.produkt=[];
  $scope.form_action='add';
  //GET produkt
  
  
    $scope.produkty=[];
    $http.get('https://api.mlab.com/api/1/databases/trakbud/collections/produkty?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx').success(function(response) {
        $scope.produkty=response;
      console.log($scope.produkty);
    });
     
  
  
  
  //SAVE produkt
  $scope.produkt_save = function(form_action){
    
    console.log($scope.form_action=="add",$scope.form_action);
  if($scope.form_action=="add"){
      console.log($scope.form_action);
    $http.post('https://api.mlab.com/api/1/databases/trakbud/collections/produkty?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx',
      [{ 
      'produkt':$scope.produkt.produkt,
      'status':$scope.produkt.status ||false
      
      }]).success(function(res) {
      console.log(res);
          alert('Dodano: '+$scope.produkt.produkt);
          $scope.produkty.push({ 
            'produkt':$scope.produkt.produkt,
            'status':$scope.produkt.status ||false
            
            });
      //    location.reload();
        });
          
  }else{
      $http.put('https://api.mlab.com/api/1/databases/trakbud/collections/produkty/'+$scope.produkt._id.$oid+'/?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx',
      { 
      'produkt':$scope.produkt.produkt,
 
      'status':$scope.produkt.status || false
    

      
      }).success(function(res) {
      console.log(res);
          alert('Zmieniono: '+$scope.produkt.produkt);
          $scope.produkty.push($scope.produkt);
          //location.reload();
        });
  }
     
  
     
  };
  //EDIT produkt	 
  
  $scope.produkt_edit = function(num){
    $scope.form_action ='edit';
    alert(num);
    $scope.produkt= $scope.produkty[num]
    
    console.log($scope.produkt);
  
  }
  
  //DELETE produkt	 
  
  $scope.produkt_delete = function(num){
  

    $scope.produkt= $scope.produkty[num]
    
   $http.delete('https://api.mlab.com/api/1/databases/trakbud/collections/produkty/'+$scope.produkt._id.$oid+'?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx')
              .success(function(response) {
                  console.log('Deleted');
        alert('usunieto');
        $scope.produkty.splice(num, 1);
     //   location.reload();
              });
  
    
  }
  
  }]);