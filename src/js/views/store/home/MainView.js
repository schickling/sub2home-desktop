// Filename: src/js/views/store/home/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'models/stateModel',
    'views/PageView',
    'views/store/home/DeliveryPopupView',
    'views/store/home/DeliveryView',
    'views/store/home/CategoriesView',
    'views/store/home/CategoriesNavigationView',
    'text!templates/store/home/MainTemplate.html'
    ], function ($, _, Backbone, stateModel, PageView, DeliveryPopupView, DeliveryView, CategoriesView, CategoriesNavigationView, MainTemplate) {

	"use strict";

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

		events: {
			'click #currentDeliveryArea': '_renderDeliveryPopupView'
		},

		initialize: function () {
			// set page title
			var storeModel = stateModel.get('storeModel');
			this.pageTitle = 'SUBWAY® ' + storeModel.get('title') + ' - sub2home';

			this._render();
		},

		_render: function () {
			this.$el.html(MainTemplate);

			if (!stateModel.get('storeModel').get('deliveryAreaWasSelected')) {
				this._renderDeliveryPopupView();
			}

			this._renderDeliveryView();
			this._renderCategories();
		},

		_renderDeliveryPopupView: function () {
			new DeliveryPopupView({
				el: this.$('#preSelectDeliveryArea'),
				model: stateModel.get('storeModel')
			});
		},

		_renderDeliveryView: function () {
			new DeliveryView({
				el: this.$('#storeDeliveryDetails')
			});
		},

		_renderCategories: function () {
			var self = this,
				$content = this.$('.content'),
				$categories = $content.find('#categories');

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
		}

	});

	return MainView;

});