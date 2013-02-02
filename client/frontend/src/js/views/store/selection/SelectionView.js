// Filename: src/js/views/store/selection/SelectionView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/TimelineItemsCollection',
	'views/store/selection/timeline/TimelineView'
	], function ($, _, Backbone, TimelineItemsCollection, TimelineView) {

	// little hack to get height of hidden dom element
	$.fn.hiddenHeight = function () {
		var $this = $(this),
			currentPosition = $this.css('position'),
			currentDisplay = $this.css('display'),
			currentVisibility = $this.css('visibility'),
			height;

		$this.css({
			// position: 'absolute',
			display: 'block',
			visibility: 'hidden'
		});

		height = $this.height();

		$this.css({
			// position: currentPosition,
			display: currentDisplay,
			visibility: currentVisibility
		});

		return height;
	};

	// global variable needed for info note sliding
	var indexOfSelectionView = 0;


	var SelectionView = Backbone.View.extend({

		/*
		 * this.$el = $('.main')
		 *
		 * this.model = orderedArticle
		 */

		timelineItemsCollection: null,

		// subviews
		infoView: null,
		stageView: null,
		timelineView: null,

		// dom
		$slideContainer: null,

		// backbone class gets set in child classes
		stageViewClass: null,
		infoViewClass: null,

		active: false,

		initialize: function () {

			// initialize timelineItemsCollection
			this.timelineItemsCollection = new TimelineItemsCollection();

			// prepare data
			this.prepare();

			this.render();

			// append timelineitems from prepare to ordereditem
			this.deliverTimelineItems();

			// increase selection counter
			this.increaseSelectionCounter();


		},

		prepare: function () {},

		deliverTimelineItems: function () {
			var orderedItemModel = this.model.get('orderedItemModel'),
				timelineItemsCollectionOfOrderedItemModel = orderedItemModel.get('timelineItemsCollection');

			timelineItemsCollectionOfOrderedItemModel.add(this.timelineItemsCollection.models);

			// append selection index to all items for info switching
			this.timelineItemsCollection.each(function (timelineItemModel) {
				timelineItemModel.set('selectionIndex', indexOfSelectionView);
			}, this);
		},

		increaseSelectionCounter: function () {
			if (this.active) {
				indexOfSelectionView++;
			}
		},

		render: function () {

			if (this.active) {

				this.renderInfoView();
				this.renderStageView();

				this.compensateSize();

				// adjust height on resize
				var self = this;
				$(window).resize(function () {
					self.compensateSize();
				});

			}

			this.renderTimelineView();

		},

		renderInfoView: function () {
			var $info = this.$('.note.selection .container'),
				$infoContainer = this.$('.note.selection .container');

			this.infoView = new this.infoViewClass({
				model: this.model,
				el: $infoContainer
			});
		},

		renderStageView: function () {
			var $stage = this.$('.stage'),
				$slideContainer = $('<div class="slideContainer">').appendTo($stage);

			this.$slideContainer = $slideContainer;

			this.stageView = new this.stageViewClass({
				model: this.model,
				el: $slideContainer
			});
		},

		renderTimelineView: function () {
			var $timeline = this.$('.note.timeline');

			this.timelineView = new TimelineView({
				collection: this.timelineItemsCollection,
				el: $timeline
			});

		},

		compensateSize: function () {
			var mainHeight = this.$el.height(),
				timelineHeight = 90,
				infoHeight = this.infoView.$el.hiddenHeight();

			this.$slideContainer.css({
				marginTop: infoHeight,

				// add 50 because of timeline bottom height
				height: mainHeight - infoHeight - timelineHeight
			});

			// realign slides
			this.$slideContainer.trigger('align');
		},

		// delegate remove
		remove: function () {

			if (this.active) {

				this.infoView.remove();
				this.stageView.remove();

			}

			this.timelineView.remove();

		}

	});

	return SelectionView;

});