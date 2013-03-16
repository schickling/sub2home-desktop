// Filename: src/js/views/store/dashboard/BalanceOrderView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/store/dashboard/BalanceOrderTemplate.html'
    ], function ($, _, Backbone, BalanceOrderTemplate) {

	var BalanceOrderView = Backbone.View.extend({

		template: _.template(BalanceOrderTemplate),

		className: 'balanceOrder',

		initialize: function () {
			this._render();
		},

		_render: function () {

			var json = {
				id: this.model.get('id'),
				balanceId: this.model.get('balance_order_model_id'),
				total: this.model.get('total')
			};

			this.$el.html(this.template(json));
		}

	});

	return BalanceOrderView;

});