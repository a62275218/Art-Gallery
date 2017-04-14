app.factory('LoginService', function ($location, $http, sessionService, $rootScope, AuthenticationService) {
    return {
        login: function (scope, path) {
            /*post data to server side*/
            $http.post('login.php', {
                'username': scope.username,
                'password': scope.password
            }, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function success(data) {
                console.log("insert successfully");
                console.log(data);
                if (data.data && scope.username && scope.password) {
                    console.log(data.data);
                    $location.path(path);
                    sessionService.set('uid', '1');
                    AuthenticationService.SetCredentials(scope.username, scope.password);
                } else {
                    scope.responseMessage = 'username or password is wrong'
                }
            }, function error() {
                scope.responseMessage = 'unable to login'
            });
        },
        logout: function () {
            sessionService.destroy('uid');
            AuthenticationService.ClearCredentials();
        }
        /*islogged: function () {
            var $checkSessionServer = $http.post('checkSession.php');
            return $checkSessionServer;
         }*/
    }
});