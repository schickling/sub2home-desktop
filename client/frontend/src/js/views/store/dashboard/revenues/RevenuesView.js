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
			var $toggleRevenues = this.$('.toggleRevenues'),
				$revenues = this.$('.revenues'),
				$iTurnover = $toggleRevenues.find('.iTurnover');

			if ($toggleRevenues.hasClass('toggled')) { // hide

				this.$el.animate({
					top: 0
				});

				$iTurnover.animate({
					paddingLeft: 0
				});

				$revenues.animate({
					opacity: 0
				});

			} else { // show

				this.$el.animate({
					top: 400
				});

				$iTurnover.animate({
					paddingLeft: 40
				});

				$revenues.animate({
					opacity: 1
				});

			}

			$toggleRevenues.toggleClass('toggled');
		}

	});

	return RevenuesView;

});