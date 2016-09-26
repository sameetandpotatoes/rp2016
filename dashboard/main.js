var clock;

$(document).ready(function() {
	var clock;

    var date = new Date(2016, 8, 29);
    var now = new Date();
    var diff = (date.getTime()/1000) - (now.getTime()/1000);
    
	clock = $('.clock').FlipClock(diff, {
        clockFace: 'DailyCounter',
        autoStart: false,
        callbacks: {
        	stop: function() {
        		$('.message').html('Reflections | Projections 2016 is here!')
        	}
        }
    });

    clock.setCountdown(true);
    clock.start();

});
