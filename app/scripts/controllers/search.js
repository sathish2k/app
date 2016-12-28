'use strict';

angular.module('app')
   .controller('SearchCtrl', function ($scope,$stateParams,$http,$rootScope) {
    $scope.uploads = [];
    $scope.count= 0;
    $scope.usersPerPage =10;
    getResultsPage(1);

    $scope.pagination = {
      current:1
    };

$scope.search=function(nestedsearch){
  $stateParams.contains=nestedsearch;
  getResultsPage(1);

}

    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage);
    };

   function getResultsPage(pageNumber)  {
    console.log(pageNumber)
        
        $http({
     url: 'https://sailsserver.herokuapp.com/uploads/?sort=name ASC', 
     method: "GET",
     params: {where:{"name":{"contains":$stateParams.contains}},limit:$scope.usersPerPage,skip:(pageNumber- 1) * $scope.usersPerPage}  
}).then(function(res){

    console.log(res);

    $scope.uploads = res.data;

  });
    }
      $http({
     url: 'https://sailsserver.herokuapp.com/uploads' +'/count', 
     method: "GET",
     params:  {where:{"name":{"contains":$stateParams.contains}}}  
}).then(function(res){

		console.log(res);

	 	$scope.count = res.data.count;
    console.log($scope.count);
    $rootScope.results=res.data.count;
	});
   });

