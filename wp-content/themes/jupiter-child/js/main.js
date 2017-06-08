$(document).ready(function () {
    
    // Sticky Side Nav Area 
    $("ul.mk-tabs-tabs, .e-tab-container>nav").stick_in_parent({offset_top: 150});
    
    $('ul.mk-tabs-tabs, .programs-tabs-link-column')
    .on('sticky_kit:bottom', function(e) {
    $(this).parent().css('position', 'static');
    }) 
    .on('sticky_kit:unbottom', function(e) {
    $(this).parent().css('position', 'relative');
    });

    // Footer Social Icons
    $('#sub-footer>.mk-grid').prepend('<div class="footer-social"><div class="social-icon-container"><a href="https://www.facebook.com/OntarioRide">&#xf09a;</a></div> <div class="social-icon-container"><a href="http://instagram.com/ontarioride">&#xf16d;</a></div> <div class="social-icon-container"><a href="http://www.twitter.com/TheOntarioRide">&#xf099;</a></div></div>');
    
    // Open Accordion on Outfitters Page
    $('.outfitters-accordion-section').removeClass('vc_active');
    
    // Accordion to change into minus on click
    $('.vc_tta-panel-heading').click(function(){
       var collapsed=$(this).find('i').hasClass('fa-plus');

        $('.vc_tta-icon').removeClass('fa-minus');

        $('.vc_tta-icon').addClass('fa-plus');
        if(collapsed){
            $('.vc_tta-icon',this).toggleClass('fa-plus fa-minus');
        }
    });
    
    // Top Teams JSON Script
    $.getJSON('https://secure2.convio.net/cfrca/site/CRTeamraiserAPI?method=getTopTeamsData&api_key=cfrca&v=1.0&fr_id=1581&response_format=json', function(data){
        var topTeamsData = data.getTopTeamsDataResponse.teamraiserData;
        $(topTeamsData).each(function (index, value){
            $('#top-teams').append("<li>" + value.name + "</li>" + "<li>" + value.total + "</li>");
       }); 
    });
    
    // Top Fundraising JSON Script
    $.getJSON('https://secure2.convio.net/cfrca/site/CRTeamraiserAPI?method=getTopParticipantsData&api_key=cfrca&v=1.0&fr_id=1581&response_format=json', function(data){
        var topTeamsData = data.getTopParticipantsDataResponse.teamraiserData;
        $(topTeamsData).each(function (index, value){
            $('#top-fundraising').append("<li>" + value.name + "</li>" + "<li>" + value.total + "</li>");
       }); 
    });
    
    // View More or View Less for Top List
    $('ul#top-teams, ul#top-fundraising').on('click','.more', function(){

      if( $(this).hasClass('less') ){    
        $(this).text('More...').removeClass('less');    
      }else{
        $(this).text('Less...').addClass('less'); 
      }

      $(this).siblings('li.toggleable').slideToggle();
    }); 
    
});

// Window Load Function
$(window).on("load",function(){
    //Preloard to FadeOut on Load
   $('div#ride-preloader').fadeOut('slow');
    
    // View More or Less Function
    $('ul#top-teams, ul#top-fundraising').each(function(){
  
      var liFind = $(this).find('li').length;

      if( liFind > 10){    
        $('li', this).eq(9).nextAll().hide().addClass('toggleable');
        $(this).append('<li class="more">More...</li>');    
      }

    });
});