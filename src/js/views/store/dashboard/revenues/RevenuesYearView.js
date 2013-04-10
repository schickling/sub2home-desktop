// Filename: src/js/views/store/dashboard/revenues/RevenuesYearView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/dashboard/revenues/RevenueView',
    'text!templates/store/dashboard/revenues/RevenuesYearTemplate.html'
    ], function ($, _, Backbone, RevenueView, RevenuesYearTemplate) {

	var RevenuesYearView = Backbone.View.extend({

		template: _.template(RevenuesYearTemplate),

		className: 'turnoverYear',

		initialize: function () {
			this._render();
		},

		_render: function () {

			// check if year has passed
			var currentYear = new Date().getFullYear(),
				invoiceYear = this.collection.first().getTimeSpanYear();

			if (invoiceYear < currentYear) {
				var json = {
					total: parseInt(this.collection.getTotal(), 10),
					year: invoiceYear
				};

				this.$el.html(this.template(json));
			}

			this._renderRevenues();
		},

		_renderRevenues: function () {
			_.each(this.collection.models, function (invoiceModel) {
				this._renderRevenue(invoiceModel);
			}, this);
		},

		_renderRevenue: function (invoiceModel) {
			var revenueView = new RevenueView({
				model: invoiceModel
			});

			// prepend because of inverted order
			this.$el.prepend(revenueView.el);
		}

	});

	return RevenuesYearView;

});