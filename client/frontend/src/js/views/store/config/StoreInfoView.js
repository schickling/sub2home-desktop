// Filename: src/js/views/store/config/StoreInfoView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/config/AddressView',
	'text!templates/store/config/StoreInfoTemplate.html'
	], function ($, _, Backbone, AddressView, StoreInfoTemplate) {

	var StoreInfoView = Backbone.View.extend({

		events: {
			'focusout #storeDescriptionInput': 'updateDescription',
			'focusout .orderEmail': 'updateOrderEmail',
			'click .sBOpen': 'toggleOpen',
			'click .bankaccount': 'toggleBankaccount',
			'click #paypal': 'togglePaypal'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			var json = {
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
				model: this.model.get('addressModel')
			});
		},

		updateDescription: function (e) {
			var $textarea = $(e.target),
				description = $textarea.val();

			this.model.set('description', description);
			this.model.save();
		},

		updateOrderEmail: function (e) {
			var $input = $(e.target),
				val = $input.val();

			this.model.set('orderEmail', val);
			this.model.save();
		},

		toggleOpen: function () {
			var $button = this.$el.find('.buttonOpen');

			$button.toggleClass('open');

			this.model.set('isOpen', !this.model.get('isOpen'));
			this.model.save();
		},

		toggleBankaccount: function () {
			var $bankDetails = this.$el.find('.bankDetails');
			$bankDetails.fadeToggle(150);
		},

		togglePaypal: function () {
			var $button = this.$el.find('#paypal');

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
		}

	});

	return StoreInfoView;

});