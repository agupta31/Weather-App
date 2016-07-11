//MODULE-tells angular to starts looking into my html
var myApp=angular.module("whetherApp",['ngRoute','ngResource']);

//SETTING UP ROUTES FOR BOTH THE PAGES

myApp.config(function($routeProvider){
    
    
     $routeProvider
     
         .when("/",{
                     templateUrl:"home.html",
                      controller:"homeController"
           
          })
     
         
         .when("/forecast",{
                      templateUrl:"forecast.html",
                      controller:"forecastController"
         
             })
     
         .when("/forecast/:days",{
                      templateUrl:"forecast.html",
                      controller:"forecastController"
         
             })
      
    
});

//CREATING A SERVICE WHICH SETS THE CITY NAME

  myApp.service("myService",function(){
       var self=this;
               this.city="New York,NY";
    
      
  });


//CREATING ANOTHER SEVICE WHICH WILL GET MY FORECAST DATA FROM THE WEATHER API

myApp.service("weatherService",function($resource){
    
       this.getWeather=function(city,days){
           
             
    var whetherAPI=$resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=74ce990344baa910d82e139046caf546",{callback:"JSON_CALLBACK" },{get:{method:"JSONP"}});
        
    return whetherAPI.get({q:city,cnt:days});
       }
       
})


//CONTROLLER FOR MY HOME PAGE

 myApp.controller("homeController",["$scope","myService","$location",function($scope,myService,$location){
     
        $scope.city=myService.city;
        
     $scope.$watch("city",function(){
          myService.city=$scope.city;
     });
     
      $scope.submit=function(){
          $location.path("/forecast");
      }
     
     
     
 }]);

 //CONTROLLER FOR MY FORECAST PAGE

 myApp.controller("forecastController",["$scope","myService","$routeParams","weatherService",function($scope,myService,$routeParams,weatherService){

     $scope.city=myService.city;
     $scope.days=$routeParams.days || '2';

    
     $scope.whetherResult=weatherService.getWeather($scope.city,$scope.days);    
      $scope.convertToFarenheit=function(degK){
          
            return  Math.round((1.8*(degK-273))+32);
      }
      
       
      
      $scope.convertToDate=function(dt){
          return new Date(dt*1000);
      }
      
     
 }]);


//CUSTOM DIRECTIVE

myApp.directive("myDirective",function(){
    
      return {
          
             templateUrl:"wResults.html",
             replace:true,
          
             
            }     
});