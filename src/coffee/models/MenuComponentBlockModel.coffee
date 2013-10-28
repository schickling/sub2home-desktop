define [
  "underscore"
  "backbone"
  "models/MenuComponentBlockMediaModel"
  "collections/MenuComponentOptionsCollection"
], (_, Backbone, MenuComponentBlockMediaModel, MenuComponentOptionsCollection) ->

  MenuComponentBlockModel = Backbone.Model.extend

    defaults:
      menuComponentOptionsCollection: null

    toJSON: ->
      attributes = _.clone(@attributes)
      attributes.menuComponentOptionsCollection = attributes.menuComponentOptionsCollection.toJSON()  if @get("menuComponentOptionsCollection")
      attributes.menuComponentBlockMediaModel = attributes.menuComponentBlockMediaModel.toJSON()  if @get("menuComponentBlockMediaModel")
      attributes

    parse: (response) ->
      if response.hasOwnProperty("menuComponentOptionsCollection") and response.menuComponentOptionsCollection isnt null
        response.menuComponentOptionsCollection = new MenuComponentOptionsCollection(response.menuComponentOptionsCollection,
          parse: true
        )
      response.menuComponentBlockMediaModel = new MenuComponentBlockMediaModel(response.menuComponentBlockMediaModel)  if response.hasOwnProperty("menuComponentBlockMediaModel") and response.menuComponentBlockMediaModel isnt null
      response