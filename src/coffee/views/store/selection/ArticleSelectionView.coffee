define ["jquery", "underscore", "backbone", "models/TimelineItemModel", "views/store/selection/info/articleSelection/InfoView", "views/store/selection/SelectionView", "views/store/selection/stage/articleSelection/MenuComponentOptionsView"], ($, _, Backbone, TimelineItemModel, InfoView, SelectionView, MenuComponentOptionsView) ->

  ArticleSelectionView = SelectionView.extend

    #
    #    * this.$el = $('.main')
    #    *
    #    * this.model = orderedArticle
    #
    className: "articleSelection"

    stageViewClass: MenuComponentOptionsView

    infoViewClass: InfoView

    clickLocked: false

    _prepare: ->
      timelineItemModel = new TimelineItemModel()
      menuComponentBlockModel = @model.get("menuComponentBlockModel")
      articleModel = @model.get("articleModel")
      if menuComponentBlockModel
        @active = true
        menuComponentBlockMediaModel = menuComponentBlockModel.get("menuComponentBlockMediaModel")
        timelineItemModel.set
          isLocked: articleModel is null
          icon: menuComponentBlockMediaModel.get("icon")
          image: menuComponentBlockMediaModel.get("smallImage")
          phrase: @_getTitle()

        @_listenForArticleSelection()
      else

        # just symbolizes base article
        timelineItemModel.set
          isDisabled: true
          wasVisited: true
          image: articleModel.get("smallImage")

      @timelineItemsCollection.add timelineItemModel

    _listenForArticleSelection: ->
      orderedArticleModel = @model
      menuComponentBlockModel = orderedArticleModel.get("menuComponentBlockModel")
      menuComponentOptionsCollection = menuComponentBlockModel.get("menuComponentOptionsCollection")
      timelineItemsCollection = @timelineItemsCollection
      timelineItemModel = undefined
      menuComponentOptionArticlesCollection = undefined
      _.each menuComponentOptionsCollection.models, ((menuComponentOptionModel) ->
        menuComponentOptionArticlesCollection = menuComponentOptionModel.get("menuComponentOptionArticlesCollection")
        _.each menuComponentOptionArticlesCollection.models, ((menuComponentOptionArticleModel) ->
          @listenTo menuComponentOptionArticleModel, "change:isSelected", ->
            if menuComponentOptionArticleModel.get("isSelected")
              timelineItemModel = timelineItemsCollection.first()
              timelineItemModel.set "isLocked", false
              orderedArticleModel.trigger "articleModelWasSelected"

        ), this
      ), this

    _getTitle: ->
      menuComponentBlockModel = @model.get("menuComponentBlockModel")
      menuComponentOptionsCollection = menuComponentBlockModel.get("menuComponentOptionsCollection")
      menuComponentOptionTitle = undefined
      title = ""
      title = "Wähle dein "  if menuComponentOptionsCollection.length is 1
      _.each menuComponentOptionsCollection.models, (menuComponentOptionModel, index) ->
        menuComponentOptionTitle = menuComponentOptionModel.get("title")
        if index is 0
          title += menuComponentOptionTitle
        else if index is (menuComponentOptionsCollection.length - 1)
          title += " oder " + menuComponentOptionTitle
        else
          title += ", " + menuComponentOptionTitle

      title
