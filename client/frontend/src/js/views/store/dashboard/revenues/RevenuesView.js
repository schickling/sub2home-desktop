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

		initialize: function () {
			this.render();

			this.$('.turnoverContainer').overscroll({
				showThumbs: false,
				direction: 'horizontal',
				wheelDirection: 'horizontal'
			});
		},

		render: function () {
			this.$el.html(this.template());
		}

	});

	return RevenuesView;

});