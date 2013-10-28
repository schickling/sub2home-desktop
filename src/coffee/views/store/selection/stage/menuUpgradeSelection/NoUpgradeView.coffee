define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/store/selection/stage/menuUpgradeSelection/NoUpgradeTemplate.html"
], ($, _, Backbone, NoUpgradeTemplate) ->

  NoUpgradeView = Backbone.View.extend
    
    #
    #		 * this.model: ordered article model
    #		 
    template: _.template(NoUpgradeTemplate)

    events:
      click: "_resetMenuUpgrade"

    initialize: ->
      @_render()

    _render: ->
      articleModel = @model.get("articleModel")
      json =
        currentArticleImage: articleModel.get("largeImage")
        currentArticleTitle: articleModel.get("title")

      @$el.html @template(json)
      @$el.attr "id", "noUpgrade"

    _resetMenuUpgrade: ->
      @model.set "menuUpgradeModel", null
      @model.get("orderedItemModel").reduceOrderedArticles()

