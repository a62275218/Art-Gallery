var app = angular.module('artGallery', ['ui.router', 'ui.bootstrap', 'ngCookies', 'ngAnimate', 'ngMap']);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'LoginCtrl'
        })
        .state('list', {
            url: '/itemList',
            templateUrl: 'itemList.html',
            controller: 'listCtrl',
            authorization: true,
            redirectTo: 'login'
        })
        .state('registration', {
            url: '/registration',
            templateUrl: 'registration.html',
            controller: 'SignUpCtrl'
        })
        .state('messageBoard', {
            url: '/messageBoard',
            templateUrl: 'messageBoard.html',
            controller: 'messageCtrl'
        })
});

app.run(function ($rootScope, $location, $cookies, LoginService, $http, $anchorScroll) {
    // keep user logged in after page refresh//
    $rootScope.globals = $cookies.getObject('globals') || {};
    $rootScope.$on('$stateChangeStart', function (event, toState) {
        console.log($rootScope.globals.currentUser);
        //scroll to top for each state
        $location.hash('top');
        $anchorScroll();
        //block access when user not logged in
        /*if (!$rootScope.globals.currentUser && toState.authorization) {
            $location.path('/login');
         }*/
    });
    //document load function
    $(function () {
        //loading animation
        setTimeout(function () {
            $('body').addClass('loaded');
            //initiate wow.js
            new WOW().init();
        }, 3000);
        //initially collapsed navbar
        $('.navbar-collapse').collapse('hide');
        $('.carousel').carousel({
            interval: 2000
        });
        //click the scroll to top button
        $('#backTop').on('click', move);
        $(window).on('scroll', function () {
            checkPosition(200);
        });
        //check if it is necessary to show scroll top button when page loaded
        checkPosition(200);
        //move to top function
        function move() {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
        }

        //check position
        function checkPosition(pos) {
            if ($(window).scrollTop() > pos) {
                $('#backTop').fadeIn();
            } else {
                $('#backTop').fadeOut();
            }
        }
    });
});
