//Filename: views/clients/ClientEditView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/clients/ClientEditTemplate.html'
    ], function ($, _, Backbone, ClientEditTemplate) {

	var ClientEditView = Backbone.View.extend({

		template: _.template(ClientEditTemplate),

		events: {
			'click .deleteClient': '_deleteClient',
			'focusout input.editClientAddress': '_saveAddress'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			var clientModel = this.model,
				addressModel = clientModel.get('addressModel');

			var json = {
				number: clientModel.get('number'),
				firstName: addressModel.get('firstName'),
				lastName: addressModel.get('lastName'),
				street: addressModel.get('street'),
				streetAdditional: addressModel.get('streetAdditional'),
				postal: addressModel.get('postal'),
				city: addressModel.get('city'),
				phone: addressModel.get('phone'),
				email: addressModel.get('email')
			};

			this.$el.html(this.template(json));
		},

		_deleteClient: function () {
			var check = confirm("Kunden wirklich löschen?"),
				self = this;

			if (check) {
				this.model.destroy({
					success: function () {
						self.$el.fadeOut(function () {
							self.hideEdit();
							self.remove();
						});
					}
				});

			}
		},

		_saveAddress: function(e) {
			var $input = $(e.target),
				val = $input.val(),
				attribute = $input.attr('field'),
				addressModel = this.model.get('addressModel');

			addressModel.set(attribute, val);
			addressModel.save();

		}

	});

	return ClientEditView;
});