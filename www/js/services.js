angular.module('starter.services', ['firebase'])
    .factory('User', ["$timeout", "$firebaseAuth", function ($timeout, $firebaseAuth) {
        var ref = new Firebase('https://panafire.firebaseio.com/');
        var auth = $firebaseAuth(ref);
        var user = {};

        return {
            login: function (email, password, callback) {
                auth.$authWithPassword({
                    email: email,
                    password: password,
                    rememberMe: false
                }).then(function (res) {
                    user = res;
                    if (callback) {
                        $timeout(function () {
                            console.log(res);
                            callback(res);
                        });
                    }
                }, function (err) {
                    callback(err);
                });
            },
            register: function (email, password, callback) {
                auth.$createUser(email, password).then(function (res) {
                    user = res;
                    if (callback) {
                        callback(res);
                    }
                }, function (err) {
                    callback(err);
                });
            },
            getUser: function () {
                return user;
            },
            logout: function () {
                auth.$logout();
                user = {};
            }
        }

    }]);
