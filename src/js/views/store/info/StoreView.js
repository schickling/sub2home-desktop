// Filename: src/js/views/store/info/StoreView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/info/DeliveryTimesView',
    'text!templates/store/info/StoreTemplate.html'
    ], function ($, _, Backbone, DeliveryTimesView, StoreTemplate) {

	var StoreView = Backbone.View.extend({

		template: _.template(StoreTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {

			var json = {
				title: this.model.get('title')
			};

			this.$el.html(this.template(json));

			this._renderDeliveryTimes();

		},

		_renderDeliveryTimes: function () {
			new DeliveryTimesView({
				el: this.$('#storeInfoPlaceholder'),
				collection: this.model.get('deliveryTimesCollection')
			});
		}

	});

	return StoreView;

});