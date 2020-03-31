/*
 * Stellarnav.js 2.6.0
 * Responsive, lightweight, multi-level dropdown menu.
 * Copyright (c) 2018 Vinny Moreira - http://vinnymoreira.com
 * Released under the MIT license
 */
(function($) {
	$.fn.stellarNav = function(options, width, breakpoint) {

		var $nav, $width, $breakpoint, $parentItems;
		nav = $(this);
		width = $(window).width();

		// default settings
		var settings = $.extend( {
			breakpoint: 1280, // number in pixels to determine when the nav should turn mobile friendly
			openingSpeed: 200, // how fast the dropdown should open in milliseconds
			closingDelay: 0 // controls how long the dropdowns stay open for in milliseconds
		}, options );

		return this.each( function() {

			if (settings.breakpoint) {
				breakpoint = settings.breakpoint;
			}

			// opens and closes menu
			$('.menu-toggle').on('click', function(e) {
				e.preventDefault();
					nav.toggleClass('active');
					$('body').toggleClass('hidden');

					if(nav.hasClass('active') && nav.hasClass('mobile')) {
						// closes the menu when clicked outside of it
						$(document).on('click', function(event) {
							// ensures menu hides only on mobile nav
							if(nav.hasClass('mobile')) {
							  	if (!$(event.target).closest(nav).length) {
							  		nav.removeClass('active');
							  		$('body').removeClass('hidden');
								}
							}
						});
					}
			});

			// adds toggle button to li items that have children
			nav.find('.navMainWrap li a').each(function() {
				if ($(this).next().length > 0) {
					$(this).parent('li').addClass('has-sub').append('<a class="dd-toggle" href="#"><span class="icon-plus"></span></a>');
				}
			});

			// expands the dropdown menu on each click
			nav.find('.navMainWrap li .dd-toggle').on('click', function(e) {

				e.preventDefault();
				$(this).parent('li').children('ul').stop(true, true).slideToggle(200);
				$(this).parent('li').toggleClass('open');
			});

			var resetTriggers = function() {
				nav.find('li').off('mouseenter');
				nav.find('li').off('mouseleave');
			}

			// defines top level items
			parentItems = nav.find('.navMainWrap > ul > li');

			var setTriggers = function() {
				$(parentItems).each(function() {
					// first-level
						$(this).on('mouseenter', function(){
							$(this).children('ul').stop(true, true).slideDown(settings.openingSpeed);
						});
						$(this).on('mouseleave', function(){
							$(this).children('ul').stop(true, true).delay(settings.closingDelay).slideUp(settings.openingSpeed);
						});

						// second level and below
						$(this).find('li.has-sub').on('mouseenter', function(){
							$(this).children('ul').stop(true, true).slideDown(settings.openingSpeed);

							console.log('sdfsdf');
						});
						$(this).find('li.has-sub').on('mouseleave', function(){
							$(this).children('ul').stop(true, true).delay(settings.closingDelay).slideUp(settings.openingSpeed);
						});
					// }
				});
			}

			windowCheck();

			// check browser width in real-time
			function windowCheck() {
				var browserWidth = window.innerWidth;

				// if(browserWidth <= breakpoint || settings.mobileMode) {
				if(browserWidth <= breakpoint) {
					// mobile/tablet nav

					resetTriggers();
					nav.addClass('mobile').removeClass('desktop');
					// nav.removeClass('desktop');

					// closes the menu when resizing window back to desktop
					if( !nav.hasClass('active') && nav.find('ul:first').is(':visible') ) {
						// nav.find('ul:first').hide();
					}

				} else {
					// desktop nav
					nav.addClass('desktop').removeClass('mobile');
					// nav.removeClass('mobile');

					if(nav.hasClass('active')) {
						nav.removeClass('active');
					}

					// ensures stellarnav is visible after resizing window
					if( !nav.hasClass('active') && nav.find('ul:first').is(':hidden') ) {
						nav.find('ul:first').show();
					}

					// hides items that were open on mobile
					$('li.open').removeClass('open').find('ul:visible').hide();

					resetTriggers();
					setTriggers();
				
				} // end desktop nav
			} // windowCheck()

			$(window).on('resize', function() {
				windowCheck();
			});
		});
	}
}(jQuery));
