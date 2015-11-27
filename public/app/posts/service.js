(function () {
    'use strict';

    angular
        .module('posts.services')
        .factory('Posts', Posts);

    Posts.$inject = ['$http'];

    function Posts($http) {
        var Posts = {
                all: all
            },
            API_ENDPOINT = 'http://127.0.0.1:8080';

        return Posts;

        function all() {
            return $http.get(API_ENDPOINT+'/posts');
        }

    }
})();