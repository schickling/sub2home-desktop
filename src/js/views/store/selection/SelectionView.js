define(["jquery", "jqueryHiddenHeight", "underscore", "backbone", "collections/TimelineItemsCollection", "views/store/selection/timeline/TimelineView"], function($, jqueryHiddenHeight, _, Backbone, TimelineItemsCollection, TimelineView) {
  var SelectionView, selectionViewCounter;
  selectionViewCounter = 0;
  return SelectionView = Backbone.View.extend({
    timelineItemsCollection: null,
    timelineElementInsertIndex: null,
    timelineItemInsertIndex: null,
    infoView: null,
    stageView: null,
    timelineView: null,
    $slidesWrapper: null,
    $infoWrapper: null,
    $slideContainer: null,
    $stageOverlay: null,
    stageViewClass: null,
    infoViewClass: null,
    active: false,
    initialize: function() {
      this.$slidesWrapper = this.options.$slidesWrapper;
      this.$infoWrapper = this.options.$infoWrapper;
      this.timelineElementInsertIndex = this.options.timelineElementInsertIndex;
      this.timelineItemInsertIndex = this.options.timelineItemInsertIndex;
      this.timelineItemsCollection = new TimelineItemsCollection();
      this._prepare();
      this._cacheDom();
      this._render();
      this._deliverTimelineItems();
      this._increaseSelectionCounter();
      return this._listenForDestory();
    },
    _prepare: function() {},
    _deliverTimelineItems: function() {
      var orderedItemModel, timelineItemsCollectionOfOrderedItemModel;
      orderedItemModel = this.model.get("orderedItemModel");
      timelineItemsCollectionOfOrderedItemModel = orderedItemModel.get("timelineItemsCollection");
      timelineItemsCollectionOfOrderedItemModel.add(this.timelineItemsCollection.models, {
        at: this.timelineItemInsertIndex
      });
      return _.each(this.timelineItemsCollection.models, (function(timelineItemModel) {
        return timelineItemModel.set("selectionIndex", selectionViewCounter);
      }), this);
    },
    _reclaimTimelineItems: function() {
      var orderedItemModel, timelineItemsCollectionOfOrderedItemModel;
      orderedItemModel = this.model.get("orderedItemModel");
      timelineItemsCollectionOfOrderedItemModel = orderedItemModel.get("timelineItemsCollection");
      return timelineItemsCollectionOfOrderedItemModel.remove(this.timelineItemsCollection.models);
    },
    _increaseSelectionCounter: function() {
      return selectionViewCounter++;
    },
    _cacheDom: function() {
      return this.$stageOverlay = this.$("#overlay");
    },
    _render: function() {
      var self;
      this._renderTimelineView();
      if (this.active) {
        this._renderInfoView();
        this._renderStageView();
        this._compensateSize();
        self = this;
        return $(window).resize(function() {
          return self._compensateSize();
        });
      }
    },
    _renderInfoView: function() {
      return this.infoView = new this.infoViewClass({
        model: this.model,
        selectionView: this,
        el: this.$infoWrapper
      });
    },
    _renderStageView: function() {
      var $slideContainer;
      $slideContainer = $("<div class=\"slideContainer\">");
      $slideContainer.appendTo(this.$slidesWrapper);
      this.$slideContainer = $slideContainer;
      return this.stageView = new this.stageViewClass({
        model: this.model,
        selectionView: this,
        el: $slideContainer
      });
    },
    _renderTimelineView: function() {
      var $timeline;
      $timeline = this.$("#timelineNote");
      return this.timelineView = new TimelineView({
        collection: this.timelineItemsCollection,
        el: $timeline,
        insertIndex: this.timelineElementInsertIndex
      });
    },
    _compensateSize: function() {
      var infoHeight, mainHeight, slideContainerHeight, timelineHeight;
      mainHeight = this.el.offsetHeight;
      timelineHeight = 90;
      infoHeight = this.infoView.$el.hiddenHeight();
      slideContainerHeight = mainHeight - infoHeight - timelineHeight;
      this.$slideContainer.css({
        marginTop: infoHeight,
        height: slideContainerHeight
      });
      return this.$slideContainer.trigger("align");
    },
    _remove: function() {
      if (this.active) {
        this.infoView.remove();
        this.stageView.remove();
        this.timelineView.remove();
      }
      this._reclaimTimelineItems();
      return this.stopListening();
    },
    _listenForDestory: function() {
      return this.once("destroy", this._remove, this);
    }
  });
});

/*
//@ sourceMappingURL=SelectionView.js.map
*/