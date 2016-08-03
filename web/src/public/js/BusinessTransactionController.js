(function() {
    var app = angular.module('appdsampleapp');

    app.service("BusinessTransactionService", ['$http', function($http) {
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
    }]);

    app.controller('BusinessTransactionController', ['$scope', '$http', 'BusinessTransactionService', function ($scope, $http, BusinessTransactionService) {

        $scope.products = [];

        $scope.newProduct = {
            newName: "",
            newStock: 0
        };

        $scope.selectedProduct = null;

        $scope.init = function() {
            $scope.getProducts();
        };

        var setupProductUpdate = function(product) {

            $scope.selectedProduct = product;
            $scope.selectedProduct.loading = false;
            $scope.selectedProduct.stock = parseInt(product.stock, 10);

            $scope.selectedProduct.save = function (decrement) {
                if(!$scope.validateProduct(this.name, this.stock)) {
                    return;
                }

                var useStock = decrement ? this.stock - 1 : this.stock;

                BusinessTransactionService.save(this.id, this.name, useStock < 0 ? 0 : useStock).success(function (returnProduct) {
                    this.stock = parseInt(returnProduct.stock, 10);
                }.bind(this)).error(function () {
                    alert('Unable to update the product.');
                    return this.loading = false;
                });
            };

            $scope.selectedProduct["delete"] = function () {
                BusinessTransactionService.delete(this.id).success(function () {
                    var lookup, results;
                    this.loading = false;
                    results = [];
                    for (lookup in $scope.products) {
                        if (!$scope.products.hasOwnProperty(lookup)) {
                            continue;
                        }
                        if ($scope.products[lookup].id === product.id) {
                            $scope.products.splice(lookup, 1);
                            break;
                        } else {
                            results.push(void 0);
                        }
                    }
                    return results;
                }).error(function () {
                    alert('Unable to delete the product.');
                    return product.loading = false;
                });
            };

            return $scope.products.push(product);
        };

        $scope.getProducts = function () {
            $scope.products = [];
            BusinessTransactionService.getProducts().success(function (data) {
                var product;
                for (product in data) {
                    if (!data.hasOwnProperty(product)) {
                        continue;
                    }
                    setupProductUpdate(data[product]);
                }

                return null;
            });
        };

        $scope.addNew = function () {
            if (!this.validateProduct($scope.newProduct.newName, $scope.newProduct.newStock)){
                return;
            }

            $scope.loadingNew = true;
            
            BusinessTransactionService.add($scope.newProduct.newName, $scope.newProduct.newStock).success(function (data) {
                $scope.getProducts();
                setupProductUpdate(data);
            }).error(function () {
                alert('Unable to add new product.');
                return $scope.loadingNew = false;
            }).finally(function(){
                $scope.loadingNew = false;
                $scope.newProduct.newName = "";
                $scope.newProduct.newStock = 0;
            });
        };

        $scope.validateProduct = function (name, stock) {
            var isValid = true;

            if (name === "") {
                alert("Please enter a name");
                isValid = false;
            }

            if (!angular.isNumber(stock)) {
                alert("Please enter a valid number");
                isValid = false;
            }

            return isValid;
        };

        $scope.init();

    }]);
}).call(this);