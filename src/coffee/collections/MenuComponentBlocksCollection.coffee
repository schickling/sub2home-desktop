define ["underscore", "backbone", "models/MenuComponentBlockModel"], (_, Backbone, MenuComponentBlockModel) ->
  "use strict"
  MenuComponentBlocksCollection = Backbone.Collection.extend(model: MenuComponentBlockModel)
  MenuComponentBlocksCollection