// Filename: src/js/views/store/dashboard/CreditView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'models/CreditModel',
    'text!templates/store/dashboard/CreditTemplate.html'
    ], function ($, _, Backbone, CreditModel, CreditTemplate) {

	var CreditView = Backbone.View.extend({

		template: _.template(CreditTemplate),

		events: {
			'click #cancelBalanceOrder': '_close'
		},

		orderModel: null,

		createForOrder: function (orderModel) {
			this.orderModel = orderModel;
			this.model = new CreditModel({
				total: orderModel.get('total')
			});

			this.orderModel.set('creditModel', this.model);

			this._render();
			this._show();
		},

		_render: function () {
			var json = {
				orderNumber: this.orderModel.getNumber(),
				total: this.model.get('total')
			};

			this.$el.html(this.template(json));
		},

		_show: function () {
			this.$el.fadeIn();

			this.$('#balanceOrderMessage').focus();
		},

		_close: function () {
			this.$el.fadeOut();
		}

	});

	return CreditView;

});