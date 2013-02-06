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
			'click .bankaccount': 'toggleBankaccount',
			'click #paypal': 'togglePaypal'
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
			var $button = this.$('.sBOpen');

			this.model.set('isOpen', !this.model.get('isOpen'));
			this.model.save({}, {
				success: function () {
					notificationcenter.success('Store status geaendert', 'Info erfolgreich gespeichert');
					$button.toggleClass('open');
				},
				error: function () {
					notificationcenter.error('Fehler :(', 'Info nicht erfolgreich gespeichert');
				}
			});
		},

		toggleBankaccount: function () {
			var $bankDetails = this.$('.bankDetails');
			$bankDetails.fadeToggle(150);
		},

		togglePaypal: function () {
			var $button = this.$('#paypal');

			$button.text('Seite wird geladen');
			// wait spinner :)
			this.model.set('allowsPaymentPaypal', true);

			this.model.save({}, {
				success: function () {
					$button.text('Passt :)');
				},

				error: function (model, error) {
					var url = error.responseText;
					window.location = url;
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