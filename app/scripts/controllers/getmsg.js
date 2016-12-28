'use strict';

var app=angular.module('app')
  app.controller('GetmsgCtrl', function ($scope,$http,$localStorage,$rootScope,$stateParams,$location,$mdToast) {
//  var self=this;
//  self.messages=[];
//  $scope.messages=[];
//  console.log($scope.messages)

//    $http({
//      url: ' /messages', 
//      method: "GET",
//      params:{user:$rootScope.touser}
// }).then(function(res){
//   console.log(res)
//    $scope.messages=[];
//   for(var i=0; i<res.data.length;i++){
//         $scope.messages.push(res.data[i])
//         console.log(res.data[i])
//       }
//       if(!$scope.$$phase) {
//       $scope.$apply();
//     }
//   console.log($scope.messages)

// })

// $scope.sendmsg=function(){
//   if(!$scope.textmsg || $scope.textmsg == ''){
//         return
//       }
//   var msgobj={};
//   msgobj.user=$rootScope.user;
//   msgobj.touser=$rootScope.touser;
//   msgobj.text=$scope.textmsg;
//   io.socket.post('/user/sendmsg',msgobj,function (resData, jwRes) { 
//     console.log(resData)
//         })
//     $http.post(' /messages', msgobj).success(function(resp){
//           console.log(resp);
//           $scope.textmsg=''; 
//         }).error( function(err) {
//           console.log(err);
//         });
// }

// io.socket.on('getownmsg',function(ownevent){
//   console.log(ownevent)
// $scope.messages.push(ownevent)
//  $scope.$apply();
//  console.log($scope.messages)
//  })

// io.socket.on('getusermsg',function(userevent){
//   console.log(userevent)
// $scope.messages.push(userevent)
//  $scope.$apply();
//  console.log($scope.messages)
//  })

});