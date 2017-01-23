/**
 * Created by Jake on 2017/1/11 0011.
 */
var app = angular.module('registrationPost', []);
app.controller('SignUpController', function ($scope, $http)
    {
        $scope.userdata = {};
        $scope.submitForm = function(){
            console.log($scope.userdata);
            if($scope.signUpForm.$invalid){
                alert('invalid input')
            }else{
                alert('sign up success!')
            }
        }
        $scope.insertData = function () {
            $http.post('registration.php', {
                'username': $scope.userdata.username,
                'password': $scope.userdata.password,
                'email': $scope.userdata.email
            }).then(function success(response) {
                console.log("insert successfully");
            }, function error(response) {
                console.log("insert failed");
            });
            /*var request = $http({
             method:"post",
             url:"registration.php",
             data:{
             username:$scope.userdata.username,
             password:$scope.userdata.password,
             email:$scope.userdata.email
             },
             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             })*/
        }
    });

    app.directive('pwCheck', function() {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                $(elem).add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val()===$(firstPassword).val();
                        ctrl.$setValidity('pwcheck', v);
                    });
                });
            }
        }
    });