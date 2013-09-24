define ["underscore", "backbone", "models/CategoryModel"], (_, Backbone, CategoryModel) ->
  "use strict"
  CategoriesCollection = Backbone.Collection.extend(
    model: CategoryModel
    url: ->
      "stores/storeAlias/categories"
  )
  CategoriesCollection