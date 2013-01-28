// Filename: js/views/clients/ClientsView.js
define([
	'jquery',
	'underscore',
	'backbone'
	], function ($, _, Backbone) {

	var ClientsView = Backbone.View.extend({

		el: $('#content'),

		filter_cleared: true,

		filter_timeout: 0,

		events: {
			'click .add_new_client': 'add_client',
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

		filter_with_timeout: function (e) {
			clearTimeout(this.filter_timeout);

			var self = this;
			this.filter_timeout = setTimeout(function () {
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

	return ClientsView;

});