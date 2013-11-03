define [
  "jquery"
  "underscore"
  "backbone"
  "services/imageSuffixer"
  "text!templates/store/selection/info/ingredientsSelection/ArticleTemplate.html"
], ($, _, Backbone, imageSuffixer, ArticleTemplate) ->

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
      @$el.addClass imageSuffixer.getClass(@model.get("largeImage"))
