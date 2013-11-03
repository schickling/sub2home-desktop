define [
  "underscore"
  "backbone"
], (_, Backbone) ->

  MenuComponentOptionArticleModel = Backbone.Model.extend

    defaults:
      title: ""
      image: ""
      description: ""
      info: ""
      isSelected: false

