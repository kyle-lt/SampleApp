/**
 * Created by stephanie.chou on 8/12/16.
 */

(function() {
    var app = angular.module('mainController', []);

    app.controller('mainController', function(
            $scope,
            $http,
            $location,
            CONTROLLER_URL,
            CONTROLLER_PORT,
            CONTROLLER_SSL) {

        // TODO add these constants to above
        // CONTROLLER_USER,
        //     CONTROLLER_ACCOUNT,
        //     CONTROLLER_PWD
            $scope.ready = false;

            $scope.init = function () {
                $scope.ready = true;
            };

            $scope.navigateTo = function (path) {
                $location.path("/" + path);
            };

            $scope.openController = function (key) {
                var location = '';

                switch (key) {
                    case "Business Transaction List":
                        location = "APP_BT_LIST";
                        break;
                    case "Tiers":
                        location = "APP_INFRASTRUCTURE";
                        break;
                    case "Flow Map":
                        location = "APP_DASHBOARD";
                        break;
                    case "Slow Response Times":
                        location = "APP_SLOW_RESPONSE_TIMES";
                        break;
                    case "Exceptions":
                        location = "APP_ERRORS";
                        break;
                    default:
                        location = "AD_HOME_OVERVIEW";
                        break;
                }

                var baseUrl = 'http://'+ CONTROLLER_URL + ":" + CONTROLLER_PORT + "/controller";
                var basicAuthString = CONTROLLER_USER + "@" + CONTROLLER_ACCOUNT + ":" + CONTROLLER_PWD;

                // TODO these are used for testing. delete later
                // var baseUrl = "http://localhost:8080/controller";
                // var basicAuthString = "user1@customer1:welcome";
                // var url= "http://localhost:8080/controller/#/location=" + location + "&application=" + 10;

                // TODO debug this. Curl in javascript is an AJAX call. It is currently returning a cross origin error
                //
                $.ajax({
                    url: baseUrl + "/restui/applicationManagerUiBean/applicationByName?applicationName=SampleApp",
                    dataType: 'application/json',
                    type: 'get',
                    beforeSend: function(xhr) {
                      xhr.setRequestHeader("Authorization", "Basic" + btoa(basicAuthString))
                    },
                    success: function(data) {
                        var appId = data.id;
                        var s = CONTROLLER_SSL == "true" ? "s" : "" ;
                        var url = "http" + s + "://" + CONTROLLER_URL + ":" + CONTROLLER_PORT + "/#/location=" + location + "&application=" + appId;
                        window.open(url, "AppDynamicsController");

                    },
                    error: function(data) {

                    }
                });
            };
        
            $scope.init();
        }
    );
}).call(this);