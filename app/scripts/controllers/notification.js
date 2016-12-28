'use strict';

var app=angular.module('app')
  app.controller('NotifyCtrl', function ($scope,$http,$localStorage,$rootScope,$stateParams,$location,$mdToast) {

    $http({
     url: 'https://sailsserver.herokuapp.com/notification' +'/count', 
     method: "GET",
     params:  {ownerid:$rootScope.user}  
}).then(function(res){

    console.log(res);

    $scope.count = res.data.count;
    console.log($scope.count);
    
  });
  
$scope.page = 1;
 
  $scope.notify=[];
 $scope.fetching=false;
  $scope.usersPerPage=9;
  console.log('start')
  $scope.getMore = function() {
   if($scope.fetching) return;
   console.log('another')
    if($scope.notify.length>=$scope.count) return;
    console.log($scope.count)
    $scope.fetching=true;
  console.log('trigger')
     $http({
     url: 'https://sailsserver.herokuapp.com/notification/', 
     method: "GET",
     params: {ownerid:$rootScope.user,limit:$scope.usersPerPage,skip:($scope.page- 1) * $scope.usersPerPage}  
}).then(function(result){

    console.log(result);
     
     for(var i=0; i<result.data.length;i++){
        $scope.notify.push(result.data[i])
       
      }
    $scope.fetching=false;
    console.log($scope.notify);
    
  });

  $scope.page +=1;
  console.log($scope.page)
  };
  
 

  io.socket.on('notification',function(event) {
	console.log(event)
    $scope.notify.push(event);
    console.log($scope.notify)
    $scope.$apply();
 })

 


});