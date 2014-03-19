define [
  "underscore"
  "backbone"
  "models/ArticleModel"
  "collections/ArticlesCollection"
  "collections/ItemsCollection"
], (_, Backbone, ArticleModel, ArticlesCollection, ItemsCollection) ->

  CategoryModel = Backbone.Model.extend

    defaults:
      itemsCollection: null
      smallImage: ""
      icon: ""

    parse: (response) ->
      if response.hasOwnProperty("itemsCollection")
        response.itemsCollection = new ItemsCollection response.itemsCollection, parse: true
      if response.hasOwnProperty("articlesCollection")
        response.articlesCollection = new ArticlesCollection response.articlesCollection, parse: true
      response
