// Filename: src/js/views/client/dashboard/StoreView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'services/router',
    'text!templates/client/dashboard/StoreTemplate.html'
    ], function ($, _, Backbone, moment, router, StoreTemplate) {

	"use strict";

	var StoreView = Backbone.View.extend({

		template: _.template(StoreTemplate),

		className: 'clientStore',

		events: {
			'click': '_navigate'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			var invoicesCollection = this.model.get('invoicesCollection'),
				currentMoment = moment();

			var json = {
				title: this.model.get('title'),
				month: currentMoment.format('MMMM'),
				year: currentMoment.format('YYYY'),
				total: parseInt(invoicesCollection.getTotalOfCurrentMonth(), 10),
				numberOfUndoneOrders: this.model.get('numberOfUndoneOrders')
			};

			this.$el.html(this.template(json));
		},

		_navigate: function () {
			router.navigate(this.model.get('alias') + '/dashboard', true);
		}


	});

	return StoreView;

});