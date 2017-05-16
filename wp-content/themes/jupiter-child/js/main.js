$(document).ready(function () {

    var windowSize = $(window).width();

    function shortString(string) {
        return '#menu-' + string + '_footer_menu>li.menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children>.sub-menu';
    }

    function shortStringOther(string) {
        return '#menu-' + string + '_footer_menu>li.menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children';
    }

    $('.outfitters-accordion-section').removeClass('vc_active');
    // toggle class for mobile tab accordion
    // $('.mobile-nav-tab-container-header').toggleClass('vc_active');
    
    if (windowSize > 782) {
        $('.safety-accordion-section, .outfitters-accordion-section').addClass('vc_active');
        // === ON SCROLL HIDE LOGO === //
        $(window).scroll(function() {
           if ($(this).scrollTop() > 100 ) {
               $('.page-template-template-splash>div>div>header>div>div>div>div>a>.mk-desktop-logo.dark-logo').fadeOut('slow');
           } else {
               $('.page-template-template-splash>div>div>header>div>div>div>div>a>.mk-desktop-logo.dark-logo').fadeIn('slow');
           } 
        });
    } else {
        // Click function for accordion toggle only if window is below 782px //
        $('.vc_tta-panel-heading').click(function () {
            $('.vc_tta-panel-body').not(this).slideUp('slow');
            $(this).next('.vc_tta-panel-body').slideToggle('slow');
            $('span.vc_tta-title-text').not(this).removeClass('down');
            $('span.vc_tta-title-text', this).toggleClass('down');
        });
        $('.mobile-nav-tab-container-header>div>div>div>.vc_tta-panel-body').hide();
        // Click function for Tab into Accordion to toggle content //
        $('.title-mobile').click(function (e) {
            e.preventDefault();
            $(this).next('.mk-tabs-pane-content').slideToggle('slow');
            $('.title-mobile').not(this).addClass('display-none');   
            $('.title-mobile').toggleClass('display-none');
        });
        $('.mobile-nav-tab-container').append(jQuery('#mk-tabs-tabs-4, .programs-tabs-link-column'));
    }
    // === Footer Resize Area === //
    $(window).resize(function () {

        if ($(this).width() < 782) {
            $('.mobile-nav-tab-container').append(jQuery('#mk-tabs-tabs-4, .programs-tabs-link-column'));

            $(shortStringOther('about, rider-hub, impact')).removeClass("toggle-active");
            $('.safety-accordion-section, .outfitters-accordion-section').removeClass('vc_active');
        } else {
            $('.tab-content-container').prepend(jQuery('#mk-tabs-tabs-4, .programs-tabs-link-column'));

            $(shortString('about, rider-hub, impact')).show();
            $(shortStringOther('about, rider-hub, impact')).addClass("toggle-active");
            $('.safety-accordion-section, .outfitters-accordion-section').addClass('vc_active');
        }
    });// === END Footer Resize === //
    
    // === Sticky Side Nav Area === //
    $("ul.mk-tabs-tabs").stick_in_parent({offset_top: 150});
    
    $('ul.mk-tabs-tabs')
    .on('sticky_kit:bottom', function(e) {
    $(this).parent().css('position', 'static');
    }) 
    .on('sticky_kit:unbottom', function(e) {
    $(this).parent().css('position', 'relative');
    });
});