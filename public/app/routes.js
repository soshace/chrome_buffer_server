(function () {
    'use strict';

    angular
        .module('posts.routes')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'PostsController',
                templateUrl: 'app/posts/list.html'
            })
            .otherwise('/');
    }
})();