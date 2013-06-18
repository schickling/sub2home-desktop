// Filename: src/js/views/store/home/CategoriesNavigationView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/TimelineItemsCollection',
	'views/store/shared/timeline/TimelineBaseView'
	], function ($, _, Backbone, TimelineItemsCollection, TimelineBaseView) {



	var CategoriesNavigationView = Backbone.View.extend({

		timelineItemsCollection: null,

		currentCategoryIndex: 0,

		animationTime: 400,

		// to prevent calculation while triggered scrolling
		scrollListnening: true,

		// cached dom
		$content: null,
		$categories: null,
		$navigation: null,
		$navigationStage: null,
		$navigationOverlay: null,
		$navigationOverlayWrapper: null,
		$navigationItems: null,

		initialize: function () {

			this._prepareTimelineItems();
			this._render();
			// dom needs to be cached AFTER rendering
			this._cacheDom();

			this._initializeClickListneres();
			this._initializeScrollListneres();
		},

		_cacheDom: function () {
			// content
			this.$content = this.$('.content');
			this.$categories = this.$content.find('#categories').children();

			// navigation
			this.$navigation = this.$('#categoriesNavigation');
			this.$navigationStage = this.$navigation.find('#stageTimeline');
			this.$navigationItems = this.$navigationStage.find('.itemTimeline');
			this.$navigationOverlay = this.$navigation.find('#overlayTimeline');
			this.$navigationOverlayWrapper = this.$navigationOverlay.find('#overlayFrameWrapperTimeline');

		},

		_prepareTimelineItems: function () {
			this.timelineItemsCollection = new TimelineItemsCollection();

			_.each(this.collection.models, function (categoryModel) {
				this.timelineItemsCollection.add({
					image: categoryModel.get('smallImage'),
					icon: categoryModel.get('icon')
				});
			}, this);
		},

		_render: function () {
			new TimelineBaseView({
				el: this.$('#categoriesNavigation'),
				collection: this.timelineItemsCollection
			});
		},

		_initializeClickListneres: function () {
			var self = this;

			this.$navigationItems.each(function (index) {
				var $this = $(this);

				$this.on('click', function () {
					self.currentCategoryIndex = index;
					self._navigate();
				});
			});
		},

		_initializeScrollListneres: function () {
			var self = this,
				$content = this.$content,
				$categories = this.$categories,
				antepenultimate = $categories.length - 3,
				currentIndex, timer;

			// Bind to scroll
			$content.on('scroll', function () {

				// navigation
				if (self.scrollListnening) {

					// wrap in timeout to buffer events
					clearTimeout(timer);
					timer = setTimeout(function () {
						currentIndex = -1;

						$categories.each(function () {
							if ($(this).position().top < 90) {
								currentIndex++;
							}
						});

						// check if bottom reached
						if (currentIndex > antepenultimate && currentIndex < ($categories.length - 1) && $content.scrollTop() === $content[0].scrollHeight - $content.height()) {
							currentIndex++;
						}

						self.currentCategoryIndex = currentIndex;
						self._slideTimeline();
					}, 20);

				}

			});
		},

		_navigate: function () {
			this._slideTimeline();
			this._scrollContent();
		},

		_slideTimeline: function () {
			var offsetRelative = this.currentCategoryIndex * 70;

			this.$navigationOverlay.stop().animate({
				left: offsetRelative - 10
			}, this.animationTime);

			this.$navigationOverlayWrapper.stop().animate({
				left: -offsetRelative
			}, this.animationTime);
		},

		_scrollContent: function () {
			var $currentCategory = this.$categories.eq(this.currentCategoryIndex),
				self = this;

			this.scrollListnening = false;

			this.$content.stop().animate({
				scrollTop: $currentCategory.position().top + this.$content.scrollTop() - 10
			}, this.animationTime, function () {
				self.scrollListnening = true;
			});
		}

	});

	return CategoriesNavigationView;

});