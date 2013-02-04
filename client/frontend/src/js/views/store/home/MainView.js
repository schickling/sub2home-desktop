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


	$.fn.lazyload = function () {

		var $content = this,
			images = $content.find('img'),
			loaded, inview, source;

		images.one('load', function () {
			source = this.getAttribute('data-src');
			this.setAttribute('src', source);
			this.removeAttribute('data-src');
		});


		function unveil() {

			// needs to be calculated here because it might change with resizing
			var viewHeight = window.innerHeight,
				contentOffsetTop = $content.offset().top;

			inview = images.filter(function () {
				var $image = $(this),
					imageOffsetTop = $image.offset().top;

				return imageOffsetTop - contentOffsetTop < viewHeight;
			});

			loaded = inview.trigger('load');
			images = images.not(loaded);
		}

		$content.scroll(unveil);
		$content.resize(unveil);

		unveil();

		return this;
	};


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


			var self = this,
				$content = this.$('.content'),
				$categories = $content.find('.categories');

			var categoriesView = new CategoriesView({
				el: $categories
			});

			// render navigation
			categoriesView.deffered.done(function () {
				var categoriesNavigationView = new CategoriesNavigationView({
					collection: categoriesView.collection,
					el: self.$el
				});

				self.append();

				// activate image lazy loading
				$content.lazyload();
			});
		},

		config: function () {
			router.navigate('store/einstellungen', true);
		}

	});

	return MainView;

});