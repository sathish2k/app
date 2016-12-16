
angular.module('app')
  .controller('ReportCtrl', function ($scope,$mdToast,$mdDialog) {
$scope.showAdvanced = function(ev) {
  
    $mdDialog.show({
      
      templateUrl: 'views/pages/report.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = "' + answer + '";
    }, function() {
      $scope.status = 'cancelled';
    });
  };

$scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
});