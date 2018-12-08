(function($) {
    "use strict";
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });
    $('body').scrollspy({
      target: '#navMenu',
      offset: 57
    });
    var navbarCollapse = function() {
      if ($("#navMenu").offset().top > 300) {
        $("#navMenu").addClass("navbar-shrink");
      } else {
        $("#navMenu").removeClass("navbar-shrink");
      }
    };
    navbarCollapse();
    $(window).scroll(navbarCollapse);
    window.sr = ScrollReveal();
  
  })(jQuery);
  