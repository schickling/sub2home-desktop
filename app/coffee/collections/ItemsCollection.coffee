define ["underscore", "backbone", "models/ItemModel"], (_, Backbone, ItemModel) ->

  ItemsCollection = Backbone.Collection.extend

    model: ItemModel

    groupItems: ->

      for i in [0..@length-1]
        currentItemModel = @models[i]
        relatedItemModels = []
        savedCounter = i

        while ++i < @length
          currentRelatedItemModel = @models[i]
          if currentRelatedItemModel.get("title") is currentItemModel.get("title")
            currentRelatedItemModel.set "isAttached", true
            relatedItemModels.push currentRelatedItemModel
          else
            break

        if relatedItemModels.length > 0
          attachedItemsCollection = new ItemsCollection()

          for relatedItemModel in relatedItemModels
            attachedItemsCollection.add relatedItemModel

          currentItemModel.set "attachedItemsCollection", attachedItemsCollection

        # reset counter
        i = savedCounter
        i++
