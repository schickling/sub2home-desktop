define ["jquery", "underscore", "backbone", "views/store/selection/stage/articleSelection/MenuComponentOptionArticleView"], ($, _, Backbone, MenuComponentOptionArticleView) ->

  MenuComponentOptionArticlesView = Backbone.View.extend

    initialize: ->
      @_render()

    _render: ->
      _.each @collection.models, ((menuComponentOptionArticleModel) ->
        @_renderArticle menuComponentOptionArticleModel
      ), this

    _renderArticle: (menuComponentOptionArticleModel) ->
      menuComponentOptionArticleView = new MenuComponentOptionArticleView(
        model: menuComponentOptionArticleModel
        orderedArticleModel: @options.orderedArticleModel
        selectionView: @options.selectionView
      )
      @$el.append menuComponentOptionArticleView.el
