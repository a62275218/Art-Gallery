/**
 * Created by Jake on 2017/1/11 0011.
 */
var app = angular.module('myApp',[])
    app.controller('SignUpController',function($scope)
    {
        $scope.userdata = {

        };
        $scope.submitForm = function(){
            console.log($scope.userdata);
            if($scope.signUpForm.$invalid){
                alert('no')
            }else{
                alert('yes')
            }
        }
    })
/*
    .directive('compare',function(){
    var o = {};
    o.strict = 'AE';
    o.scope = {
        orgText: '=compare'
    }
    o.require = 'ngModel';
    o.link = function(sco, ele, att, con){
        con.$validators.compare = function(v){
            return v == sco.orgText;
        }
        sco.$watch('orgText',function(){
            con.$validate();
        })
    }
});*/
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