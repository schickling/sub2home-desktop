(function() {
  define(["underscore", "backbone", "models/ItemModel", "collections/ItemsCollection"], function(_, Backbone, ItemModel) {
    "use strict";
    var ItemsCollection;
    ItemsCollection = Backbone.Collection.extend({
      model: ItemModel,
      groupItems: function() {
        var attachedItemsCollection, currentItemModel, currentRelatedItemModel, i, relatedItemModel, relatedItemModels, savedCounter, _i, _j, _len, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = this.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          currentItemModel = this.models[i];
          relatedItemModels = [];
          savedCounter = i;
          while (++i < this.length) {
            currentRelatedItemModel = this.models[i];
            if (currentRelatedItemModel.get("title") === currentItemModel.get("title")) {
              currentRelatedItemModel.set("isAttached", true);
              relatedItemModels.push(currentRelatedItemModel);
            } else {
              break;
            }
          }
          if (relatedItemModels.length > 0) {
            attachedItemsCollection = new ItemsCollection();
            for (_j = 0, _len = relatedItemModels.length; _j < _len; _j++) {
              relatedItemModel = relatedItemModels[_j];
              attachedItemsCollection.add(relatedItemModel);
            }
            currentItemModel.set("attachedItemsCollection", attachedItemsCollection);
          }
          i = savedCounter;
          _results.push(i++);
        }
        return _results;
      }
    });
    return ItemsCollection;
  });

}).call(this);
