define [
  "jquery"
  "underscore"
  "backbone"
  "services/notificationcenter"
  "text!templates/store/assortment/articles/ChainedArticleTemplate.html"
], ($, _, Backbone, notificationcenter, ChainedArticleTemplate) ->

  ChainedArticleView = Backbone.View.extend

    template: _.template(ChainedArticleTemplate)

    className: "chainedArticle"

    events:
      "click .bEye": "_toggleIsActive"

    initialize: ->
      @_render()

    _render: ->
      json =
        isActive: @model.get "isActive"
        title: @model.get "title"
        info: @model.get "info"
        image: @model.get "smallImage"
      @$el.html @template(json)

    _toggleIsActive: ->
      $eye = @$(".bEye")
      isActive = not @model.get("isActive")
      @model.set "isActive", isActive
      @model.save {},
        success: =>
          $eye.toggleClass "open", isActive
          @$el.toggleClass "inactive", not isActive
          if isActive
            notificationcenter.notify "views.store.assortment.items.success.isActive"
          else
            notificationcenter.notify "views.store.assortment.items.success.isNotActive"

        error: =>
          notificationcenter.notify "views.store.assortment.articles.error"
          @model.set "isActive", not isActive