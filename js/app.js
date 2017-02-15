var app = angular.module('artGallery', ['ui.router', 'ui.bootstrap', 'ngCookies', 'ngAnimate']);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'LoginCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'LoginCtrl'
        })
        .state('list', {
            url: '/itemList',
            templateUrl: 'itemList.html',
            controller: 'listCtrl'
        })
        .state('registration', {
            url: '/registration',
            templateUrl: 'registration.html',
            controller: 'SignUpCtrl'
        })
});

app.run(function ($rootScope, $location, $cookies, LoginService, $http) {
    // keep user logged in after page refresh//
    $rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }
    $rootScope.$on('$routeChangeStart', function () {
        if ($rootScope.globals.currentUser = "") {
            $location.path('/login');
        } else {
            //do nothing if user logged in
        }
    });
    $(function () {
        new WOW().init();
        /*initially collapsed navbar*/
        $('.navbar-collapse').collapse('hide');
        $('.carousel').carousel({
            interval: 2000
        })
        /*$('.navbar-collapse li a').click(function(){
         $('.navbar-collapse').collapse('hide');
         });*/
    });
});
