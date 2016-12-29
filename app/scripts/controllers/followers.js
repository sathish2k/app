'use strict';

angular.module('app')
  .controller('FollowersCtrl', function ($scope,$http,$localStorage,$rootScope,$stateParams,$location,$mdToast,$mdDialog) {
  $http({
     url: "https://sailsserver.herokuapp.com/user", 
     method: "GET",
     params: {"id":$stateParams.id}  
}).then(function(res){

    console.log(res);

    
$rootScope.datafollowers=res.data.followers;
$rootScope.datasfollowing=res.data.following;
   $scope.get();
  })
$scope.isFavorites = function(id) {
      if ($rootScope.id==$stateParams.id) {
       return $rootScope.datasfollowing.indexOf(id) !== -1;
     }
     else{
      return $localStorage.follow.indexOf(id) !== -1;
     }
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
     url: 'https://sailsserver.herokuapp.com/user/?sort=name ASC', 
     method: "GET",
     params: {where:{"id":$rootScope.datafollowers},limit:$scope.usersPerPage,skip:(pageNumber- 1) * $scope.usersPerPage}  
}).then(function(res){

    console.log(res);

    $scope.users = res.data;

  });
    }
      $http({
     url: 'https://sailsserver.herokuapp.com/user' +'/count', 
     method: "GET",
     params:  {where:{"id":$rootScope.datafollowers}}  
}).then(function(res){

		console.log(res);

	 	$scope.count = res.data.count;
    console.log($scope.count);
    $rootScope.results=res.data.count;
	});
}

$scope.follow=function(id){
    var subobj={};
    subobj.id=id;
    subobj.owner=$rootScope.id;
   
    $http.post('https://sailsserver.herokuapp.com/user/follow',subobj).success(function(resp){
      console.log(resp);
       
       $localStorage.follow=resp.userdata.following;
       $rootScope.datasfollowing=resp.userdata.following;
    }).error(function(err){
      console.log(err);
    });
  
}
  $scope.unfollow=function(id){
   var unsubobj={};
    unsubobj.vidsid=id;
    unsubobj.id=$rootScope.id;
    $http.post('https://sailsserver.herokuapp.com/user/remove',unsubobj).success(function(resp){
      console.log(resp);
       $localStorage.follow=resp.userdata.following;
       $rootScope.datasfollowing=resp.userdata.following;
      
    }).error(function(err){
      console.log(err);
    });
  }
   });