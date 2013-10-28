define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/selection/ArticleSelectionView"
  "views/store/selection/IngredientsSelectionView"
  "views/store/selection/MenuUpgradeSelectionView"
], ($, _, Backbone, ArticleSelectionView, IngredientsSelectionView, MenuUpgradeSelectionView) ->

  OrderedArticleView = Backbone.View.extend

    #
    #		 * this.$el = $('.main')
    #		 *
    #		 * this.model = orderedArticle
    #
    articleSelectionView: null
    ingredientsSelectionView: null
    menuUpgradeSelectionView: null
    parentView: null
    $slidesWrapper: null
    $infoWrapper: null

    initialize: ->
      @parentView = @options.parentView
      @_render()

      # remove view if model was destoryed
      @listenTo @model, "destroy", @_remove
      @listenTo @model, "articleModelWasSelected", @_renderIngredientsSelectionAgain
      @_listenForDestory()

    _render: ->
      @_createWrapperElements()
      @_renderArticleSelection()
      @_renderIngredientsSelection()
      @_renderMenuUpgradeSelection()

    _createWrapperElements: ->
      @_createContentWrapper()
      @_createInfoWrapper()

    _createContentWrapper: ->
      $stage = @$("#stage")
      $slidesWrapper = $("<div class=\"slidesWrapper\">")
      $stage.append $slidesWrapper
      @$slidesWrapper = $slidesWrapper

    _createInfoWrapper: ->
      $infoContainer = @$("#infoContainer")
      $infoWrapper = $("<div class=\"infoWrapper\">")
      $infoContainer.append $infoWrapper
      @$infoWrapper = $infoWrapper

    _renderArticleSelection: ->
      @articleSelectionView = new ArticleSelectionView(
        model: @model
        el: @$el
        $slidesWrapper: @$slidesWrapper
        $infoWrapper: @$infoWrapper
      )

    _renderIngredientsSelection: (timelineElementInsertIndex, timelineItemInsertIndex) ->
      @ingredientsSelectionView = new IngredientsSelectionView(
        model: @model
        el: @$el
        $slidesWrapper: @$slidesWrapper
        $infoWrapper: @$infoWrapper
        timelineElementInsertIndex: timelineElementInsertIndex
        timelineItemInsertIndex: timelineItemInsertIndex
      )

    _renderMenuUpgradeSelection: ->
      @menuUpgradeSelectionView = new MenuUpgradeSelectionView(
        model: @model
        el: @$el
        $slidesWrapper: @$slidesWrapper
        $infoWrapper: @$infoWrapper
      )

    _renderIngredientsSelectionAgain: ->
      $prevSlidesWrappers = @$slidesWrapper.prevAll()
      timelineElementInsertIndex = $prevSlidesWrappers.children(".slideContainer").length + 1
      timelineItemInsertIndex = $prevSlidesWrappers.find(".slide").length + 1
      if @model.isMenuUpgradeBase()
        timelineElementInsertIndex++
        timelineItemInsertIndex++
      @ingredientsSelectionView.trigger "destroy"
      @_renderIngredientsSelection timelineElementInsertIndex, timelineItemInsertIndex

    _remove: ->
      @articleSelectionView.trigger "destroy"
      @ingredientsSelectionView.trigger "destroy"
      @menuUpgradeSelectionView.trigger "destroy"

    _listenForDestory: ->
      @parentView.once "destroy", (->
        @stopListening()
        @_remove()
      ), this


