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

		template: _.template(MainTemplate),

		initialize: function () {

			// set page title
			this.model = stateModel.get('storeModel');
			this.pageTitle = 'Infotheke ' + this.model.get('title') + ' - sub2home';

			this._render();
		},

		_render: function () {
			var json = {
				title: this.model.get('title')
			};

			this.$el.html(this.template(json));

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