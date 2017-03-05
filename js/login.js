app.controller('LoginCtrl', ['$scope', '$anchorScroll', 'LoginService', '$location', function ($scope, $anchorScroll, LoginService, $location) {
    $scope.login = function () {
        LoginService.login($scope, '/home');
    };
    $scope.logout = function () {
        LoginService.logout($scope);
        $('.navbar-collapse').collapse('hide');
    };
    //scroll to the corresponding section
    $scope.scrollToDiv = function (id, offset) {
        $('html,body').animate({
            scrollTop: $(id).offset().top - offset
        }, 500);
        return false
    };

    /*$scope.gotoAnchor = function(x){
     //// always scroll by 80 extra pixels
     $anchorScroll.yOffset = 80;
     var newHash = x;
     $anchorScroll();
     if($location.hash() !== newHash){
     $location.hash(newHash);
     }else{
     $anchorScroll();
     }
     }*/
}]);
