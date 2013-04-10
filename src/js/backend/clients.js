(function () {
	"use strict"

	var 
		app = window.app = window.app || {},
		template_client = $('#template_client').html(),
		template_edit_client = $('#template_edit_client').html(),
		template_store = $('#template_store').html();

	var Client = Backbone.Model.extend({
		urlRoot: 'clients'
	});

	var Store = Backbone.Model.extend({
		urlRoot: 'stores'
	});

	var ClientStores = Backbone.Collection.extend({
		model: Store
	});

	var Clients = Backbone.Collection.extend({
		model: Client,

		sort_field: 'number',

		direction: 1,

		search: function (keyword) {
			var pattern = new RegExp(keyword, "gi");

			return this.filter(function (data) {
				// Check stores
				var test_store_title = false;
				var test_store_number = false;
				_.each(data.get('stores'), function (store) {
					test_store_title = test_store_title || pattern.test(store.title);
					test_store_number = test_store_number || pattern.test(store.number);
				});

				var test_first_name = pattern.test(data.get('address').first_name),
					test_last_name = pattern.test(data.get('address').last_name),
					test_client_number = pattern.test(data.get('number'));

					return test_first_name || test_last_name || test_client_number
					|| test_store_title || test_store_number;
				});
		},

		comparator: function (client) {
			var val;

			if (this.sort_field == 'name') {
				val = client.get('address').last_name;

				// Hack for reverse string sort
				if (this.direction == -1) {
					val = String.fromCharCode.apply(String, _.map(val.split(""), function (c) {
						return 0xffff - c.charCodeAt();
					}));
				}
			} else {
				val = this.direction * client.get(this.sort_field);
			}

			return val;
		}
	});

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

		update_view: function() {
			// Update number
			this.$el.find('.client_number').text('#' + this.leading_zeros(this.model.get('number')));
			
			// Update name
			var address = this.model.get('address');
			this.$el.find('.client_title').text(address.first_name + ' ' + address.last_name);
		},

		update_client: function() {
			var $edit_client = this.$el.find('.edit_client'),
				$address = $edit_client.find('.edit_client_address'),
				password = $edit_client.find('.edit_client_password').val(),
				password_repeat = $edit_client.find('.edit_client_password_repeat').val(),
				client = this.model,
				self = this;

			// Update address
			_.each($address, function(field) {
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

							success: function() {
								app.popup('Password gespeichert. YES!', 'success');
								self.hide_edit();
							},

							error: function(error) {
								app.popup($.parseJSON(error.responseText), 'error');
							}
						});
					// Password not changed
					} else {
						app.popup('Daten gespeichert. YES!', 'success');
						self.hide_edit();
					}
				},

				error: function(model, error) {
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

		render_edit: function() {
			var html = _.template(template_edit_client, this.model.toJSON()),
				$edit_client = this.$el.find('.edit_client');

			$edit_client.html(html);
		},

		add_store: function() {
			do {
				var str = prompt('Geben Sie die Storenummer des neuen Stores ein.', ''),
					number = parseInt(str);
				// check cancel
				if (str == null) return false;
			} while (str != number || number < 10000 || number > 99999);

			var self = this,
			store = new Store({
				number: number,
				user_id: this.model.id
			});

			store.save({}, {
				success: function() {
					self.show_stores();
					self.client_stores_view.collection.add(store);
					self.client_stores_view.render_store(store);
				},

				error: function(model, error) {
					app.popup($.parseJSON(error.responseText), 'error');
				}
			});

			return false;
		}

	});

	var StoreView = Backbone.View.extend({
		template: _.template(template_store),
		className: 'store',

		events: {
			'click .icon_active': 'toggle_active',
			'click .icon_open': 'toggle_open',
			'click .store_title': 'show_store_title_input',
			'keypress .store_title_input': 'update_title_on_enter',
			'focusout .store_title_input': 'update_title',
			'click .store_number': 'show_store_number_input',
			'keypress .store_number_input': 'update_number_on_enter',
			'focusout .store_number_input': 'update_number',
			'click': 'redirect_store',
			'click .icon_remove': 'delete'
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		toggle_active: function() {
			var $icon_active = this.$el.find('.icon_active');

			$icon_active.toggleClass('active');
			this.model.set('active', !(this.model.get('active')));
			this.model.save();

			return false;
		},

		toggle_open: function() {
			var $icon_open = this.$el.find('.icon_open');

			$icon_open.toggleClass('open');
			this.model.set('open', !(this.model.get('open')));
			this.model.save();

			return false;
		},

		show_store_title_input: function() {
			this.$el.find('.store_title').hide();
			this.$el.find('.store_title_input').show().focus();

			return false;
		},

		show_store_number_input: function() {
			this.$el.find('.store_number').hide();
			this.$el.find('.store_number_input').show().focus();

			return false;
		},

		update_title_on_enter: function(e) {
			if (e.keyCode != 13) return;
			this.update_title();
		},

		update_title: function() {
			var $input = this.$el.find('.store_title_input'),
				$headline = this.$el.find('.store_title'),
				val = $input.val();

			$headline.text(val);
			$input.hide();
			$headline.show();

			this.model.set('title', val);

			this.model.save();
		},

		update_number_on_enter: function(e) {
			if (e.keyCode != 13) return;
			this.update_number();
		},

		update_number: function() {
			var $input = this.$el.find('.store_number_input'),
				$headline = this.$el.find('.store_number'),
				val = $input.val(),
				number = parseInt(val);

			if (val != number || number < 10000 || number > 99999) {
				app.popup('Das ist keine erlaubte Storenummer', 'error');
				$input.focus();
				return false;
			}

			$headline.text(val);
			$input.hide();
			$headline.show();

			this.model.set('number', val);

			this.model.save();
		},

		redirect_store: function() {
			if (this.model.get('active')) {
				var url = '../../' + this.model.get('alias') + '/einstellungen';
				window.open(url,'_newtab');
			}
		},

		delete: function() {
			var self = this;
			this.$el.fadeOut(function() {
				self.model.destroy();
				self.remove();
			});

			return false;
		}

	});

	var ClientStoresView = Backbone.View.extend({
		events: {
			
		},

		initialize: function (client_view) {
			this.$el = client_view.$el.find('.unfolded_client');

			this.collection = new ClientStores(client_view.model.get('stores'));

			this.render();
		},

		render: function () {
			_.each(this.collection.models, function (item) {
				this.render_store(item);
			}, this);
		},

		render_store: function (item) {
			var store_view = new StoreView({
				model: item
			});

			this.$el.prepend(store_view.render().el);
		}
	});

	var ClientsView = Backbone.View.extend({
		el: $('#content'),

		filter_cleared: true,

		filter_timeout: 0,

		events: {
			'click .add_new_client' : 'add_client',
			'keyup .searchbar': 'filter_with_timeout',
			'click .icon_clear': 'clear_searchbar',
			'click .sort': 'sort'
		},

		initialize: function (json_clients) {

			this.$list = this.$el.find('.client_listing section');

			this.collection = new Clients(json_clients);
			this.render(this.collection.models);

		},

		sort: function (e) {
			var $sort = $(e.target),
				sort_field = $sort.attr('data-field');

			if (this.collection.sort_field == sort_field && this.collection.direction == 1) {
				this.collection.direction = -1;
				$sort.addClass('reverse');
			} else {
				this.collection.direction = 1;
				this.collection.sort_field = sort_field;
				$sort.removeClass('reverse');
			}


			this.collection.sort();

			this.render(this.collection.models);
		},

		render: function (items) {
			// Reset list
			this.$list.html('');

			_.each(items, function (item) {
				this.render_client(item);
			}, this);
		},

		render_client: function (item, add) {
			var client_view = new ClientView({
				model: item
			});

			if (add) {
				this.$list.prepend(client_view.render().el);
			} else {
				this.$list.append(client_view.render().el);
			}

			return client_view;
		},

		add_client: function () {
			var client = new Client();
			var self = this;

			client.save({}, {
				success: function () {
					var client_view = self.render_client(client, true);
					client_view.show_edit();

					self.collection.add(client);
				}
			});
			
		},

		clear_searchbar: function () {
			this.$el.find('.searchbar').val('');
			this.$el.find('.icon_clear').hide();
			this.reset_filter();
		},

		filter_with_timeout: function(e) {
			clearTimeout(this.filter_timeout);

			var self = this;
			this.filter_timeout = setTimeout(function() {
				self.filter(e);
			}, 300);
		},

		filter: function (e) {
			var keyword = e.target.value,
				$icon_clear = this.$el.find('.icon_clear');

			if (keyword) {
				$icon_clear.show();
				this.filter_cleared = false;

				var results = this.collection.search(keyword);
				this.render(results);
			} else {
				if (!this.filter_cleared) {
					$icon_clear.hide();
					this.reset_filter();
					this.filter_cleared = true;
				}
			}
		},

		reset_filter: function () {
			this.render(this.collection.models);
		}
	});

	var clients_view = new ClientsView(json_clients);

})();