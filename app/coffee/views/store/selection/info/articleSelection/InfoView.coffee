define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/selection/info/InfoBaseView"
  "text!templates/store/selection/info/articleSelection/InfoTemplate.html"
], ($, _, Backbone, InfoBaseView, InfoTemplate) ->

  InfoView = InfoBaseView.extend

    template: _.template(InfoTemplate)

    renderContent: ->
      menuModel = @model.get("menuBundleModel") || @model.get("menuUpgradeModel")
      json =
        title: menuModel.get "title" || ""
        smallImage: menuModel.get "smallImage" || ""

      @$el.html @template(json)
