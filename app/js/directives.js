'use strict';

/* Directives */

angulardemo
		  // Register the 'myCurrentTime' directive factory method.
		  // We inject $timeout and dateFilter service since the factory method is DI.
	.directive('myCurrentTime', function($timeout, dateFilter) {
			// return the directive link function. (compile function not needed)
		return function(scope, element, attrs) {
		  var format,  // date format
			  timeoutId; // timeoutId, so that we can cancel the time updates
	 
		  // used to update the UI
		  function updateTime() {
			element.text(dateFilter(new Date(), format));
		  }
	 
		  // watch the expression, and update the UI on change.
		  scope.$watch(attrs.myCurrentTime, function(value) {
			format = value;
			updateTime();
		  });
	 
		  // schedule update in one second
		  function updateLater() {
			// save the timeoutId for canceling
			timeoutId = $timeout(function() {
			  updateTime(); // update DOM
			  updateLater(); // schedule another update
			}, 1000);
		  }
	 
		  // listen on DOM destroy (removal) event, and cancel the next UI update
		  // to prevent updating time after the DOM element was removed.
		  element.on('$destroy', function() {
			$timeout.cancel(timeoutId);
		  });
	 
		  updateLater(); // kick off the UI update process.
		}
});
		  

		  
angulardemo  
		  .directive("green" + "Autocomplete", function() {
			
		var oldSuggest = jQuery.ui.autocomplete.prototype._suggest;
		jQuery.ui.autocomplete.prototype._suggest = function(items) {
			var itemsArray = items;
			if (this.options.maxItems && this.options.maxItems > 0) {
				itemsArray = items.slice(0, this.options.maxItems);
			}
			oldSuggest.call(this, itemsArray);
		};
			
			//mock ajax.
		var oldAjax = jQuery.ajax;
		jQuery.ajax = function(param) {
			if (param.url === "url") {
				var term = param.data.term;
				param.success([term + "1", term + "2", 3 + term, 4 + term]);
			}
			else {
				oldAjax(param);
			}
		}
			
		var linkFun = function($scope, element, attrs) {
		var $input = jQuery(element);
		var responseDataSource = function($scope, source, pattern, response) {
			var express = $scope[source];
			var data = typeof(express) === "function" ? express(pattern, response) : express;
			if (data) {
				response(data);
			}
		};
		var option = attrs;
		//
		option.position = {
			my: attrs.positionMy,
			at: attrs.positionAt,
		};
		var option = jQuery.extend({
			position: {
				my: "",
				at: ""
			},
			close: function(event, ui) {
				var express = attrs["ngModel"] + "='" + $input.val() + "'";
				$scope.$apply(express);
				$scope.$eval(attrs["ngChange"]);
			}
		}, option);
		option.remote = option.remote === "true";
		if (!option.remote) {
			option.dataSource = attrs.source;
			option.source = function(pattern, response) {
				var option = $input.autocomplete("option");
				var responseEx = function(data) {
					var matches = jQuery.map(data, function(tag) {
						var startWith = attrs.startWith === "true";
						var index = tag.toUpperCase().indexOf(pattern.term.toUpperCase())
						if ((startWith && index === 0) || (!startWith && index > -1)) {
							return tag;
						}
					})
					response(matches);
				};
				responseDataSource($scope, option.dataSource, pattern, responseEx);
			};
		} else {
			option.source = option.source; //remote url
		}
		$input.autocomplete(option);
	};
	return linkFun;
});

angulardemo
  .directive('imageSlider', function () {
    return {
      restrict: 'A',
	  scope: {
        timeInterval: '=',
		myDirection: '=',
		sliderId: '='
      },
      link: function (scope, elem, attrs) {
		//$('#'+scope.sliderId).plainSlider(scope.myDirection,scope.timeInterval);
		$(elem.children()[0]).plainSlider(scope.myDirection,scope.timeInterval);
      }
    }
  });
  
  
angulardemo
  .directive(
    'thing', function () {
      return {
        restrict: 'E'
      , templateUrl: '/tpl.html'
      , replace: true
      , transclude: true
      , scope: { 'title': '@' }
      }});
	  
angulardemo
  .directive('fundooRating', function () {
    return {
      restrict: 'A',
      template: '<ul class="rating">' +
                  '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                    '\u2605' +
                  '</li>' +
                '</ul>',
      scope: {
        ratingValue: '=',
        max: '=',
        readonly: '@',
        onRatingSelected: '&'
      },
      link: function (scope, elem, attrs) {

        var updateStars = function() {
          scope.stars = [];
          for (var  i = 0; i < scope.max; i++) {
            scope.stars.push({filled: i < scope.ratingValue});
          }
        };

        scope.toggle = function(index) {
          if (scope.readonly && scope.readonly === 'true') {
            return;
          }
          scope.ratingValue = index + 1;
          scope.onRatingSelected({rating: index + 1});
        };

        scope.$watch('ratingValue', function(oldVal, newVal) {
          if (newVal) {
            updateStars();
          }
        });
      }
    }
  });	  
  
angulardemo  
  .directive( 'whenActive', function ( $location ) {
    return {
        scope: true,
        link: function ( scope, element, attrs ) {
            scope.$on( '$routeChangeSuccess', function () {
                if ( $location.path() == element.attr( 'href' ) ) {
                    element.addClass( 'active' );
                }
                else {
                    element.removeClass( 'active' );
                }
            });
        }
    };
});




angulardemo.directive('imgloader', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attr, ctrl) {
         

		var photos = scope.photos;

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
		
		// Define some variables

		var page = 0,
			loaded = 0,
			perpage = 10,
			//main = $('#main'),
			main = elem,
			expected = perpage,
			loadMore = elem.next();

		// Listen for the image-loaded custom event

		elem.on('image-loaded', function(){

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

				deferred = elem.showImage(this, deferred);

				expected++;
			});

			// Start the progress bar animation
			NProgress.start();
	
			page++;
		});

		loadMore.click();
		
        }
    };
});



angulardemo.directive('choiceTree', function() {
      return {
        template: '<ul><choice ng-repeat="choice in tree"></choice></ul>',
        replace: true,
        transclude: true,
        restrict: 'E',
        scope: {
          tree: '=ngModel'
        }
      };
});

angulardemo.directive('choice', function($compile) {
  return { 
    restrict: 'E',
    //In the template, we do the thing with the span so you can click the 
    //text or the checkbox itself to toggle the check
    template: '<li>' +
      '<span ng-click="choiceClicked(choice)">' +
        '<input type="checkbox" ng-checked="choice.checked"> {{choice.name}}' +
      '</span>' +
    '</li>',
    link: function(scope, elm, attrs) {
      scope.choiceClicked = function(choice) {
        choice.checked = !choice.checked;
        function checkChildren(c) {
          angular.forEach(c.children, function(c) {
            c.checked = choice.checked;
            checkChildren(c);
          });
        }
        checkChildren(choice);
      };
      
      //Add children by $compiling and doing a new choice directive
      
      if (scope.choice.children.length > 0) {
        var childChoice = $compile('<choice-tree ng-model="choice.children"></choice-tree>')(scope)
        elm.append(childChoice);
      }
      
    }
  };
});



