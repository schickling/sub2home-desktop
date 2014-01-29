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
      menuBundleModel = @model.get "menuBundleModel"

      title = "Wähle deinen Artikel"
      smallImage = ""

      if menuBundleModel
        title = menuBundleModel.get "title"
        smallImage = menuBundleModel.get "smallImage"

      json =
        title: title
        smallImage: smallImage

      @$el.html @template(json)
