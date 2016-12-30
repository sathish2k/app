'use strict';

angular.module('app')
  .controller('LoginCtrl', function ($scope,$state,$http,$localStorage,$rootScope,$stateParams,$location,$mdToast) {


    //Activate
  if($stateParams.token) {
     var obj={};
     obj.token=$stateParams.token;
     obj.id=$stateParams.id;
     $http.post('  /auth/activate', obj).success(function(resp){
     console.log(resp);
     $rootScope.activateerror=resp.message;
     $scope.activateres();
     }).error( function(err) {
     console.log(err)
     $rootScope.activateerror=err.message;
     $scope.activateres();
     })
     }

    $scope.activateres = function() {
    $mdToast.show(
    $mdToast.simple()
    .textContent($rootScope.activateerror)
    .position('top right')
    .theme('error-toast')
    .hideDelay(3000)
    );
    };


//logout
    $scope.logout=function(){
    $localStorage.$reset();
      delete $rootScope.id;
      delete $rootScope.follow;
      delete $rootScope.isfollow;
      delete $rootScope.user;
      delete $localStorage.user;
      delete $localStorage.follow;
      delete $localStorage.token;
      delete $localStorage.id;
      delete $localStorage.form1;
      delete $localStorage.form2;
      delete $localStorage.form3;
      // $location.path('/app/home');
    $state.go('app.index', {}, { reload: true });
    
    }


//sigin
   var signinObj={};
	 $scope.authenticate=function(){
		
   signinObj.email = $scope.credential.email;
	 signinObj.password =$scope.credential.password;
              
   $http.post('https://sailsserver.herokuapp.com/auth/signin', signinObj).success(function(resp){
	 console.log(resp);
   $localStorage.token =resp.token;
   $localStorage.form1=resp.user.form1;
   $rootScope.form1=resp.user.form1;
   $localStorage.form2=resp.user.form2;
   $rootScope.form2=resp.user.form2;
   $localStorage.form3=resp.user.form3;
   $rootScope.form3=resp.user.form3;
	 $localStorage.user =resp.user.username;
   $rootScope.user=resp.user.username;
   $localStorage.id=resp.user.id;
   $rootScope.id=resp.user.id;
   $localStorage.follow=resp.user.following;
   $rootScope.follow=resp.user.following;
   $scope.join();
	 console.log($rootScope.id);
	 console.log("Got response!!!");
	 if($stateParams.id)
     {
        $location.path('/single/' +$stateParams.id)
     }
	else{
	   		$location.path('/home')
	   	}
	      $scope.success();    
	               
	   }).error( function(err) {
           console.log(err);
    $rootScope.loginerror=err.message;
    if(err.message=='Please Verify Your Email'){
       $state.go("access.verification", {
          'email': $scope.credential.email
        });
    }


      $scope.error();
  });

	};
  if($localStorage.token){
  $http({
     url: "https://sailsserver.herokuapp.com/user", 
     method: "GET",
     params: {id:$rootScope.id}  
 }).then(function(res){

    console.log(res);

     $scope.userlogin = res.data;
     $rootScope.userlogin = res.data;


  });
  }
	 $scope.error = function() {
   $mdToast.show(
   $mdToast.simple()
   .textContent($rootScope.loginerror)
   .position('top right')
   .theme('error-toast')
   .hideDelay(3000)
    );
   };
  
   $scope.success = function() {
   $mdToast.show(
   $mdToast.simple()
  .textContent('Welcome'+' '+ $rootScope.user)
   .position('top right')
   .theme('success-toast')
   .hideDelay(3000)
    );
   };
    $scope.join=function(){
    var userjoinobj={};
    userjoinobj.username=$rootScope.user;
    io.socket.get("/user/joinuser",userjoinobj, function (resData, jwRes) {
    console.log('user')
   jwRes.statusCode; // => 200
  console.log(jwRes)
     });
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

    $http.post('https://sailsserver.herokuapp.com/personaldetails/add', personalobj).success(function(resp){

    console.log(resp);

    $scope.personalupdate();
     $localStorage.form1=true;
     $state.go("access.socialdetail")

    });
    }
    $scope.personalupdate=function(){
    $http({
     url: "https://sailsserver.herokuapp.com/user/"+ $rootScope.id, 
     method: "PUT",
     params: {form1:true}  
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

      $http.post('https://sailsserver.herokuapp.com/socialdetails/add', socialobj).success(function(resp){

        console.log(resp);

       $scope.userupdate();
       $localStorage.form2=true;
       $state.go("access.contactdetail")
        
      });
    }
    $scope.userupdate=function(){
    $http({
     url: "https://sailsserver.herokuapp.com/user/"+ $rootScope.id, 
     method: "PUT",
     params: {form2:true}  
    }).then(function(res){

    console.log(res);


    });
    }

    $scope.contactdetail=function(form){
      if(form.$valid){
    var contactobj={};
    contactobj.userid=$rootScope.id;
    contactobj.owner=$rootScope.id;
    contactobj.mobilenumber=$scope.mobilenumber;
    contactobj.otp=$scope.otp;

      $http.post('https://sailsserver.herokuapp.com/contactdetails/add', contactobj).success(function(resp){

        console.log(resp);
      
       $scope.contactupdate();
       $localStorage.form3=true;
        $location.path('/home');
        
      });
    }
}
    $scope.contactupdate=function(){
    $http({
     url: "https://sailsserver.herokuapp.com/user/"+$rootScope.id, 
     method: "PUT",
     params: {form3:true}  
    }).then(function(res){

    console.log(res);


    });
    }

// $scope.getpersonaldetail=function(){
  $http({
   url: "https://sailsserver.herokuapp.com/personaldetails/", 
   method: "GET",
   params: {userid:$rootScope.id}  
  }).then(function(res){

  console.log(res);

  $scope.firstname=res.data[0].firstname;
  $scope.lastname=res.data[0].lastname;
  $scope.about=res.data[0].about;
  $scope.gender=res.data[0].gender;
  $scope.country=res.data[0].country;
  $scope.state=res.data[0].state;
  $scope.pincode=res.data[0].pincode;



  });
    $http({
         url: "https://sailsserver.herokuapp.com/socialdetails/", 
         method: "GET",
         params: {userid:$rootScope.id}  
    }).then(function(res){

        console.log(res);

    $scope.website=res.data[0].website;
    $scope.fburl=res.data[0].fburl;
    $scope.twitterurl=res.data[0].twitterurl;
    $scope.googleurl=res.data[0].googleurl;
    $scope.instagramurl=res.data[0].instagramurl;
    $scope.youtubeurl=res.data[0].youtubeurl;
    $scope.linkedinurl=res.data[0].linkedinurl;


      });

// }

  })
  .run(['$rootScope', '$state', '$localStorage',  function ($rootScope, $state, $localStorage)
    {
           $rootScope.$on('$stateChangeError', function(event) {
         $state.go('app');
        });
           $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
            console.log(fromState.name)
        $state.previous = fromState.name;
    });
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function (event, toState)
        {

              console.log($localStorage.form1)
              console.log($localStorage.form2)
              console.log($localStorage.form3)
              if((toState.data.afterlogin=='true')&&($localStorage.form1&&$localStorage.form2&&$localStorage.form3==true)){
                console.log('gg')
              event.preventDefault();

             $state.go('access.forgot-password');
            
          }
            console.log("START STATE CHANGE");
            if(toState.data.isloggedin == 'true' && $localStorage.token){
            console.log("LOGIN STATE");
            console.log($localStorage.token);

            }else if(toState.data.isloggedin == 'true'&&!$localStorage.token) {
            console.log("UN AUTHORIZED!!!");
             event.preventDefault();
             $state.go('access.signin');
            }
             $rootScope.id=$localStorage.id;
              
             if(toState.data.alreadylogin=='true' && $localStorage.token){
              event.preventDefault();
             $state.go('access.forgot-password');
             }
         



            if($localStorage.token){
              console.log('enter')
              
  
              if(toState.data.grantAccessTo == 'authenticated'&& $localStorage.form1==false){
              event.preventDefault();
             $state.go('access.personaldetail');
            
          }
             else if(toState.data.grantAccessTo == 'authenticated'&& $localStorage.form2==false){
            
            event.preventDefault();
             $state.go('access.socialdetail');
          
          }
           else if(toState.data.grantAccessTo == 'authenticated'&& $localStorage.form3==false){
            event.preventDefault();
             $state.go('access.contactdetail');
            
          }
          
            }

          

          document.body.scrollTop = document.documentElement.scrollTop = 0;
          $("html,body").animate({scrollTop:0},1000);
          $rootScope.user=$localStorage.user;
           if(toState.name=='app.myprofile' && $localStorage.token)
    {
      event.preventDefault();
      $state.go('app.profile',{ 'user':$rootScope.user })
    }
          console.log($rootScope.user)
           window.onload=function(){
            if ($localStorage.token) {
            console.log('loading')
              var joinobj={};
              joinobj.username=$rootScope.user;
              io.socket.post("/user/joinuser",joinobj, function (resData, jwRes) {
               jwRes.statusCode; // => 200
         console.log(jwRes)
          });
            }
            }
            
          $rootScope.follow=$localStorage.follow;
          $rootScope.$state = $state;
         var video;
         video = videojs('video')
         video.dispose()
        
})
 }
 ]);
