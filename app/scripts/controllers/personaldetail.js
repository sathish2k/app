'use strict';

angular.module('app')
  .controller('PersonaldetailCtrl', function ($scope,$http,$localStorage,$rootScope,$stateParams,$location,$mdToast) {
$scope.personaldetail=function(){
var personalobj={};
personalobj.userid=$rootScope.firstlogin;
personalobj.owner=$rootScope.firstlogin;
personalobj.firstname=$scope.firstname;
personalobj.lastname=$scope.lastname;
personalobj.about=$scope.about;
personalobj.gender=$scope.gender;
personalobj.country=$scope.country;
personalobj.state=$scope.state;
personalobj.city=$scope.city;
personalobj.pincode=$scope.pincode;

  $http.post('https://sailsserver.herokuapp.com/personaldetails/add', personalobj).success(function(resp){

    console.log(resp);

   $scope.personalupdade();
    
  });
}
$scope.personalupdade=function(){
	 $http({
     url: "https://sailsserver.herokuapp.com/user/"+ $rootScope.firstlogin, 
     method: "PUT",
     params: {form1:true}  
}).then(function(res){

    console.log(res);


  });
}
$scope.socialdetail=function(){
var socialobj={};
socialobj.userid=$rootScope.firstlogin;
socialobj.owner=$rootScope.firstlogin;
socialobj.website=$scope.website;
socialobj.fburl=$scope.fburl;
socialobj.twitterurl=$scope.twitterurl;
socialobj.googleurl=$scope.googleurl;
socialobj.instagramurl=$scope.instagramurl;
socialobj.youtubeurl=$scope.youtubeurl;
socialobj.linkedinurl=$scope.linkedinurl;

  $http.post('https://sailsserver.herokuapp.com/socialdetails/add', socialobj).success(function(resp){

    console.log(resp);

   $scope.userupdade();
    
  });
}
$scope.userupdade=function(){
	 $http({
     url: "https://sailsserver.herokuapp.com/user/"+ $rootScope.firstlogin, 
     method: "PUT",
     params: {form2:true}  
}).then(function(res){

    console.log(res);


  });
}

$scope.contactdetail=function(){
var contactobj={};
contactobj.userid=$rootScope.firstlogin;
contactobj.owner=$rootScope.firstlogin;
contactobj.mobilenumber=$scope.mobilenumber;
contactobj.otp=$scope.otp;

  $http.post('https://sailsserver.herokuapp.com/contactdetails/add', contactobj).success(function(resp){

    console.log(resp);

   $scope.contactupdate();
    
  });
}

$scope.contactupdate=function(){
	 $http({
     url: "https://sailsserver.herokuapp.com/user/"+$rootScope.firstlogin, 
     method: "PUT",
     params: {form3:true}  
}).then(function(res){

    console.log(res);


  });
}
});
