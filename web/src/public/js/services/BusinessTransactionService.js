/**
 * Created by stephanie.chou on 8/2/16.
 */

(function() {
    var app = angular.module('businessTransactionService', []);

    app.service("BusinessTransactionService", function($http) {
        var service = {};

        service.save = function (id, name, useStock) {
            return $http.get('/update', {
                method: 'GET',
                params: {
                    id: id,
                    name: name,
                    stock: useStock < 0 ? 0 : useStock
                }
            })
        };

        service.delete = function (id) {
            return $http.get('/delete', {
                method: 'GET',
                params: {
                    id: id
                }
            });
        };

        service.add = function (name, stock) {
            return $http.post('/add', {
                params: {
                    name: name,
                    stock: stock
                }
            });
        };

        service.getProducts = function () {
            return $http.get('/products');
        };

        return service;
    });
}).call(this);