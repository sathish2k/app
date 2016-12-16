'use strict';

angular.module('app')
  .controller('RegisterCtrl', function ($scope,$state,$mdDialog,$http,$localStorage,$rootScope,$stateParams,$location,$mdToast) {
   
  	var signupObj = {};
	$scope.register = function(){
		

		signupObj.username = $scope.credentials.username;
		signupObj.password = $scope.credentials.password;
		signupObj.email =$scope.credentials.email;
		signupObj.mobile = $scope.credentials.phone;

		console.log(signupObj);


		$http.post(' https://sailsserver.herokuapp.com/auth/signup', signupObj).success(function(resp){
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
