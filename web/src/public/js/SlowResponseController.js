/**
 * Created by stephanie.chou on 8/3/16.
 */

(function () {
    var app = angular.module('appdsampleapp');
 
    app.controller('SlowResponseController', ['$scope', '$http', function ($scope, $http) {
        $scope.slowRequest = false;
        $scope.delay = {
            request: 5
        };

        $scope.slowRequestGet = function() {
            $scope.slowRequest = true;
            return $http.get('/exceptions/slow', {
                params: {
                    delay: $scope.delay.request
                }
            }).finally(function () {
                return $scope.slowRequest = false;
            })
        };
    }]);
}).call(this);