// Filename: src/js/views/client/dashboard/StoresView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/client/dashboard/StoreView'
	], function ($, _, Backbone, StoreView) {

	var StoresView = Backbone.View.extend({

		initialize: function () {
			this._render();
		},

		_render: function () {
			_.each(this.collection.models, function (storeModel) {
				this._renderStore(storeModel);
			}, this);
		},

		_renderStore: function (storeModel) {
			var storeView = new StoreView({
				model: storeModel
			});

			this.$el.append(storeView.el);
		}


	});

	return StoresView;

});