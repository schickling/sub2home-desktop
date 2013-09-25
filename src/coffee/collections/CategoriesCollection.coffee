define ["underscore", "backbone", "models/CategoryModel"], (_, Backbone, CategoryModel) ->

  CategoriesCollection = Backbone.Collection.extend

    model: CategoryModel

    url: "stores/storeAlias/categories"
