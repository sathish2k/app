angular.module('app')
  .controller('SettingsCtrl', function ($scope,$http,$localStorage,$rootScope,$stateParams,$location,$mdToast) {
  	
  $http({
     url: "https://sailsserver.herokuapp.com/user", 
     method: "GET",
     params: {id:$rootScope.id}  
 }).then(function(res){

    console.log(res);
    $scope.profilepic=res.data;
    $scope.firstname=res.data.personaldetails[0].firstname;
  $scope.lastname=res.data.personaldetails[0].lastname;
  
  $scope.gender=res.data.personaldetails[0].gender;
  $scope.country=res.data.personaldetails[0].country;
  $scope.state=res.data.personaldetails[0].state;
  $scope.pincode=res.data.personaldetails[0].pincode;
	$scope.about=res.data.personaldetails[0].about;
	$scope.mobilenumber=res.data.contactdetails[0].mobilenumber;
	$scope.website=res.data.socialdetails[0].website;
	$scope.fburl=res.data.socialdetails[0].fburl;
	$scope.twitterurl=res.data.socialdetails[0].twitterurl;
	$scope.googleurl=res.data.socialdetails[0].googleurl;
	$scope.instagramurl=res.data.socialdetails[0].instagramurl;
	$scope.youtubeurl=res.data.socialdetails[0].youtubeurl;
	$scope.linkedinurl=res.data.socialdetails[0].linkedinurl;
	 $scope.username = res.data.username;
	 $scope.email = res.data.email;
   $rootScope.blockeduser=res.data.blocked;
$scope.showblocklist();

  });
$scope.showblocklist=function(){
 $http({
     url: "https://sailsserver.herokuapp.com/user", 
     method: "GET",
     params: {where:{"id":$rootScope.blockeduser}} 

 }).then(function(res){
console.log(res)
   $scope.blockinglist=res.data;
})
}

  $scope.personaldetail=function(){
    var personalobj={};
    personalobj.userid=$rootScope.id;
    personalobj.owner=$rootScope.id;
    personalobj.firstname=$scope.firstname;
    personalobj.lastname=$scope.lastname;
    personalobj.about=$scope.about;
    personalobj.gender=$scope.gender;
    personalobj.country=$scope.country;
    personalobj.state=$scope.state;
    personalobj.city=$scope.city;
    personalobj.pincode=$scope.pincode;

    $http.post(' https://sailsserver.herokuapp.com/personaldetails/add', personalobj).success(function(resp){

    console.log(resp);
   $scope.contactdetail();
   $scope.userupdate();
   

    });
    }
     $scope.contactdetail=function(){
    var contactobj={};
    contactobj.userid=$rootScope.id;
    contactobj.owner=$rootScope.id;
    contactobj.mobilenumber=$scope.mobilenumber;
    console.log($scope.mobilenumber)
    contactobj.otp=$scope.otp;

      $http.post(' https://sailsserver.herokuapp.com/contactdetails/add', contactobj).success(function(resp){

        console.log(resp);
        
      });
    }
     $scope.userupdate=function(){
    $http({
     url: "https://sailsserver.herokuapp.com/user/"+ $rootScope.id, 
     method: "PUT",
     params: {email:$scope.email,username:$scope.username}  
    }).then(function(res){

    console.log(res);


    });
    }



     $scope.socialdetail=function(){
    var socialobj={};
    socialobj.userid=$rootScope.id;
    socialobj.owner=$rootScope.id;
    socialobj.website=$scope.website;
    socialobj.fburl=$scope.fburl;
    socialobj.twitterurl=$scope.twitterurl;
    socialobj.googleurl=$scope.googleurl;
    socialobj.instagramurl=$scope.instagramurl;
    socialobj.youtubeurl=$scope.youtubeurl;
    socialobj.linkedinurl=$scope.linkedinurl;

      $http.post(' https://sailsserver.herokuapp.com/socialdetails/add', socialobj).success(function(resp){

        console.log(resp);

      
        
      });
    }

   $scope.block=function(){
    console.log($scope.blockid)
    var blockobj={};
    blockobj.id=$scope.blockid;
    blockobj.owner=$rootScope.id;
    
    
    $http.post('https://sailsserver.herokuapp.com/user/block',blockobj).success(function(resp){
      console.log(resp);
       $scope.showblocklist();
    }).error(function(err){
      console.log(err);
    });
  }

  

  $scope.unblock=function(id){
   var unblockobj={};
   console.log(id)
    unblockobj.vidsid=id;
    unblockobj.id=$rootScope.id;
    $http.post('https://sailsserver.herokuapp.com/user/removeblock',unblockobj).success(function(resp){
      console.log(resp);
      $scope.showblocklist();
    }).error(function(err){
      console.log(err);
    });
  }


 $scope.data = null;
    $scope.selectedItem = null;
    $scope.searchText = null;
    
    $scope.querySearch = function (searchText) {
      $http({
     url: 'https://sailsserver.herokuapp.com/user/?sort=name ASC', 
     method: "GET",
     params: {where:{"username":{"contains":searchText} } } }).then(function(result){
      console.log(result)
          $scope.data = result.data;
          return result.data;
        });
    }

$scope.uploadFile = function(files){
        console.log(files);
        var fd = new FormData();

        fd.append("file", files[0]);

        $http.post('https://sailsserver.herokuapp.com/user/uploadavatar', fd, {
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity          
        }).then(function(res){
            console.log(res);
           
        });

    };
     $scope.updatepass=function(){
     console.log('pass')
     var obj={};
     obj.id=$rootScope.id;
     obj.oldpassword=$scope.oldpassword;
     obj.newpassword=$scope.newpassword;
     console.log($scope.oldpassword)
      console.log($scope.newpassword)
     
     $http.post(' https://sailsserver.herokuapp.com/auth/updatepass', obj).success(function(resp){
     console.log(resp);
     $scope.oldpassword='';
     $scope.newpassword='';
     $scope.confirm_password='';
     $rootScope.passupdated=resp.message;
     $scope.passupdated();
     
     
     }).error( function(err) {
     console.log(err)
    
     })
     
 }
 $scope.passupdated = function() {
    $mdToast.show(
    $mdToast.simple()
    .textContent($rootScope.passupdated)
    .position('top right')
    .theme('error-toast')
    .hideDelay(3000)
    );
    };

 
       
  });