'use strict';

// Declare app level module which depends on views, and components
var app= angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.pracownicy',
  'myApp.produkty',
  'myApp.miejsca',
  'myApp.firmy',
  'myApp.kurs',
  'myApp.wszystkie_kursy',
  'myApp.version',
  'myApp.login',
  'ngTable'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider,$rootScope) {
   

    $locationProvider.hashPrefix('!');
  
    $routeProvider.otherwise({redirectTo: '/login'});
  }]);
  
app.directive('login', ['$cookies','$location','$rootScope', function($cookies,$location,$rootScope) {
  return {
      restrict: 'A',
      link: function(scope, element, attrs) {
          scope.isLoged = function() {
            
              return $cookies.get('auth');
          };
          scope.$watch(scope.isLoged(), function(value) {
   
              if (value !=true) {
       
                $location.path('/login')
              }else{
                $rootScope.username = $cookies.get('username');
                $rootScope.is_admin = $cookies.get('is_admin');
                $location.path('/kurs')
              }
          });
      }
  };
}]).component;

app.directive('mydirc', function($cookies,$location) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function($scope, element, attrs) {
            $scope.clickMe= function() {
                $cookies.remove('auth');
                $cookies.remove('username');
                $cookies.remove('user_id');
                $cookies.remove('is_admin');
                $location.path('login/');
            }
        }
    }
});

// app.factory("ladunki",getMdata);
// getMdata.$inject = ['$http','$q'];
// function getMdata($http,$q) {
//     return {
//         getAll : function(){

//     var ladunki = $http.get('https://api.mlab.com/api/1/databases/trakbud/collections/produkty?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx&q={"status":true}');
//     var kursy = $http.get('https://api.mlab.com/api/1/databases/trakbud/collections/kursy?apiKey=Fd8RkfJYco52MSYu9_mR2USncBbqhrtx');
    
//     $q.all(ladunki,kursy).then(function(res){
//         return res;
//     });
// }
// }
 
// }


app.directive('loading', ['$http', function($http) {
  return {
      restrict: 'A',
      link: function(scope, element, attrs) {
          scope.isLoading = function() {
              return $http.pendingRequests.length > 0;
          };
          scope.$watch(scope.isLoading, function(value) {
              if (value) {
                  element.removeClass('ng-hide');
              } else {
                  element.addClass('ng-hide');
              }
          });
      }
  };
}]).component;



app.directive("drawing", function () {
    return {
        restrict: "A",
        link: function (scope, element) {
            var ctx = element[0].getContext('2d');
  
            var drawing = false;
  
            var lastX;
            var lastY;
  
            element.bind('mousedown', function (event) {
                if (event.offsetX !== undefined) {
                    lastX = event.offsetX;
                    lastY = event.offsetY;
                } else {
                    lastX = event.layerX - event.currentTarget.offsetLeft;
                    lastY = event.layerY - event.currentTarget.offsetTop;
                }
  
                ctx.beginPath();
  
                drawing = true;
            });
            element.bind('mousemove', function (event) {
                if (drawing) {
  
                    if (event.offsetX !== undefined) {
                     var   currentX = event.offsetX;
                      var  currentY = event.offsetY;
                    } else {
                   var     currentX = event.layerX - event.currentTarget.offsetLeft;
                    var    currentY = event.layerY - event.currentTarget.offsetTop;
                    }
  
                    draw(lastX, lastY, currentX, currentY);
  
                    lastX = currentX;
                    lastY = currentY;
                }
  
            });
            element.bind('mouseup', function (event) {
                drawing = false;
            });
  
            function draw(lX, lY, cX, cY) {
  
                ctx.moveTo(lX, lY);
  
                ctx.lineTo(cX, cY);
  
                ctx.strokeStyle = "#4bf";
  
                ctx.stroke();
  
                var objMoveTo;
                var objLineTo;
  
                objMoveTo = { "lx": lX, "ly": lY };
                objLineTo = { "cx": cX, "cy": cY };
  
                scope.moveToList.push(objMoveTo);
                scope.lineToList.push(objLineTo);
            }
  
  
  
        }
    };
  });

  
  
  app.directive("redraw", function () {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            var ctx = element[0].getContext('2d');
 
            ctx.beginPath();
  
            var sig = JSON.parse(attrs.signature);

            
            for (var i = 0; i < sig.moveToList.length; i++) {
                draw(sig.moveToList[i].lx, sig.moveToList[i].ly, sig.lineToList[i].cx, sig.lineToList[i].cy);
            }
  
            function draw(lX, lY, cX, cY) {
  
                ctx.moveTo(lX, lY);
  
                ctx.lineTo(cX, cY);
  
                ctx.strokeStyle = "#4bf";
  
                ctx.stroke();
            }


        }
    };
  });
  app.factory('UserService', function() {
    return {
        login : 'asadsdsa',
        username:'',
    };
  });

  app.directive('header', function () {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
        templateUrl: "controllers/login/header.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here :)
        }]
    }
});

  app.directive("validateForm", function () {
    return {
        restrict: 'A',
        require: '^form',
        link: function (scope, el, attrs, formCtrl) {
            var inputEl = el[0].querySelector("[name]");
            var inputNgEl = angular.element(inputEl);
            var inputName = inputNgEl.attr('name');
  
            inputNgEl.on('change', function () {
                el.toggleClass('has-error', formCtrl[inputName].$invalid && formCtrl[inputName].$dirty);
            }
            );
        }
    }
  });


//CHECK CONNECTION STATUS BY DS
var connection_status = true;
  function check_connection(){
    $.ajax({
        url: "http://directseo.pl/test.json",
        timeout: 2000,
        crossDomain: true,
        dataType: 'jsonp',
        error: function(jqXHR) { 
          //  console.log(jqXHR);
            if(jqXHR.status !=200) {
        
                connection_status = false;
                $('.no_connection').show();
            }else{
                connection_status = true;
                $('.no_connection').hide();
            }
        },
        success: function(jqXHR) {
            // console.log(jqXHR);
            $('.no_connection').hide();
        }
    });
  }
  check_connection();
  setInterval(()=>{check_connection()},5000);