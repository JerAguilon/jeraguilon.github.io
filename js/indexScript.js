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
 });


