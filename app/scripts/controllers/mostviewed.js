'use strict';

angular.module('app')
   app.controller('MostviewedCtrl', function($scope,$stateParams,$http) {
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
        
        $http({
     url: 'https://sailsserver.herokuapp.com/uploads/?sort=views DESC', 
     method: "GET",
     params: {language:$stateParams.language,categories:$stateParams.categories,limit:$scope.usersPerPage,skip:(pageNumber- 1) * $scope.usersPerPage}  
}).then(function(res){

    console.log(res);

    $scope.uploads = res.data;
  });
    }
      $http({
     url: 'https://sailsserver.herokuapp.com/uploads' +'/count', 
     method: "GET",
     params: {language:$stateParams.language,categories:$stateParams.categories}  
}).then(function(res){

		console.log(res);

	 	$scope.count = res.data.count;
    console.log($scope.count);
	});
     
   });
