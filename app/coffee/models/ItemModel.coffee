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
      if response.hasOwnProperty("chainedArticlesCollection")
        response.chainedArticlesCollection = new ArticlesCollection(response.chainedArticlesCollection)
      response
