// Filename: src/js/views/shared/info/NavigationView.js
define([
    'jquery',
    'underscore',
    'backbone'
    ], function ($, _, Backbone) {

	"use strict";

	var NavigationView = Backbone.View.extend({

		events: {
			'click .infoNavigation li': '_jumpToNavigationItem'
		},

		$content: null,
		$navigation: null,
		$articles: null,

		currentIndex: 0,

		// to prevent calculation while triggered scrolling
		scrollListnening: true,

		initialize: function () {
			this._cacheDom();
			this._render();

			this._listenToScroll();
		},

		_cacheDom: function () {
			this.$content = this.$('.content');
			this.$articles = this.$content.find('article');
			this.$navigation = this.$('.infoNavigation');
		},

		_render: function () {
			var $navigationList = this.$navigation.find('ul'),
				$articleHeader,
				$newListItem;

			this.$articles.each(function () {
				$articleHeader = $(this).find('header h1');
				$newListItem = $('<li>' + $articleHeader.attr('data-nav') + '</li>');

				$navigationList.append($newListItem);
			});

			$navigationList.find('li').first().addClass('active');
		},

		_listenToScroll: function () {

			var self = this,
				$content = this.$content,
				$articles = this.$articles,
				antepenultimate = $articles.length - 3,
				currentIndex, timer;

			// Bind to scroll
			$content.on('scroll', function () {

				if (self.scrollListnening) {

					// wrap in timeout to buffer events
					clearTimeout(timer);
					timer = setTimeout(function () {
						currentIndex = -1;

						$articles.each(function () {
							if ($(this).offset().top <= 150) {
								currentIndex++;
							}
						});

						// check if bottom reached
						if (currentIndex > antepenultimate && currentIndex < ($articles.length - 1) && $content.scrollTop() === $content[0].scrollHeight - $content.height()) {
							currentIndex++;
						}

						if (currentIndex !== self.currentIndex) {
							self.currentIndex = currentIndex;
							self._changeActiveNavigationItem();
						}

					}, 20);

				}

			});

		},

		_changeActiveNavigationItem: function () {
			var $oldActive = this.$navigation.find('.active'),
				$newActive = this.$navigation.find('li').eq(this.currentIndex);

			$oldActive.removeClass('active');
			$newActive.addClass('active');
		},

		_jumpToNavigationItem: function (e) {
			var $currentNavigationItem = $(e.target),
				currentIndex = $currentNavigationItem.index(),
				$currentArticle = this.$articles.eq(currentIndex),
				scrollTop = $currentArticle.offset().top + this.$content.scrollTop() - 100,
				self = this;


			// bypass scroll event
			this.scrollListnening = false;
			this.currentIndex = currentIndex;
			this._changeActiveNavigationItem();

			this.$content.animate({
				scrollTop: scrollTop
			}, function () {
				self.scrollListnening = true;
			});
		}

	});

	return NavigationView;

});