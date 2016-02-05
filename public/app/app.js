'use strict';

/* App module */

var bufferApp = angular.module('bufferApp', [
    'ngRoute',
    'posts',
    'users'
]);

bufferApp.config(['$routeProvider', '$locationProvider',
    function( $routeProvider, $locationProvider ) {

        $routeProvider.
        when('/posts', {
            templateUrl: 'app/posts/list.html',
            controller: 'PostsController'
        }).
        when('/auth', {
            templateUrl: 'app/users/enter.html',
            controller: 'SignUpFormController'
        }).
        otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
    }]);