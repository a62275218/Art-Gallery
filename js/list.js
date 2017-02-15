app.controller('listCtrl', function ($scope, $http, $timeout) {
    /*create cart scope*/
    $scope.cart = [];
    /*get all the items from json file*/
    $http.get('data/imageData.json')
        .then(function (data) {
            $scope.items = data.data;
        });
    /*make items draggable*/
    $timeout(function () {
        $('.pic').draggable({
            revert: "invalid",
            containment: ".projects",
            cursor: "move",
            helper: "clone",
            zIndex: 9999
        });
    }, 1000);
    /*set the droppable section*/
    $('.drag-section').droppable({
        accept: ".pic",
        activate: function () {
            $('.drag-section').css('color', '#00ff0d')
        },
        deactivate: function () {
            $('.drag-section').css('color', '#f89406')
        },
        drop: function (event, ui) {
            addItem(ui.draggable[0].id - 1);
        }
    });
    /*get the index of the item*/
    var findIndex = function (id) {
        for (var i = 0; i < $scope.cart.length; i++) {
            if ($scope.cart[i].id == id) {
                return i;
            }
        }
        return -1;
    };
    /*add item to the cart*/
    var addItem = function (i) {
        //check if the item has been added
        if ($('.info').hasClass('r' + (i + 1))) {
            alert("This item has already been added")
        } else {
            $scope.cart.push({
                id: $scope.items[i].id,
                name: $scope.items[i].caption,
                quantity: 1,
                price: $scope.items[i].price
            });
            $scope.$apply();
            $('html', 'body').animate({
                scrollTop: $(document).height()
            }, 100)
        }
    };
    $scope.addItem = addItem;
    /*reduce the quantity of item*/
    $scope.reduce = function (id) {
        var i = findIndex(id);
        if ($scope.cart[i].quantity < 1) {
            $scope.cart[i].quantity = 0;
        } else {
            $scope.cart[i].quantity -= 1;
        }
    };
    /*add the quantity of item*/
    $scope.add = function (id) {
        var i = findIndex(id);
        $scope.cart[i].quantity += 1;
    };
    /*remove the selected item*/
    $scope.remove = function (id) {
        var i = findIndex(id);
        $scope.cart.splice(i, 1);
    };
    /*calculate the price of a number particular items*/
    $scope.price = function () {
        var total = 0;
        for (var i = 0; i < $scope.cart.length; i++) {
            total += $scope.cart[i].quantity;
        }
    }
    /*calculate the total quantity*/
    $scope.totalQuantity = function () {
        var total = 0;
        for (var i = 0; i < $scope.cart.length; i++) {
            total += $scope.cart[i].quantity;
        }
        return total;
    };
    /*calculate the total price*/
    $scope.totalPrice = function () {
        var total = 0;
        for (var i = 0; i < $scope.cart.length; i++) {
            total += $scope.cart[i].price * $scope.cart[i].quantity;
        }
        return total;
    };
    /*assign the original scale*/
    var scale = 1;
    /*reduce the item list size*/
    $scope.reduceSize = function () {
        scale -= 0.2;
        if (scale < 0.5) {
            scale = 0.5;
        }
        $('.projects').transition({scale: scale});
    };
    /*increase the item list size*/
    $scope.addSize = function () {
        scale += 0.2;
        if (scale > 1) {
            scale = 1;
        }
        /*$('.piclist').transition({scale:scale});
         $('.drag-section').transition({scale:scale});*/
        $('.projects').transition({scale: scale});
    }
});


