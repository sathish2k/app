

var app=angular.module('app')
  .controller('UploadeditCtrl', function ($scope,$http,$rootScope,$stateParams,$mdToast,$state,$location,$state) {
    $scope.tags=[];
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
  $scope.$watch('category', function(newval, oldval) {
    if( newval ) {
      $scope.level2 = $scope.list[newval];
    }
    else {
      $scope.level2 = [];
    }
    
    // delete the dependent selection, if the master changes
    // if( newval !== oldval ) {
    //   $scope.subcategory = null;
    // }
  });


   $http({
     url: "https://sailsserver.herokuapp.com/uploads", 
     method: "GET",
     params: {id:$stateParams.id}  
 }).then(function(res){
   
    console.log(res);
    $scope.Name=res.data.name;
    $scope.type=res.data.type;
    $scope.description=res.data.discription;
    $scope.tags=res.data.tag;
    $scope.personalDetails=res.data.crew;
    $scope.link=res.data.link;
    $scope.category=res.data.categories;
    $scope.subcategory=res.data.subcategories;
    $scope.lang=res.data.language;


  });

	var uploadObj = {};
	$scope.add = function(){
    uploadObj.id=$stateParams.id;
    uploadObj.crew=$scope.personalDetails;
		uploadObj.name = $scope.Name;
		uploadObj.type = $scope.type;
		uploadObj.tag = $scope.tags;
		uploadObj.discription=$scope.description;
		uploadObj.categories=$scope.category;
		uploadObj.subcategories=$scope.subcategory;
		uploadObj.language=$scope.lang;

		console.log(uploadObj);

		$http.post('https://sailsserver.herokuapp.com/uploads/add', uploadObj).success(function(resp){
	        console.log(resp);
          $scope.success();
         
	      }).error( function(err) {
	      	console.log(err);
          $scope.error();
	      });
// $scope.upload.Name=null;
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
        .textContent('successfully updated')
        .position('top')
      .theme('success-toast')
        .hideDelay(3000)
    );
  };

    
    $scope.data = null;
    // $scope.selectedItem = null;
    $scope.searchText = null;
    
    $scope.querySearch = function (searchText) {
      $http({
     url: ' https://sailsserver.herokuapp.com/user/?sort=name ASC', 
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
