(function () {
    'use strict';

    angular
        .module('posts.services')
        .factory('Posts', ['$http', '$location', function($http, $location) {
            var Posts = {
                    all: all
                },
                API_ENDPOINT = $location.protocol() + '://' + $location.host() + ':' + $location.port();

            return Posts;

            function all() {
                return $http.get(API_ENDPOINT + '/api/posts/');
            }
        }]);

    angular
        .module('posts.services')
        .factory('User', ['$http', '$location', function($http, $location) {
            var User = {
                    getEmail: getEmail
                },
                API_ENDPOINT = $location.protocol() + '://' + $location.host() + ':' + $location.port();

            return User;

            function getEmail() {
                return $http.get(API_ENDPOINT + '/api/email/');
            }
        }]);
})();