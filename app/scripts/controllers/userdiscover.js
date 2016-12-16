'use strict';

angular.module('app')
  .controller('UserdiscoverCtrl', function ($scope,$mdToast,$mdDialog) {
  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Are you sure!, Do you want to Block the user')
          .textContent('You can Unblock at anytime')
          .ariaLabel('')
          .targetEvent(ev)
          .ok('Ok')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'successfully Blocked';
    }, function() {
      $scope.status = 'Cancelled';
    });
  };

});
