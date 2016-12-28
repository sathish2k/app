'use strict';

angular.module('app')
.controller('MainCtrl', function ($scope,$http,$localStorage,$rootScope) {

 $scope.dataArray = [
      {
        src: 'https://www.travelexcellence.com/images/movil/La_Paz_Waterfall.jpg'
      },
      {
        src: 'http://www.parasholidays.in/blog/wp-content/uploads/2014/05/holiday-tour-packages-for-usa.jpg'
      },
      {
        src: 'http://clickker.in/wp-content/uploads/2016/03/new-zealand-fy-8-1-Copy.jpg'
      }
    ];

    $scope.showMobileMainHeader = true;
     $http({
     url: "https://sailsserver.herokuapp.com/uploads?sort=createdAt DESC", 
     method: "GET",
     params: {categories:'Short Film',limit:8}  
}).then(function(res){

    console.log(res);

    $scope.movies = res.data;


  });
 $http({
     url: "https://sailsserver.herokuapp.com/uploads?sort=createdAt DESC", 
     method: "GET",
     params: {categories:'Music',limit:8}  
}).then(function(res){

    console.log(res);

    $scope.music = res.data;


  });
$http({
     url: "https://sailsserver.herokuapp.com/uploads?sort=createdAt DESC", 
     method: "GET",
     params: {categories:'Dance',limit:8}  
}).then(function(res){

    console.log(res);

    $scope.dances = res.data;


  });
if($localStorage.token){
//   $http({
//      url: " /user", 
//      method: "GET",
//      params: {id:$rootScope.id}  
// }).then(function(res){

//     console.log(res);
    
//     $rootScope.follow=res.data.following;
//     console.log($rootScope.userfollow)
//     $scope.get();
//   });
  
 // $scope.get=function(){

$http({
     url: 'https://sailsserver.herokuapp.com/uploads?sort=createdAt DESC', 
     method: "GET",
     params:  {where:{"uploaderid":$rootScope.follow,limit:8}}  
}).then(function(res){

    console.log(res);
    $scope.youmaylike=res.data;

    
  });
// }
      

  }
  });
