// Filename: src/js/views/store/home/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'views/PageView',
	'views/store/home/CategoriesView',
	'views/store/home/CategoriesNavigationView',
	'text!templates/store/home/MainTemplate.html'
	], function ($, _, Backbone, router, PageView, CategoriesView, CategoriesNavigationView, MainTemplate) {


	var MainView = PageView.extend({

		pageTitle: 'Subway Memmingen',

		events: {
			'click .vecbuttonEdit': 'config'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(MainTemplate);

			var categoriesView = new CategoriesView({
				el: this.$('.categories')
			});

			// render navigation
			var self = this;
			categoriesView.deffered.done(function () {
				var categoriesNavigationView = new CategoriesNavigationView({
					collection: categoriesView.collection,
					el: self.$el
				});

				self.append();
			});
		},

		config: function () {
			router.navigate('store/einstellungen', true);
		}

	});

	return MainView;

});