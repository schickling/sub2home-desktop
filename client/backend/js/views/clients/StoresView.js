// Filename: js/views/clients/StoresView.js
define([
	'jquery',
	'underscore',
	'backbone'
	], function ($, _, Backbone) {

	var StoresView = Backbone.View.extend({

		events: {

		},

		initialize: function (client_view) {
			// this.$el = client_view.$el.find('.unfolded_client');

			// this.collection = new ClientStores(client_view.model.get('stores'));

			// this.render();
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

	return StoresView;

});