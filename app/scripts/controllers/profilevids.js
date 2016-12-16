'use strict';

angular.module('app')
  .controller('ProfilevideoCtrl', function ($scope,$http,$localStorage,$rootScope,$stateParams,$location,$mdToast,$mdDialog) {
  $http({
     url: "https://sailsserver.herokuapp.com/uploads", 
     method: "GET",
     params: {uploadername:$stateParams.user}  
}).then(function(res){
$scope.videos=res.data;
    console.log(res);

   
  });


$scope.del=function(id){
  $http({
    url: 'https://sailsserver.herokuapp.com/uploads', 
    method: "DELETE",
    params: {id: id}
   }).then(function(res)
  {
    console.log(res);
    $scope.get();
  
  });

};
$scope.get=function(){

 $http({
     url: "https://sailsserver.herokuapp.com/uploads", 
     method: "GET",
     params: {uploadername:$stateParams.user}  
}).then(function(res){
$scope.videos=res.data;
    console.log(res);

   
  });
}
  });
