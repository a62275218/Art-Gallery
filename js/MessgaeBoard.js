app.controller('messageCtrl', ['$scope', '$rootScope', 'LoginService', '$http', function ($scope, $rootScope, LoginService, $http) {
    //initialize the comment scope
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
                $http.post('postMessage.php', {
                    'content': txtarea.val()
                }).then(function success() {
                    console.log("insert successfully");
                }, function error() {
                    console.log("insert failed");
                });
                /*var date = new Date();
                var month = date.getMonth() + 1;
                $scope.commentList.push({
                    content: txtarea.val(),
                    id: id,
                    username: $rootScope.globals.currentUser.username,
                    date: date.getFullYear() + "-" + month + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
                });
                 id++;*/
                $http.get('getMessage.php').then(
                    function success(data) {
                        console.log(data);
                        $scope.commentList = data.data;
                        console.log($scope.commentList)
                    }, function error() {
                        console.log('get error')
                    });
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
        $('#myTabs').find('a').click(function (e) {
            e.preventDefault();
            $(this).tab('show')
        });
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //fetch message data from database
        $http.get('getMessage.php').then(
            function success(data) {
                console.log(data);
                $scope.commentList = data.data;
                console.log($scope.commentList)
            }, function error() {
                console.log('get error')
            })
    })
}]);