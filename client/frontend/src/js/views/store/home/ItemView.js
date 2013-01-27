// Filename: src/js/views/store/home/ItemView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/home/ArticleView',
	'views/store/home/MenuBundleView'
	], function ($, _, Backbone, ArticleView, MenuBundleView) {

	var ItemView = Backbone.View.extend({

		className: 'item',

		initialize: function () {
			if (this.model.has('allowsIngredients')) {
				new ArticleView({
					model: this.model,
					el: this.$el
				});
			} else {
				new MenuBundleView({
					model: this.model,
					el: this.$el
				});
			}
		}

	});

	return ItemView;

});