(function () {
    'use strict';

    angular
        .module('posts.directives')
        .directive('posts', posts)
    ;

    function posts() {
        var directive = {
            controller: 'PostsController',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                posts: '='
            },
            templateUrl: 'app/posts/list.html'

        };
        return directive;
    }

})();