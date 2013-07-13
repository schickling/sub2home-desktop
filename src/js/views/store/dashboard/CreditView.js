// Filename: src/js/views/store/dashboard/CreditView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'models/CreditModel',
    'text!templates/store/dashboard/CreditTemplate.html'
], function ($, _, Backbone, notificationcenter, CreditModel, CreditTemplate) {

	"use strict";

	var CreditView = Backbone.View.extend({

		template: _.template(CreditTemplate),

		events: {
			'click #cancelBalanceOrder': '_close',
			'click #submitBalanceOrder': '_create'
		},

		orderModel: null,

		createForOrder: function (orderModel) {
			this.orderModel = orderModel;
			this.model = new CreditModel({
				total: orderModel.get('total')
			});

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
		},

		_create: function () {
			var self = this,
				total = this.$('#balanceOrderValueInput').val(),
				description = this.$('#balanceOrderMessage').val();

			if (!description) {
				notificationcenter.notify('views.store.dashboard.credit.noDescription');
				return;
			}

			if (total > this.orderModel.get('total')) {
				notificationcenter.notify('views.store.dashboard.credit.tooMuchTotal');
				return;
			}

			if (total <= 0) {
				notificationcenter.notify('views.store.dashboard.credit.tooLessTotal');
				return;
			}

			this.model.save({
				total: total,
				description: description
			}, {
				url: 'orders/' + self.orderModel.get('id') + '/credits',
				success: function () {
					notificationcenter.notify('views.store.dashboard.credit.success');
					self.orderModel.set('creditModel', self.model);
					self._close();
				},
				error: function () {
					notificationcenter.notify('views.store.dashboard.credit.error');
				}
			});
		}

	});

	return CreditView;

});