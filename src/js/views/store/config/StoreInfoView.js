// Filename: src/js/views/store/config/StoreInfoView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'views/store/config/AddressView',
    'text!templates/store/config/StoreInfoTemplate.html'
    ], function ($, _, Backbone, notificationcenter, AddressView, StoreInfoTemplate) {

	"use strict";

	var StoreInfoView = Backbone.View.extend({

		events: {
			'focusout #storeDescriptionInput': '_updateDescription',
			'focusout #storeOrderingContactInput': '_updateOrderEmail',
			'click #bMail': '_sendTestOrder',
			'click #storeOpen': '_toggleOpen',
			// payment methods
			'click #payment button.toggle': '_togglePaymentMethod',
			'click #paypalSettings': '_updatePaypal'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			var json = {
				'number': this.model.get('number'),
				'title': this.model.get('title'),
				'orderEmail': this.model.get('orderEmail'),
				'isOpen': this.model.get('isOpen'),
				'allowsPaymentPaypal': this.model.get('allowsPaymentPaypal'),
				'allowsPaymentEc': this.model.get('allowsPaymentEc'),
				'allowsPaymentCash': this.model.get('allowsPaymentCash')
			};

			this.$el.html(_.template(StoreInfoTemplate, json));

			new AddressView({
				el: this.$('#storeAddress'),
				model: this.model
			});
		},

		_updateDescription: function (e) {
			var $textarea = $(e.target),
				description = $textarea.val();

			this.model.set('description', description);
			this._saveModel();
		},

		_updateOrderEmail: function (e) {
			var $input = $(e.target),
				val = $input.val();

			this.model.set('orderEmail', val);
			this._saveModel();
		},

		_sendTestOrder: function () {
			$.ajax({
				url: 'stores/storeAlias/testorder',
				type: 'post',
				success: function () {
					notificationcenter.notify('views.store.config.testOrder.success');
				},
				error: function () {
					notificationcenter.notify('views.store.config.testOrder.error');
				}
			});
		},

		_toggleOpen: function () {
			var $button = this.$('#storeOpen'),
				isOpen = !this.model.get('isOpen');

			this.model.set('isOpen', isOpen);
			this.model.save({}, {
				success: function () {
					if (isOpen) {
						notificationcenter.notify('views.store.config.isOpen');
					} else {
						notificationcenter.notify('views.store.config.isClosed');
					}
					$button.toggleClass('isOpen');
				},
				error: function () {
					notificationcenter.notify('views.store.config.isOpenError');
				}
			});
		},

		_togglePaymentMethod: function (e) {
			var self = this,
				storeModel = this.model,
				$button = $(e.target),
				$wrapper = $button.parent(),
				method = $button.attr('data-method'),
				attribute = 'allowsPayment' + method,
				value = !this.model.get(attribute),
				changedAttributes = {};

			changedAttributes[attribute] = value;

			this.model.save(changedAttributes, {
				validate: true,
				success: function () {
					notificationcenter.notify('views.store.config.paymentMethods.success');
					$wrapper.toggleClass('disabled');
				},
				error: function () {
					if (attribute === 'allowsPaymentPaypal') {
						notificationcenter.notify('views.store.config.paymentMethods.error.paypal');
						self.updatePaypal();
					} else {
						notificationcenter.notify('views.store.config.paymentMethods.error');
					}
				}
			});
		},

		_updatePaypal: function () {
			var url = this.model.url() + '/updatepaypal',
				$button = this.$('#paypalSettings');

			$button.prepend('Seite wird geladen...');

			notificationcenter.notify('views.store.config.paymentMethods.loadPaypal');

			$.ajax({
				url: url,
				type: 'get',
				dataType: 'json',
				success: function (response) {
					var paypalUrl = response.url;
					window.location = paypalUrl;
				}
			});

		},

		_saveModel: function () {
			var self = this;
			this.model.save({}, {
				success: function () {
					notificationcenter.notify('views.store.config.info.success');
				},
				error: function () {
					notificationcenter.notify('views.store.config.info.error');
				}
			});
		}

	});

	return StoreInfoView;

});