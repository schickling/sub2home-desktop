// Filename: src/js/views/store/dashboard/revenues/RevenueView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'text!templates/store/dashboard/revenues/RevenueTemplate.html'
    ], function ($, _, Backbone, moment, RevenueTemplate) {

	var RevenueView = Backbone.View.extend({

		template: _.template(RevenueTemplate),

		className: 'turnover',

		initialize: function () {
			this._render();
		},

		_render: function () {

			var invoiceMoment = moment([this.model.getTimeSpanYear(), this.model.getTimeSpanMonth()]);

			var json = {
				total: parseInt(this.model.get('total'), 10),
				month: invoiceMoment.format('MMM'),
				year: invoiceMoment.format('YYYY')
			};

			this.$el.html(this.template(json));
		}

	});

	return RevenueView;

});