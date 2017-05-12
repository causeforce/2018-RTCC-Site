$(document).ready(function () {

    // === STICKY SIDE NAV === //
    $(".mk-tabs-tabs").stick_in_parent({offset_top: 150});

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

    } else {
        // Click function for accordion toggle only if window is below 782px //
        $('.vc_tta-panel-heading').click(function (e) {
            e.preventDefault();
            $(this).next('.vc_tta-panel-body').slideToggle('slow');
            $('.wpb-js-composer .vc_tta .vc_tta-controls-icon.vc_tta-controls-icon-plus').toggleClass('show-minus').siblings().addClass('show-plus');
        });
        // Click function for Tab into Accordion to toggle content //
        $('.title-mobile').click(function (e) {
            e.preventDefault();
            $(this).next('.mk-tabs-pane-content').slideToggle('slow');
            $('.title-mobile').not(this).addClass('display-none');   
            $('.title-mobile').toggleClass('display-none');
        });
        $('.mobile-nav-tab-container').append(jQuery('#mk-tabs-tabs-4'));
    }
    // === Footer Resize Area === //
    $(window).resize(function () {

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
    });// === END Footer Resize === //
});