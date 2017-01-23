var app = angular.module('loginPost', []);
app.controller('loginController', function ($scope, $http) {
    $scope.responseMessage = "";
    $scope.login = function () {

        $http.post('login.php', {
            'username': $scope.username,
            'password': $scope.password,
        }/*,{headers:{'Content-Type': 'application/x-www-form-urlencoded'}
         }*/).then(function success(data) {
            console.log("insert successfully");
            console.log(data);
            if (data.data == "1") {
                window.location.href = 'index.html';
            } else {
                $scope.responseMessage = 'username or password is wrong'
            }
        }, function error() {
            $scope.responseMessage = 'unable to login'
        });
    }

});
