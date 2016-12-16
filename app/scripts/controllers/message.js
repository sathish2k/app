'use strict';

var app=angular.module('app')
  app.controller('MsgCtrl', function ($scope,$http,$localStorage,$rootScope,$stateParams,$location,$mdToast) {

$rootScope.messages=[];
$scope.sendmsg=function(){
  if(!$scope.textmsg || $scope.textmsg == ''){
        return
      }
  var msgobj={};
  msgobj.user=$rootScope.user;
  msgobj.touser=$rootScope.touser;
  msgobj.text=$scope.textmsg;
  io.socket.post('/user/sendmsg',msgobj,function (resData, jwRes) { 
    console.log(resData)
        })
    $http.post('https://sailsserver.herokuapp.com/messages', msgobj).success(function(resp){
          console.log(resp);
          $scope.textmsg=''; 
        }).error( function(err) {
          console.log(err);
        });
}

io.socket.on('getownmsg',function(ownevent){
  console.log(ownevent)
$rootScope.messages.push(ownevent)
 $scope.$apply();
 })

io.socket.on('getusermsg',function(userevent){
  console.log(userevent)
$rootScope.messages.push(userevent)
 $scope.$apply();
 console.log($scope.messages)
 })

});