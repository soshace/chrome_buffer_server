(function () {
    'use strict';

    angular.module('users.controllers').controller('UsersController', [
        '$scope', 'Users', function ($scope, Users) {
            console.log('users!');
        }
    ]);

    angular.module('users.controllers').controller('SignUpFormController', [
        '$scope', '$http', '$location', 'Users', function ($scope, $http, $location, Users) {
            $scope.user = {};
            $scope.user.email = "";
            $scope.user.password = "";
            $scope.inputError = false;

            // so the form is not necessary
            $scope.createAccount = function() {
                $http.post('/auth/register/', {
                    email: $scope.user.email,
                    password : $scope.user.password
                }).then(successCallback, failCallback);
            };

            $scope.signIn = function() {
                $http.post('/auth/login/', {
                    email: $scope.user.email,
                    password : $scope.user.password
                }).then(successCallback, failCallback);
            };

            $scope.resetInputError = function() {
                $scope.inputError = false;
            };

            function successCallback(response) {
                console.log('Success response:');
                console.log(response);
                $location.path('/posts/');

            }

            function failCallback(response) {
                console.log('Fail response:');
                console.log(response);
                $scope.inputError = true;
            }
        }
    ]);
})();