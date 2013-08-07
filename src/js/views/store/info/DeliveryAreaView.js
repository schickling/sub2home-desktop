// Filename: src/js/views/store/info/DeliveryAreaView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/store/info/DeliveryAreaTemplate.html'
    ], function ($, _, Backbone, DeliveryAreaTemplate) {

	"use strict";

	var DeliveryAreaView = Backbone.View.extend({

		template: _.template(DeliveryAreaTemplate),

		className: 'infoDeliveryArea',

		initialize: function () {
			this._render();
		},

		_render: function () {
			var json = {
				postal: this.model.get('postal'),
				city: this.model.get('city'),
				district: this.model.get('district'),
				minimumDuration: this.model.get('minimumDuration'),
				minimumValue: this.model.get('minimumValue'),
			};

			this.$el.html(this.template(json));
		}

	});

	return DeliveryAreaView;

});