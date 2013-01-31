// Filename: src/js/views/store/selection/TimelineControllerView.js
define([
	'jquery',
	'jqueryEventSpecialDestroyed',
	'underscore',
	'backbone',
	'router',
	'notificationcenter',
	'models/cartModel'
	], function ($, jqueryEventSpecialDestroyed, _, Backbone, router, notificationcenter, cartModel) {

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

		animationTime: 400,

		// cached dom
		$buttonNext: null,
		$buttonPrev: null,
		$buttonCart: null,
		$stage: null,
		$infoContainer: null,
		$timelineOverlay: null,
		$timelineOverlayWrapper: null,
		$timelineStage: null,
		$noUpgrade: null,

		events: {
			// buttons
			'click .overlay .vecbuttonNext': 'forward',
			'click .overlay .vecbuttonPrev': 'backward',
			'click .overlay .vecbuttonCart': 'finish',

			// stage
			'click .stage .noUpgrade': 'finish'
		},

		initialize: function () {

			// cache DOM
			this.chacheDOM();

			// initialize currentTimelineItemModel
			this.initializeCurrentTimelineItem();

			// bind keyboard input
			var self = this;
			$(document).on('keyup', function (e) {
				self.evalKeyboardInput(e);
			});

			// initialize ui buttons
			this.adjustButtons();

			// initialize info header
			this.initializeInfo();

			// initialize timeline
			this.initializeTimeline();

			// initialize listeners
			this.initializeListeners();


			// cleanup if view gets destroyed
			this.$el.on('destroyed', function () {
				self.cleanUp();
			});

		},

		chacheDOM: function () {
			// ui buttons in overlay
			var $overlay = this.$('.overlay');
			this.$buttonNext = $overlay.find('.vecbuttonNext');
			this.$buttonPrev = $overlay.find('.vecbuttonPrev');
			this.$buttonCart = $overlay.find('.vecbuttonCart');

			// stage
			this.$stage = this.$('.stage');
			this.$noUpgrade = this.$stage.find('.noUpgrade');

			// info note
			this.$infoContainer = this.$('.note.selection .container');

			// timeline
			this.$timelineOverlay = this.$('.overlayTimeline');
			this.$timelineOverlayWrapper = this.$timelineOverlay.find('.overlayFrameWrapperTimeline');
			this.$timelineStage = this.$('.stageTimeline');
		},

		initializeCurrentTimelineItem: function () {
			// get first enabled item
			this.currentTimelineItemModel = _(this.collection.where({
				disabled: false
			})).first();

			// set index
			this.currentTimelineItemIndex = this.collection.indexOf(this.currentTimelineItemModel);
		},

		initializeInfo: function () {
			var $currentInfo = this.$infoContainer.children('.info').first();

			$currentInfo.addClass('active').show();
		},

		initializeTimeline: function () {

			// set width of overlay wrapper
			this.$timelineOverlayWrapper.width(this.$timelineStage.width());

			console.log(this.$timelineStage.width());

			// get current item and calculate relative and total offset
			var $currentTimelineItem = this.$timelineStage.find('.itemTimeline').eq(this.currentTimelineItemIndex),
				timelineOffsetRelative = $currentTimelineItem.position().left;

			// mark current timeline item as visited
			this.currentTimelineItemModel.set('visited', true);

			// align timeline overlay
			this.$timelineOverlay.css({
				left: timelineOffsetRelative - 10
			}).show();

			// align timeline overlay wrapper
			this.$timelineOverlayWrapper.css({
				left: -timelineOffsetRelative
			});

		},

		initializeListeners: function () {

			// listen if items get active
			this.collection.each(function (timelineItemModel) {
				this.listenToTimelineItem(timelineItemModel);
			}, this);

			// also listen to new items if they get active
			this.collection.on('add', function (timelineItemModel) {
				this.listenToTimelineItem(timelineItemModel);
			}, this);

			// adjust buttons on collection change
			this.collection.on('add remove', function () {
				this.adjustButtons();
			}, this);


			// adjust stage offset on resize
			var self = this;
			$(window).resize(function () {
				self.slideStage();
			});

		},

		// listen if timeline item gets selected and thus active
		listenToTimelineItem: function (timelineItemModel) {

			timelineItemModel.on('change', function () {
				if (timelineItemModel.hasChanged('active') && timelineItemModel.get('active')) {

					// deactivate prev timeline item
					this.currentTimelineItemModel.set('active', false);

					// set new timeline item
					this.setCurrentTimelineItem(timelineItemModel);
					this.currentTimelineItemIndex = this.collection.indexOf(timelineItemModel);

					// navigate
					this.navigate();
				}
			}, this);

		},

		adjustButtons: function () {

			if (this.hasNoUpgradeView() && this.noUpgradeViewIsActive()) {

				// next/cart button
				if (this.checkForward()) {
					this.$buttonNext.fadeIn();
					this.$buttonCart.fadeOut();
				} else {
					this.$buttonNext.fadeOut();
					this.$buttonCart.fadeOut();
				}

				// prev button
				if (this.checkBackward()) {
					this.$buttonPrev.fadeIn();
				} else {
					this.$buttonPrev.fadeOut();
				}

			} else {

				// next/cart button
				if (this.checkForward()) {
					this.$buttonNext.fadeIn();
					this.$buttonCart.fadeOut();
				} else {
					this.$buttonNext.fadeOut();
					this.$buttonCart.fadeIn();
				}

				// prev button
				if (this.checkBackward()) {
					this.$buttonPrev.fadeIn();
				} else {
					this.$buttonPrev.fadeOut();
				}

			}
		},

		evalKeyboardInput: function (e) {
			// cache keyCode
			var keyCode = e.keyCode;

			if (keyCode === 37) { // left arrow
				this.backward();
			} else if (keyCode === 39 || keyCode === 32) { // right arrow or spacebar
				this.forward();
			} else if (keyCode === 13) { // enter
				this.finish();
			}
		},

		forward: function () {
			if (this.checkForward()) {

				this.currentTimelineItemIndex++;

				var currentTimelineItemModel = this.collection.at(this.currentTimelineItemIndex);
				if (currentTimelineItemModel.get('disabled')) {
					// call recrusive
					this.forward();
				} else {
					this.setCurrentTimelineItem(currentTimelineItemModel);
					this.navigate();
				}

			}
		},

		backward: function () {
			if (this.checkBackward()) {

				this.currentTimelineItemIndex--;

				var currentTimelineItemModel = this.collection.at(this.currentTimelineItemIndex);
				if (currentTimelineItemModel.get('disabled')) {
					// call recrusive
					this.backward();
				} else {
					this.setCurrentTimelineItem(currentTimelineItemModel);
					this.navigate();
				}

			}
		},

		navigate: function () {
			this.slideStage();
			this.slideTimeline();
			this.changeInfo();
			this.adjustButtons();
		},

		slideStage: function () {

			// adjust index to skip disabled items and thus non exsisting slides
			var filteredCollection = this.collection.filter(function (timelineItemModel, index) {
				return ((index < this.currentTimelineItemIndex) && !timelineItemModel.get('disabled'));
			}, this);

			var factor = filteredCollection.length,
				documentWidth = this.$el.width();

			// animate
			this.$stage.stop().animate({
				left: -(factor * documentWidth)
			}, 600);

			this.slideNoUpgradeView();
		},

		// hook in for no menu upgrade
		slideNoUpgradeView: function () {

			if (this.hasNoUpgradeView()) {
				// no upgrade slide in
				if (this.noUpgradeViewIsActive()) {
					this.$noUpgrade.stop().animate({
						right: 0
					});
				} else {
					// check if still visible
					if (this.$noUpgrade.css('right') !== '-301px') {
						console.log('needed');
						this.$noUpgrade.stop().animate({
							right: -301
						});
					}
				}
			}

		},

		slideTimeline: function () {

			var $currentTimelineItem = this.$timelineStage.find('.itemTimeline').eq(this.currentTimelineItemIndex),
				timelineOffsetRelative = $currentTimelineItem.position().left,
				self = this;

			this.$timelineOverlay.stop().animate({
				left: timelineOffsetRelative - 10
			}, this.animationTime, function () {
				self.currentTimelineItemModel.set('visited', true);
			});

			this.$timelineOverlayWrapper.stop().animate({
				left: -timelineOffsetRelative
			}, this.animationTime);

		},

		changeInfo: function () {

			// compare timeline items
			if (this.currentTimelineItemModel.get('selectionIndex') !== this.previousTimelineItemModel.get('selectionIndex')) {

				var self = this,
					currentSelectionIndex = this.currentTimelineItemModel.get('selectionIndex'),
					animationTime = this.animationTime,
					$container = this.$infoContainer;

				// slide up
				$container.stop().animate({
					marginTop: -($container.height()) + 35
				}, animationTime, function () {

					// swap content
					var $prevInfo = $container.find('.active'),
						$currentInfo = $container.children().eq(currentSelectionIndex);

					$prevInfo.removeClass('active').hide();
					$currentInfo.addClass('active').show();


					// slide down
					$container.animate({
						marginTop: 0
					}, animationTime);
				});
			}
		},

		finish: function () {

			var lockedTimelineItems = this.collection.where({
				locked: true
			});

			if (lockedTimelineItems.length === 0) {
				// save ordered item in cart
				var orderedItemsCollection = cartModel.get('orderedItemsCollection');
				orderedItemsCollection.add(this.model);

				// back to store.home
				router.navigate('store', {
					trigger: true,
					replace: true
				});

			} else {
				console.log(this.collection.toJSON());
				_.each(lockedTimelineItems, function (timelineItemModel) {
					notificationcenter.error('Noch nicht fertig!', timelineItemModel.get('phrase') + ' ist noch nicht ausgewaehlt.');
					timelineItemModel.trigger('highlight');
				});
			}
		},

		cleanUp: function () {

			// unbind events
			$(document).off('keyup');

			// TODO
			this.model = null;
		},



		/*
		 * helper functions
		 */

		setCurrentTimelineItem: function (currentTimelineItemModel) {
			this.previousTimelineItemModel = this.currentTimelineItemModel;
			this.currentTimelineItemModel = currentTimelineItemModel;
		},

		checkForward: function () {
			// end of list
			if ((this.collection.length - 1) <= this.currentTimelineItemIndex) {
				return false;
			}

			// look if enabled items with higher index exists
			var filteredCollection = this.collection.filter(function (timelineItemModel, index) {
				return ((index > this.currentTimelineItemIndex) && !timelineItemModel.get('disabled'));
			}, this);
			return filteredCollection.length > 0;
		},

		checkBackward: function () {
			// beginning of list
			if (this.currentTimelineItemIndex <= 0) {
				return false;
			}

			// look if enabled items with lower index exists
			var filteredCollection = this.collection.filter(function (timelineItemModel, index) {
				return ((index < this.currentTimelineItemIndex) && !timelineItemModel.get('disabled'));
			}, this);

			return filteredCollection.length > 0;
		},

		hasNoUpgradeView: function () {
			return (this.$noUpgrade !== null);
		},

		noUpgradeViewIsActive: function () {
			return this.currentTimelineItemModel.get('menuUpgradeSelection');
		}


	});

	return TimelineControllerView;

});