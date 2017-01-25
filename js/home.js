app.controller('HomeCtrl', function ($scope) {
    $('.carousel').carousel({
        interval: 2000
    })
    $('.collapse').collapse()
    $scope.isCollapsed = true;
})
