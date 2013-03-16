// Filename: src/js/views/store/config/AddressView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'text!templates/store/config/AddressTemplate.html'
    ], function ($, _, Backbone, notificationcenter, AddressTemplate) {

	var AddressView = Backbone.View.extend({

		events: {
			'focusout input': '_update'
		},

		template: _.template(AddressTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {
			var addressModel = this.model.get('addressModel'),
				json = {
					firstName: addressModel.get('firstName'),
					lastName: addressModel.get('lastName'),
					street: addressModel.get('street'),
					streetAdditional: addressModel.get('streetAdditional'),
					city: addressModel.get('city'),
					phone: addressModel.get('phone'),
					email: addressModel.get('email'),
					postal: addressModel.get('postal')
				};

			this.$el.html(this.template(json));
		},

		_update: function (e) {
			var storeModel = this.model,
				addressModel = this.model.get('addressModel'),
				$input = $(e.target),
				field = $input.attr('data-field'),
				val = $input.val(),
				shouldReloadStoreModel = _.contains(['street', 'postal', 'city'], field);

			// check if value really changed
			if (val !== addressModel.get(field)) {

				addressModel.set(field, val);

				addressModel.save({}, {
					success: function () {
						notificationcenter.notify('views.store.config.address.success');
						// reload store if address got changed
						if (shouldReloadStoreModel) {
							storeModel.fetch();
						}
					},
					error: function () {
						notificationcenter.notify('views.store.config.address.error');
					}
				});
			}

		}

	});

	return AddressView;

});