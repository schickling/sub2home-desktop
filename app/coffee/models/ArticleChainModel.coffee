define [
  "underscore"
  "backbone"
  "collections/ArticleChainArticlesCollection"
], (_, Backbone, ArticleChainArticlesCollection) ->

  ArticleChainModel = Backbone.Model.extend

    defaults:
      title: ""
      articlesCollection: null

    parse: (response) ->
      if response.hasOwnProperty("articlesCollection") and response.articlesCollection isnt null
        response.articlesCollection = new ArticleChainArticlesCollection response.articlesCollection
      response