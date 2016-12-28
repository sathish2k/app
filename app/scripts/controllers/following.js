'use strict';

angular.module('app')
  .controller('FollowingCtrl', function ($scope,$http,$localStorage,$rootScope,$stateParams,$location,$mdToast,$mdDialog) {
 console.log($stateParams.following)
  $http({
     url: "http://sailsserver.herokuapp.com/user", 
     method: "GET",
     params: {"id":$stateParams.id}  
}).then(function(res){

    console.log(res);

    
$rootScope.datafollowing=res.data.following;
   $scope.get();
  })
$scope.isFavorites = function(id) {
       return $rootScope.datafollowing.indexOf(id) !== -1;
   }
  $scope.get=function(){

  	 $scope.users = [];
    $scope.count= 0;
    $scope.usersPerPage =10;
    getResultsPage(1);

    $scope.pagination = {
      current:1
    };

    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage);
    };

   function getResultsPage(pageNumber)  {
    console.log(pageNumber)
        
        $http({
     url: 'http://sailsserver.herokuapp.com/user/?sort=name ASC', 
     method: "GET",
     params: {where:{"id":$rootScope.datafollowing},limit:$scope.usersPerPage,skip:(pageNumber- 1) * $scope.usersPerPage}  
}).then(function(res){

    console.log(res);

    $scope.users = res.data;

  });
    }
      $http({
     url: 'http://sailsserver.herokuapp.com/user' +'/count', 
     method: "GET",
     params:  {where:{"id":$rootScope.datafollowing}}  
}).then(function(res){

		console.log(res);

	 	$scope.count = res.data.count;
    console.log($scope.count);
    $rootScope.results=res.data.count;
	});
}

$scope.follows=function(id){
    var subobj={};
    subobj.id=id;
    subobj.owner=$rootScope.id;
   
    $http.post('http://sailsserver.herokuapp.com/user/follow',subobj).success(function(resp){
      console.log(resp);
       
       $localStorage.follow=resp.userdata.following;
       $rootScope.datafollowing=resp.userdata.following;
       
    }).error(function(err){
      console.log(err);
    });
  
}
  $scope.unfollow=function(id){
   var unsubobj={};
    unsubobj.vidsid=id;
    unsubobj.id=$rootScope.id;
    $http.post('http://sailsserver.herokuapp.com/user/remove',unsubobj).success(function(resp){
      console.log(resp);
       $localStorage.follow=resp.userdata.following;
       $rootScope.datafollowing=resp.userdata.following;
      
    }).error(function(err){
      console.log(err);
    });
  }
   });