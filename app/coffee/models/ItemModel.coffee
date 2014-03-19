define [
  "underscore"
  "backbone"
  "collections/ArticlesCollection"
], (_, Backbone, ArticlesCollection) ->

  ItemModel = Backbone.Model.extend

    idAttribute: "cid"

    defaults:
      chainedArticlesCollection: null

    parse: (response) ->
      if response.hasOwnProperty("chainedArticlesCollection") and response.chainedArticlesCollection isnt null
        response.chainedArticlesCollection = new ArticlesCollection response.chainedArticlesCollection
      response
