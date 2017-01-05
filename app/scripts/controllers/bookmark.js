
'use strict';

angular.module('app')
  .controller('BookmarkCtrl', function ($scope,$mdDialog,$http,$stateParams,$rootScope) {
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
     url: "https://sailsserver.herokuapp.com/bookmark?sort=updatedAt DESC", 
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
     url: 'https://sailsserver.herokuapp.com/bookmark' +'/count', 
     method: "GET",
     params: {username:$rootScope.user}  
}).then(function(res){

    console.log(res);

    $scope.count = res.data.count;
    console.log($scope.count);
  });
 
  });


