// Filename: src/js/views/store/home/CategoriesView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/CategoriesCollection',
    'views/store/home/CategoryView'
    ], function ($, _, Backbone, CategoriesCollection, CategoryView) {

	"use strict";

	var CategoriesView = Backbone.View.extend({

		// needed for categories navigation view in mainview
		deffered: null,

		initialize: function () {
			var self = this;

			this.collection = new CategoriesCollection();

			// set deffered
			this.deffered = this.collection.fetch({
				parse: true,
				success: function () {
					self.render();
				}
			});
		},

		render: function () {
			_.each(this.collection.models, function (categoryModel) {
				this.renderCategory(categoryModel);
			}, this);
		},

		renderCategory: function (categoryModel) {
			var categoryView = new CategoryView({
				model: categoryModel
			});

			this.$el.append(categoryView.el);
		}

	});

	return CategoriesView;

});