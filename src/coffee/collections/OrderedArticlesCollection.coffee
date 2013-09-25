define ["underscore", "backbone", "models/OrderedArticleModel"], (_, Backbone, OrderedArticleModel) ->


  OrderedArticlesCollection = Backbone.Collection.extend(model: OrderedArticleModel)
  OrderedArticlesCollection