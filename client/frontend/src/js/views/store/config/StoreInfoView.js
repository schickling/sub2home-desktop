// Filename: src/js/views/store/config/StoreInfoView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'global',
    'notificationcenter',
    'views/store/config/AddressView',
    'text!templates/store/config/StoreInfoTemplate.html'
    ], function ($, _, Backbone, global, notificationcenter, AddressView, StoreInfoTemplate) {

	var StoreInfoView = Backbone.View.extend({

		events: {
			'focusout #storeDescriptionInput': '_updateDescription',
			'focusout #storeOrderingContactInput': '_updateOrderEmail',
			'click .bMail': '_sendTestOrder',
			'click .sBOpen': '_toggleOpen',
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
				el: this.$('.storeAddress'),
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
				url: '/api/frontend/stores/' + global.getStoreAlias() + '/testorder',
				type: 'post',
				success: function () {
					notificationcenter.success('orders.testOrder.success', 'orders.testOrder.success');
				},
				error: function() {
					notificationcenter.error('orders.testOrder.error', 'orders.testOrder.error');
				}
			});
		},

		_toggleOpen: function () {
			var $button = this.$('.sBOpen'),
				isOpen = !this.model.get('isOpen');

			this.model.set('isOpen', isOpen);
			this.model.save({}, {
				success: function () {
					if (isOpen) {
						notificationcenter.success('Store geoeffnet', 'Info erfolgreich gespeichert');
					} else {
						notificationcenter.success('Store geschlossen', 'Info erfolgreich gespeichert');
					}
					$button.toggleClass('open');
				},
				error: function () {
					notificationcenter.error('Fehler :(', 'Info nicht erfolgreich gespeichert');
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
				value = !this.model.get(attribute);

			this.model.set(attribute, value);

			this.model.save({}, {
				success: function () {
					notificationcenter.success('Bezahlmoeglichkeiten', 'Adresse erfolgreich gespeichert');
					$wrapper.toggleClass('disabled');
				},
				error: function () {
					if (attribute === 'allowsPaymentPaypal') {
						notificationcenter.error('Paypalfehler', 'Adresse nicht erfolgreich gespeichert');
						self.updatePaypal();
					}
				}
			});
		},

		_updatePaypal: function () {
			var url = this.model.url() + '/updatepaypal',
				$button = this.$('#paypalSettings');

			$button.prepend('Seite wird geladen...');

			notificationcenter.info('Paypal wird geladen', 'Adresse nicht erfolgreich gespeichert');

			$.ajax({
				url: url,
				type: 'get',
				success: function (paypalUrl) {
					window.location = paypalUrl;
				}
			});

		},

		_saveModel: function () {
			var self = this;
			this.model.save({}, {
				success: function () {
					notificationcenter.success('Info gespeichert', 'Info erfolgreich gespeichert');
					console.log(self.model);
				},
				error: function () {
					notificationcenter.error('Fehler :(', 'Info nicht erfolgreich gespeichert');
				}
			});
		}

	});

	return StoreInfoView;

});