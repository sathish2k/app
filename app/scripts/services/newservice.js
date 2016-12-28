var app=angular.module('app')
app.service('messageservice',function($rootScope){
	
  var metaKeywords = '';
  return {
   
    metaKeywords: function() { return metaKeywords; },
    reset: function() {
      metaKeywords = '';
    },
   
    appendMetaKeywords: function(newKeywords) {
      for (var key in newKeywords) {
      	console.log(key)
        if (metaKeywords === '') {
          metaKeywords += newKeywords[key];
          console.log(metaKeywords)
        } else {
          metaKeywords += ', ' + newKeywords[key];
          console.log(metaKeywords)
          $rootScope.metakeywords=metaKeywords;
        }
      }
    }
  };


});
