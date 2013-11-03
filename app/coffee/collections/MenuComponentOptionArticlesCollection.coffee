define ["underscore", "backbone", "models/MenuComponentOptionArticleModel"], (_, Backbone, MenuComponentOptionArticleModel) ->

  MenuComponentOptionArticlesCollection = Backbone.Collection.extend

    model: MenuComponentOptionArticleModel