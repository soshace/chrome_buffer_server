(function () {
    'use strict';

    angular.module('posts.controllers').controller('PostsController', [
        '$scope', '$http', '$location', 'Posts', 'User', function ($scope, $http, $location, Posts, User) {
            $scope.posts = [];
            $scope.user = {};
            $scope.user.email = "";

            $scope.logout = function() {
                $http
                    .post('/auth/logout/')
                    .then(logoutSuccessCallback, logoutFailCallback);
            };

            getPosts();
            getEmail();

            function getPosts() {
                Posts
                    .all()
                    .then(getPostsSuccessCallback, getPostsFailCallback);
            }

            function getEmail() {
                User
                    .getEmail()
                    .then(getEmailSuccessCallback, getEmailFailCallback);
            }

            function getPostsSuccessCallback(res, status, headers, config) {
                $scope.posts = res.data;
            }

            function getPostsFailCallback(data, status, headers, config) {
                console.error('Getting posts failed');
            }

            function getEmailSuccessCallback(res, status, headers, config) {
                $scope.user.email = res.data;
            }

            function getEmailFailCallback(data, status, headers, config) {
                console.error('Getting email failed');
            }

            function logoutSuccessCallback(res, status, headers, config) {
                $location.path('/auth/');
            }

            function logoutFailCallback(data, status, headers, config) {
                console.error('Logging out failed');
            }
        }
    ]);

    angular.module('posts.controllers').filter('reverse', function() {
        return function(items) {
            return items.slice().reverse();
        }
    });

})();
