// Filename: src/js/views/store/assortment/SectionsNavigationView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/TimelineItemsCollection',
    'views/store/shared/timeline/TimelineBaseView'
    ], function ($, _, Backbone, TimelineItemsCollection, TimelineBaseView) {

	"use strict";

	var SectionsNavigationView = Backbone.View.extend({

		timelineItemsCollection: null,

		currentSectionIndex: 0,

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
		$assortmentControls: null,

		initialize: function () {

			this._prepareTimelineItems();
			this._render();
			// dom needs to be cached AFTER rendering
			this._cacheDom();

			this._initializeClickListneres();
		},

		_prepareTimelineItems: function () {

			var timelineItems = [{
				image: 'https://s3-eu-west-1.amazonaws.com/sub2home-static/images/categories/smallimages/sub.png',
				icon: 'iSub'
			}, {
				image: 'https://s3-eu-west-1.amazonaws.com/sub2home-static/images/common/menuupgrade.png',
				icon: 'iMenuUpgrade'
			}, {
				image: 'https://s3-eu-west-1.amazonaws.com/sub2home-static/images/common/menubundle.png',
				icon: 'iMenuBundle'
			}, {
				image: 'https://s3-eu-west-1.amazonaws.com/sub2home-static/images/ingredientcategories/smallimages/vegetables.png',
				icon: 'iVegetables'
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

			// assortment controls
			this.$assortmentControls = this.$('.assortmentControls');

		},

		_render: function () {
			new TimelineBaseView({
				el: this.$('#sectionsNavigation'),
				collection: this.timelineItemsCollection
			});
		},

		_initializeClickListneres: function () {
			var self = this;

			this.$navigationItems.each(function (index) {
				var $this = $(this);

				$this.on('click', function () {
					self.currentSectionIndex = index;
					self._navigate();
				});
			});
		},

		_navigate: function () {
			this._slideTimeline();
			this._slideContent();
			this._changeControlView();
		},

		_slideTimeline: function () {
			var offsetRelative = this.currentSectionIndex * 70;

			this.$navigationOverlay.stop().animate({
				left: offsetRelative - 10
			}, this.animationTime);

			this.$navigationOverlayWrapper.stop().animate({
				left: -offsetRelative
			}, this.animationTime);
		},

		_slideContent: function () {
			var left = -(this.currentSectionIndex * 100),
				leftPercentage = left + '%';

			this.$stage.animate({
				left: leftPercentage
			});
		},

		_changeControlView: function () {
			var $newControl = this.$assortmentControls.eq(this.currentSectionIndex),
				$oldControls = this.$assortmentControls.not($newControl);

			$oldControls.hide();
			$newControl.show();
		}

	});

	return SectionsNavigationView;

});