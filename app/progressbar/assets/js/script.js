(function($){

	// An array with photos to show on the page. Instead of hard 
	// coding it, you can fetch this array from your server with AJAX.

	var photos = [
		'assets/photos/1.jpg',	'assets/photos/2.jpg',
		'assets/photos/3.jpg',	'assets/photos/4.jpg',
		'assets/photos/5.jpg',	'assets/photos/6.jpg',
		'assets/photos/7.jpg',	'assets/photos/8.jpg',
		'assets/photos/9.jpg',	'assets/photos/10.jpg',
		'assets/photos/11.jpg',	'assets/photos/12.jpg',
		'assets/photos/13.jpg',	'assets/photos/14.jpg',
		'assets/photos/15.jpg',	'assets/photos/16.jpg',
		'assets/photos/17.jpg',	'assets/photos/18.jpg',
		'assets/photos/19.jpg',	'assets/photos/20.jpg',
		'assets/photos/21.jpg',	'assets/photos/22.jpg',
		'assets/photos/23.jpg',	'assets/photos/24.jpg',
		'assets/photos/25.jpg',	'assets/photos/26.jpg',
		'assets/photos/27.jpg',	'assets/photos/28.jpg',
		'assets/photos/29.jpg',	'assets/photos/30.jpg',
		'assets/photos/31.jpg',	'assets/photos/32.jpg',
		'assets/photos/33.jpg',	'assets/photos/34.jpg',
		'assets/photos/35.jpg'
	];

	$(document).ready(function(){		

		// Define some variables

		var page = 0,
			loaded = 0,
			perpage = 10,
			main = $('#main'),
			expected = perpage,
			loadMore = $('#loadMore');

		// Listen for the image-loaded custom event

		main.on('image-loaded', function(){

			// When such an event occurs, advance the progress bar

			loaded++;

			// NProgress.set takes a number between 0 and 1
			NProgress.set(loaded/expected);

			if(page*perpage >= photos.length){

				// If there are no more photos to show,
				// remove the load button from the page

				loadMore.remove();
			}
		});

		// When the load button is clicked, show 10 more images 
		// (controlled by the perpage variable)

		loadMore.click(function(e){

			e.preventDefault();

			loaded = 0;
			expected = 0;

			// We will pass a resolved deferred to the first image,
			// so that it is shown immediately.
			var deferred = $.Deferred().resolve();

			// Get a slice of the photos array, and show the photos. Depending
			// on the size of the array, there may be less than perpage photos shown

			$.each(photos.slice(page*perpage, page*perpage + perpage), function(){

				// Pass the deferred returned by each invocation of showImage to 
				// the next. This will make the images load one after the other:

				deferred = main.showImage(this, deferred);

				expected++;
			});

			// Start the progress bar animation
			NProgress.start();
	
			page++;
		});

		loadMore.click();
	});

	// Create a new jQuery plugin, which displays the image in the current element after
	// it has been loaded. The plugin takes two arguments:
	//	* src - the URL of an image
	//	* deferred - a jQuery deferred object, created by the previous call to showImage
	// 
	// Returns a new deferred object that is resolved when the image is loaded.

	$.fn.showImage = function(src, deferred){

		var elem = $(this);

		// The deferred that this function will return

		var result = $.Deferred();

		// Create the photo div, which will host the image

		var holder = $('<div class="photo" />').appendTo(elem);

		// Load the image in memory

		var img = $('<img>');

		img.load(function(){

			// The photo has been loaded! Use the .always() method of the deferred
			// to get notified when the previous image has been loaded. When this happens,
			// show the current one.

			deferred.always(function(){

				// Trigger a custom event on the #main div:
				elem.trigger('image-loaded');

				// Append the image to the page and reveal it with an animation

				img.hide().appendTo(holder).delay(100).fadeIn('fast', function(){

					// Resolve the returned deferred. This will notifiy
					// the next photo on the page and call its .always() callback

					result.resolve()
				});
			});

		});

		img.attr('src', src);

		// Return the deferred (it has not been resolved at this point)
		return result;
	} 

})(jQuery);