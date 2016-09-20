var topRange = 200,  // 200 measure from the top of the viewport to X pixels down
    edgeMargin = 20,   // 20 margin above the top or margin from the end of the page
    animationTime = 1200, // time in milliseconds
    contentTop = [];

$(document).ready(function(){
    // Stop animated scroll if the user does something
    $('html,body').bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(e){
        if ( e.which > 0 || e.type == 'mousedown' || e.type == 'mousewheel' ){
            $('html,body').stop();
        }
    });

    // Set up content an array of locations
    $('.desktop .menu').find('a').each(function(){
        contentTop.push( $( $(this).attr('href') ).offset().top );
    });

    // adjust side menu
    $(window).scroll(function(){
        var winTop = $(window).scrollTop(),
        bodyHt = $(document).height(),
        vpHt = $(window).height() + edgeMargin;  // viewport height + margin
        $.each( contentTop, function(i,loc){
            if ( ( loc > winTop - edgeMargin && ( loc < winTop + topRange || ( winTop + vpHt ) >= bodyHt ) ) ){
                $('.menu a').removeClass('current').eq(i).addClass('current');
            }
        })
    });

    // Code from W3Schools
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional numbergit add (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
            });
        } // End if
    });

    $('button').click(function() {
        $(this).toggleClass('expanded').siblings('ul').slideToggle();
    });

    // Handles revealing of speaker bio cards.
    $('.card-overlay').hide();
    $('.card-picture').click(function() {
        $('.card-overlay').not($(this).find('.card-overlay')).slideUp('slow');
        $(this).parent().find('.card-overlay').slideToggle('slow');
    });

    $('.card-overlay').click(function() {
        console.log("Clicky");
        $(this).slideUp('slow');
    });

    // Set up a resize listener for clearfix
    // resizes bio cards to a uniform size
    about_section_clearfix();
    speaker_bio_resize();
    $( window ).resize(function() {
        about_section_clearfix();
        speaker_bio_resize();
    });
});

// Clearfix for the about section (Issue #82)
about_section_clearfix = function() {
    var max_height = Math.max.apply(null, $(".about_section_card").map(function(){
        return $(this).height();
    }).get());
    // console.log(max_height);
    $('.about_section_card').height(max_height)
};

// Resizes all speaker cards to be the same size
speaker_bio_resize = function(){
    var maxBiocardHeight = 0;

    $('.speaker-section .speaker-card-subtitle').each(function(){
        if($(this).height() > maxBiocardHeight) {
            maxBiocardHeight = $(this).height();
        }
    });

    $('.speaker-section .speaker-card-subtitle').height(maxBiocardHeight);
}