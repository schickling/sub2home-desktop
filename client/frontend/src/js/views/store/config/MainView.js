// Filename: src/js/views/store/config/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'models/stateModel',
    'views/PageView',
    'views/store/config/MapView',
    'views/store/config/StoreInfoView',
    'views/store/config/DeliveryAreasView',
    'views/store/config/DeliveryTimesView',
    'text!templates/store/config/MainTemplate.html'
    ], function ($, _, Backbone, router, stateModel, PageView, MapView, StoreInfoView, DeliveryAreasView, DeliveryTimesView, MainTemplate) {

	var MainView = PageView.extend({

		// referenced sub views
		subViews: {
			mapView: null,
			deliveryAreasView: null,
			deliveryTimesView: null,
			storeInfoView: null
		},

		initialize: function () {
			// to be absolutly consistent reload the store model from server
			this.model = stateModel.get('storeModel');
			this.model.fetch({
				async: false
			});

			// check if client is allowed to view this page
			if (stateModel.clientOwnsThisStore()) {
				this._render();
			} else {
				router.navigate('login', {
					trigger: true,
					replace: true
				});
			}
		},

		_render: function () {
			this.$el.html(MainTemplate);

			this.subViews.mapView = new MapView({
				el: this.$('#storeMap'),
				model: this.model
			});

			this.subViews.storeInfoView = new StoreInfoView({
				el: this.$('.storeInfo'),
				model: this.model
			});

			this.subViews.deliveryAreasView = new DeliveryAreasView({
				el: this.$('.deliveryAreas'),
				collection: this.model.get('deliveryAreasCollection')
			});

			this.subViews.deliveryTimesView = new DeliveryTimesView({
				el: this.$('.deliveryTimes'),
				collection: this.model.get('deliveryTimesCollection')
			});

			this.append();
		}

	});

	return MainView;

});