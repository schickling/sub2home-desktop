define ["underscore", "backbone", "models/ArticleModel"], (_, Backbone, ArticleModel) ->

  ArticlesCollection = Backbone.Collection.extend(model: ArticleModel)
  ArticlesCollection