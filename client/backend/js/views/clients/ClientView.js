// Filename: js/views/clients/ClientView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/dashboard/MainTemplate.html'
	], function ($, _, Backbone, MainTemplate) {

	var ClientView = Backbone.View.extend({

		className: 'client',

		template: _.template(template_client),

		events: {
			'click .folded_client': 'toggle_stores',
			'click .icon_edit_yellow_small': 'toggle_edit',
			'click .confirm_client': 'update_client',
			'click .delete_client': 'delete_client',
			'click .icon_add_small': 'add_store'
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		update_view: function () {
			// Update number
			this.$el.find('.client_number').text('#' + this.leading_zeros(this.model.get('number')));

			// Update name
			var address = this.model.get('address');
			this.$el.find('.client_title').text(address.first_name + ' ' + address.last_name);
		},

		update_client: function () {
			var $edit_client = this.$el.find('.edit_client'),
				$address = $edit_client.find('.edit_client_address'),
				password = $edit_client.find('.edit_client_password').val(),
				password_repeat = $edit_client.find('.edit_client_password_repeat').val(),
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
			client.set('number', $edit_client.find('.edit_client_number').val());

			client.save({}, {
				success: function () {
					self.update_view();

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
								self.hide_edit();
							},

							error: function (error) {
								app.popup($.parseJSON(error.responseText), 'error');
							}
						});
						// Password not changed
					} else {
						app.popup('Daten gespeichert. YES!', 'success');
						self.hide_edit();
					}
				},

				error: function (model, error) {
					app.popup($.parseJSON(error.responseText), 'error');
				}
			});

		},

		toggle_stores: function () {
			if (this.model.get('stores').length) {
				if (this.$el.find('.unfolded_client').is(':visible')) {
					this.hide_stores();
				} else {
					this.show_stores();
				}
			}
		},

		show_stores: function () {
			this.hide_edit();

			var $folded_client = this.$el.find('.folded_client'),
				$unfolded_client = this.$el.find('.unfolded_client'),
				$client_siblings = $folded_client.closest('.client').siblings(),
				$edit_client_siblings = $client_siblings.find('.edit_client'),
				$unfolded_client_siblings = $client_siblings.find('.unfolded_client');

			$edit_client_siblings.hide();
			$unfolded_client_siblings.hide();

			$client_siblings.addClass('inactive');

			this.$el.removeClass('inactive');

			if (!this.client_stores_view) {
				this.client_stores_view = new ClientStoresView(this);
			}

			$unfolded_client.fadeIn();
		},

		hide_stores: function () {
			var $folded_client = this.$el.find('.folded_client'),
				$unfolded_client = this.$el.find('.unfolded_client'),
				$client_siblings = $folded_client.closest('.client').siblings();

			$client_siblings.removeClass('inactive');

			$unfolded_client.fadeOut();
		},

		toggle_edit: function () {
			if (this.$el.find('.edit_client').is(':visible')) {
				this.hide_edit();
			} else {
				this.show_edit();
			}

			return false;
		},

		show_edit: function () {
			this.hide_stores();

			var $folded_client = this.$el.find('.folded_client'),
				$edit_client = this.$el.find('.edit_client'),
				$client_siblings = $folded_client.closest('.client').siblings(),
				$edit_client_siblings = $client_siblings.find('.edit_client'),
				$unfolded_client_siblings = $client_siblings.find('.unfolded_client');

			$edit_client_siblings.hide();
			$unfolded_client_siblings.hide();
			$client_siblings.addClass('inactive');

			this.$el.removeClass('inactive');

			if (!$edit_client.html().trim()) {
				this.render_edit();
			}

			$edit_client.fadeIn();
		},

		hide_edit: function () {
			var $folded_client = this.$el.find('.folded_client'),
				$edit_client = this.$el.find('.edit_client'),
				$client_siblings = $folded_client.closest('.client').siblings();

			$client_siblings.removeClass('inactive');

			$edit_client.fadeOut();
		},

		leading_zeros: function (number) {
			var str = '' + number,
				length = 4;
			while (str.length < length) {
				str = '0' + str;
			}
			return str;
		},

		delete_client: function () {
			var check = confirm("Kunden wirklich löschen?");
			if (check) {
				var self = this;
				this.$el.fadeOut(function () {
					self.hide_edit();
					self.model.destroy();
					self.remove();
				});
			}
		},

		render_edit: function () {
			var html = _.template(template_edit_client, this.model.toJSON()),
				$edit_client = this.$el.find('.edit_client');

			$edit_client.html(html);
		},

		add_store: function () {
			var str, number;

			do {
				str = prompt('Geben Sie die Storenummer des neuen Stores ein.', '');
				number = parseInt(str, 10);
				// check cancel
				if (str === null) return false;
			} while (str !== number || number < 10000 || number > 99999);

			var self = this,
				store = new Store({
					number: number,
					user_id: this.model.id
				});

			store.save({}, {
				success: function () {
					self.show_stores();
					self.client_stores_view.collection.add(store);
					self.client_stores_view.render_store(store);
				},

				error: function (model, error) {
					app.popup($.parseJSON(error.responseText), 'error');
				}
			});

			return false;
		}

	});

	return ClientView;

});