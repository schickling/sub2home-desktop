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
			this.$el.html(this.template(this.model.toJSON()));
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