$(document).ready(function() {
    // === STICKY SIDE NAV === //
    $(".mk-tabs-tabs").stick_in_parent({offset_top: 150});
    
    $('.outfitters-accordion-section').removeClass('vc_active');
    
    var windowSize = $(window).width();
    if (windowSize > 782) {
        $('.safety-accordion-section, .outfitters-accordion-section').addClass('vc_active');
        
    } else {
        //click function for accordion toggle only if window is below 782px
        $('.vc_tta-panel-heading').click(function(e) {
            e.preventDefault();   
            $(this).next('.vc_tta-panel-body').slideToggle('slow');
            $('.wpb-js-composer .vc_tta .vc_tta-controls-icon.vc_tta-controls-icon-plus').toggleClass('show-minus').siblings().addClass('show-plus');
//            $('.wpb-js-composer .vc_tta .vc_tta-controls-icon.vc_tta-controls-icon-plus').toggleClass('show');

        });

        $('.mobile-nav-tab-container').append(jQuery('#mk-tabs-tabs-4'));

    }
    
    function shortString(string) {
            return '#menu-'+string+'_footer_menu>li.menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children>.sub-menu';
        }
    function shortStringOther(string) {
            return '#menu-'+string+'_footer_menu>li.menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children';
        }
    
// === Footer Resize Area === //
    $(window).resize(function() {

      if ($(this).width() < 782) {
            $('.mobile-nav-tab-container').append(jQuery('#mk-tabs-tabs-4'));
          
            $(shortStringOther('about, rider-hub, impact')).removeClass("toggle-active");
            $('.safety-accordion-section, .outfitters-accordion-section').removeClass('vc_active');
      } else {
            $('.tab-content-container').prepend(jQuery('#mk-tabs-tabs-4'));
          
            $(shortString('about, rider-hub, impact')).show();
            $(shortStringOther('about, rider-hub, impact')).addClass("toggle-active");
            $('.safety-accordion-section, .outfitters-accordion-section').addClass('vc_active');
        }
    });
    
// === END Footer Resize === //
  
});