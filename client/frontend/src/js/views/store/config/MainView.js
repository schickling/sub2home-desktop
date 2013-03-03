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
		mapView: null,
		deliveryAreasView: null,
		deliveryTimesView: null,
		storeInfoView: null,

		initialize: function () {
			// to be absolutly consistent reload the store model from server
			this.model = stateModel.get('storeModel');
			this.model.fetch({
				async: false
			});

			// check if client is allowed to view this page
			if (stateModel.clientOwnsThisStore()) {
				this._render();
				this._listenForDestory();
			} else {
				router.navigate('login', {
					trigger: true,
					replace: true
				});
			}
		},

		_render: function () {
			this.$el.html(MainTemplate);

			this.mapView = new MapView({
				el: this.$('#storeMap'),
				model: this.model
			});

			this.storeInfoView = new StoreInfoView({
				el: this.$('.storeInfo'),
				model: this.model
			});

			this.deliveryAreasView = new DeliveryAreasView({
				el: this.$('.deliveryAreas'),
				collection: this.model.get('deliveryAreasCollection')
			});

			this.deliveryTimesView = new DeliveryTimesView({
				el: this.$('.deliveryTimes'),
				collection: this.model.get('deliveryTimesCollection')
			});

			this.append();
		},

		_listenForDestory: function () {
			this.once('destroy', function () {
				this.mapView.trigger('destroy');
				this.deliveryAreasView.trigger('destroy');
				this.deliveryTimesView.trigger('destroy');
				this.storeInfoView.trigger('destroy');
			}, this);
		}

	});

	return MainView;

});