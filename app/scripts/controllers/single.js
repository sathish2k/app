'use strict';

var app=angular.module('app');

  app.controller('SingleCtrl', function($scope,$stateParams,$http,$location,$localStorage,$rootScope,messageservice,$window) {
   $scope.showDetails='';
   $scope.showdetail=function(id){
    $scope.showDetails=id;

   }


$scope.updatecomments=function(id){
   if(!$scope.commentsupdate || $scope.commentsupdate == ''){
        return
      }

console.log(id);
console.log($scope.commentsupdate)
$scope.showDetails='';

$http.put('https://sailsserver.herokuapp.com/comments/'+id,{comments:$scope.commentsupdate}).success(function(res){

console.log(res)
$scope.getcomment();
}).error(function(err){
  console.log(err)
})

}


$scope.delete=function(id){


  $http.delete('https://sailsserver.herokuapp.com/comments/'+id).success(function(res){

console.log(res)
$scope.getcomment();
}).error(function(err){
  console.log(err)
})


}



 $scope.bookmark=false;

 $http({
     url: "https://sailsserver.herokuapp.com/bookmark", 
     method: "GET",
     params: {userid:$rootScope.id,videoid:$stateParams.id}  
}).then(function(res){
  console.log(res);
  $scope.bookmark=res.data[0].bookmark;
 
});

$scope.addbookmark=function(){
  if($localStorage.token){
console.log('addbookmark')
$scope.bookmark=true
var bookmarkobj={};
bookmarkobj.videoid=$stateParams.id;
bookmarkobj.userid=$rootScope.id;
bookmarkobj.username=$rootScope.user;
bookmarkobj.bookmark=true;
bookmarkobj.uploadername=$rootScope.uservideo;
bookmarkobj.rating=$rootScope.rating;
bookmarkobj.link=$rootScope.link;
bookmarkobj.usercount=$rootScope.usercount;
bookmarkobj.language=$scope.language;
bookmarkobj.views=$rootScope.views;
bookmarkobj.categories=$rootScope.categories;
bookmarkobj.title=$rootScope.$state.current.data.title;

$http.post('https://sailsserver.herokuapp.com/bookmark',bookmarkobj).success(function(res){

  console.log(res)
}).error(function(err){
  console.log(err)
})
}
else{
    $location.path('auth/signin/' +$stateParams.id);
  }
}
$scope.removebookmark=function(){
console.log('removebookmark')
$scope.bookmark=false
var removeobj={};
removeobj.videoid=$stateParams.id;
removeobj.userid=$rootScope.id;
$http.post('https://sailsserver.herokuapp.com/auth/bookmarkdelete',removeobj).success(function(res){

  console.log(res)
}).error(function(err){
  console.log(err)
})
}

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
  messageservice.reset();
$scope.language='';

 $http({
     url: "https://sailsserver.herokuapp.com/uploads", 
     method: "GET",
     params: {id:$stateParams.id}  
}).then(function(res){
  console.log(res);

  $scope.upload = res.data;
  $scope.language=res.data.language;
  $scope.views=res.data.views;
  $rootScope.history=res.data;
  var screenwidth=$window.innerWidth;
  if(screenwidth>600){
  $rootScope.$state.current.data.title=res.data.name;
}
  $rootScope.metatag=res.data.tag;
  $rootScope.metadescription=res.data.discription;
  $rootScope.average=$rootScope.rating/$rootScope.usercount;
  $rootScope.rating=res.data.rating;
  $rootScope.usercount=res.data.usercount;
  $rootScope.views=res.data.views;
  $rootScope.uservideo=res.data.uploadername;
  $rootScope.userid=res.data.id;
  $rootScope.categories=res.data.categories;
  $http({
     url: 'https://sailsserver.herokuapp.com/uploads/count', 
     method: "GET",
     params: {categories:$rootScope.categories}  
}).then(function(res){

    console.log(res);

    $scope.count = res.data.count;
console.log($scope.count)
  });
  $rootScope.uploaderid=res.data.uploaderid;
  $rootScope.link=res.data.link;
  console.log($rootScope.link);

 messageservice.appendMetaKeywords($rootScope.metatag)
 
console.log($rootScope.metatag)
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

      $(".vjs-big-play-button").on("click touchstart", function(){
        console.log('click')
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
       $(".vjs-poster").hide();
})

   video.on('ended', function() {
        
        video.currentTime(0);
      $(".vjs-big-play-button").show();
})

video.on('resolutionchange', function() {
        console.log('source changed')
      
})

  $scope.link();
   $scope.view();
   $scope.uservideo();
   $scope.relcatvideo();
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
   $http.post(" /notification",notifyobj).success(function(res){
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

$scope.relcatvideo=function(){

$http({
     url: "https://sailsserver.herokuapp.com/uploads?sort=createdAt DESC", 
     method: "GET",
     params: {categories:$rootScope.categories,limit:8}  
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
        
        $http.post('https://sailsserver.herokuapp.com/comments', obj).success(function(resp){
          console.log(resp);
          $scope.comments=''; 
          $scope.getcomment();
        }).error( function(err) {
          console.log(err);
        });
      }
  else
    $location.path('auth/signin/' +$stateParams.id);
}


$scope.getcomment=function(){
  $http({
     url: "https://sailsserver.herokuapp.com/comments?sort=createdAt DESC", 
     method: "GET",
     params: {video:$stateParams.id,limit:10}  
}).then(function(resp){

        $scope.comment=resp.data;
     
    console.log($scope.comment);


  });
}

if($stateParams.id){
$http({
     url: "https://sailsserver.herokuapp.com/comments?sort=createdAt DESC", 
     method: "GET",
     params: {video:$stateParams.id,limit:10}  
}).then(function(resp){

        $scope.comment=resp.data;
     
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



$scope.view=function(){
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
$scope.relcat=[];
$scope.page=1;
$scope.count=0;
$scope.more=function(){
  $scope.page++;
  $http({
     url: "https://sailsserver.herokuapp.com/uploads?sort=createdAt DESC", 
     method: "GET",
     params: {categories:$rootScope.categories,limit:8,skip:($scope.page-1)*8}  
}).then(function(res){
  console.log(res);
  for(var i=0; i<res.data.length;i++){
        $scope.relcat.push(res.data[i])
       
      }
      $http({
     url: 'https://sailsserver.herokuapp.com/uploads/count', 
     method: "GET",
     params: {categories:$rootScope.categories}  
}).then(function(res){

    console.log(res);

    $scope.count = res.data.count;
console.log($scope.count)
  });

  // $scope.relcat = res.data;
});
}





 $scope.history=function(){
if($rootScope.user){
  var obj={username:$rootScope.user,history:$rootScope.history,historyid:$rootScope.userid};
  

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

// app.directive('buttonBookmark', function() {
//   return {
//     scope: true,
//     restrict: 'E',
//     template: '<button class="btn btn-icon1"><span class="glyphicon glyphicon-bookmark" ng-class="{active: item.bookmark}"></span></button>',
//     link: function(scope, elem) {
//       elem.bind('click', function() {
//         scope.$apply(function(){
//           scope.item.bookmark = !scope.item.bookmark;
//         });
//       });
//     }
//   };
// });