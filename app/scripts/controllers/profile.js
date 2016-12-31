'use strict';

var app=angular.module('app');
 app.factory('verifyDelete', function($mdDialog) {
  return function(user) {
    var confirm = $mdDialog.confirm()
      .title('Are you sure!, Do you want to Delete')
      .content('The Deleted Videos No Longer Available')
      .ariaLabel('Delete User')
      .ok('Delete User')
      .cancel('Cancel');
    return $mdDialog.show(confirm);
  }
})
  app.controller('ProfileCtrl', function ($scope,$state,$http,$localStorage,$rootScope,$stateParams,$location,$mdToast,$mdDialog) {
 


  $http({
     url: "https://sailsserver.herokuapp.com/user", 
     method: "GET",
     params: {username:$stateParams.user}  
}).then(function(res){

    console.log(res);

    $scope.profile = res.data;
    $rootScope.profileid=res.data[0].id;
    
    $scope.videos=res.data[0].videos;
    
   $rootScope.userfollow=res.data[0].following;
   $rootScope.userfollowers=res.data[0].followers;
    console.log($rootScope.userfollow)
    if($rootScope.user==res.data[0].username){
    $scope.get();
  }
  });


$http({
     url: 'https://sailsserver.herokuapp.com/uploads/count', 
     method: "GET" ,
     params:{uploadername:$stateParams.user}
}).then(function(res){

    console.log(res);

    $scope.videoscount = res.data.count;
    console.log($scope.videoscount);
  });
$scope.get=function(){

$http({
     url: 'https://sailsserver.herokuapp.com/uploads?sort=createdAt DESC', 
     method: "GET",
     params:  {where:{"uploaderid":$rootScope.userfollow}}  
}).then(function(res){

    console.log(res);
    $scope.followersvideo=res.data;
console.log($rootScope.follow)
    
  });
}
var postobj={};
postobj.username=$stateParams.user;

$http.post('https://sailsserver.herokuapp.com/user/show',postobj).then(function(res){
  console.log(res)
  $scope.followingcount=res.data.following;
   $scope.followerscount=res.data.followers;
})

$scope.delete = function(user) {
    verifyDelete(user).then(function() {
      $http({
    url: 'https://sailsserver.herokuapp.com/uploads', 
    method: "DELETE",
    params: {id: user}
   }).then(function(res)
  {
  // $scope.get();
    console.log(res);
    $http({
    url: 'https://sailsserver.herokuapp.com/history/userdelete', 
    method: "DELETE",
    params: {historyid: user}
   }).then(function(res)
  {
    console.log(res);
    
  
  });
   
  
  });
    });
  }

// $scope.showConfirm = function(ev) {
    
//     var confirm = $mdDialog.confirm()
//           .title('Are you sure!, Do you want to Delete')
//           .textContent('The Deleted Videos No Longer Available')
//           .targetEvent(ev)
//           .ok('Ok')
//           .cancel('Cancel');
// $scope.del=function(id){
//     $mdDialog.show(confirm).then(function() {
//       $scope.status = 'Deleted Succesfully';
//     }, function() {
//       $scope.status = 'Cancelled';
//     });
//   }
//   };
  if($rootScope.id!=$rootScope.profileid && $localStorage.token){
var fobj={};
  console.log('follow')
    fobj.vidsid=$stateParams.user;
    fobj.id=$rootScope.id;
    console.log(fobj)
    $http.post('https://sailsserver.herokuapp.com/user/checkprofileuser',fobj).success(function(resp){
      console.log(resp);
      $rootScope.isfollow=resp.user;
    }).error(function(err){
      console.log(err);
    });
}
$scope.follow=function(){
    var subobj={};
    subobj.id=$rootScope.profileid;
    subobj.owner=$rootScope.id;
   
    $http.post('https://sailsserver.herokuapp.com/user/follow',subobj).success(function(resp){
      console.log(resp);
       $rootScope.isfollow=resp.user;
       $localStorage.follow=resp.userdata.following;
       $rootScope.follow=resp.userdata.following;
       $scope.followupdate();
    }).error(function(err){
      console.log(err);
    });
  
}
  $scope.unfollow=function(){
   var unsubobj={};
    unsubobj.vidsid=$rootScope.profileid;
    unsubobj.id=$rootScope.id;
    $http.post('https://sailsserver.herokuapp.com/user/remove',unsubobj).success(function(resp){
      console.log(resp);
       $rootScope.isfollow=resp.user;
       $localStorage.follow=resp.userdata.following;
       $rootScope.follow=resp.userdata.following;
       $scope.followupdate();
    }).error(function(err){
      console.log(err);
    });
  }
$scope.followupdate=function(){
var postobj={};
postobj.username=$stateParams.user;

$http.post('https://sailsserver.herokuapp.com/user/show',postobj).then(function(res){
  console.log(res)
  $scope.followingcount=res.data.following;
   $scope.followerscount=res.data.followers;
})
}
});
 