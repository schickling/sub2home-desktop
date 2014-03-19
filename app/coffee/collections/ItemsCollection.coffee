define ["underscore", "backbone", "models/ItemModel"], (_, Backbone, ItemModel) ->

  ItemsCollection = Backbone.Collection.extend

    model: ItemModel