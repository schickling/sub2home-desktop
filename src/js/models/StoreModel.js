define(["underscore", "backbone", "services/notificationcenter", "models/AddressModel", "collections/DeliveryAreasCollection", "collections/DeliveryTimesCollection", "collections/InvoicesCollection"], function(_, Backbone, notificationcenter, AddressModel, DeliveryAreasCollection, DeliveryTimesCollection, InvoicesCollection) {
  var StoreModel;
  StoreModel = void 0;
  return StoreModel = Backbone.Model.extend({
    defaults: {
      title: "",
      alias: "",
      facebookUrl: "",
      allowsPaymentCash: false,
      allowsPaymentEc: false,
      allowsPaymentPaypal: false,
      orderEmail: "",
      deliveryAreasCollection: null,
      deliveryTimesCollection: null,
      invoicesCollection: null,
      addressModel: null,
      number: 0,
      numberOfUndoneOrders: 0,
      deliveryAreaWasSelected: false
    },
    idAttribute: "alias",
    urlRoot: "stores",
    initialize: function() {
      this.on("change:deliveryAreasCollection", (function() {
        return this._listenForDeliveryAreasCollectionChanges();
      }), this);
      this.on("change:deliveryTimesCollection", (function() {
        return this._listenForDeliveryTimesCollectionChanges();
      }), this);
      this.on("invalid", function(model, error) {
        return notificationcenter.notify("models.storeModel.invalid", {
          error: error
        });
      });
      this._listenForDeliveryAreasCollectionChanges();
      return this._listenForDeliveryTimesCollectionChanges();
    },
    toJSON: function() {
      var attributes;
      attributes = void 0;
      attributes = _.clone(this.attributes);
      if (attributes.hasOwnProperty("addressModel") && attributes.addressModel) {
        attributes.addressModel = attributes.addressModel.toJSON();
      }
      if (attributes.hasOwnProperty("deliveryAreasCollection") && attributes.deliveryAreasCollection) {
        attributes.deliveryAreasCollection = attributes.deliveryAreasCollection.toJSON();
      }
      if (attributes.hasOwnProperty("deliveryTimesCollection") && attributes.deliveryTimesCollection) {
        attributes.deliveryTimesCollection = attributes.deliveryTimesCollection.toJSON();
      }
      if (attributes.hasOwnProperty("invoicesCollection") && attributes.invoicesCollection) {
        attributes.invoicesCollection = attributes.invoicesCollection.toJSON();
      }
      return attributes;
    },
    parse: function(response) {
      if (response) {
        if (response.hasOwnProperty("addressModel")) {
          response.addressModel = new AddressModel(response.addressModel, {
            parse: true
          });
        }
        if (response.hasOwnProperty("deliveryAreasCollection")) {
          response.deliveryAreasCollection = new DeliveryAreasCollection(response.deliveryAreasCollection);
        }
        if (response.hasOwnProperty("deliveryTimesCollection")) {
          response.deliveryTimesCollection = new DeliveryTimesCollection(response.deliveryTimesCollection);
        }
        if (response.hasOwnProperty("invoicesCollection") && response.invoicesCollection) {
          response.invoicesCollection = new InvoicesCollection(response.invoicesCollection);
        }
        return response;
      }
    },
    validate: function(attributes) {
      if (!attributes.allowsPaymentPaypal && !attributes.allowsPaymentEc && !attributes.allowsPaymentCash) {
        return "at least one payment method has to be selected";
      }
    },
    isDelivering: function() {
      return this._getCurrentDeliveryTimeModel() !== null;
    },
    isDeliveringToday: function() {
      return this.getNextDeliveryTimeModel().get("dayOfWeek") === new Date().getDay();
    },
    getNextDeliveryTimeModel: function() {
      var deliveryTimesCollection;
      deliveryTimesCollection = void 0;
      deliveryTimesCollection = this.get("deliveryTimesCollection");
      return deliveryTimesCollection.getNextDeliveryTimeModel(new Date());
    },
    getMinimumValue: function() {
      var selectedDeliveryAreaModel;
      selectedDeliveryAreaModel = void 0;
      selectedDeliveryAreaModel = this.getSelectedDeliveryAreaModel();
      return selectedDeliveryAreaModel.get("minimumValue");
    },
    getMinimumDuration: function() {
      var selectedDeliveryAreaModel;
      selectedDeliveryAreaModel = void 0;
      selectedDeliveryAreaModel = this.getSelectedDeliveryAreaModel();
      return selectedDeliveryAreaModel.get("minimumDuration");
    },
    getSelectedDeliveryAreaModel: function() {
      var deliveryAreasCollection, selectedDeliveryAreaModel;
      deliveryAreasCollection = void 0;
      selectedDeliveryAreaModel = void 0;
      deliveryAreasCollection = this.get("deliveryAreasCollection");
      if (!deliveryAreasCollection) {
        return;
      }
      selectedDeliveryAreaModel = deliveryAreasCollection.find(function(deliveryAreaModel) {
        return deliveryAreaModel.get("isSelected");
      });
      if (selectedDeliveryAreaModel) {
        return selectedDeliveryAreaModel;
      } else {
        return deliveryAreasCollection.first().set({
          isSelected: true
        }, {
          silent: true
        });
      }
    },
    _getCurrentDeliveryTimeModel: function() {
      var currentDeliveryModel, deliveryTimesCollection;
      currentDeliveryModel = void 0;
      deliveryTimesCollection = void 0;
      currentDeliveryModel = null;
      deliveryTimesCollection = this.get("deliveryTimesCollection");
      _.each(deliveryTimesCollection.models, function(deliveryTimeModel) {
        if (deliveryTimeModel.checkIfNow()) {
          return currentDeliveryModel = deliveryTimeModel;
        }
      });
      return currentDeliveryModel;
    },
    _listenForDeliveryAreasCollectionChanges: function() {
      var deliveryAreasCollection;
      deliveryAreasCollection = void 0;
      deliveryAreasCollection = this.get("deliveryAreasCollection");
      if (deliveryAreasCollection) {
        return deliveryAreasCollection.on("add remove change", (function() {
          return this.set({
            deliveryAreaWasSelected: true
          }, {
            silent: true
          }).trigger("change");
        }), this);
      }
    },
    _listenForDeliveryTimesCollectionChanges: function() {
      var deliveryTimesCollection;
      deliveryTimesCollection = void 0;
      deliveryTimesCollection = this.get("deliveryTimesCollection");
      if (deliveryTimesCollection) {
        return deliveryTimesCollection.on("add remove change", (function() {
          return this.trigger("change");
        }), this);
      }
    },
    _addMinutesToDate: function(date, minutes) {
      return new Date(date.getTime() + minutes * 60000);
    }
  });
});

/*
//@ sourceMappingURL=StoreModel.js.map
*/