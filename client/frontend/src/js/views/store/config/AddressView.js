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
			'focusout input': 'update'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			var addressModel = this.model.get('addressModel');
			this.$el.html(_.template(AddressTemplate, addressModel.toJSON()));
		},

		update: function (e) {
			var storeModel = this.model,
				addressModel = this.model.get('addressModel'),
				$input = $(e.target),
				field = $input.attr('data-field'),
				val = $input.val();

			addressModel.set(field, val);
			addressModel.save({}, {
				success: function () {
					notificationcenter.success('Adresse gespeichert', 'Adresse erfolgreich gespeichert');
					// reload store if address got changed
					storeModel.fetch();
				},
				error: function () {
					notificationcenter.error('Fehler :(', 'Adresse nicht erfolgreich gespeichert');
				}
			});
		}

	});

	return AddressView;

});