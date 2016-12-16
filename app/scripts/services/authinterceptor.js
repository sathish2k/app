'use strict';

angular.module('app')
  .factory('authInterceptor', function ($q, $localStorage) {
       return {
           request: function (config) {
               config.headers = config.headers || {};
               if ($localStorage.token) {
                   config.headers.Authorization = 'JWT ' +  $localStorage.token;
               }
               return config || $q.when(config);
           },

           requestError: function(error){
               alert('Error processing request!')
               return $q.reject(error);
           },


           // response: function (response) {
           //     return response || $q.when(response);;
           // },


           // responseError: function(error){
           //     if (error.status == 401) {
           //         alert('Request is unauthorized!');
           //     }

           //     return $q.reject(error);
           // }
       };
   }) 

   .config(function ($httpProvider) {
       $httpProvider.interceptors.push('authInterceptor');
   });