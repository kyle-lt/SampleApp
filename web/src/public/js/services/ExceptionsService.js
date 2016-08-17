/**
 * Created by stephanie.chou on 8/12/16.
 */
(function() {
    var app = angular.module('exceptionsService', []);

    app.service("ExceptionsService", function($http) {

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
    });
}).call(this);

