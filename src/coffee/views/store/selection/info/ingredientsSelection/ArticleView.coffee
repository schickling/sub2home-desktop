define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/store/selection/info/ingredientsSelection/ArticleTemplate.html"
], ($, _, Backbone, ArticleTemplate) ->

  ArticleView = Backbone.View.extend

    template: _.template(ArticleTemplate)

    initialize: ->
      @_render()

    _render: ->
      json =
        image: @model.get("largeImage")
        title: @model.get("title")
        info: @model.get("info")
        description: @model.get("description")

      @$el.html @template(json)
      @$el.addClass @_getImageClass()

    _getImageClass: ->
      image = @model.get("largeImage")
      imageWithoutFileExtension = image.substr(0, image.lastIndexOf("."))
      imageWithoutFileExtension.split("-").pop() or ""
