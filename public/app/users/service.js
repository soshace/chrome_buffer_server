(function () {
    'use strict';

    angular
        .module('users.services')
        .factory('Users', Users);

    Users.$inject = ['$http'];

    function Users($http) {
        var Users = {
                all: all
            },
            API_ENDPOINT = 'http://127.0.0.1:8080';

        return Users;

        function all() {
            return $http.get(API_ENDPOINT+'/user');
        }

    }
})();