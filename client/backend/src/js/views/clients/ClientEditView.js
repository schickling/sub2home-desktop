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
			'click .confirmClient': '_updateClient',
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

		},

		_updateClient: function () {
			var $editClient = this.$('.editClient'),
				$address = $editClient.find('.editClient_address'),
				password = $editClient.find('.editClient_password').val(),
				password_repeat = $editClient.find('.editClient_password_repeat').val(),
				client = this.model,
				self = this;

			// Update address
			_.each($address, function (field) {
				var $field = $(field),
					key = $field.attr('data-field'),
					val = $field.val();
				client.get('address')[key] = val;
			});

			// Update number
			client.set('number', $editClient.find('.editClientNumber').val());

			client.save({}, {
				success: function () {

					// Save password
					if (password) {
						$.ajax({
							url: './update_password/',
							type: 'post',
							data: {
								id: client.id,
								password: password,
								password_confirmation: password_repeat
							},

							success: function () {
								app.popup('Password gespeichert. YES!', 'success');
								self.hideEdit();
							},

							error: function (error) {
								app.popup($.parseJSON(error.responseText), 'error');
							}
						});
						// Password not changed
					} else {
						app.popup('Daten gespeichert. YES!', 'success');
						self.hideEdit();
					}
				},

				error: function (model, error) {
					app.popup($.parseJSON(error.responseText), 'error');
				}
			});

		}

	});

	return ClientEditView;
});