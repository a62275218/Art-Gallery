/**
 * Created by Jake on 2017/1/15 0015.
 */

/* flip the picture*/
var turn = function (elem) {
    var div = $(elem);
    /*    if(elem.id) {
     var n = elem.id.split('_')[1];
     }else{*/
    var n = div.index();

    if (!(div.hasClass('photo-center'))) {
        $('.i').removeClass('i_current');
        $('.i').removeClass('i_back');
        $('#nav_' + n).addClass('i_current');
        return sort(n);
    }
    if (div.hasClass('photo-front')) {
        div.toggleClass('photo-front');
        div.toggleClass('photo-back');
        $('#nav_' + n).addClass('i_back');
    } else {
        div.toggleClass('photo-back');
        div.toggleClass('photo-front');
        $('#nav_' + n).removeClass('i_back');
    }
};


/*JSON to export all photos*/
$.getJSON('data/imageData.json', function (data) {
    var wrap = $('#wrap');
    var template = '<div class="photo photo-front" onclick="turn(this)" id="photo_index"> <div class="photo-wrap"> <div class="side side-front"> <p class="image"><img src="url" alt=""></p> <p class="img-cap">caption</p> </div> <div class="side side-back"> <p class="desc">desc</p> </div> </div> </div>'
    var htmls = [];
    var nav = [];
    $.each(data, function (i, item) {
        var html = template
            .replace('index', i)
            .replace('url', item.url)
            .replace('caption', item.caption)
            .replace('desc', item.desc);
        htmls.push(html);
        nav.push('<span id ="nav_' + i + '" onclick="turn($(\'#photo_' + i + '\'))" class="i"></span>')
    });
    htmls.push('<div class="nav">' + nav.join('') + '</div>');
    wrap.append(htmls);
    sort(random([0, data.length - 1]));
});
/*sort all the photos*/
var sort = function (i) {
    //assign the center photo
    var photos = [];
    $.each($('.photo'), function () {
        $('.photo').removeClass('photo-center');
        $('.photo').removeClass('photo-front');
        $('.photo').removeClass('photo-back');
        $('.photo').addClass('photo-front');
        $('.photo').css('left', '');
        $('.photo').css('top', '');
        $('.photo').css('transform', 'rotate(0deg) scale(1.3)');
        photos.push(this);
    })
    var photo_center = $('#photo_' + i + '');
    photo_center.addClass('photo-center');
    //split the photos to left and right categories
    var center = photos.splice(i, 1)[0];
    var left = photos.splice(0, Math.ceil(photos.length / 2));
    var right = photos;
    var ranges = range();
    $.each(left, function () {
        this.style.left = random(ranges.left.x) + 'px';
        this.style.top = random(ranges.left.y) + 'px';
        this.style['transform'] = 'rotate(' + random([-150, 150]) + 'deg) scale(1)';
    });
    $.each(right, function () {
        this.style.left = random(ranges.right.x) + 'px';
        this.style.top = random(ranges.right.y) + 'px';
        this.style['transform'] = 'rotate(' + random([-150, 150]) + 'deg) scale(1)';
    });
    $('nav_' + i).addClass('i_current');
};

/*set the position of all the photos*/
var range = function () {
    var range = {left: {x: [], y: []}, right: {x: [], y: []}};
    var wrap = {
        w: $('.wrap')[0].clientWidth,
        h: $('.wrap')[0].clientHeight
    };
    var photo = {
        w: $('.photo')[0].clientWidth,
        h: $('.photo')[0].clientHeight
    };

    range.wrap = wrap;
    range.photo = photo;

    range.left.x = [0 - photo.w, wrap.w / 2 - photo.w];
    range.left.y = [0 - photo.h, wrap.h];
    range.right.x = [wrap.w / 2 + photo.w, wrap.w + photo.w];
    range.right.y = range.left.y;
    return range;
};

/*generate a random number s:lower limit l:upper limit*/
var random = function (range) {
    var max = Math.max(range[0], range[1]);
    var min = Math.min(range[0], range[1]);
    var diff = max - min;
    var number = Math.ceil((Math.random() * diff + min));
    return number;
};

