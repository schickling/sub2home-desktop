// Filename: src/js/views/store/dashboard/RevenuesView.js
define([
    'jquery',
    'lib/jquery/jquery.overscroll',
    'underscore',
    'backbone',
    'text!templates/store/dashboard/RevenuesTemplate.html'
    ], function ($, overscrollLib, _, Backbone, RevenuesTemplate) {

	var RevenuesView = Backbone.View.extend({

		template: _.template(RevenuesTemplate),

		events: {
			'click .toggleRevenues': '_toggle'
		},

		initialize: function () {
			this._render();

			// initialize overscroll
			this.$('.turnoverContainer').overscroll({
				showThumbs: false,
				direction: 'horizontal',
				wheelDirection: 'horizontal'
			});
		},

		_render: function () {
			var $revenues = this.$('.revenues');

			$revenues.html(this.template());
		},

		_toggle: function () {
			var animationTime = 300,
				$el = this.$el,
				$toggleRevenues = this.$('.toggleRevenues'),
				$revenues = this.$('.revenues'),
				$content = $('.content'), // dirty
				$iTurnover = $toggleRevenues.find('.iTurnover');

			if ($toggleRevenues.hasClass('toggled')) { // hide

				$toggleRevenues.removeClass('toggled');

				$iTurnover.animate({
					paddingLeft: 0
				}, animationTime);


				$revenues.animate({
					opacity: 0
				}, animationTime / 2, function () {

					$el.animate({
						height: 100
					}, animationTime);

				});


				$content.animate({
					top: 100
				}, animationTime);

			} else { // show

				$el.animate({
					height: 400
				}, animationTime, function () {

					$revenues.animate({
						opacity: 1
					}, animationTime / 2);

				});


				$iTurnover.animate({
					paddingLeft: 40
				}, animationTime, function () {
					$toggleRevenues.addClass('toggled');
				});


				$content.animate({
					top: 400
				}, animationTime);

			}

		}

	});

	return RevenuesView;

});