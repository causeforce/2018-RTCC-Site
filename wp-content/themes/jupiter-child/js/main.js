$(document).ready(function () {

    var windowSize = $(window).width();

    function shortString(string) {
        return '#menu-' + string + '_footer_menu>li.menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children>.sub-menu';
    }

    function shortStringOther(string) {
        return '#menu-' + string + '_footer_menu>li.menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children';
    }
    
    // Sticky Side Nav Area 
    $("ul.mk-tabs-tabs, .e-tab-container>nav").stick_in_parent({offset_top: 150});
    
    $('ul.mk-tabs-tabs, .programs-tabs-link-column')
    .on('sticky_kit:bottom', function(e) {
    $(this).parent().css('position', 'static');
    }) 
    .on('sticky_kit:unbottom', function(e) {
    $(this).parent().css('position', 'relative');
    });

    // nav tab drop downs
    // (function () {
    //     if (windowSize < 782) {
    //         $('.mobile-nav-tab-container').append(jQuery('.mk-tabs-tabs, .programs-tabs-link-column'));
    //     }

    // })();
    
    // On click Scroll to Element
    $(".1st-scroll").click(function() {
        $('html, body').animate({
            scrollTop: $("#1st-section").offset().top - 150
        }, 500);
    });
    $(".2nd-scroll").click(function() {
        $('html, body').animate({
            scrollTop: $("#2nd-section").offset().top - 150
        }, 500);
    });
    $(".3rd-scroll").click(function() {
        $('html, body').animate({
            scrollTop: $("#3rd-section").offset().top - 150
        }, 500);
    });
    $(".4th-scroll").click(function() {
        $('html, body').animate({
            scrollTop: $("#4th-scroll").offset().top - 150
        }, 500);
    });

    // Footer Social Icons
    $('#sub-footer>.mk-grid').prepend('<div class="footer-social"><div class="social-icon-container"><a href="https://www.facebook.com/OntarioRide">&#xf09a;</a></div> <div class="social-icon-container"><a href="http://instagram.com/ontarioride">&#xf16d;</a></div> <div class="social-icon-container"><a href="http://www.twitter.com/TheOntarioRide">&#xf099;</a></div></div>');

    $('.outfitters-accordion-section').removeClass('vc_active');
    // toggle class for mobile tab accordion
    // $('.mobile-nav-tab-container-header').toggleClass('vc_active');
    
    // Accordion to change into minus on click //
    $('.vc_tta-panel-heading').click(function(){
       var collapsed=$(this).find('i').hasClass('fa-plus');

        $('.vc_tta-icon').removeClass('fa-minus');

        $('.vc_tta-icon').addClass('fa-plus');
        if(collapsed){
            $('.vc_tta-icon',this).toggleClass('fa-plus fa-minus');
        }
    });
    
    if (windowSize > 782) {
        $('.safety-accordion-section, .outfitters-accordion-section').addClass('vc_active');
        // ON SCROLL HIDE LOGO ON SPLASH PAGE
        $(window).scroll(function() {
           if ($(this).scrollTop() > 100 ) {
               $('.page-template-template-splash>div>div>header>div>div>div>div>a>.mk-desktop-logo.dark-logo').fadeOut('slow');
           } else {
               $('.page-template-template-splash>div>div>header>div>div>div>div>a>.mk-desktop-logo.dark-logo').fadeIn('slow');
           } 
        });
    } else {
        // Click function for accordion toggle only if window is below 782px 
        $('.vc_tta-panel-heading').click(function () {
            $('.vc_tta-panel-body').not(this).slideUp('slow');
            $(this).next('.vc_tta-panel-body').slideToggle('slow');
            $('span.vc_tta-title-text').not(this).removeClass('minus');
            $('span.vc_tta-title-text', this).toggleClass('minus');
        });
        $('.mobile-nav-tab-container-header>div>div>div>.vc_tta-panel-body').hide();
        // Click function for Tab into Accordion to toggle content //
        $('.title-mobile').click(function (e) {
            e.preventDefault();
            $(this).next('.mk-tabs-pane-content').slideToggle('slow');
            $('.title-mobile').not(this).addClass('display-none');   
            $('.title-mobile').toggleClass('display-none');
        });
        $('.mobile-nav-tab-container').append(jQuery('.mk-tabs-tabs, .programs-tabs-link-column'));
        // Sticky Nav 
        $(".e-tab-container>nav>select").trigger("sticky_kit:detach");
    }
    // Window Resize Section
    $(window).resize(function () {

        if ($(this).width() < 782) {
            $('.mobile-nav-tab-container').append(jQuery('.mk-tabs-tabs, .programs-tabs-link-column'));

            $(shortStringOther('about, rider-hub, impact')).removeClass("toggle-active");
            $('.safety-accordion-section, .outfitters-accordion-section').removeClass('vc_active');
            // Sticky Nav Area
            $(".e-tab-container>nav>select").trigger("sticky_kit:detach");
        } else {
            $('.tab-content-container').prepend(jQuery('.mk-tabs-tabs, .programs-tabs-link-column'));

            $(shortString('about, rider-hub, impact')).show();
            $(shortStringOther('about, rider-hub, impact')).addClass("toggle-active");
            $('.safety-accordion-section, .outfitters-accordion-section').addClass('vc_active');
        }
    });
    
    // Mobile Menu Scripts 
    if (windowSize > 1140) {
        // Area for future scripts if window size is greater than 1140px
    } else {
        // Add Overlay to page body elements
        $('#mk-theme-container').prepend('<div class="mobile-overlay"></div>');
        
        // Add Mobile Image Class
        var mobileButtons = $('.menu-button-links').not('.no-mega-menu');
        $('.header-logo>a>img').addClass('.mobile-img');
        $('ul.mk-responsive-nav').prepend(mobileButtons);
        
        // Mobile Menu Overlay Function
        $('.mk-css-icon-menu').on('click', function(){
           if ( $('.mk-nav-responsive-link').hasClass('is-active') ) {
                $('.mobile-overlay').fadeOut('fast');
            } else {
                $('.mobile-overlay').fadeIn('fast');
            } 
        });
    }
    
    // Top Teams JSON Script
    $.getJSON('/../../../wp-content/themes/jupiter-child/js/raiser_data.json', function(data){
        var topTeamsData = data.getTopTeamsDataResponse.teamraiserData;
        $(topTeamsData).each(function (index, value){
            $('#top-teams').append("<li>" + value.name + "</li>" + "<li>" + value.total + "</li>");
       }); 
    });

});
// Preloader on load to fadeout
$(window).on("load",function(){
   $('div#ride-preloader').fadeOut('slow');
    
    // View More or Less Function
    $('ul#top-teams').each(function(){
  
      var liFind = $(this).find('li').length;

      if( liFind > 10){    
        $('li', this).eq(9).nextAll().hide().addClass('toggleable');
        $(this).append('<li class="more">More...</li>');    
      }

    });


    $('ul#top-teams').on('click','.more', function(){

      if( $(this).hasClass('less') ){    
        $(this).text('More...').removeClass('less');    
      }else{
        $(this).text('Less...').addClass('less'); 
      }

      $(this).siblings('li.toggleable').slideToggle();

    }); 
});