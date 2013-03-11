// Filename: js/views/clients/StoresView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/clients/StoreView'
	], function ($, _, Backbone, StoreView) {

	var StoresView = Backbone.View.extend({

		events: {

		},

		initialize: function (client_view) {
			this.render();
		},

		render: function () {
			_.each(this.collection.models, function (storeModel) {
				this.renderStore(storeModel);
			}, this);
		},

		renderStore: function (storeModel) {
			var storeView = new StoreView({
				model: storeModel
			});

			this.$el.prepend(storeView.el);
		}

	});

	return StoresView;

});