// Filename: src/js/views/store/assortment/SectionsNavigationView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/TimelineItemsCollection',
    'views/store/shared/timeline/TimelineBaseView'
    ], function ($, _, Backbone, TimelineItemsCollection, TimelineBaseView) {


	var SectionsNavigationView = Backbone.View.extend({

		timelineItemsCollection: null,

		currentCategoryIndex: null,

		animationTime: 400,

		// to prevent calculation while triggered scrolling
		scrollListnening: true,

		// cached dom
		$stage: null,
		$slides: null,
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
		},

		_prepareTimelineItems: function () {

			var timelineItems = [{
				image: '../../img/static/categories/smallimages/salat.png',
				icon: 'iSalad'
			}, {
				image: '../../img/static/categories/smallimages/salat.png',
				icon: 'iSalad'
			}, {
				image: '../../img/static/categories/smallimages/salat.png',
				icon: 'iSalad'
			}];

			this.timelineItemsCollection = new TimelineItemsCollection(timelineItems);

		},

		_cacheDom: function () {
			// stage
			this.$stage = this.$('#stage');
			this.$slides = this.$stage.children();

			// navigation
			this.$navigation = this.$('#sectionsNavigation');
			this.$navigationStage = this.$navigation.find('#stageTimeline');
			this.$navigationItems = this.$navigationStage.find('.itemTimeline');
			this.$navigationOverlay = this.$navigation.find('#overlayTimeline');
			this.$navigationOverlayWrapper = this.$navigationOverlay.find('#overlayFrameWrapperTimeline');

		},

		_render: function () {
			new TimelineBaseView({
				el: this.$('#sectionsNavigation'),
				collection: this.timelineItemsCollection
			});

			console.log(this.timelineItemsCollection);
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
			
		}

	});

	return SectionsNavigationView;

});