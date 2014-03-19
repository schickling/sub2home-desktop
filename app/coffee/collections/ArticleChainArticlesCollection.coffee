define ["underscore", "backbone", "models/ArticleChainArticleModel"], (_, Backbone, ArticleChainArticleModel) ->

  ArticleChainArticlesCollection = Backbone.Collection.extend

    model: ArticleChainArticleModel