"use strict";

$(document).ready(function() {

  $( "body" ).on( 'click', '.link-and-scroll', function(event) {

    $('html, body').animate({
      scrollTop: 0
    }, 900);
  });

  // $( "body" ).on( 'click', '.wsp-btn-details', function(event) {
  //
  //   $('html, body').animate({
  //     scrollTop: $($(this).closest('a').attr('href')).offset().top - 50
  //   }, 900);
  // });

  $( "body" ).on( 'click', '.wsp-btn-book', function(event) {

    $('html, body').animate({
      scrollTop: $($(this).closest('a').attr('href')).offset().top - 50
    }, 900);
  });


  $(".navbar a").on('click', function(event) {

    $('html, body').animate({
      scrollTop: 0
    }, 900);

    $('.navbar-collapse').removeClass('in');
  });

});
