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
				price: this.model.get('price'),
				info: this.model.get('info'),
				isActive: this.model.get('isActive'),
				buyed: this.model.get('buyedInStore'),
				image: this.model.get('largeImage')
			};

			this.$el.html(this.template(json));
		}

	});

	return ItemView;

});