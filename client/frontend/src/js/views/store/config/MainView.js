// Filename: src/js/views/store/config/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'global',
    'models/stateModel',
    'views/PageView',
    'views/store/config/MapView',
    'views/store/config/StoreInfoView',
    'views/store/config/DeliveryAreasView',
    'views/store/config/DeliveryTimesView',
    'text!templates/store/config/MainTemplate.html'
    ], function ($, _, Backbone, router, global, stateModel, PageView, MapView, StoreInfoView, DeliveryAreasView, DeliveryTimesView, MainTemplate) {

	var MainView = PageView.extend({

		// referenced sub views
		subViews: {
			mapView: null
		},

		initialize: function () {

			// for authentification reload the store model
			this.model = stateModel.get('storeModel');
			this.model.fetch({
				url: '/api/frontend/stores/' + global.getStoreAlias() + '/auth', // use custom route
				async: false
			});

			// set page title
			this.pageTitle = 'Storeeinstellungen ' + this.model.get('title') + ' - sub2home';

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

			new StoreInfoView({
				el: this.$('#storeInfo'),
				model: this.model
			});

			this.subViews.deliveryAreasView = new DeliveryAreasView({
				el: this.$('#deliveryAreas'),
				collection: this.model.get('deliveryAreasCollection')
			});

			this.subViews.deliveryTimesView = new DeliveryTimesView({
				el: this.$('#deliveryTimes'),
				collection: this.model.get('deliveryTimesCollection')
			});

			this.append();
		}

	});

	return MainView;

});