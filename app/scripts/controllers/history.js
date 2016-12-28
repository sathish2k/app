
'use strict';

angular.module('app')
  .controller('HistoryCtrl', function ($scope,$mdDialog,$http,$stateParams,$rootScope) {
     $scope.uploads = [];
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
  	if($rootScope.user){
    $http({
     url: "https://sailsserver.herokuapp.com/history?sort=updatedAt DESC", 
     method: "GET",
     params: {username:$rootScope.user,limit:$scope.usersPerPage,skip:(pageNumber- 1) * $scope.usersPerPage}  
}).then(function(resp){

    console.log(resp);

    $scope.uploads=resp.data;
    console.log($scope.uploads);


  });
};
}
 $http({
     url: 'https://sailsserver.herokuapp.com/history' +'/count', 
     method: "GET",
     params: {username:$rootScope.user}  
}).then(function(res){

    console.log(res);

    $scope.count = res.data.count;
    console.log($scope.count);
  });
 $scope.delete=function(){
    var obj={username:$rootScope.user};
    $http.post(' /history/delete',obj).success(function(resp){
          console.log(resp);
          $scope.reload();
        }).error( function(err) {
          console.log(err);
        });
  };
$scope.reload=function(){
	$http({
     url: "https://sailsserver.herokuapp.com/history?sort=updatedAt DESC", 
     method: "GET",
     params: {username:$rootScope.user}  
}).then(function(resp){

    console.log(resp);

    $scope.uploads=resp.data;
    console.log($scope.uploads);


  });
};
$scope.alert = '';

  $scope.showConfirm = function(ev) {
    var confirm = $mdDialog.confirm()
      .title('Clear History')
      .content('Are You sure?')
      .ariaLabel('Lucky day')
      .ok('ok')
      .cancel('cancel')
       .targetEvent(ev);

    $mdDialog.show(confirm).then(function() {
      $scope.delete();
    }, function() {
      $scope.alert = 'You decided to keep your debt.';
    });
  };
  

  $scope.deletesingle=function(id){
  $http({
    url: 'https://sailsserver.herokuapp.com/history', 
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
     url: "https://sailsserver.herokuapp.com/history?sort=updatedAt DESC", 
     method: "GET",
     params: {username:$rootScope.user}  
}).then(function(resp){

    console.log(resp);

    $scope.uploads=resp.data;
    console.log($scope.uploads);


  });
}
  });


