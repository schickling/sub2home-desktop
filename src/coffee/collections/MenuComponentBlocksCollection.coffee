define ["underscore", "backbone", "models/MenuComponentBlockModel"], (_, Backbone, MenuComponentBlockModel) ->

  MenuComponentBlocksCollection = Backbone.Collection.extend(model: MenuComponentBlockModel)
  MenuComponentBlocksCollection