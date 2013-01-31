// Filename: src/js/views/store/selection/SelectionView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/TimelineItemsCollection',
	'views/store/selection/timeline/TimelineView',
	'views/store/selection/SelectionCounter'
	], function ($, _, Backbone, TimelineItemsCollection, TimelineView, SelectionCounter) {

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
		$stageContainer: null,

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
				timelineItemModel.set('selectionIndex', SelectionCounter.count);
			}, this);
		},

		increaseSelectionCounter: function () {
			if (this.active) {
				SelectionCounter.count++;
			}
		},

		render: function () {

			if (this.active) {

				this.renderInfoView();
				this.renderStageView();

				this.compensateHeights();

				// adjust height on resize
				var self = this;
				$(window).resize(function () {
					self.compensateHeights();
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
				$stageContainer = $('<div class="slideContainer">').appendTo($stage);

			this.$stageContainer = $stageContainer;

			this.stageView = new this.stageViewClass({
				model: this.model,
				el: $stageContainer
			});
		},

		renderTimelineView: function () {
			var $timeline = this.$('.note.timeline');

			this.timelineView = new TimelineView({
				collection: this.timelineItemsCollection,
				el: $timeline
			});

		},

		compensateHeights: function () {
			var mainHeight = this.$el.height(),
				timelineHeight = this.$('.note.timeline').height(),
				infoHeight = this.infoView.$el.hiddenHeight();

			this.$stageContainer.css({
				marginTop: infoHeight,

				// add 50 because of timeline bottom height
				height: mainHeight - infoHeight - timelineHeight + 50
			});

			// realign slides
			this.$stageContainer.trigger('align');
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