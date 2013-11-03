define ["underscore", "backbone", "models/MenuComponentOptionModel"], (_, Backbone, MenuComponentOptionModel) ->

  MenuComponentOptionsCollection = Backbone.Collection.extend

    model: MenuComponentOptionModel

