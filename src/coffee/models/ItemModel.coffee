define [
  "underscore"
  "backbone"
], (_, Backbone) ->

  ItemModel = Backbone.Model.extend

    idAttribute: "cid"

    defaults:
      attachedItemsCollection: null
      isAttached: false

