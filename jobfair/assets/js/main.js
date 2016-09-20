$(function() {
    var source = $("#companies-template").html();
    var template = Handlebars.compile(source);
    $.getJSON('assets/js/companies.json', function (data) {
        var html = template(data);
        $('#companies-list').html(html);
        
        var numColumns = 2;
        var padding = 100;
        $('.card-overlay').hide();
        $('.card-picture').click(function() {
            $('.card-overlay').not($(this).find('.card-overlay')).slideUp('slow');
            $(this).parent().find('.card-overlay').slideToggle('slow');
            
            var currentHeight = $(this).parent().find('.card-picture').height();
            
            var indexOfColumn = $('.card-picture').index($(this).parent().find('.card-picture'));
            var belowColumn = $($('.card-picture')[indexOfColumn + numColumns]);
            
            var requiredHeight = $(this).parent().find('.card-overlay-content').height();
            
            var netHeight = (currentHeight > requiredHeight) ? 0 : (requiredHeight - currentHeight) + padding;
            
            $(this).parent().find('.card-overlay').animate({
              height: currentHeight + netHeight,
              top: -netHeight/2
            }, 'fast');
            $(this).parent().animate({
              "margin-top": netHeight/2,
              "margin-bottom": netHeight/2
            }, 'fast');
        });

        $('.card-overlay').click(function() {
            $(this).slideUp('slow');
            $(this).css("margin-top", "0px");
            $(this).css("margin-bottom", "0px");
        });
    });

    // $( window ).resize(function() {
    //     company_card_resize();
    // });
});

// company_card_resize = function() {
//     var max_height = Math.max.apply(null, $(".company-card").map(function(){
//         return $(this).height();
//     }).get());
//     console.log(max_height);
//     $('.company-card').height(max_height)
// };