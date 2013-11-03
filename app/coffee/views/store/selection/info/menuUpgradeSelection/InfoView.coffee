define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/selection/info/InfoBaseView"
  "text!templates/store/selection/info/menuUpgradeSelection/InfoTemplate.html"
], ($, _, Backbone, InfoBaseView, InfoTemplate) ->

  InfoView = InfoBaseView.extend
  	template: _.template(InfoTemplate)

