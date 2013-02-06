// Filename: src/js/views/store/config/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'models/stateModel',
	'views/PageView',
	'views/store/config/MapView',
	'views/store/config/StoreInfoView',
	'views/store/config/DeliveryAreasView',
	'views/store/config/DeliveryTimesView',
	'text!templates/store/config/MainTemplate.html'
	], function ($, _, Backbone, stateModel, PageView, MapView, StoreInfoView, DeliveryAreasView, DeliveryTimesView, MainTemplate) {

	var MainView = PageView.extend({

		initialize: function () {
			// to be absolutly consistent reload the store model from server
			stateModel.fetchStoreFromServer();
			this.model = stateModel.get('storeModel');

			this.render();
		},

		render: function () {
			this.$el.html(MainTemplate);

			new MapView({
				el: this.$('#storeMap'),
				model: this.model
			});

			new StoreInfoView({
				el: this.$('.storeInfo'),
				model: this.model
			});

			new DeliveryAreasView({
				el: this.$('.deliveryAreas'),
				collection: this.model.get('deliveryAreasCollection')
			});

			new DeliveryTimesView({
				el: this.$('.deliveryTimes'),
				collection: this.model.get('deliveryTimesCollection')
			});

			this.append();
		}

	});

	return MainView;

});