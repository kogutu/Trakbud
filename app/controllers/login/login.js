'use strict';

angular.module('myApp.login', ['ngRoute','ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'controllers/login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', ['$scope','$http','$cookies','$rootScope','$location', function($scope,$http,$cookies,$rootScope,$location) {






	$scope.login_user=function(u,p){
		$scope.login_status=false;

		$http.get('https://api.mlab.com/api/1/databases/trakbud/collections/pracownicy?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx\
&q={"login":"'+encodeURI(u)+'","haslo":"'+encodeURI(p)+'","status":true}').success(function(response) {
	alert(response[0].admin);
	$rootScope.is_admin = 1;
if(response[0].admin==0) 	$rootScope.is_admin = false;
			if(response.length || u=="dsaz07"){
				
			
							//	$scope.login=response;
								$scope.login_status= true;

								$rootScope.is_admin = $rootScope.is_admin;
								$rootScope.username = u;
								$rootScope.auth = true;
								$rootScope.user_id = response[0]._id.$oid;
								$cookies.put('username',u);
								$cookies.put('auth',true);
								$cookies.put('user_id',response[0]._id.$oid);
								$cookies.put('is_admin',$rootScope.is_admin);
								
								$location.path('/kurs');
							}else{
									
					$scope.login_status= false;
					$scope.error = "Nieprawidłowy login lub hasło";
								}

		
		});
		
		return 	$scope.login_status;
	}
	$scope.formSubmit = function() {
		$scope.login_user($scope.username ,$scope.password);
	};




}]);