'use strict';

/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
angular.module('app')
  .run(
    [           '$rootScope', '$state', '$stateParams',
      function ( $rootScope,   $state,   $stateParams ) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

      }
    ]
  )
  .config(
    [          '$stateProvider','$urlRouterProvider', 'MODULE_CONFIG',
      function ( $stateProvider,   $urlRouterProvider,  MODULE_CONFIG ) {
        $urlRouterProvider
          .otherwise('/app/home');
          
        $stateProvider
          .state('app', {
            abstract: true,
            url: '/app',
            views: {
              '': {
                templateUrl: 'views/layout.html'
              },
              'aside': {
                templateUrl: 'views/aside.html',
                controller:'LoginCtrl'

              },
              'content': {
                templateUrl: 'views/content.html'
              }
            }
        })
    .state('app.index', {
      url: '/home',
      templateUrl: 'views/pages/main.html',
      data : { title: 'Home', grantAccessTo: 'authenticated',folded: true,theme: { primary: 'green'}},
      controller: 'MainCtrl',
      resolve: load('scripts/controllers/main.js')
    })
    
  $stateProvider
  .state('app.movies', {
   url:'/movies/:categories/:language',
   templateUrl: 'views/pages/shortfilm.html',
   data : { title: 'Short Films',grantAccessTo: 'authenticated', folded: true,theme: { primary: 'blue'}},
   controller: 'MoviesCtrl',
   resolve: load('scripts/controllers/movies.js')
    
 })
  $stateProvider
  .state('app.musics', {
   url:'/albums/:categories/:language',
    templateUrl: 'views/pages/musics.html',
    data : { title: 'Musics', grantAccessTo: 'authenticated',folded: true,theme: { primary: 'brown'}},
    controller: 'MoviesCtrl',
    resolve: load('scripts/controllers/movies.js')
  })
  $stateProvider
  .state('app.dance', {
   url:'/dance/:subcategories',
    templateUrl: 'views/pages/dance.html',
    data : { title: 'Dance', grantAccessTo: 'authenticated',folded: true,theme: { primary: 'grey'}},
    controller: 'DanceCtrl',
    resolve: load('scripts/controllers/dance.js')
  })
  $stateProvider
  .state('app.history', {
   url:'/history',
   data : { title: 'History',isloggedin:'true', grantAccessTo: 'authenticated',folded: true,theme: { primary: 'grey'}},
    templateUrl: 'views/pages/history.html',
    controller: 'HistoryCtrl',
    resolve: load('scripts/controllers/history.js')
  })
 
  $stateProvider
  .state('app.trending', {
   url:'/trending',
    templateUrl: 'views/pages/trending.html',
    data : { title: 'Trending', grantAccessTo: 'authenticated',folded: true,theme: { primary: 'grey'}}
  })
  $stateProvider
  .state('app.single', {
   url:'/single/:id',
    templateUrl: 'views/pages/single.html',
     data : {  folded: true,grantAccessTo: 'authenticated',},
    controller: 'SingleCtrl',
    resolve: load('scripts/controllers/single.js')
  })
  .state('access', {
      url: '/auth',
      template: '<div class="indigo bg-big"><div ui-view class="fade-in-down smooth"></div></div>'
    })
    .state('access.signin', {
      url: '/signin/:id?token',
      templateUrl: 'views/pages/signin.html',
      data : { title: 'signin',alreadylogin:'true'},
      controller: 'LoginCtrl'
    })
    .state('access.signup', {
      url: '/signup',
      templateUrl: 'views/pages/signup.html',
      data : { title: 'signup',alreadylogin:'true'},
      controller: 'RegisterCtrl',
      resolve: load('scripts/controllers/register.js')
    })
    .state('access.forgot-password', {
      url: '/forgot-password',
      templateUrl: 'views/pages/forgot-password.html',
      data : { title: 'forgot-password', grantAccessTo: 'authenticated'},
      controller: 'ResetCtrl',
      resolve: load('scripts/controllers/reset.js')
    })
    .state('access.personaldetail', {
      url: '/personaldetail',
      controller:'LoginCtrl',
      data:{isloggedin:'true'},
      templateUrl: 'views/pages/Personal.html'
      
    })
    .state('access.socialdetail', {
      url: '/socialdetail',
      controller:'LoginCtrl',
      data:{isloggedin:'true'},
      templateUrl: 'views/pages/contact.html'
      
    })
     .state('access.contactdetail', {
      url: '/contactdetail',
      controller:'LoginCtrl',
      data:{isloggedin:'true'},
      templateUrl: 'views/pages/Phone.html'
      
    })
    .state('access.lockme', {
      url: '/lockme',
      templateUrl: 'views/pages/lockme.html'
      
    })
     .state('access.change-password', {
      url: '/change-password/:id?token',
      templateUrl: 'views/pages/password.html',
      controller: 'ChangeCtrl',
      resolve: load('scripts/controllers/changepassword.js')
    })
 
  
  $stateProvider
  .state('app.upload', {
   url:'/upload',
   templateUrl: 'views/pages/upload.html',
   data : { title: 'Upload',isloggedin:'true', grantAccessTo: 'authenticated'},
   controller: 'UploadCtrl',
    resolve: load('scripts/controllers/upload.js')
    
  })
   $stateProvider
  .state('app.uploadedit', {
   url:'/Edit Video/:id',
   templateUrl: 'views/pages/uploadedit.html',
   data : { title: 'Edit Video',isloggedin:'true', grantAccessTo: 'authenticated'},
   controller: 'UploadeditCtrl',
    resolve: load('scripts/controllers/uploadedit.js')
    
  })
  
  $stateProvider
  .state("app.list",{
    url:'/list/:categories?language',
    templateUrl:'views/pages/list.html',
    controller:'ListCtrl',
     data : {  heading: 'categories',grantAccessTo: 'authenticated'},
    resolve: load('scripts/controllers/list.js')
  })
   $stateProvider
  .state("app.youmaylikelist",{
    url:'/youmaylike',
    templateUrl:'views/pages/list.html',
    controller:'YouCtrl',
     data : {  heading: 'You May Like',isloggedin:'true',grantAccessTo: 'authenticated'},
    resolve: load('scripts/controllers/youmaylike.js')
  })
   $stateProvider
  .state("app.youmaylikelistcat",{
    url:'/youmaylikes/:categories?language',
    templateUrl:'views/pages/list.html',
    controller:'YoucatCtrl',
     data : {  heading: 'You May Like',isloggedin:'true',grantAccessTo: 'authenticated'},
    resolve: load('scripts/controllers/youmaylikecat.js')
  })
   $stateProvider
  .state("app.mainlist",{
    url:'/Mainlist/:categories?language',
    templateUrl:'views/pages/mainlist.html',
    controller:'ListCtrl',
     data : {  heading: 'categories',grantAccessTo: 'authenticated'},
    resolve: load('scripts/controllers/list.js')
  })
   $stateProvider
  .state("access.verification",{
    url:'/verification',
    templateUrl:'views/pages/verification_mail.html',
    controller:'VerifyCtrl',
    params:      {'email': null},
    data : {  grantAccessTo: 'authenticated'},
    resolve: load('scripts/controllers/verification.js')
    
  })
  $stateProvider
  .state("app.recentupload",{
    url:'/recentupload/:categories?language',
    templateUrl:'views/pages/list.html',
    controller:'ListCtrl',
     data : {  heading: 'Recently Uploaded',grantAccessTo: 'authenticated'},
    resolve: load('scripts/controllers/list.js')
  })
  $stateProvider
  .state("app.mostviewed",{
    url:'/mostviewed/:categories?language',
    templateUrl:'views/pages/list.html',
   controller:'ListCtrl',
    data : {  heading: 'Most Viewed Today',grantAccessTo: 'authenticated'},
   resolve: load('scripts/controllers/list.js')
  })
  $stateProvider
  .state("app.danceupload",{
    url:'/recentuploads/:categories?subcategories',
    templateUrl:'views/pages/list.html',
    controller:'DancelistCtrl',
     data : {  heading: 'Recently Uploaded',grantAccessTo: 'authenticated'},
    resolve: load('scripts/controllers/dancelist.js')
  })
  $stateProvider
  .state("app.danceviewed",{
    url:'/mostvieweds/:categories?subcategories',
    templateUrl:'views/pages/list.html',
   controller:'DancelistCtrl',
    data : {  heading: 'Most Viewed Today',grantAccessTo: 'authenticated'},
   resolve: load('scripts/controllers/dancelist.js')
  })
   $stateProvider
  .state("app.search",{
    url:'/search/?contains',
    templateUrl:'views/pages/search.html',
   controller:'SearchCtrl',
   data : { grantAccessTo: 'authenticated'},
   resolve: load('scripts/controllers/search.js')
  })
   $stateProvider
  .state("app.uservideosearch",{
    url:'/search/:uploaderid?contains',
    templateUrl:'views/pages/search.html',
   controller:'VideosearchCtrl',
   data : { grantAccessTo: 'authenticated'},
   resolve: load('scripts/controllers/uservideosearch.js')
  })
   $stateProvider
  .state("app.searchcat",{
    url:'/searchcat/:categories?contains',
    templateUrl:'views/pages/search.html',
   controller:'SearchcatCtrl',
   data : { grantAccessTo: 'authenticated'},
   resolve: load('scripts/controllers/searchcat.js')
  })
   $stateProvider
  .state("app.userdiscover",{
    url:'/discoverpeople',
    templateUrl:'views/pages/userdiscover.html',
    controller:'UserdiscoverCtrl',
    data : {  grantAccessTo: 'authenticated'},
   resolve: load('scripts/controllers/userdiscover.js')
  })
  
   $stateProvider
  .state('app.afterupload', {
    url:'/afterupload',
    data : {  isloggedin:'true',grantAccessTo: 'authenticated'},
    templateUrl:'views/pages/afterupload.html'
   })
   $stateProvider
  .state('app.myuploads', {
    url:'/myuploads/:user',
    templateUrl:'views/pages/myuploads.html',
     data : { title: 'My Videos',isloggedin:'true', grantAccessTo: 'authenticated'},
    controller:'ProfilevideoCtrl',
    resolve: load('scripts/controllers/profilevids.js')
   })

   $stateProvider
  .state("app.myprofile",{
    url:'/myprofile/:user',
    templateUrl:'views/pages/myprofile.html',
     data : { title: 'MyProfile', grantAccessTo: 'authenticated'},
    controller:'ProfileCtrl',
    resolve: load('scripts/controllers/profile.js')

  })
   $stateProvider
  .state("app.profile",{
    url:'/profile/:user',
    templateUrl:'views/pages/profile.html',
     data : { title: 'Profile',isloggedin:'true', grantAccessTo: 'authenticated'},
    controller:'ProfileCtrl',
    resolve: load('scripts/controllers/profile.js')

  })
   $stateProvider
  .state("app.followinglist",{
    url:'/following/:id',
    templateUrl:'views/pages/followinglist.html',
     data : { title: 'following',isloggedin:'true', grantAccessTo: 'authenticated'},
    controller:'FollowingCtrl',
    resolve: load('scripts/controllers/following.js')

  })
   $stateProvider
  .state("app.followerslist",{
    url:'/followers/:id',
    templateUrl:'views/pages/followerslist.html',
     data : { title: 'followers',isloggedin:'true', grantAccessTo: 'authenticated'},
    controller:'FollowersCtrl',
    resolve: load('scripts/controllers/followers.js')

  })
  $stateProvider
  .state('app.settings', {
    url: '/settings',
    templateUrl: 'views/pages/settings.html',
    controller:'SettingsCtrl',
    resolve: load('scripts/controllers/settings.js'),
    data : { title: 'settings',isloggedin:'true', grantAccessTo: 'authenticated', theme: { primary: 'green'} }
  })
  $stateProvider
  .state('app.settings.ps', {
    url: '/settings',
    templateUrl: 'views/pages/profile-settings.html',
     controller:'SettingsCtrl',
    resolve: load('scripts/controllers/settings.js'),
    data : { title: 'profile settings',isloggedin:'true', grantAccessTo: 'authenticated', theme: { primary: 'green'} }
    

  })
  $stateProvider
  .state('app.settings.security', {
    url: '/security',
    templateUrl: 'views/pages/security.html',
    controller:'SettingsCtrl',
    resolve: load('scripts/controllers/settings.js'),
    data : { title: 'security', isloggedin:'true',grantAccessTo: 'authenticated', theme: { primary: 'green'} }
  })
  $stateProvider
  .state('app.settings.privacy', {
    url: '/privacy',
    templateUrl: 'views/pages/privacy.html',
    controller:'SettingsCtrl',
    resolve: load('scripts/controllers/settings.js'),
    data : { title: 'privacy',isloggedin:'true', grantAccessTo: 'authenticated', theme: { primary: 'green'} }
  })

  $stateProvider
  .state('app.settings.notifications', {
    url: '/notifications',
    templateUrl: 'views/pages/notifications.html',
    
    data : { title: 'notifications',isloggedin:'true', grantAccessTo: 'authenticated', theme: { primary: 'green'} }
  })    
            
         
          ;


          function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                  function( $ocLazyLoad, $q ){
                    var deferred = $q.defer();
                    var promise  = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                      promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
                      promise = promise.then( function(){
                        angular.forEach(MODULE_CONFIG, function(module) {
                          if( module.name == src){
                            if(!module.module){
                              name = module.files;
                            }else{
                              name = module.name;
                            }
                          }else{
                            name = src;
                          }
                        });
                        return $ocLazyLoad.load(name);
                      } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }]
            }
          }
      }
    ]
  );
