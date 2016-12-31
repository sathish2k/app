

var app=angular.module('app')
  .controller('UploadCtrl', function ($scope,$http,$rootScope,$mdToast,$state,$location,$state,$mdConstant) {
     // $scope.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
    $scope.tags = [];

    // Any key code can be used to create a custom separator
    var semicolon = 186;
    var tab = 9;
    $scope.Keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA, semicolon,$mdConstant.KEY_CODE.TAB, tab];
    
  	$scope.list = {
    "Short Film": [
      "Adventure",
      "Animation",
      "Biography",
      "Childern's Film",
      "Comedy",
      "Drama",
      "Erotic",
      "Fantasy",
      "Horror",
      "Mystery",
      "Romantic",
      "Teen",
      "Thriller",
      "Others"
    ],
 
     "Music": [
      "Blues",
      "Bhajans",
      "Carnatic",
      "Classical",
      "Folk",
      "Hindustani",
      "Mixed",
      "Jazz",
      "Light Classical",
      "Patriotic",
      "Popular",
      "Western Classical",
      "Others"
    ],
      "Dance": [
      "Ballet",                                             
      "Belly Dance",
      "Bangara", 
      "Break Dance",
      "Classical",                                             
      "Folk",
      "Hiphop", 
      "Kathak", 
      "Kathakali",
      "Mixed",                                             
      "Salsa",
      "Street Dance",
      "Others"
    ]
  };
  $scope.$watch('upload.category', function(newval, oldval) {
    if( newval ) {
      $scope.level2 = $scope.list[newval];
    }
    else {
      $scope.level2 = [];
    }
    
    // delete the dependent selection, if the master changes
    if( newval !== oldval ) {
      $scope.upload.sub = null;
    }
  });

	var uploadObj = {};
	$scope.add = function(form){
    if (form.$valid) {
      
   
		uploadObj.owner=$rootScope.id;
    uploadObj.crew=$scope.personalDetails;
    uploadObj.rating;
    uploadObj.usercount;
    uploadObj.views;
    uploadObj.approval;
    uploadObj.uploaderid=$rootScope.id;
    uploadObj.uploadername=$rootScope.user;
		uploadObj.name = $scope.upload.Name;
		uploadObj.type = $scope.upload.type;
		uploadObj.link =$scope.upload.link;
		uploadObj.tag = $scope.tags;
		uploadObj.discription=$scope.upload.description;
		uploadObj.categories=$scope.upload.category;
		uploadObj.subcategories=$scope.upload.sub;
		uploadObj.language=$scope.upload.lang;
    
  
		

		console.log(uploadObj);

		$http.post('https://sailsserver.herokuapp.com/uploads', uploadObj).success(function(resp){
	        console.log(resp);
           $state.go('app.afterupload');
          $scope.success();
         
	      }).error( function(err) {
	      	console.log(err);
          $scope.error();
	      });
// $scope.upload.Name=null;
}
	};
   $scope.error = function() {
   $mdToast.show(
      $mdToast.simple()
        .textContent('incorrect credentials')
        .position('top')
      .theme('error-toast')
        .hideDelay(3000)
    );
  };
  
  $scope.success = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent('your video is sent for approval')
        .position('top')
      .theme('success-toast')
        .hideDelay(3000)
    );
  };

    
    $scope.data = null;
    $scope.selectedItem = null;
    
    
    $scope.querySearch = function (searchText) {
      console.log(searchText)
      $http({
     url: 'https://sailsserver.herokuapp.com/user/?sort=name ASC', 
     method: "GET",
     params: {where:{"username":{"contains":searchText} } } }).then(function(result){
      console.log(result)
          $scope.data = result.data;
          return result.data;
        });
    }
 $scope.personalDetails = [
        ];
    
        $scope.addNew = function(personalDetail){
            $scope.personalDetails.push({ 
                'name': "", 
                'username': "",
                'role': "",
            });
        };
    
        $scope.remove = function(){
            var newDataList=[];
            $scope.selectedAll = false;
            angular.forEach($scope.personalDetails, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);
                }
            }); 
            $scope.personalDetails = newDataList;
        };
    
    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.personalDetails, function(ctrl) {
            personalDetail.selected = $scope.selectedAll;
        });
    };    
    
   
  });
