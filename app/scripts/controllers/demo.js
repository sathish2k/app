(function() {
  'use strict';
  angular
    .module('app')
    .controller('DemoCtrl', DemoCtrl);

  function DemoCtrl($http) {
    var self = this;
    
    self.data = null;
    self.selectedItem = null;
    self.searchText = null;
    
    self.querySearch = function (searchText) {
      $http({
     url: ' https://sailsserver.herokuapp.com/user/?sort=name ASC', 
     method: "GET",
     params: {where:{"username":{"contains":searchText} } } }).then(function(result){
      console.log(result)
          self.data = result.data;
          return result.data;
        });
    }
  }
})();