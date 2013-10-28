define [
  "jquery"
  "jqueryHiddenHeight"
  "underscore"
  "backbone"
  "collections/TimelineItemsCollection"
  "views/store/selection/timeline/TimelineView"
], ($, jqueryHiddenHeight, _, Backbone, TimelineItemsCollection, TimelineView) ->

  # global variable needed for info note sliding
  selectionViewCounter = 0

  SelectionView = Backbone.View.extend

    #
    #		 * this.$el = $('.main')
    #		 *
    #		 * this.model = orderedArticle
    #
    timelineItemsCollection: null
    timelineElementInsertIndex: null
    timelineItemInsertIndex: null

    # subviews
    infoView: null
    stageView: null
    timelineView: null

    # dom
    $slidesWrapper: null
    $infoWrapper: null
    $slideContainer: null
    $stageOverlay: null

    # backbone class gets set in child classes
    stageViewClass: null
    infoViewClass: null
    active: false
    initialize: ->
      @$slidesWrapper = @options.$slidesWrapper
      @$infoWrapper = @options.$infoWrapper
      @timelineElementInsertIndex = @options.timelineElementInsertIndex
      @timelineItemInsertIndex = @options.timelineItemInsertIndex

      # initialize timelineItemsCollection
      @timelineItemsCollection = new TimelineItemsCollection()

      # prepare data
      @_prepare()
      @_cacheDom()
      @_render()

      # append timelineitems from prepare to ordereditem
      @_deliverTimelineItems()

      # increase selection counter
      @_increaseSelectionCounter()
      @_listenForDestory()

    _prepare: ->

    _deliverTimelineItems: ->
      orderedItemModel = @model.get("orderedItemModel")
      timelineItemsCollectionOfOrderedItemModel = orderedItemModel.get("timelineItemsCollection")
      timelineItemsCollectionOfOrderedItemModel.add @timelineItemsCollection.models,
        at: @timelineItemInsertIndex


      # append selection index to all items for info switching
      _.each @timelineItemsCollection.models, ((timelineItemModel) ->
        timelineItemModel.set "selectionIndex", selectionViewCounter
      ), this

    _reclaimTimelineItems: ->
      orderedItemModel = @model.get("orderedItemModel")
      timelineItemsCollectionOfOrderedItemModel = orderedItemModel.get("timelineItemsCollection")
      timelineItemsCollectionOfOrderedItemModel.remove @timelineItemsCollection.models

    _increaseSelectionCounter: ->
      selectionViewCounter++

    _cacheDom: ->
      @$stageOverlay = @$("#overlay")

    _render: ->
      @_renderTimelineView()
      if @active
        @_renderInfoView()
        @_renderStageView()
        @_compensateSize()

        # adjust height on resize
        self = this
        $(window).resize ->
          self._compensateSize()


    _renderInfoView: ->
      @infoView = new @infoViewClass(
        model: @model

        # needed to stop listeners
        selectionView: this
        el: @$infoWrapper
      )

    _renderStageView: ->
      $slideContainer = $("<div class=\"slideContainer\">")
      $slideContainer.appendTo @$slidesWrapper
      @$slideContainer = $slideContainer
      @stageView = new @stageViewClass(
        model: @model

        # needed to stop listeners
        selectionView: this
        el: $slideContainer
      )

    _renderTimelineView: ->
      $timeline = @$("#timelineNote")
      @timelineView = new TimelineView(
        collection: @timelineItemsCollection
        el: $timeline
        insertIndex: @timelineElementInsertIndex
      )

    _compensateSize: ->
      mainHeight = @el.offsetHeight
      timelineHeight = 90
      infoHeight = @infoView.$el.hiddenHeight()
      slideContainerHeight = mainHeight - infoHeight - timelineHeight
      @$slideContainer.css
        marginTop: infoHeight
        height: slideContainerHeight


      # realign slides
      @$slideContainer.trigger "align"


    # delegate remove
    _remove: ->
      if @active
        @infoView.remove()
        @stageView.remove()
        @timelineView.remove()
      @_reclaimTimelineItems()
      @stopListening()

    _listenForDestory: ->
      @once "destroy", @_remove, this

