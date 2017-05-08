$(document).ready(function() {
      function shortString(string) {
            return '#menu-'+string+'_footer_menu>li.menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children>.sub-menu';
        }
    function shortStringOther(string) {
            return '#menu-'+string+'_footer_menu>li.menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children';
        }

    $(window).resize(function() {

      if ($(this).width() < 782) {
            $(shortStringOther('about, rider-hub, impact')).removeClass("toggle-active");
      } else {
            $(shortString('about, rider-hub, impact')).show();
            $(shortStringOther('about, rider-hub, impact')).addClass("toggle-active");
        }
    });
    
    $(window).scroll(function() {
       if ($(this).scrollTop() > 147) {
           $('ul-class>').addClass('fixed-postion');
       } else {
           $('ul-class').removeClass('fixed-position');
       }
    });
    
});