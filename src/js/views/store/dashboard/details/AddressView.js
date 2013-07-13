// Filename: src/js/views/store/dashboard/details/AddressView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/store/dashboard/details/AddressTemplate.html'
    ], function ($, _, Backbone, AddressTemplate) {

	"use strict";

	var AddressView = Backbone.View.extend({

		template: _.template(AddressTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {
			var json = {
				firstName: this.model.get('firstName'),
				lastName: this.model.get('lastName'),
				street: this.model.get('street'),
				streetNumber: this.model.get('streetNumber'),
				streetAdditional: this.model.get('streetAdditional'),
				postal: this.model.get('postal'),
				city: this.model.get('city'),
				district: this.model.get('district'),
				email: this.model.get('email'),
				phone: this.model.get('phone')
			};

			this.$el.html(this.template(json));
		}

	});

	return AddressView;

});