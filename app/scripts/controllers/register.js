'use strict';

var app=angular.module('app');
  app.controller('RegisterCtrl', function ($scope,$state,$mdDialog,$http,$localStorage,$rootScope,$stateParams,$location,$mdToast) {
   


$scope.clear=function(){
  $scope.message="";
}
   $scope.checkemail=function(){
    console.log('ss')
if($scope.email=="" || !$scope.email) {
  return;
}
else{
  var checkobj={};
  console.log($scope.email)
  checkobj.email=$scope.email;
  $http.post('http://sailsserver.herokuapp.com/auth/signupcheck',checkobj ).success(function(resp){
          console.log(resp);
console.log('check');
$scope.message=resp.message;
});
   }
}


$scope.clearuser=function(){
  $scope.usermessage="";
}
   $scope.checkuser=function(){
    console.log('ss')
if($scope.username=="" || !$scope.username) {
  return;
}
else{
  var checkuserobj={};
  console.log($scope.username)
  checkuserobj.username=$scope.username;
  $http.post('http://sailsserver.herokuapp.com/auth/usercheck',checkuserobj ).success(function(resp){
          console.log(resp);
console.log('check');
$scope.usermessage=resp.message;
});
   }
}

  	var signupObj = {};
	$scope.register = function(form){
		if(form.$valid) {

		signupObj.username = $scope.username;
		signupObj.password = $scope.credentials.password;
		signupObj.email =$scope.email;
		signupObj.mobile = $scope.credentials.phone;

		console.log(signupObj);


		$http.post('http://sailsserver.herokuapp.com/auth/signup', signupObj).success(function(resp){
	        console.log(resp);
	        $scope.signupsuccess();
          $state.go("access.verification", {
          'email': resp.data.user.email
        });
	      }).error( function(err) {
	      	console.log(err);
	      	$scope.signuperror();

	      });
         $localStorage.$reset();
      delete $rootScope.id;
      delete $rootScope.follow;
      delete $rootScope.user;
      delete $localStorage.user;
      delete $localStorage.follow;
      delete $localStorage.token;
      delete $localStorage.id;
      delete $localStorage.form1;
      delete $localStorage.form2;
      delete $localStorage.form3;
    }
	};
  $scope.signupsuccess = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent('successfully registered!')
        .position('top right')
      .theme('success-toast')
        .hideDelay(3000)
    );
  };
  	 $scope.signuperror = function() {
     $mdToast.show(
      $mdToast.simple()
        .textContent('EmailId Already Exists')
        .position('top right')
      .theme('error-toast')
        .hideDelay(3000)
    );
  };

  $scope.alert = '';

  $scope.showAlert = function(ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('This is an alert title')
        .content('You can specify some description text in here.')
        .ariaLabel('Password notification')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };
  
  });
var compareTo = function() {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function(modelValue) {
          
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function() {

          ngModel.$validate();
        });
      }
    };
  };

  app.directive("compareTo", compareTo);