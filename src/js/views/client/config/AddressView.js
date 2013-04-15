// Filename: src/js/views/client/config/AddressView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'notificationcenter',
    'text!templates/client/config/AddressTemplate.html'
    ], function ($, _, Backbone, notificationcenter, AddressTemplate) {

	var AddressView = Backbone.View.extend({

		template: _.template(AddressTemplate),

		events: {
			'focusout input': '_update'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			var json = {
				firstName: this.model.get('firstName'),
				lastName: this.model.get('lastName'),
				street: this.model.get('street'),
				streetNumber: this.model.get('streetNumber'),
				streetAdditional: this.model.get('streetAdditional'),
				city: this.model.get('city'),
				district: this.model.get('district'),
				phone: this.model.get('phone'),
				email: this.model.get('email'),
				postal: this.model.get('postal')
			};

			this.$el.html(this.template(json));
		},

		_update: function (e) {
			var $input = $(e.target),
				field = $input.attr('data-field'),
				val = $input.val();

			// check if value really changed
			if (val !== this.model.get(field)) {

				this.model.set(field, val);

				this.model.save({}, {
					success: function () {
						notificationcenter.notify('views.client.config.address.success');
					},
					error: function () {
						notificationcenter.notify('views.client.config.address.error');
					}
				});
			}

		}


	});

	return AddressView;

});