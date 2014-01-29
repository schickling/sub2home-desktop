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
      json =
        title: menuBundleModel.get "title"
        smallImage: menuBundleModel.get "smallImage"

      @$el.html @template(json)
