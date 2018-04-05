'use strict';

angular.module('myApp.pracownicy', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pracownicy', {
    templateUrl: 'controllers/pracownicy/pracownicy.html',
    controller: 'PracownicyCtrlCtrl'
  });
}])

.controller('PracownicyCtrlCtrl', ['$scope','$http', function($scope,$http) {
$scope.form_pracownicy = forms.PracownicyCtrlCtrl;
console.log(forms.PracownicyCtrlCtrl);
$scope.pracownik=[];
$scope.form_action='add';
//GET PRACOWNIK


	$scope.pracownicy=[];
	$http.get('https://api.mlab.com/api/1/databases/trakbud/collections/pracownicy?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx').success(function(response) {
  		$scope.pracownicy=response;
		console.log($scope.pracownicy);
	});
	 



//SAVE PRACOWNIK
$scope.pracownik_save = function(form_action){
	
	console.log($scope.form_action=="add",$scope.form_action);
if($scope.form_action=="add"){
		console.log($scope.form_action);
	$http.post('https://api.mlab.com/api/1/databases/trakbud/collections/pracownicy?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx',
	  [{ 
	  'pracownik':$scope.pracownik.pracownik,
	  'tel':$scope.pracownik.tel,
	  'maszyna':$scope.pracownik.maszyna,
	  'status':$scope.pracownik.status ||false,
	  'uzytkownik':$scope.pracownik.uzytkownik,
	  'haslo':$scope.pracownik.haslo,
	  
	  }]).success(function(res) {
		console.log(res);
				alert('Dodano pracownika:'+$scope.pracownik.pracownik);
				location.reload();
			});
			  
}else{
		$http.put('https://api.mlab.com/api/1/databases/trakbud/collections/pracownicy/'+$scope.pracownik._id.$oid+'/?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx',
	  { 
	  'pracownik':$scope.pracownik.pracownik,
	  'tel':$scope.pracownik.tel,
	  'maszyna':$scope.pracownik.maszyna,
	  'status':$scope.pracownik.status ||false,
	  'login':$scope.pracownik.login,
	  'haslo':$scope.pracownik.haslo,
	  
	  }).success(function(res) {
		console.log(res);
				alert('Zmieniono pracownika:'+$scope.pracownik.pracownik);
				location.reload();
			});
}
	 

	 
};
//EDIT PRACOWNIK	 

$scope.pracownik_edit = function(num){
	$scope.form_action ='edit';
	alert(num);
	$scope.pracownik= $scope.pracownicy[num]
	
	console.log($scope.pracownik);

}

//DELETE PRACOWNIK	 

$scope.pracownik_delete = function(num){

	alert(num);
	$scope.pracownik= $scope.pracownicy[num]
	
 $http.delete('https://api.mlab.com/api/1/databases/trakbud/collections/pracownicy/'+$scope.pracownik._id.$oid+'?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx')
            .success(function(response) {
                console.log('Deleted');
			alert('usunieto');
			location.reload();
            });

	
}

}]);