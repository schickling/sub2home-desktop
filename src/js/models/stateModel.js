define(["underscore", "backbone", "backboneLocalStorage", "models/StoreModel", "services/server"], function(_, Backbone, backboneLocalStorage, StoreModel, server) {
  var StateModel;
  StateModel = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage("StateModel"),
    defaults: {
      id: 0,
      storeAlias: "",
      storeModel: null,
      changedStore: false,
      storeFetchDate: null,
      isClientHeaderActive: false,
      currentRoute: "",
      prevRoute: ""
    },
    initialize: function() {
      var minimumFetchTimestamp, needsRefetch, realFetchDate, storeModel;
      server.initialize();
      this.fetch();
      storeModel = this.get("storeModel");
      if (storeModel) {
        this._listenForStoreInternalChanges();
      }
      this.on("change", (function() {
        this.save({}, {
          silent: true
        });
        return this._setStoreAliasForServer();
      }), this);
      minimumFetchTimestamp = new Date().getTime() - (3 * 60 * 60 * 1000);
      realFetchDate = this.get("storeFetchDate") || new Date(0);
      needsRefetch = realFetchDate.getTime() < minimumFetchTimestamp;
      if (this.get("storeAlias") !== "") {
        this._fetchStoreModelFromServer();
      }
      this.on("change:currentRoute", (function() {
        return this.set({
          prevRoute: this.previous("currentRoute")
        }, {
          silent: true
        });
      }), this);
      this.on("change:storeAlias", (function() {
        var currentStoreModel;
        currentStoreModel = this.get("storeModel");
        if (!currentStoreModel || this.get("storeAlias") !== currentStoreModel.get("alias")) {
          this._fetchStoreModelFromServer();
        }
        return this.set("isClientHeaderActive", false);
      }), this);
      return this._setStoreAliasForServer();
    },
    toJSON: function() {
      var attributes;
      attributes = _.clone(this.attributes);
      if (attributes.hasOwnProperty("storeModel")) {
        attributes.storeModel = attributes.storeModel.toJSON();
      }
      return attributes;
    },
    parse: function(response) {
      var currentStoreModel;
      if (response.hasOwnProperty("storeModel")) {
        currentStoreModel = this.get("storeModel");
        if (currentStoreModel) {
          response.storeModel = currentStoreModel;
        } else {
          response.storeModel = new StoreModel(response.storeModel, {
            parse: true
          });
        }
      }
      response.storeFetchDate = new Date(response.storeFetchDate);
      return response;
    },
    _setStoreAliasForServer: function() {
      return server.setStoreAlias(this.get("storeAlias"));
    },
    _fetchStoreModelFromServer: function() {
      var errorOccured, storeModel;
      errorOccured = false;
      storeModel = new StoreModel({
        alias: this.get("storeAlias")
      });
      storeModel.fetch({
        async: false,
        error: function() {
          return errorOccured = true;
        }
      });
      if (errorOccured) {
        return this.set("storeModel", null);
      } else {
        storeModel = this._selectCachedStoreModel(storeModel);
        this.set({
          storeModel: storeModel,
          storeFetchDate: new Date(),
          changedStore: true
        });
        return this._listenForStoreInternalChanges();
      }
    },
    _selectCachedStoreModel: function(storeModel) {
      var newDeliveryAreaModel, newDeliveryAreasCollection, oldDeliveryAreaModel, oldDeliveryAreasCollection, oldStoreModel, selectedAreaModel;
      selectedAreaModel = void 0;
      oldStoreModel = this.get("storeModel");
      if (oldStoreModel) {
        oldDeliveryAreasCollection = oldStoreModel.get("deliveryAreasCollection");
        oldDeliveryAreaModel = oldDeliveryAreasCollection.find(function(deliveryAreaModel) {
          return deliveryAreaModel.get("isSelected") === true;
        });
        if (oldDeliveryAreaModel) {
          newDeliveryAreasCollection = storeModel.get("deliveryAreasCollection");
          newDeliveryAreaModel = newDeliveryAreasCollection.find(function(deliveryAreaModel) {
            return deliveryAreaModel.get("postal") === oldDeliveryAreaModel.get("postal") && (deliveryAreaModel.get("district") === oldDeliveryAreaModel.get("district") || deliveryAreaModel.get("city") === oldDeliveryAreaModel.get("district"));
          });
          if (newDeliveryAreaModel) {
            newDeliveryAreaModel.set("isSelected", true);
          }
        }
      }
      return storeModel;
    },
    _listenForStoreInternalChanges: function() {
      var storeModel;
      storeModel = this.get("storeModel");
      return storeModel.on("change", (function() {
        return this.trigger("change");
      }), this);
    },
    hasChangedStore: function() {
      if (this.get("changedStore")) {
        this.set("changedStore", false);
        return true;
      }
      return false;
    },
    doesStoreExist: function() {
      return this.get("storeModel") !== null;
    },
    currentRouteIsClientRelated: function() {
      var clientRoutes, currentRoute;
      currentRoute = this.get("currentRoute");
      clientRoutes = ["client.dashboard", "client.config", "store.config", "store.dashboard", "store.assortment"];
      return _.contains(clientRoutes, currentRoute);
    },
    currentRouteIsStoreRelated: function() {
      var currentRoute, prefix;
      currentRoute = this.get("currentRoute");
      prefix = currentRoute.split(".")[0];
      return prefix === "store";
    },
    clientOwnsThisStore: function() {
      var storeModel;
      storeModel = this.get("storeModel");
      return storeModel.get("number") !== 0;
    }
  });
  return new StateModel();
});

/*
//@ sourceMappingURL=stateModel.js.map
*/