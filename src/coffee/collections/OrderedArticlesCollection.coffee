define ["underscore", "backbone", "models/OrderedArticleModel"], (_, Backbone, OrderedArticleModel) ->
  "use strict"
  OrderedArticlesCollection = Backbone.Collection.extend(model: OrderedArticleModel)
  OrderedArticlesCollection