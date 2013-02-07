// Filename: src/js/views/store/config/StoreInfoView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'notificationcenter',
	'views/store/config/AddressView',
	'text!templates/store/config/StoreInfoTemplate.html'
	], function ($, _, Backbone, notificationcenter, AddressView, StoreInfoTemplate) {

	var StoreInfoView = Backbone.View.extend({

		events: {
			'focusout #storeDescriptionInput': 'updateDescription',
			'focusout #storeOrderingContactInput': 'updateOrderEmail',
			'click .sBOpen': 'toggleOpen',
			// payment methods
			'click #payment button.toggle': 'togglePaymentMethod',
			'click #paypalSettings': 'updatePaypal'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
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

		updateDescription: function (e) {
			var $textarea = $(e.target),
				description = $textarea.val();

			this.model.set('description', description);
			this.saveModel();
		},

		updateOrderEmail: function (e) {
			var $input = $(e.target),
				val = $input.val();

			this.model.set('orderEmail', val);
			this.saveModel();
		},

		toggleOpen: function () {
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

		togglePaymentMethod: function (e) {
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

		updatePaypal: function () {
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

		saveModel: function () {
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