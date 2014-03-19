define [
  "underscore"
  "backbone"
], (_, Backbone) ->

  ArticleChainArticleModel = Backbone.Model.extend

    urlRoot: "stores/storeAlias/articles/"

