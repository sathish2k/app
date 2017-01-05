'use strict';

angular.module('app');
 app.factory('verifyDelete', function($mdDialog) {
  return function(user) {
    var confirm = $mdDialog.confirm()
      .title('Are you sure!, Do you want to Delete')
      .content('The Deleted Videos No Longer Available')
      .ariaLabel('Delete User')
      .ok('Delete Video')
      .cancel('Cancel');
    return $mdDialog.show(confirm);
  }
})
 app.controller('ProfilevideoCtrl', function ($scope,$http,$localStorage,$rootScope,$stateParams,$location,$mdToast,$mdDialog,verifyDelete) {
  $http({
     url: "https://sailsserver.herokuapp.com/uploads", 
     method: "GET",
     params: {uploadername:$stateParams.user,limit:10}  
}).then(function(res){
$scope.videos=res.data;
    console.log(res);
});
$http({
     url: 'https://sailsserver.herokuapp.com/uploads/count', 
     method: "GET",
     params:{uploadername:$stateParams.user}  
}).then(function(res){

    console.log(res);

    $scope.count = res.data.count;
console.log($scope.count)
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
app.directive('starRating', function () {
    return {
        scope: {
            rating: '=',
            maxRating: '@',
            readOnly: '@',
            click: "&",
            mouseHover: "&",
            mouseLeave: "&"
        },
        restrict: 'EA',
        template:
            "<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer;' ng-repeat='idx in maxRatings track by $index'> \
                    <img style='width:25px;height:24px;' ng-src='{{((hoverValue + _rating) <= $index) && \"./images/star.png\" || \"./images/starfilled.png\"}}' \
                    ng-Click='isolatedClick($index + 1)' \
                    ng-mouseenter='isolatedMouseHover($index + 1)' \
                    ng-mouseleave='isolatedMouseLeave($index + 1)'></img> \
            </div>",
        compile: function (element, attrs) {
            if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
                attrs.maxRating = '5';
            };
        },
        controller: function ($scope, $element, $attrs) {
            $scope.maxRatings = [];

            for (var i = 1; i <= $scope.maxRating; i++) {
                $scope.maxRatings.push({});
            };

            $scope._rating = $scope.rating;
      
      $scope.isolatedClick = function (param) {
        if ($scope.readOnly == 'true') return;

        $scope.rating = $scope._rating = param;
        $scope.hoverValue = 0;
        $scope.click({
          param: param
        });
      };

      $scope.isolatedMouseHover = function (param) {
        if ($scope.readOnly == 'true') return;

        $scope._rating = 0;
        $scope.hoverValue = param;
        $scope.mouseHover({
          param: param
        });
      };

      $scope.isolatedMouseLeave = function (param) {
        if ($scope.readOnly == 'true') return;

        $scope._rating = $scope.rating;
        $scope.hoverValue = 0;
        $scope.mouseLeave({
          param: param
        });
      };
        }
    };
//end of rating plugin//



   });