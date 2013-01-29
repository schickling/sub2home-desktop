// Filename: js/views/clients/ClientsView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/ClientsCollection',
	'views/clients/ClientView'
	], function ($, _, Backbone, ClientsCollection, ClientView) {

	var ClientsView = Backbone.View.extend({

		filterCleared: true,

		filterTimeout: 0,

		$list: null,

		events: {
			'click .add_new_client': 'addClient',
			'keyup .searchbar': 'filterWithTimeout',
			'click .iconClear': 'clearSearchbar',
			'click .sort': 'sort'
		},

		initialize: function () {

			this.$list = this.$('.client_listing section');

			this.collection = new ClientsCollection();
			this.collection.fetch();

			this.render(this.collection.models);

		},

		render: function (clientModels) {
			// Reset list
			this.$list.html('');

			// _.each(clientModels, function (clientModel) {
			// 	this.renderClient(clientModel);
			// }, this);
		},

		renderClient: function (clientModel, add) {
			var client_view = new ClientView({
				model: clientModel
			});

			if (add) {
				this.$list.prepend(client_view.render().el);
			} else {
				this.$list.append(client_view.render().el);
			}

			return client_view;
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

		addClient: function () {
			var client = new ClientModel();
			var self = this;

			client.save({}, {
				success: function () {
					var client_view = self.renderClient(client, true);
					client_view.show_edit();

					self.collection.add(client);
				}
			});

		},

		clearSearchbar: function () {
			this.$('.searchbar').val('');
			this.$('.iconClear').hide();
			this.resetFilter();
		},

		filterWithTimeout: function (e) {
			clearTimeout(this.filterTimeout);

			var self = this;
			this.filterTimeout = setTimeout(function () {
				self.filter(e);
			}, 300);
		},

		filter: function (e) {
			var keyword = e.target.value,
				$iconClear = this.$('.iconClear');

			if (keyword) {
				$iconClear.show();
				this.filterCleared = false;

				var results = this.collection.search(keyword);
				this.render(results);
			} else {
				if (!this.filterCleared) {
					$iconClear.hide();
					this.resetFilter();
					this.filterCleared = true;
				}
			}
		},

		resetFilter: function () {
			this.render(this.collection.models);
		}

	});

	return ClientsView;

});