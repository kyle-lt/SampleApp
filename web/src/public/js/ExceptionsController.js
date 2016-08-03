(function() {
    var app = angular.module('appdsampleapp');

    app.service("ExceptionsService", ['$http', function($http) {

        var service = {};

        service.nodeException = function () {
            return $http.get('/exception', {
                method: 'GET'
            });
        };

        service.javaException = function () {
            return $http.get('/exceptions/java', {
                method: 'GET'
            });
        };

        service.dbException = function () {
            return $http.get('/exceptions/sql', {
                method: 'GET'
            })
        };

        return service;
    }]);

    app.controller('ExceptionsController', ['$scope', '$http', 'ExceptionsService', function ($scope, $http, ExceptionsService) {

        $scope.raisingNode = false;
        $scope.raisingJava = false;
        $scope.raisingSql = false;

        var exceptionsNode = 0;
        var exceptionsJava = 0;
        var exceptionsSql = 0;

        $scope.getNodeExceptions = function() {
            return exceptionsNode;
        };

        $scope.getJavaExceptions = function() {
            return exceptionsJava;
        };

        $scope.getSqlExceptions = function() {
            return exceptionsSql;
        };

        $scope.raiseNodeException = function() {
            $scope.raising = true;
            return ExceptionsService.nodeException().success(function() {
                exceptionsNode++;
            }).error(function() {
                alert('Unable to raise exception.');
            }).finally(function () {
                return $scope.raisingNode = false;
            });
        };


        $scope.raiseJavaException = function() {
            $scope.raisingJava = true;
            return ExceptionsService.javaException().success(function() {
                exceptionsJava++;
            }).error(function() {
                alert('Unable to raise exception.');
            }).finally(function () {
                return $scope.raisingJava = false;
            });
        };

        $scope.raiseSqlException = function() {
            $scope.raisingSql = true;
            return ExceptionsService.dbException().success(function() {
                exceptionsSql++;
            }).error(function() {
                alert('Unable to raise exception.');
            }).finally(function () {
                return $scope.raisingSql = false;
            });;
        };

    }])
}).call(this);

