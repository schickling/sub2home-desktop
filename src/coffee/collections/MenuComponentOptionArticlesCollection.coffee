define ["underscore", "backbone", "models/MenuComponentOptionArticleModel"], (_, Backbone, MenuComponentOptionArticleModel) ->
  "use strict"
  MenuComponentOptionArticlesCollection = Backbone.Collection.extend(model: MenuComponentOptionArticleModel)
  MenuComponentOptionArticlesCollection