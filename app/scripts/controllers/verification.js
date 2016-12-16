'use strict';

var app=angular.module('app');

  app.controller('VerifyCtrl', function($scope,$http,$localStorage,$rootScope,$stateParams,$location,$mdToast) {
 console.log($stateParams.email)
   $scope.resendmail=function(){
  var obj={};
  obj.email=$stateParams.email;
$http.post(' https://sailsserver.herokuapp.com/auth/resendmail', obj).success(function(resp){
          console.log(resp);
          $rootScope.resenderror=resp.message;
          $scope.success();
 }).error( function(err) {
  console.log(err)
   $rootScope.resenderror=err.message;
   $scope.error();
});

  }
   $scope.error = function() {
   $mdToast.show(
      $mdToast.simple()
        .textContent($rootScope.resenderror)
        .position('top right')
      .theme('error-toast')
        .hideDelay(3000)
    );
  };
  
  $scope.success = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent($rootScope.resenderror)
        .position('top right')
      .theme('success-toast')
        .hideDelay(3000)
    );
  };
  });
