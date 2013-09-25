// Filename: src/js/views/store/selection/TimelineControllerView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'services/router',
    'services/notificationcenter',
    'models/cartModel'
], function ($, _, Backbone, router, notificationcenter, cartModel) {

	"use strict";

	var TimelineControllerView = Backbone.View.extend({

		/*
		 * this.$el: $('.main')
		 *
		 * model: orderedItemModel
		 *
		 * this.collection: all timeline items
		 */

		currentTimelineItemModel: null,
		previousTimelineItemModel: null,
		currentTimelineItemIndex: 0,
		currentInfoIndex: 0,

		animationTime: 400,

		delayTimeout: 0,

		// cached dom
		$buttonNext: null,
		$buttonPrev: null,
		$buttonCart: null,
		$stage: null,
		$infoContainer: null,
		$timelineOverlay: null,
		$timelineOverlayWrapper: null,
		$timelineContainerWrapper: null,
		$timelineStage: null,
		$timelineCart: null,
		$noUpgrade: null,
		$stageOverlay: null,

		events: {
			// buttons
			'click #bNext': '_forward',
			'click .menuUpgrade, .article': '_delayedForward',
			'click #bPrev': '_backward',
			'click #bCart': '_finish',

			// timeline
			'click .iCart': '_finish',

			// stage
			'click #noUpgrade': '_finish'
		},

		initialize: function () {

			// cache DOM
			this._chacheDOM();

			// initialize currentTimelineItemModel
			this._initializeCurrentTimelineItem();

			// bind keyboard input
			var self = this;
			$(document).on('keyup', function (e) {
				self._evalKeyboardInput(e);
			});

			// initialize ui buttons
			this._adjustButtons();

			// initialize info header
			this._initializeInfo();

			// initialize timeline
			this._initializeTimeline();

			// initialize listeners
			this._initializeListeners();

			// show no upgrade view if is first slide
			this._slideNoUpgradeView();

			// compensate content overlay
			this._adjustStageOverlay();

		},

		_chacheDOM: function () {
			// ui buttons in overlay
			var $overlay = this.$('#overlay');
			this.$buttonNext = $overlay.find('#bNext');
			this.$buttonPrev = $overlay.find('#bPrev');
			this.$buttonCart = $overlay.find('#bCart');

			// stage
			this.$stage = this.$('#stage');
			this.$stageOverlay = this.$('#overlay');
			this.$noUpgrade = this.$stage.find('#noUpgrade');

			// info note
			this.$infoContainer = this.$('#infoContainer');

			// timeline
			this.$timelineContainerWrapper = this.$('#timelineContainerWrapper');
			this.$timelineOverlay = this.$('#overlayTimeline');
			this.$timelineOverlayWrapper = this.$timelineOverlay.find('#overlayFrameWrapperTimeline');
			this.$timelineStage = this.$('#stageTimeline');
			this.$timelineCart = this.$timelineStage.find('.iCart');
		},

		_initializeCurrentTimelineItem: function () {
			// get first enabled item
			this.currentTimelineItemModel = this.collection.where({
				isDisabled: false
			})[0];

			// set index
			this.currentTimelineItemIndex = this.collection.indexOf(this.currentTimelineItemModel);
		},

		_initializeInfo: function () {
			var $currentInfo = this.$infoContainer.find('.info').first();

			$currentInfo.addClass('active').show();
		},

		_initializeTimeline: function () {

			// set width of overlay wrapper
			this.$timelineOverlayWrapper.width(this.$timelineStage.width());

			// get current item and calculate relative and total offset
			var $currentTimelineItem = this.$timelineStage.find('.itemTimeline').eq(this.currentTimelineItemIndex),
				timelineOffsetRelative = $currentTimelineItem.position().left;

			// mark current timeline item as wasVisited
			this.currentTimelineItemModel.set('wasVisited', true);

			// align timeline overlay
			this.$timelineOverlay.css({
				left: timelineOffsetRelative - 10
			}).show();

			// align timeline overlay wrapper
			this.$timelineOverlayWrapper.css({
				left: -timelineOffsetRelative
			});

		},

		_initializeListeners: function () {

			// listen if items get active
			_.each(this.collection.models, function (timelineItemModel) {
				this._listenToTimelineItem(timelineItemModel);
			}, this);

			// also listen to new items if they get active
			this.listenTo(this.collection, 'add', function (timelineItemModel) {
				this._listenToTimelineItem(timelineItemModel);
			});

			// adjust buttons on collection change
			this.listenTo(this.collection, 'add remove', this._adjustButtons);


			// adjust stage offset on resize
			var self = this;
			$(window).resize(function () {
				self._slideStage();
			});

		},

		// listen if timeline item gets isSelected and thus active
		_listenToTimelineItem: function (timelineItemModel) {

			this.listenTo(timelineItemModel, 'change', function () {

				if (timelineItemModel.hasChanged('isActive') && timelineItemModel.get('isActive')) {

					// deactivate prev timeline item
					this.currentTimelineItemModel.set('isActive', false);

					// set new timeline item
					this._setCurrentTimelineItem(timelineItemModel);
					this.currentTimelineItemIndex = this.collection.indexOf(timelineItemModel);

					// _navigate
					this._navigate();
				}

				this.$timelineCart.toggleClass('clickable', this._isReadyForCart());

			});

		},

		_adjustButtons: function () {

			var animationTime = this.animationTime / 2,
				noUpgradeViewIsActive = this._noUpgradeViewIsActive(),
				$buttonNext = this.$buttonNext,
				$buttonPrev = this.$buttonPrev,
				$buttonCart = this.$buttonCart;

			// hide all buttons
			$buttonNext.stop(true).fadeOut(animationTime, function () {
				if (noUpgradeViewIsActive) {
					$buttonNext.css({
						right: 321
					});
				} else {
					$buttonNext.css({
						right: 20
					});
				}
			});
			$buttonPrev.stop(true).fadeOut(animationTime);
			$buttonCart.stop(true).fadeOut(animationTime);

			// next/cart button
			if (this._checkForward()) {
				$buttonNext.delay(animationTime).fadeIn(animationTime);
			} else if (!this._noUpgradeViewIsActive()) {
				$buttonCart.delay(animationTime).fadeIn(animationTime);
			}

			// prev button
			if (this._checkBackward()) {
				$buttonPrev.delay(animationTime).fadeIn(animationTime);
			}

		},

		_alignTimeline: function () {
			var relativeProgress = this.currentTimelineItemIndex / this.collection.length,
				adjustedRelativeProgress = relativeProgress * relativeProgress,
				totalWidth = this.$timelineStage.width(),
				wrapperWidth = this.$timelineContainerWrapper.width(),
				relativeWidth = totalWidth - wrapperWidth / 2,
				left = relativeWidth * adjustedRelativeProgress;

			this.$timelineContainerWrapper.stop().animate({
				scrollLeft: left
			});
		},

		_evalKeyboardInput: function (e) {
			// cache keyCode
			var keyCode = e.keyCode;

			if (keyCode === 37) { // left arrow
				this._backward();
			} else if (keyCode === 39 || keyCode === 32) { // right arrow or spacebar
				this._forward();
			} else if (keyCode === 13) { // enter
				this._finish();
			}
		},

		_forward: function () {
			if (this._checkForward()) {

				this.currentTimelineItemIndex++;

				var currentTimelineItemModel = this.collection.at(this.currentTimelineItemIndex);
				if (currentTimelineItemModel.get('isDisabled')) {
					// call recrusive
					this._forward();
				} else {
					this._setCurrentTimelineItem(currentTimelineItemModel);
					this._transferActiveState();
					this._navigate();
				}

			}
		},

		_backward: function () {
			if (this._checkBackward()) {

				this.currentTimelineItemIndex--;

				var currentTimelineItemModel = this.collection.at(this.currentTimelineItemIndex);
				if (currentTimelineItemModel.get('isDisabled')) {
					// call recrusive
					this._backward();
				} else {
					this._setCurrentTimelineItem(currentTimelineItemModel);
					this._transferActiveState();
					this._navigate();
				}

			}
		},

		_delayedForward: function () {
			var self = this;
			this.delayTimeout = setTimeout(function () {
				self._forward();
			}, 400);
		},

		_navigate: function () {
			clearTimeout(this.delayTimeout);

			this._slideStage();
			this._slideTimeline();
			this._changeInfo();
			this._adjustButtons();
			this._alignTimeline();
		},

		_slideStage: function () {

			// adjust index to skip isDisabled items and thus non exsisting slides
			var filteredCollection = this.collection.filter(function (timelineItemModel, index) {
				return ((index < this.currentTimelineItemIndex) && !timelineItemModel.get('isDisabled'));
			}, this);

			var factor = filteredCollection.length,
				documentWidth = this.$el.width();

			// animate
			this.$stage.stop().animate({
				left: -(factor * documentWidth)
			}, 600);

			this._slideNoUpgradeView();
		},

		// hook in for no menu upgrade
		_slideNoUpgradeView: function () {

			if (this._hasNoUpgradeView()) {
				// no upgrade slide in
				if (this._noUpgradeViewIsActive()) {
					this.$noUpgrade.stop().animate({
						right: 0
					}, 200);
				} else {
					// check if still visible
					if (this.$noUpgrade.css('right') !== '-301px') {
						this.$noUpgrade.stop().animate({
							right: -301
						}, 200);
					}
				}
			}

		},

		_slideTimeline: function () {

			var $currentTimelineItem = this.$timelineStage.find('.itemTimeline').eq(this.currentTimelineItemIndex),
				timelineOffsetRelative = $currentTimelineItem.position().left,
				self = this;

			this.$timelineOverlay.stop().animate({
				left: timelineOffsetRelative - 10
			}, this.animationTime, function () {
				self.currentTimelineItemModel.set('wasVisited', true);
			});

			this.$timelineOverlayWrapper.stop().animate({
				left: -timelineOffsetRelative
			}, this.animationTime);

		},

		_changeInfo: function () {

			var newInfoIndex = this._getInfoIndex(),
				self = this;

			// compare timeline items
			if (this.currentInfoIndex !== newInfoIndex) {

				this.currentInfoIndex = newInfoIndex;

				var animationTime = this.animationTime,
					$container = this.$infoContainer;

				// slide up
				$container.stop().animate({
					marginTop: -($container.height()) + 35
				}, animationTime, function () {

					// swap content
					var $prevInfo = $container.find('.active'),
						$currentInfo = $container.find('.info').eq(newInfoIndex);

					$prevInfo.removeClass('active').hide();
					$currentInfo.addClass('active').show();

					$container.css({
						marginTop: -($currentInfo.height()) + 35
					});

					// slide down
					$container.stop().animate({
						marginTop: 0
					}, animationTime);

					// compensate content overlay
					self._adjustStageOverlay();

				});
			}
		},

		_getInfoIndex: function () {
			var infoIndex = this.currentTimelineItemIndex,
				lastSelectionIndex, currentSelectionIndex;

			_.each(this.collection.models, function (timelineItemModel, index) {
				if (index <= this.currentTimelineItemIndex) {
					currentSelectionIndex = timelineItemModel.get('selectionIndex');

					if (currentSelectionIndex == lastSelectionIndex) {
						infoIndex--;
					}

					lastSelectionIndex = currentSelectionIndex;
				}
			}, this);

			if (this.model.canBeUpgraded()) {
				infoIndex--;
			}

			return infoIndex;
		},

		_adjustStageOverlay: function () {
			var timelineHeight = 90,
				$info = this.$infoContainer.find('.active'),
				infoHeight = $info.height(),
				slideContainerHeight = window.innerHeight - infoHeight - timelineHeight;

			this.$stageOverlay.animate({
				top: infoHeight + slideContainerHeight / 2
			});
		},

		_finish: function () {

			var lockedTimelineItems = this.collection.where({
				isLocked: true
			});

			if (lockedTimelineItems.length === 0) {

				this._saveOrderedItemModel();

			} else {
				_.each(lockedTimelineItems, function (timelineItemModel) {
					timelineItemModel.trigger('highlight');
				});

				notificationcenter.notify('views.store.selection.notReady');
			}
		},

		_saveOrderedItemModel: function () {

			if (!this.model.get('isInCart')) {

				// save ordered item in cart
				cartModel.addOrderedItemModel(this.model);

				// back to store.home
				router.navigate('store', {
					trigger: true,
					replace: true
				});

			} else {

				// back to store.tray
				router.navigate('store/tablett', true);

			}
		},

		destroy: function () {
			$(document).off('keyup');
			this.stopListening();
		},

		/*
		 * helper functions
		 */

		_setCurrentTimelineItem: function (currentTimelineItemModel) {
			this.previousTimelineItemModel = this.currentTimelineItemModel;
			this.currentTimelineItemModel = currentTimelineItemModel;
		},

		_transferActiveState: function () {
			this.previousTimelineItemModel.set({
				isActive: false
			}, {
				silent: true
			});
			this.currentTimelineItemModel.set({
				isActive: true
			}, {
				silent: true
			});
		},

		_checkForward: function () {
			// end of list
			if ((this.collection.length - 1) <= this.currentTimelineItemIndex) {
				return false;
			}

			// look if enabled items with higher index exists
			var filteredCollection = this.collection.filter(function (timelineItemModel, index) {
				return ((index > this.currentTimelineItemIndex) && !timelineItemModel.get('isDisabled'));
			}, this);
			return filteredCollection.length > 0;
		},

		_checkBackward: function () {
			// beginning of list
			if (this.currentTimelineItemIndex <= 0) {
				return false;
			}

			// look if enabled items with lower index exists
			var filteredCollection = this.collection.filter(function (timelineItemModel, index) {
				return ((index < this.currentTimelineItemIndex) && !timelineItemModel.get('isDisabled'));
			}, this);

			return filteredCollection.length > 0;
		},

		_hasNoUpgradeView: function () {
			return (this.$noUpgrade !== null);
		},

		_noUpgradeViewIsActive: function () {
			return this._hasNoUpgradeView() && this.currentTimelineItemModel.get('menuUpgradeSelection');
		},

		_isReadyForCart: function () {
			return this.collection.filter(function (timelineItemModel) {
				return timelineItemModel.get('isLocked') || !timelineItemModel.get('wasVisited') && !timelineItemModel.get('isDisabled');
			}).length === 0;

		}

	});

	return TimelineControllerView;

});