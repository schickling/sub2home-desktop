// Filename: src/js/views/store/info/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'models/stateModel',
    'views/PageView',
    'views/store/info/DeliveryTimesView',
    'text!templates/store/info/MainTemplate.html'
    ], function ($, _, Backbone, stateModel, PageView, DeliveryTimesView, MainTemplate) {

	var MainView = PageView.extend({

		initialize: function () {

			// set page title
			this.model = stateModel.get('storeModel');
			this.pageTitle = 'Infotheke ' + this.model.get('title') + ' - sub2home';

			this._render();
		},

		_render: function () {
			this.$el.html(MainTemplate);

			this._renderDeliveryTimes();

			this.append();

		},

		_renderDeliveryTimes: function () {
			new DeliveryTimesView({
				el: this.$('#storeInfoPlaceholder'),
				collection: this.model.get('deliveryTimesCollection')
			});
		}

	});

	return MainView;

});