define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/store/dashboard/details/InfoListItemTemplate.html"
], ($, _, Backbone, InfoListItemTemplate) ->

  InfoView = Backbone.View.extend

    template: _.template(InfoListItemTemplate)
    tagName: 'li'

    initialize: ->
      @_render()

    _render: ->
      json =
        isMenu: @model.isMenu()
        itemTitle: @_getItemTitle()
        itemString: @_getItemString()
        itemTotal: @model.get "total"

      @$el.html @template(json)

    _getItemTitle: ->
      if @model.isMenu()
        @model.getMenuTitle()
      else
        orderedArticleModel = @model.get("orderedArticlesCollection").first()
        articleModel = orderedArticleModel.get "articleModel"
        articleModel.get "title"

    _getItemString: ->
      '<span class="cat">Subs</span> Tuna 6-inch <span class="extra">ExBc</span> <span class="extra">ExBc</span>'
