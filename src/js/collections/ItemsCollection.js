(function() {
  define(["underscore", "backbone", "models/ItemModel", "collections/ItemsCollection"], function(_, Backbone, ItemModel) {
    "use strict";
    var ItemsCollection;
    ItemsCollection = Backbone.Collection.extend({
      model: ItemModel,
      groupItems: function() {
        var attachedItemsCollection, currentItemModel, currentRelatedItemModel, i, j, relatedItemModels, savedCounter, _i, _j, _ref, _ref1, _results;
        currentItemModel = void 0;
        relatedItemModels = void 0;
        savedCounter = void 0;
        currentRelatedItemModel = void 0;
        attachedItemsCollection = void 0;
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
            for (j = _j = 0, _ref1 = relatedItemModels.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
              attachedItemsCollection.add(relatedItemModels[j]);
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
