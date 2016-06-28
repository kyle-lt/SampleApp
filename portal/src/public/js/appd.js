var app = angular.module('appdsampleapp', []);

app.controller('SampleAppController', ['$scope', '$http',
      function($scope, $http) {

        $scope.selectedDeployment = '';

        $scope.isMobileGettingStarted = false;
        $scope.isAPMGettingStarted = false;
        $scope.isIndex = true;
        $scope.isGettingStartedHome = false;
        
        $scope.goToSampleAppGettingStarted = function() {
          $scope.isMobileGettingStarted = false;
          $scope.isAPMGettingStarted = false;
          $scope.isIndex = false;
          $scope.isGettingStartedHome = true;
        };

        $scope.goToGettingStarted = function() {
          this.openUrl("http://e2e-controller-master-a.demo.appdynamics.com/controller/#/location=AD_GETTING_STARTED&timeRange=last_15_minutes.BEFORE_NOW.-1.-1.15")
        };

        $scope.goToGettingStartedInstructions = function(isMobile) {

          $scope.isMobileGettingStarted = isMobile;
          $scope.isAPMGettingStarted = !isMobile;
          $scope.isIndex = false;
          $scope.isGettingStartedHome = false;
        };

        $scope.onSelectDeployment = function(method) {
          $scope.selectedDeployment = method;
        };

        $scope.openUrl = function(url) {
          window.open(url, '_blank');
        };
      }
]);

//
// app.controller('RouteController', [ '$routeProvider',
//     function ($routeProvider) {
//
//       $routeProvider
//           .when('/', {templateUrl: 'index.html',   controller: SampleAppController})
//           .when('/gettingStarted', {templateUrl: 'gettingStarted.html',   controller: SampleAppController})
//     }
// ]);

// app.directive('adProduct', function() {
//   return {
//     restrict: 'E',
//     templateUrl: '/partials/product.html',
//     scope: {
//       product: '=',
//       consumeProduct: '='
//     }
//   };
// });