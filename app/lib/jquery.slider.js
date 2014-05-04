(function($){
    $.fn.plainSlider = function(direction,timediff) {
        var slides;
		var allcount;
        var i;

        function run() {
            // hiding previous image and showing next
            if(direction==='up')
			{
				$(slides[i]).slideUp(3000);
				i++;
				if (i >= allcount) i = 0;
				$(slides[i]).show(3000);
			}
			else if(direction==='down')
			{
				$(slides[i]).hide(3000);
				i++;
				if (i >= allcount) i = 0;
				$(slides[i]).slideDown(3000);
			}
			else if(direction==='left')
			{
				$(slides[i]).show();
				var position = $(slides[i]).position();
				if(position.left===500)
				{
					$(slides[i]).css({ left: 0});
				};
				$(slides[i]).animate({"left": "+=500px"}, 3000);
				i++;
				if (i >= allcount) i = 0;
				
			}
			else 
			{
				$(slides[i]).show();
				var position = $(slides[i]).position();
				if(position.left<0)
				{
					$(slides[i]).css({ left: 0});
				};
				$(slides[i]).animate({"left": "-=500px"}, 3000);
				i++;
				if (i >= allcount) i = 0;
				
			}
            setTimeout(run, timediff);
        }

        slides = $(this).children();
        allcount = slides.length;
		//allcount = 2;
        i=0;

        setTimeout(run, timediff);
    };
})(jQuery);
