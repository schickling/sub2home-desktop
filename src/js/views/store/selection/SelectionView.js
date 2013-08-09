// Filename: src/js/views/store/selection/SelectionView.js
define([
    'jquery',
    'jqueryHiddenHeight',
    'underscore',
    'backbone',
    'collections/TimelineItemsCollection',
    'views/store/selection/timeline/TimelineView'
    ], function ($, jqueryHiddenHeight, _, Backbone, TimelineItemsCollection, TimelineView) {

	"use strict";

	// global variable needed for info note sliding
	var selectionViewCounter = 0;


	var SelectionView = Backbone.View.extend({

		/*
		 * this.$el = $('.main')
		 *
		 * this.model = orderedArticle
		 */

		timelineItemsCollection: null,
		timelineElementInsertIndex: null,
		timelineItemInsertIndex: null,

		// subviews
		infoView: null,
		stageView: null,
		timelineView: null,

		// dom
		$slidesWrapper: null,
		$infoWrapper: null,
		$slideContainer: null,
		$stageOverlay: null,

		// backbone class gets set in child classes
		stageViewClass: null,
		infoViewClass: null,

		active: false,

		initialize: function () {

			this.$slidesWrapper = this.options.$slidesWrapper;
			this.$infoWrapper = this.options.$infoWrapper;
			this.timelineElementInsertIndex = this.options.timelineElementInsertIndex;
			this.timelineItemInsertIndex = this.options.timelineItemInsertIndex;

			// initialize timelineItemsCollection
			this.timelineItemsCollection = new TimelineItemsCollection();

			// prepare data
			this._prepare();

			this._cacheDom();

			this._render();

			// append timelineitems from prepare to ordereditem
			this._deliverTimelineItems();

			// increase selection counter
			this._increaseSelectionCounter();

			this._listenForDestory();

		},

		_prepare: function () {},

		_deliverTimelineItems: function () {
			var orderedItemModel = this.model.get('orderedItemModel'),
				timelineItemsCollectionOfOrderedItemModel = orderedItemModel.get('timelineItemsCollection');

			timelineItemsCollectionOfOrderedItemModel.add(this.timelineItemsCollection.models, {
				at: this.timelineItemInsertIndex
			});

			// append selection index to all items for info switching
			_.each(this.timelineItemsCollection.models, function (timelineItemModel) {
				timelineItemModel.set('selectionIndex', selectionViewCounter);
			}, this);
		},

		_reclaimTimelineItems: function () {
			var orderedItemModel = this.model.get('orderedItemModel'),
				timelineItemsCollectionOfOrderedItemModel = orderedItemModel.get('timelineItemsCollection');

			timelineItemsCollectionOfOrderedItemModel.remove(this.timelineItemsCollection.models);
		},

		_increaseSelectionCounter: function () {
			selectionViewCounter++;
		},

		_cacheDom: function () {
			this.$stageOverlay = this.$('#overlay');
		},

		_render: function () {

			this._renderTimelineView();

			if (this.active) {

				this._renderInfoView();
				this._renderStageView();

				this._compensateSize();

				// adjust height on resize
				var self = this;
				$(window).resize(function () {
					self._compensateSize();
				});

			}

		},

		_renderInfoView: function () {
			this.infoView = new this.infoViewClass({
				model: this.model,
				// needed to stop listeners
				selectionView: this,
				el: this.$infoWrapper,
			});
		},

		_renderStageView: function () {
			var $slideContainer = $('<div class="slideContainer">');

			$slideContainer.appendTo(this.$slidesWrapper);

			this.$slideContainer = $slideContainer;

			this.stageView = new this.stageViewClass({
				model: this.model,
				// needed to stop listeners
				selectionView: this,
				el: $slideContainer
			});
		},

		_renderTimelineView: function () {
			var $timeline = this.$('#timelineNote');

			this.timelineView = new TimelineView({
				collection: this.timelineItemsCollection,
				el: $timeline,
				insertIndex: this.timelineElementInsertIndex
			});

		},

		_compensateSize: function () {

			var mainHeight = this.el.offsetHeight,
				timelineHeight = 90,
				infoHeight = this.infoView.$el.hiddenHeight(),
				slideContainerHeight = mainHeight - infoHeight - timelineHeight;

			this.$slideContainer.css({
				marginTop: infoHeight,
				height: slideContainerHeight
			});

			// realign slides
			this.$slideContainer.trigger('align');
		},

		// delegate remove
		_remove: function () {

			if (this.active) {

				this.infoView.remove();
				this.stageView.remove();
				this.timelineView.remove();

			}

			this._reclaimTimelineItems();

			this.stopListening();

		},

		_listenForDestory: function () {
			this.once('destroy', this._remove, this);
		}

	});

	return SelectionView;

});