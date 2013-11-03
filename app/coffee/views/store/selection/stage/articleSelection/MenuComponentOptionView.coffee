define ["jquery", "underscore", "backbone", "views/store/selection/stage/articleSelection/MenuComponentOptionArticlesView", "text!templates/store/selection/stage/articleSelection/MenuComponentOptionTemplate.html"], ($, _, Backbone, MenuComponentOptionArticlesView, MenuComponentOptionTemplate) ->

  MenuComponentOptionView = Backbone.View.extend

    className: "menuComponentOption"

    template: _.template(MenuComponentOptionTemplate)

    initialize: ->
      @orderedArticleModel = @options.orderedArticleModel
      @_render()

    _render: ->
      @$el.html @template(@model.toJSON())
      menuComponentOptionArticlesView = new MenuComponentOptionArticlesView(
        collection: @model.get("menuComponentOptionArticlesCollection")
        orderedArticleModel: @orderedArticleModel
        el: @$(".articles")
        selectionView: @options.selectionView
      )
      this
