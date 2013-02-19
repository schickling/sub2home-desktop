// Filename: src/js/views/store/assortment/ItemView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/assortment/ItemTemplate.html'
	], function ($, _, Backbone, ItemTemplate) {

	var ItemView = Backbone.View.extend({

		className: 'item',

		template: _.template(ItemTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {
			var json = {
				title: this.model.get('title'),
				price: this.model.get('price')
			};

			this.$el.html(this.template(json));
		}

	});

	return ItemView;

});