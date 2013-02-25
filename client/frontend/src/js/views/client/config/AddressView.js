// Filename: src/js/views/client/config/AddressView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/client/config/AddressTemplate.html'
	], function ($, _, Backbone, AddressTemplate) {

	var AddressView = Backbone.View.extend({

		template: _.template(AddressTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {
			this.$el.html(this.template(this.model.toJSON()));
		}


	});

	return AddressView;

});