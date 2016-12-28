'use strict';

angular.module('app')
  .controller('ResetCtrl', function ($scope,$http,$localStorage,$rootScope,$stateParams,$location,$mdToast) {
    $scope.resetpass=function(){
  var obj={};
  obj.email=$scope.email;
$http.post('http://sailsserver.herokuapp.com/auth/resetpass', obj).success(function(resp){
          console.log(resp);
          $rootScope.reseterror=resp.message;
          $scope.success();
 }).error( function(err) {
  console.log(err)
   $rootScope.reseterror=err.message;
   $scope.error();
});

  }
	 $scope.error = function() {
   $mdToast.show(
      $mdToast.simple()
        .textContent($rootScope.reseterror)
        .position('top right')
      .theme('error-toast')
        .hideDelay(3000)
    );
  };
  
  $scope.success = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent($rootScope.reseterror)
        .position('top right')
      .theme('success-toast')
        .hideDelay(3000)
    );
  };
  });
  
