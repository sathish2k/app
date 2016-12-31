'use strict';

angular.module('app')
  .controller('ProfilevideoCtrl', function ($scope,$http,$localStorage,$rootScope,$stateParams,$location,$mdToast,$mdDialog,verifyDelete) {
  $http({
     url: "https://sailsserver.herokuapp.com/uploads", 
     method: "GET",
     params: {uploadername:$stateParams.user,limit:10}  
}).then(function(res){
$scope.videos=res.data;
    console.log(res);

   
  });


$scope.del=function(user){
  verifyDelete(user).then(function() {
  $http({
    url: 'https://sailsserver.herokuapp.com/uploads', 
    method: "DELETE",
    params: {id: user}
   }).then(function(res)
  {
  $scope.get();
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
};

$scope.get=function(){

 $http({
     url: "https://sailsserver.herokuapp.com/uploads", 
     method: "GET",
     params: {uploadername:$stateParams.user,limit:10}  
}).then(function(res){
$scope.videos=res.data;
    console.log(res);

   
  });
}
$scope.videos=[];
$scope.searchvideo='';
$scope.page=1;
$scope.count=0;
$scope.search=function(){
console.log($scope.searchvideo)

  $http({
     url: 'https://sailsserver.herokuapp.com/uploads/?sort=name ASC', 
     method: "GET",
     params: {where:{"name":{"contains":$scope.searchvideo},"uploadername":$stateParams.user},limit:10}  
}).then(function(res){

    console.log(res);

    $scope.videos = res.data;
console.log($scope.videos)
  });

$http({
     url: 'https://sailsserver.herokuapp.com/uploads/count', 
     method: "GET",
     params: {where:{"name":{"contains":$scope.searchvideo},"uploadername":$stateParams.user}}  
}).then(function(res){

    console.log(res);

    $scope.count = res.data.count;
console.log($scope.count)
  });

}


$scope.more=function(){

  $scope.page++;
$http({
     url: 'https://sailsserver.herokuapp.com/uploads/?sort=name ASC', 
     method: "GET",
     params: {where:{"name":{"contains":$scope.searchvideo},"uploadername":$stateParams.user},limit:10,skip:($scope.page-1)*10}  
}).then(function(res){

    console.log(res);
 for(var i=0; i<res.data.length;i++){
        $scope.videos.push(res.data[i])
       
      }
   
console.log($scope.videos)
  });

$http({
     url: 'https://sailsserver.herokuapp.com/uploads/count', 
     method: "GET",
     params: {where:{"name":{"contains":$scope.searchvideo},"uploadername":$stateParams.user}}  
}).then(function(res){

    console.log(res);

    $scope.count = res.data.count;
console.log($scope.count)
  });
}

  });
