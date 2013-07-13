// Filename: src/js/views/store/selection/SelectionView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/TimelineItemsCollection',
    'views/store/selection/timeline/TimelineView'
    ], function ($, _, Backbone, TimelineItemsCollection, TimelineView) {

	"use strict";

	// little hack to get height of hidden dom element
	$.fn.hiddenHeight = function () {
		var $this = $(this),
			currentDisplay = $this.css('display'),
			currentVisibility = $this.css('visibility'),
			height;

		$this.css({
			display: 'block',
			visibility: 'hidden'
		});

		height = $this.height();

		$this.css({
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
		$stageOverlay: null,

		// backbone class gets set in child classes
		stageViewClass: null,
		infoViewClass: null,

		active: false,

		initialize: function () {

			// initialize timelineItemsCollection
			this.timelineItemsCollection = new TimelineItemsCollection();

			// prepare data
			this.prepare();

			this._cacheDom();

			this._render();

			// append timelineitems from prepare to ordereditem
			this._deliverTimelineItems();

			// increase selection counter
			this._increaseSelectionCounter();

			this._listenForDestory();

		},

		prepare: function () {},

		_deliverTimelineItems: function () {
			var orderedItemModel = this.model.get('orderedItemModel'),
				timelineItemsCollectionOfOrderedItemModel = orderedItemModel.get('timelineItemsCollection');

			timelineItemsCollectionOfOrderedItemModel.add(this.timelineItemsCollection.models);

			// append selection index to all items for info switching
			_.each(this.timelineItemsCollection.models, function (timelineItemModel) {
				timelineItemModel.set('selectionIndex', indexOfSelectionView);
			}, this);
		},

		_reclaimTimelineItems: function () {
			var orderedItemModel = this.model.get('orderedItemModel'),
				timelineItemsCollectionOfOrderedItemModel = orderedItemModel.get('timelineItemsCollection');

			timelineItemsCollectionOfOrderedItemModel.remove(this.timelineItemsCollection.models);
		},

		_increaseSelectionCounter: function () {
			if (this.active) {
				indexOfSelectionView++;
			}
		},

		_cacheDom: function() {
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
			var $infoContainer = this.$('#infoContainer');

			this.infoView = new this.infoViewClass({
				model: this.model,
				// needed to stop listeners
				selectionView: this,
				el: $infoContainer
			});
		},

		_renderStageView: function () {
			var $stage = this.$('#stage'),
				$slideContainer = $('<div class="slideContainer">');

			$slideContainer.appendTo($stage);

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
				el: $timeline
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

			this.$stageOverlay.css({
				top: infoHeight + slideContainerHeight / 2
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

				// decrease selection counter
				indexOfSelectionView--;

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