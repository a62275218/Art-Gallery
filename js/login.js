app.controller('LoginCtrl', ['$scope', 'LoginService', function ($scope, LoginService, $location) {
    $scope.login = function () {
        LoginService.login($scope, $location);
        console.log(LoginService.islogged());
    }
    $scope.logout = function () {
        LoginService.logout($scope);
        $('.navbar-collapse').collapse('hide');
    }

    /*$scope.hide = function(){
     $('.navbar-collapse').collapse('hide');
     }*/
}]);
