(function () {
    'use strict';

    angular
        .module('posts.controllers')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['$scope', '$routeParams', 'Posts'];

    function PostsController($scope, $routeParams, Posts) {
        $scope.posts = [];

        activate();

        function activate() {
            Posts.all().then(getSuccessFn, getErrorFn);
        }

        function getSuccessFn(res, status, headers, config) {
            $scope.posts = res.data;
        }

        function getErrorFn(data, status, headers, config) {
            console.error('error loading detail');
        }

    }
})();