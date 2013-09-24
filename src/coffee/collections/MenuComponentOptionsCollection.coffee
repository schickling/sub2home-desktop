define ["underscore", "backbone", "models/MenuComponentOptionModel"], (_, Backbone, MenuComponentOptionModel) ->
  "use strict"
  MenuComponentOptionsCollection = Backbone.Collection.extend(model: MenuComponentOptionModel)
  MenuComponentOptionsCollection
