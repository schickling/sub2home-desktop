// Filename: src/js/views/notifications/TooltipsView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/notifications/TooltipView'
    ], function ($, _, Backbone, TooltipView) {

	var TooltipsView = Backbone.View.extend({

		el: $('#tooltips'),

		currentTooltipView: null,

		renderTooltip: function (tooltipModel, top, left) {
			// hide old tooltip
			this.hideTooltip();

			var tooltipView = new TooltipView({
				model: tooltipModel,
				top: top,
				left: left
			});

			this.$el.prepend(tooltipView.el);

			// needs to be in dom first
			tooltipView.show();

			this.currentTooltipView = tooltipView;
		},

		hideTooltip: function () {
			if (this.currentTooltipView) {
				this.currentTooltipView.hide();
			}
		}

	});

	return TooltipsView;
});