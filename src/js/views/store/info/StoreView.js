// Filename: src/js/views/store/info/StoreView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/info/DeliveryTimesView',
    'views/store/info/DeliveryAreasView',
    'text!templates/store/info/StoreTemplate.html'
    ], function ($, _, Backbone, DeliveryTimesView, DeliveryAreasView, StoreTemplate) {

	"use strict";

	var StoreView = Backbone.View.extend({

		template: _.template(StoreTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {

			var storeModel = this.model,
				addressModel = storeModel.get('addressModel'),
				json = {
					title: storeModel.get('title'),
					phone: addressModel.get('phone'),
					street: addressModel.get('street'),
					streetNumber: addressModel.get('streetNumber'),
					postal: addressModel.get('postal'),
					city: addressModel.get('city'),
					email: addressModel.get('email'),
					facebookUrl: storeModel.get('facebookUrl'),
				};

			this.$el.html(this.template(json));

			this._renderDeliveryTimes();
			this._renderDeliveryAreas();
			this._markPaymentMethods();

		},

		_renderDeliveryTimes: function () {
			new DeliveryTimesView({
				el: this.$('#infoDeliveryTimes'),
				collection: this.model.get('deliveryTimesCollection')
			});
		},

		_renderDeliveryAreas: function () {
			new DeliveryAreasView({
				el: this.$('#infoDeliveryAreas'),
				collection: this.model.get('deliveryAreasCollection')
			});
		},

		_markPaymentMethods: function () {

			var paymentMethods = ['cash', 'ec'],
				$paymentMethods = this.$('#paymentMethods').find('.threeColumn');

			_.each(paymentMethods, function (paymentMethod) {

				var capitalizedPaymentMethod = paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1),
					storeAllowsPaymentMethod = this.model.get('allowsPayment' + capitalizedPaymentMethod);

				if (!storeAllowsPaymentMethod) {
					$paymentMethods.filter('.' + paymentMethod).addClass('inactive');
				}

			}, this);

		}

	});

	return StoreView;

});