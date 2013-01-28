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

		currentCategoryIndex: null,

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

			this.prepareTimelineItems();
			this.render();
			this.cacheDom();

			this.initializeClickListneres();
			this.initializeScrollListneres();
		},

		cacheDom: function () {
			// content
			this.$content = this.$('.content');
			this.$categories = this.$content.find('.categories').children();

			// navigation
			this.$navigation = this.$('.categoriesNavigation');
			this.$navigationStage = this.$navigation.find('.stageTimeline');
			this.$navigationItems = this.$navigationStage.find('.itemTimeline');
			this.$navigationOverlay = this.$navigation.find('.overlayTimeline');
			this.$navigationOverlayWrapper = this.$navigationOverlay.find('.overlayFrameWrapperTimeline');

		},

		prepareTimelineItems: function () {
			this.timelineItemsCollection = new TimelineItemsCollection();

			_.each(this.collection.models, function (categoryModel) {
				this.timelineItemsCollection.add();
			}, this);
		},

		render: function () {
			var timelineView = new TimelineBaseView({
				el: this.$('.categoriesNavigation'),
				collection: this.timelineItemsCollection
			});
		},

		initializeClickListneres: function () {
			var self = this;

			this.$navigationItems.each(function (index) {
				var $this = $(this);

				$this.on('click', function () {
					self.currentCategoryIndex = index;
					self.navigate();
				});
			});
		},

		initializeScrollListneres: function () {
			var self = this,
				currentIndex, timer, $content = this.$content,
				$categories = this.$categories,
				antepenultimate = $categories.length - 3;

			// Bind to scroll
			$content.on('scroll', function () {

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
						self.slideTimeline();
					}, 30);

				}

			});
		},

		navigate: function () {
			this.slideTimeline();
			this.scrollContent();
		},

		slideTimeline: function () {
			var offsetRelative = this.currentCategoryIndex * 70;

			this.$navigationOverlay.stop().animate({
				left: offsetRelative - 10
			}, this.animationTime);

			this.$navigationOverlayWrapper.stop().animate({
				left: -offsetRelative
			}, this.animationTime);
		},

		scrollContent: function () {
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