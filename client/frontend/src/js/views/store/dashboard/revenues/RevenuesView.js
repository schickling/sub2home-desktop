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

			$revenues.show();

			$revenues.html(this.template());
		},

		_toggle: function () {
			var $toggleRevenues = this.$('.toggleRevenues'),
				$iTurnover = $toggleRevenues.find('.iTurnover'),
				$revenues = this.$('.revenues');

			if ($toggleRevenues.hasClass('toggled')) { // hide

				$revenues.animate({
					top: 0
				});

				$iTurnover.animate({
					paddingLeft: 0
				});

			} else { // show

				$revenues.animate({
					top: 400
				});

				$iTurnover.animate({
					paddingLeft: 40
				});

			}

			$toggleRevenues.toggleClass('toggled');
		}

	});

	return RevenuesView;

});