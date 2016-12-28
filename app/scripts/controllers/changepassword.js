'use strict';

angular.module('app')
  .controller('ChangeCtrl', function ($scope,$http,$localStorage,$rootScope,$stateParams,$location,$mdToast) {
    $scope.changepass=function(){
  var obj={};
  obj.token=$stateParams.token;
  obj.password=$scope.password;
  console.log($scope.password)
  console.log($stateParams.token)
$http.post('https://sailsserver.herokuapp.com/auth/changepassword', obj).success(function(resp){
          console.log(resp);
          $rootScope.changeerror=resp.message;
          $scope.success();
 }).error( function(err) {
  console.log(err)
   $rootScope.changeerror=err.message;
   $scope.error();
});

  }
	 $scope.error = function() {
   $mdToast.show(
      $mdToast.simple()
        .textContent($rootScope.changeerror)
        .position('top right')
      .theme('error-toast')
        .hideDelay(3000)
    );
  };
  
  $scope.success = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent($rootScope.changeerror)
        .position('top right')
      .theme('success-toast')
        .hideDelay(3000)
    );
  };
  });
  
