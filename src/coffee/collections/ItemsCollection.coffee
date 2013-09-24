define ["underscore", "backbone", "models/ItemModel", "collections/ItemsCollection"], (_, Backbone, ItemModel) ->
  "use strict"
  ItemsCollection = Backbone.Collection.extend(
    model: ItemModel
    groupItems: ->
      currentItemModel = undefined
      relatedItemModels = undefined
      savedCounter = undefined
      currentRelatedItemModel = undefined
      attachedItemsCollection = undefined
      
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
         
          for j in [0..relatedItemModels.length-1]
            attachedItemsCollection.add relatedItemModels[j]
            
          currentItemModel.set "attachedItemsCollection", attachedItemsCollection
        
        # reset counter
        i = savedCounter
        i++
  )
  ItemsCollection
