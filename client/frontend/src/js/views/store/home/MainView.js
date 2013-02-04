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



	$.fn.unveil = function ($content) {
		var th = -200,
			images = this,
			loaded, inview, source;

		this.one('unveil', function () {
			source = this.getAttribute('data-src');
			this.setAttribute('src', source);
			this.removeAttribute('data-src');
		});

		function unveil() {
			inview = images.filter(function () {
				var $e = $(this),
					wt = $content.scrollTop(),
					wb = wt + $content.height(),
					et = $e.offset().top,
					eb = et + $e.height();

				return eb >= wt - th && et <= wb + th;
			});

			loaded = inview.trigger('unveil');
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
				$categories.find('img').unveil($content);
			});
		},

		config: function () {
			router.navigate('store/einstellungen', true);
		}

	});

	return MainView;

});