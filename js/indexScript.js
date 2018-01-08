$(document).ready(function () {
     $('a[href^="#"].nav-link').on('click', function (e) {
         e.preventDefault();

         var target = this.hash,
             $target = $(target);

         $('html, body').stop().animate({
             'scrollTop': $target.offset().top - 80
         }, 900, 'swing', function () {
             window.location.hash = target;
         });
     });

    $('.content-area').each(function(i, obj) {

        $(this).hide().fadeIn(2000);
    });

    /*$('.project').each(function() {
        var currSource = $(this).attr('src'); 
        $(this).mouseover(function() {
            $(this).attr("src", "images/github.png")  
        });

        $(this).mouseout(function() {
            $(this).attr("src", currSource);
        });

    })*/

    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").addClass('d-none');
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).removeClass('d-none');
    });

 });


