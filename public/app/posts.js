(function () {
    'use strict';

    angular.module('posts', [
            'posts.routes',
            'posts.controllers',
            'posts.directives',
            'posts.services'
        ]);

    angular.module('posts.controllers', []);
    angular.module('posts.directives', []);
    angular.module('posts.services', []);
    angular.module('posts.routes', ['ngRoute']);

})();