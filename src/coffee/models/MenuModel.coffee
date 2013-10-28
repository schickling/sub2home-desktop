define [
  "underscore"
  "backbone"
  "collections/MenuComponentBlocksCollection"
], (_, Backbone, MenuComponentBlocksCollection) ->

  MenuModel = Backbone.Model.extend

    toJSON: ->
      attributes = _.clone(@attributes)
      attributes.menuComponentBlocksCollection = attributes.menuComponentBlocksCollection.toJSON()  if @get("menuComponentBlocksCollection")
      attributes

    parse: (response) ->
      if response
        if response.hasOwnProperty("menuComponentBlocksCollection") and response.menuComponentBlocksCollection isnt null
          response.menuComponentBlocksCollection = new MenuComponentBlocksCollection(response.menuComponentBlocksCollection,
            parse: true
          )
        response

