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
			this.$el.html(_.template(AddressTemplate, this.model.toJSON()));
		},

		update: function (e) {
			var $input = $(e.target),
				field = $input.attr('data-field'),
				val = $input.val();

			this.model.set(field, val);
			this.model.save({}, {
				success: function () {
					notificationcenter.success('Adresse gespeichert', 'Adresse erfolgreich gespeichert');
				},
				error: function () {
					notificationcenter.error('Fehler :(', 'Adresse nicht erfolgreich gespeichert');
				}
			});
		}

	});

	return AddressView;

});