app.controller('messageCtrl', ['$scope', '$rootScope', 'LoginService', '$location', function ($scope, $rootScope, LoginService, $location) {
    //initialize the comment scope
    var id = 1;
    $scope.commentList = [];
    $scope.comment = {};
    $scope.addComment = function () {
        if (!$rootScope.globals.currentUser.username) {
            //do nothing if the user is logged in
        } else {
            var txtarea = $('#textarea');
            //show alert information if input is empty
            if (!txtarea.val()) {
                alert('please input comment')
            } else {
                //add the comment to the list
                var date = new Date();
                $scope.commentList.push({
                    content: txtarea.val(),
                    id: id,
                    username: $rootScope.globals.currentUser.username,
                    date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes()
                });
                console.log($scope.commentList);
                id++;
                txtarea.val('');
            }
        }
    };
    $scope.quickLogin = function () {
        LoginService.login($scope, '/messageBoard');
        $('#myModal').modal('hide')
    };
    $scope.logout = function () {
        LoginService.logout($scope);
        $('.navbar-collapse').collapse('hide');
    };
    $(function () {
        $('#myModal').on('shown.bs.modal', function () {
            $('#myInput').focus()
        });
        $('#myTabs a').click(function (e) {
            e.preventDefault();
            $(this).tab('show')
        });
        $('.btn').click(function (e) {
            e.preventDefault();
        })
        $('.fade').click(function () {
            $('#myModal').modal('hide')
        })
    })
}]);