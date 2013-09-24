define ["underscore", "backbone", "models/ArticleModel"], (_, Backbone, ArticleModel) ->
  "use strict"
  ArticlesCollection = Backbone.Collection.extend(model: ArticleModel)
  ArticlesCollection