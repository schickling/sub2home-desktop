// Filename: src/js/views/store/tray/SubcardView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'models/cartModel',
    'text!templates/store/tray/SubcardTemplate.html'
    ], function ($, _, Backbone, cartModel, SubcardTemplate) {

	var SubcardView = Backbone.View.extend({

		template: _.template(SubcardTemplate),

		events: {

		},

		initialize: function () {
			this._render();
		},

		_render: function () {

			var json = {
			};

			this.$el.html(this.template(json));

		}
		
	});

	return SubcardView;

});