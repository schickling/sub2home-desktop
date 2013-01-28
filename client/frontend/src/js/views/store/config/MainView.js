// Filename: src/js/views/store/config/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'models/stateModel',
	'views/PageView',
	'views/store/config/AddressView',
	'views/store/config/DeliveryAreasView',
	'views/store/config/DeliveryTimesView',
	'text!templates/store/config/MainTemplate.html'
	], function ($, _, Backbone, router, stateModel, PageView, AddressView, DeliveryAreasView, DeliveryTimesView, MainTemplate) {

	var MainView = PageView.extend({

		events: {
			'focusout #storeDescriptionInput': 'updateDescription',
			'focusout .orderEmail': 'updateOrderEmail',
			'click .buttonOpen': 'toggleOpen',
			'click .bankaccount': 'toggleBankaccount',
			'click #paypal': 'togglePaypal'
		},

		initialize: function () {
			this.model = stateModel.get('storeModel');
			this.render();
		},

		render: function () {
			this.$el.html(_.template(MainTemplate, this.model.toJSON()));

			this.addressView = new AddressView({
				el: this.$('.storeAddress'),
				model: this.model.get('addressModel')
			});

			this.deliveryAreasView = new DeliveryAreasView({
				el: this.$('.deliveryAreas'),
				collection: this.model.get('deliveryAreasCollection')
			});

			this.deliveryTimesView = new DeliveryTimesView({
				el: this.$('.deliveryTimes'),
				collection: this.model.get('deliveryTimesCollection')
			});

			this.append();
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
			this.model.set('paymentPaypal', true);

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

	return MainView;

});