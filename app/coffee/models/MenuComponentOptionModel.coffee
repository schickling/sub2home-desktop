define [
  "underscore"
  "backbone"
  "collections/MenuComponentOptionArticlesCollection"
], (_, Backbone, MenuComponentOptionArticlesCollection) ->

  MenuComponentOptionModel = Backbone.Model.extend

    defaults:
      menuComponentOptionArticlesCollection: null

    toJSON: ->
      attributes = _.clone(@attributes)
      attributes.menuComponentOptionArticlesCollection = attributes.menuComponentOptionArticlesCollection.toJSON()  if @get("menuComponentOptionArticlesCollection")
      delete attributes.orderedItemModel

      attributes

    parse: (response) ->
      if response.hasOwnProperty("menuComponentOptionArticlesCollection") and response.menuComponentOptionArticlesCollection isnt null
        response.menuComponentOptionArticlesCollection = new MenuComponentOptionArticlesCollection(response.menuComponentOptionArticlesCollection,
          parse: true
        )
      response

