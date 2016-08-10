(function() {
    var app = angular.module('appdsampleapp', ['ngRoute']);

    app.config(function($routeProvider) {
        $routeProvider.when('/', {
                templateUrl : 'view/home.html',
                controller : 'AdminController'
            });

        $routeProvider.when('/fruitStand', {
            templateUrl : 'view/fruitStand.html'
        });

        $routeProvider.otherwise({
                redirectTo: '/'
            });
    });

    app.config([
        '$httpProvider', function($httpProvider) {
            return $httpProvider.interceptors.push([
                '$q', '$rootScope', function($q, $rootScope) {
                    if ($rootScope.loaders == null) {
                        $rootScope.loaders = 0;
                    }
                    return {
                        request: function(request) {
                            $rootScope.loaders++;
                            return request;
                        },
                        requestError: function(error) {
                            $rootScope.loaders--;
                            if ($rootScope.loaders < 0) {
                                $rootScope.loaders = 0;
                            }
                            return error;
                        },
                        response: function(response) {
                            $rootScope.loaders--;
                            if ($rootScope.loaders < 0) {
                                $rootScope.loaders = 0;
                            }
                            return response;
                        },
                        responseError: function(error) {
                            $rootScope.loaders--;
                            if ($rootScope.loaders < 0) {
                                $rootScope.loaders = 0;
                            }
                            return error;
                        }
                    };
                }
            ]);
        }
    ]);

    app.controller('AdminController', [
        '$scope', '$http', '$location', function($scope, $http, $location) {
            $scope.ready = false;
            $scope.controllerUrl = '';

            $scope.init = function () {
                $scope.ready = true;
            };

            $scope.navigateTo = function(path) {
                $location.path("/" + path);
            };

            $scope.openController = function (path) {
                var url = this.controllerUrl + path;
                window.open( url, "AppDynamicsController");
            };


            $scope.init();

            return null;
        }
    ]);

    app.directive('adLoader', [
        '$rootScope', function($rootScope) {
            return {
                restrict: 'E',
                templateUrl: '/partials/loader.html',
                link: function() {
                    if ($rootScope.loaders == null) {
                        $rootScope.loaders = 0;
                    }
                    $rootScope.$on('$routeChangeStart', function() {
                        return $rootScope.loaders++;
                    });
                    return $rootScope.$on('$routeChangeSuccess', function() {
                        $rootScope.loaders--;
                        if ($rootScope.loaders < 0) {
                            return $rootScope.loaders = 0;
                        }
                    });
                }
            };
        }
    ]);
}).call(this);
