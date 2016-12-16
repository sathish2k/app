'use strict';

var app=angular.module('app');

  app.controller('SingleCtrl', function($scope,$stateParams,$http,$location,$localStorage,$rootScope) {
    if($localStorage.token){
  var fobj={};
  console.log('follow')
    fobj.vidsid=$stateParams.id;
    fobj.id=$rootScope.id;
    console.log(fobj)
    $http.post('https://sailsserver.herokuapp.com/user/checkuser',fobj).success(function(resp){
      console.log(resp);
      $rootScope.isfollow=resp.user;
    }).error(function(err){
      console.log(err);
    });
}
    $scope.url = $location.absUrl();
  
 $http({
     url: "https://sailsserver.herokuapp.com/uploads", 
     method: "GET",
     params: {id:$stateParams.id}  
}).then(function(res){
  console.log(res);

  $scope.upload = res.data;
  $rootScope.history=res.data;
  $rootScope.$state.current.data.title=res.data.name;
  $rootScope.metatag=res.data.tag;
  $rootScope.metadescription=res.data.discription;
  $rootScope.average=$rootScope.rating/$rootScope.usercount;
  $rootScope.rating=res.data.rating;
  $rootScope.usercount=res.data.usercount;
  $rootScope.views=res.data.views;
  $rootScope.uservideo=res.data.uploadername;
  $rootScope.userid=res.data.id;
  $rootScope.categories=res.data.categories;
  $rootScope.uploaderid=res.data.uploaderid;
  $rootScope.link=res.data.link;
  console.log($rootScope.link);
 

  var video=videojs('video', {

      controls: true,


      
      autoplay:false,
      
      techOrder:  ["youtube"],
      width:"640",
       height:"264",
      
      sources: [{ "type": "video/youtube", "src": $rootScope.link}],
      plugins: {
        videoJsResolutionSwitcher: {
          default: 'low',
          dynamicLabel:false
        }
      },

     
    });

      $(".vjs-big-play-button").on("click", function(){
      $(this).hide();
      });
      $(".vjs-poster").on("click", function(){
      $(".vjs-big-play-button").hide();
      });
    
      video.on('pause', function() {
        
      $(".vjs-big-play-button").show();
})

  video.on('play', function() {
       
      $(".vjs-big-play-button").hide();
})

   video.on('ended', function() {
        
        video.currentTime(0);
      $(".vjs-big-play-button").show();
})

video.on('resolutionchange', function() {
        console.log('source changed')
      
})

  $scope.link();
   $scope.views();
   $scope.uservideo();
   $scope.relcat();
   $scope.history();
});
$scope.link=function(){
console.log($rootScope.link);
   
 }
 $scope.follow=function(){
    var subobj={};
    subobj.id=$rootScope.uploaderid;
    subobj.owner=$rootScope.id;
    if($localStorage.token){
    $http.post('https://sailsserver.herokuapp.com/user/follow',subobj).success(function(resp){
      console.log(resp);
       $rootScope.isfollow=resp.user;
       $localStorage.follow=resp.userdata.following;
       $rootScope.follow=resp.userdata.following;
       $scope.notify();
       $scope.savedata();
    }).error(function(err){
      console.log(err);
    });
  }
  else
    $location.path('auth/signin/' +$stateParams.id);
  }

  $scope.unfollow=function(){
   var unsubobj={};
    unsubobj.vidsid=$rootScope.uploaderid;
    unsubobj.id=$rootScope.id;
    $http.post('https://sailsserver.herokuapp.com/user/remove',unsubobj).success(function(resp){
      console.log(resp);
       $rootScope.isfollow=resp.user;
       $localStorage.follow=resp.userdata.following;
       $rootScope.follow=resp.userdata.following;
    }).error(function(err){
      console.log(err);
    });
  }

$scope.notify=function(){
  var notifyobj={};
  notifyobj.userid=$rootScope.id;
  notifyobj.ownerid=$rootScope.uservideo;
  notifyobj.message=$rootScope.user+" "+'following';
  notifyobj.username=$rootScope.user;
  io.socket.post("/user/notify",notifyobj, function (resData, jwRes) {
  console.log(jwRes)
  
 
});
}

$scope.savedata=function(){
   var notifyobj={};
  notifyobj.userid=$rootScope.id;
  notifyobj.ownerid=$rootScope.uservideo;
  notifyobj.message=$rootScope.user+" "+'following';
  notifyobj.username=$rootScope.user;
   $http.post("https://sailsserver.herokuapp.com/notification",notifyobj).success(function(res){
    console.log(res);
  })
}

  


$scope.uservideo=function(){
$http({
     url: "https://sailsserver.herokuapp.com/uploads?sort=createdAt DESC", 
     method: "GET",
     params: {categories:$rootScope.categories,uploadername:$rootScope.uservideo,limit:2}  
}).then(function(res){
  console.log(res);
  $scope.users = res.data;
});
}

$scope.relcat=function(){
$http({
     url: "https://sailsserver.herokuapp.com/uploads?sort=createdAt DESC", 
     method: "GET",
     params: {categories:$rootScope.categories,limit:10}  
}).then(function(res){
  console.log(res);
  $scope.relcat = res.data;
});
}

  this.isOpen = true;
      this.availableModes = ['md-fling', 'md-scale'];
      this.selectedMode = 'md-fling';

      this.selectedDirection = 'right';
     
     $scope.add=function(){

      if(!$scope.comments || $scope.comments == ''){
        return
      }

      var obj={};
      obj.comments=$scope.comments;
      obj.email=$rootScope.user;
      obj.video=$stateParams.id
      if($localStorage.token){
        io.socket.post('/comments/socketcomment',obj,function (resData, jwRes) { 
        })
        $http.post('https://sailsserver.herokuapp.com/comments', obj).success(function(resp){
          console.log(resp);
          $scope.comments=''; 
        }).error( function(err) {
          console.log(err);
        });
      }
  else
    $location.path('auth/signin/' +$stateParams.id);
}

$scope.comment=[];
io.socket.on('comment',function(comments) {
console.log(comments)
$scope.comment.push(comments)
$scope.$apply();
})


if($stateParams.id){
$http({
     url: "https://sailsserver.herokuapp.com/comments?sort=createdAt DESC", 
     method: "GET",
     params: {video:$stateParams.id,limit:10}  
}).then(function(resp){
for(var i=0; i<resp.data.length;i++){
        $scope.comment.push(resp.data[i])
      }
    console.log($scope.comment);


  });
}
$scope.topcomments=function(){

  $http({
     url: "https://sailsserver.herokuapp.com/comments?sort=createdAt DESC", 
     method: "GET",
     params: {video:$stateParams.id,limit:10}  
}).then(function(resp){

    console.log(resp);

    $scope.topcomment = resp.data;
    // console.log($scope.comment)


  });

}

$scope.mycomments=function(){

 if($localStorage.token){
  $http({
     url: "https://sailsserver.herokuapp.com/comments?sort=createdAt DESC", 
     method: "GET",
     params: {video:$stateParams.id,email:$rootScope.user,limit:10}  
}).then(function(resp){

    console.log(resp);

    $scope.usercomment = resp.data;
    // console.log($scope.comment)


  });

}
};



$scope.views=function(){
$http.put('https://sailsserver.herokuapp.com/uploads/' + $stateParams.id, 
    { 
      views:$rootScope.views+1

    })
  .then(function(res)
  {
    console.log(res)
  })
   }
$scope.rate=function(){
  if($localStorage.token){
console.log($scope.starRating1)
  $http({
     url: "https://sailsserver.herokuapp.com/uploads", 
     method: "GET",
     params: {id:$stateParams.id}  
}).then(function(resp){

    console.log(resp);
     $rootScope.rating=resp.data.rating;
     console.log($rootScope.rating)
  $rootScope.usercount=resp.data.usercount;
  console.log($rootScope.usercount)
  $rootScope.average=$rootScope.rating/$rootScope.usercount;
  console.log($rootScope.average)

$scope.getRating();
  });

  $scope.getRating=function(){
 
  var rateobj={};
  console.log($scope.starRating1)
  rateobj.usercount=$rootScope.usercount+1;
  rateobj.rating=$scope.starRating1+$rootScope.rating;
  $http.put('https://sailsserver.herokuapp.com/uploads/' + $stateParams.id,rateobj).then(function(res)
  {
    console.log(res)
  })
}
}
else
   $location.path('auth/signin/' +$stateParams.id);

};
 $scope.history=function(){
if($rootScope.user){
  var obj={username:$rootScope.user,history:$rootScope.history,historyid:$rootScope.link};
  

  $http.post('https://sailsserver.herokuapp.com/history/historycreate',obj).success(function(resp){
          console.log(resp);
        }).error( function(err) {
          console.log(err);
          // $scope.updatehis();
          console.log('his')
        });
  };
}
  

//Rating Plugin//

    $scope.starRating1=4;
    console.log($rootScope.average)
    $scope.hoverRating1 =0;

    $scope.click1 = function (param) {
        console.log('Click(' + param + ')');
    };

    $scope.mouseHover1 = function (param) {
        $scope.hoverRating1 = param;
    };

    $scope.mouseLeave1 = function (param) {
        $scope.hoverRating1 = param + '*';
    };

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

