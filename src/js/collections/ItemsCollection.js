// Filename: src/js/collections/ItemsCollection.js
define([
	'underscore',
	'backbone',
	'models/ItemModel',
	'collections/ItemsCollection'
	], function (_, Backbone, ItemModel) {

	"use strict";

	var ItemsCollection = Backbone.Collection.extend({

		model: ItemModel,

		groupItems: function () {
			var currentItemModel, relatedItemModels, savedCounter, currentRelatedItemModel, attachedItemsCollection;

			for (var i = 0; i < this.length; i++) {
				currentItemModel = this.models[i];
				relatedItemModels = [];
				savedCounter = i;

				while (++i < this.length) {
					currentRelatedItemModel = this.models[i];
					if (currentRelatedItemModel.get('title') === currentItemModel.get('title')) {
						currentRelatedItemModel.set('isAttached', true);
						relatedItemModels.push(currentRelatedItemModel);
					} else {
						break;
					}
				}

				if (relatedItemModels.length > 0) {

					attachedItemsCollection = new ItemsCollection();

					for (var j = 0; j < relatedItemModels.length; j++) {
						attachedItemsCollection.add(relatedItemModels[j]);
					}

					currentItemModel.set('attachedItemsCollection', attachedItemsCollection);

				}

				// reset counter
				i = savedCounter;
			}
		}

	});

	return ItemsCollection;
});