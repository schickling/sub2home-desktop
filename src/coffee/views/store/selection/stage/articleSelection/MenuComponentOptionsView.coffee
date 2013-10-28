define ["jquery", "jqueryLazyload", "underscore", "backbone", "views/store/selection/stage/SlideView", "views/store/selection/stage/articleSelection/MenuComponentOptionView"], ($, jqueryLazyload, _, Backbone, SlideView, MenuComponentOptionView) ->

  MenuComponentOptionsView = SlideView.extend

    afterInitialize: ->
      @$el.addClass "menuComponentOptions"
      menuComponentBlockModel = @model.get("menuComponentBlockModel")
      @collection = menuComponentBlockModel.get("menuComponentOptionsCollection")
      @_render()
      @_listenForArticleSelection()
      @_listenForDestory()

    _render: ->
      @_renderMenuComponentOptions()
      @$el.addClass "noFlag"  if @collection.length is 1
      @$el.lazyload()

    _renderMenuComponentOptions: ->
      _.each @collection.models, ((menuComponentOptionModel) ->
        @_renderMenuComponentOption menuComponentOptionModel
      ), this

    _renderMenuComponentOption: (menuComponentOptionModel) ->
      menuComponentOptionView = new MenuComponentOptionView(
        model: menuComponentOptionModel
        orderedArticleModel: @model
        selectionView: @options.selectionView
      )
      @$el.append menuComponentOptionView.el

    _listenForArticleSelection: ->
      menuComponentOptionsCollection = @collection
      self = this

      # unmark other articles if one gets isSelected
      _.each menuComponentOptionsCollection.models, (menuComponentOptionModel) ->
        menuComponentOptionArticlesCollection = menuComponentOptionModel.get("menuComponentOptionArticlesCollection")
        _.each menuComponentOptionArticlesCollection.models, (menuComponentOptionArticleModel) ->
          self.listenTo menuComponentOptionArticleModel, "change:isSelected", ->
            if menuComponentOptionArticleModel.get("isSelected")
              _.each menuComponentOptionsCollection.models, (menuComponentOptionModelToFilter) ->
                menuComponentOptionArticlesCollectionToFilter = menuComponentOptionModel.get("menuComponentOptionArticlesCollection")
                _.each menuComponentOptionArticlesCollectionToFilter.models, (menuComponentOptionArticleModelToFilter) ->
                  menuComponentOptionArticleModelToFilter.set "isSelected", false  if menuComponentOptionArticleModelToFilter.get("isSelected") and menuComponentOptionArticleModelToFilter isnt menuComponentOptionArticleModel


    # end listenTo
    _listenForDestory: ->
      @options.selectionView.once "destroy", @stopListening, this
