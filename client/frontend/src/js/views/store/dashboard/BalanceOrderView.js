// Filename: src/js/views/store/dashboard/BalanceOrderView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/store/dashboard/BalanceOrderTemplate.html'
    ], function ($, _, Backbone, BalanceOrderTemplate) {

	var BalanceOrderView = Backbone.View.extend({

		template: _.template(BalanceOrderTemplate),

		className: 'order balance',

		initialize: function () {
			this._render();
		},

		_render: function () {

			var json = {
				number: this.model.getOrderNumber(),
				balanceNumber: this.model.getBalanceOrderNumber(),
				total: this.model.get('total')
			};

			this.$el.html(this.template(json));
		}

	});

	return BalanceOrderView;

});