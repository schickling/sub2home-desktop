define [
  "jquery"
  "underscore"
  "backbone"
  "text!templates/store/selection/stage/menuUpgradeSelection/MenuComponentBlockTemplate.html"
], ($, _, Backbone, MenuComponentBlockTemplate) ->

  MenuComponentBlockView = Backbone.View.extend

    className: "menuComponentBlock"

    template: _.template(MenuComponentBlockTemplate)

    initialize: ->
      @_render()

    _render: ->
      menuComponentBlockMediaModel = @model.get("menuComponentBlockMediaModel")
      json =
        title: @_getComposedTitle()
        image: menuComponentBlockMediaModel.get("largeImage")

      @$el.html @template(json)
      @$el.addClass menuComponentBlockMediaModel.get("placeholder")

    _getComposedTitle: ->
      menuComponentOptionsCollection = @model.get("menuComponentOptionsCollection")
      composedTitle = ""
      menuComponentOptionTitle = undefined
      i = 0

      while i < menuComponentOptionsCollection.length
        menuComponentOptionTitle = menuComponentOptionsCollection.models[i].get("title")
        if i is menuComponentOptionsCollection.length - 1 # if last
          composedTitle += menuComponentOptionTitle
        else if i is menuComponentOptionsCollection.length - 2 # if penultimate
          composedTitle += menuComponentOptionTitle + " oder "
        else
          composedTitle += menuComponentOptionTitle + ", "
        i++
      composedTitle

