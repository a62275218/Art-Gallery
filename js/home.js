app.controller('HomeCtrl', ['$scope', 'NgMap', function ($scope, NgMap) {
    //initialize googlemap
    NgMap.getMap().then(function (map) {
    });
    //scroll to the corresponding section
    $scope.scrollToDiv = function (id, offset) {
        $('html,body').animate({
            scrollTop: $(id).offset().top - offset
        }, 500);
        return false
    };
    $(function () {
        //click to show or hide map
        var map = $('.map');
        map.on('click', function () {
            $('.map-container').toggleClass('hide');
            var arrow = $('.arrow');
            if (arrow.hasClass('fa-arrow-down')) {
                arrow.removeClass('fa-arrow-down');
                arrow.addClass('fa-arrow-up');
                map.html('Close It');
                $('html,body').animate({
                    scrollTop: $('.copyright').offset().top
                }, 500);
            } else {
                arrow.removeClass('fa-arrow-up');
                arrow.addClass('fa-arrow-down');
                map.html('Map It');
            }
        });
        //box list animation
        $('category-list').isotope({
            itemSelector: '.category-item',
            layoutMode: 'fitRows'
        });
        $('.option-set >li > a').on('click', function () {
            var selector = $(this).attr('data-filter');
            $('.category-list').isotope({
                filter: selector
            });
        });
        var thisoptionSets = jQuery('.option-set'),
            thisoptionLinks = thisoptionSets.find('a');

        thisoptionLinks.click(function () {
            var thisss = jQuery(this);

            if (thisss.hasClass('selected')) {
                return false;
            }
            var thisoptionSets = thisss.parents('.option-set');
            thisoptionSets.find('.selected').removeClass('selected');
            thisss.addClass('selected');
        });
    });
    $(window).resize(function () {
        $('.category-list').isotope('layout');
    });
}]);