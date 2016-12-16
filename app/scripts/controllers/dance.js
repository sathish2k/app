'use strict';

var app=angular.module('app');

  app.controller('DanceCtrl', function($scope,$stateParams,$http,$rootScope) {
 $http({
     url: "https://sailsserver.herokuapp.com/uploads?sort=createdAt DESC", 
     method: "GET",
     params: {subcategories:$stateParams.subcategories,limit:8}  
}).then(function(res){

		console.log(res);

	 	$scope.recentupload = res.data;


	});
$http({
     url: "https://sailsserver.herokuapp.com/uploads?sort=views DESC", 
     method: "GET",
     params: {subcategories:$stateParams.subcategories,limit:8}  
}).then(function(res){

		console.log(res);

	 	$scope.mostviewed = res.data;


	});
$http({
     url: 'https://sailsserver.herokuapp.com/uploads?sort=createdAt DESC', 
     method: "GET",
     params:  {where:{"uploaderid":$rootScope.follow,subcategories:$stateParams.subcategories,limit:8}}  
}).then(function(res){

    console.log(res);
    $scope.youmaylike=res.data;

    
  });
     
   });
