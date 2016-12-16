'use strict';

var app=angular.module('app')
  app.controller('NotifyCtrl', function ($scope,$http,$localStorage,$rootScope,$stateParams,$location,$mdToast) {
$scope.notify=[];
$rootScope.messages=[];
  	$http.get("https://sailsserver.herokuapp.com/notification?ownerid="+$rootScope.user).then(function(result){
     console.log(result);
     for(var i=0; i<result.data.length;i++){
        $scope.notify.push(result.data[i])
      }
     console.log($scope.notify);
  	});
  
  io.socket.on('notification',function(event) {
	console.log(event)
    $scope.notify.push(event);
    console.log($scope.notify)
    $scope.$apply();
 })

  $http.get("https://sailsserver.herokuapp.com/user").success(function(result){
     console.log(result);
     $scope.users=result;
   })
$scope.getoldmsg=function(username){
$rootScope.touser=username;
   $http({
     url: 'https://sailsserver.herokuapp.com/messages', 
     method: "GET"
}).then(function(res){
  console.log(res)
  for(var i=0; i<res.data.length;i++){
        $rootScope.messages.push(res.data[i])
      }
  console.log($scope.messages)
})

}


});