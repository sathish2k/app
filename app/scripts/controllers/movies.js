'use strict';

angular.module('app')
  .controller('MoviesCtrl', function ($scope,$http,$stateParams,$rootScope) {
    $http({
     url: "https://sailsserver.herokuapp.com/uploads?sort=createdAt DESC", 
     method: "GET",
     params: {language:$stateParams.language,categories:$stateParams.categories,limit:8}  
}).then(function(res){

    console.log(res);

    $scope.recentupload = res.data;


  });
$http({
     url: "https://sailsserver.herokuapp.com/uploads?sort=views DESC", 
     method: "GET",
     params: {language:$stateParams.language,categories:$stateParams.categories,limit:8}  
}).then(function(res){

    console.log(res);

    $scope.mostviewed = res.data;


  });
$http({
     url: 'https://sailsserver.herokuapp.com/uploads?sort=createdAt DESC', 
     method: "GET",
     params:  {where:{"uploaderid":$rootScope.follow,language:$stateParams.language,categories:$stateParams.categories,limit:8}}  
}).then(function(res){

    console.log(res);
    $scope.youmaylike=res.data;

    
  });
     

  });
