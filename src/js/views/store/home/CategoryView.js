// Filename: src/js/views/store/home/CategoryView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/home/ItemsView',
    'text!templates/store/home/CategoryTemplate.html'
    ], function ($, _, Backbone, ItemsView, CategoryTemplate) {

	"use strict";

	var CategoryView = Backbone.View.extend({

		className: 'category',

		template: _.template(CategoryTemplate),

		initialize: function () {
			this.render();
		},

		render: function () {
			var json = {
				title: this.model.get('title')
			};

			this.$el.html(this.template(json));

			var itemsView = new ItemsView({
				collection: this.model.get('itemsCollection'),
				el: this.$('.items')
			});
		}

	});

	return CategoryView;

});