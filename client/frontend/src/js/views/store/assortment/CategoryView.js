// Filename: src/js/views/store/assortment/CategoryView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/assortment/ItemsView',
	'text!templates/store/assortment/CategoryTemplate.html'
	], function ($, _, Backbone, ItemsView, CategoryTemplate) {

	var CategoryView = Backbone.View.extend({

		className: 'category',

		template: _.template(CategoryTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {
			var json = {
				title: this.model.get('title')
			};

			this.$el.html(this.template(json));

			this._renderItems();
		},

		_renderItems: function() {
			new ItemsView({
				el: this.$('.items'),
				collection: this.model.get('itemsCollection')
			});
		}

	});

	return CategoryView;

});