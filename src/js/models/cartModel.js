define(["underscore", "backbone", "backboneLocalStorage", "models/stateModel", "models/OrderModel"], function(_, Backbone, backboneLocalStorage, stateModel, OrderModel) {
  var CartModel;
  CartModel = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage("CartModel"),
    defaults: {
      id: 0,
      orderModel: null,
      termsAccepted: false,
      isClosed: false
    },
    initialize: function() {
      this._initializeData();
      if (stateModel.hasChangedStore()) {
        this._resetOrderModel();
      }
      this._listenToStoreModelChange();
      this._listenToDeliveryAreaSelection();
      return this._adjustCustomerAddress();
    },
    toJSON: function() {
      var attributes;
      attributes = _.clone(this.attributes);
      if (attributes.hasOwnProperty("orderModel")) {
        attributes.orderModel = attributes.orderModel.toJSON();
      }
      return attributes;
    },
    parse: function(response) {
      var currentOrderModel;
      if (response.hasOwnProperty("orderModel")) {
        currentOrderModel = this.get("orderModel");
        if (currentOrderModel) {
          response.orderModel = currentOrderModel;
        } else {
          response.orderModel = new OrderModel(response.orderModel, {
            parse: true
          });
        }
      }
      return response;
    },
    getCustomerAddressModel: function() {
      var orderModel;
      orderModel = this.get("orderModel");
      return orderModel.get("addressModel");
    },
    getOrderedItemsCollection: function() {
      var orderModel;
      orderModel = this.get("orderModel");
      return orderModel.get("orderedItemsCollection");
    },
    addOrderedItemModel: function(orderedItemModel) {
      var orderedItemsCollection;
      this.set("isClosed", false);
      orderedItemsCollection = this.getOrderedItemsCollection();
      orderedItemModel.trigger("recalculate");
      orderedItemsCollection.add(orderedItemModel);
      return orderedItemModel.set("isInCart", true);
    },
    getPaymentMethod: function() {
      var orderModel;
      orderModel = this.get("orderModel");
      return orderModel.get("paymentMethod");
    },
    setPaymentMethod: function(paymentMethod) {
      var orderModel;
      orderModel = this.get("orderModel");
      return orderModel.set({
        paymentMethod: paymentMethod
      }, {
        validate: true
      });
    },
    getTotal: function() {
      var orderModel;
      orderModel = this.get("orderModel");
      return orderModel.get("total");
    },
    getTip: function() {
      var orderModel;
      orderModel = this.get("orderModel");
      return orderModel.get("tip");
    },
    getNumberOfOrderedItems: function() {
      var numberOfOrderedItems, orderModel, orderedItemsCollection;
      orderModel = this.get("orderModel");
      orderedItemsCollection = orderModel.get("orderedItemsCollection");
      numberOfOrderedItems = 0;
      _.each(orderedItemsCollection.models, function(orderedItemModel) {
        return numberOfOrderedItems += orderedItemModel.get("amount");
      });
      return numberOfOrderedItems;
    },
    getComment: function() {
      var orderModel;
      orderModel = this.get("orderModel");
      return orderModel.get("comment");
    },
    setComment: function(comment) {
      var orderModel;
      orderModel = this.get("orderModel");
      return orderModel.set({
        comment: comment
      }, {
        validate: true
      });
    },
    getMinimumValue: function() {
      var storeModel;
      storeModel = stateModel.get("storeModel");
      return storeModel.getMinimumValue();
    },
    getMinimumDuration: function() {
      var storeModel;
      storeModel = stateModel.get("storeModel");
      return storeModel.getMinimumDuration();
    },
    isMinimumReached: function() {
      var orderModel, storeModel;
      orderModel = this.get("orderModel");
      storeModel = stateModel.get("storeModel");
      return orderModel.get("total") >= storeModel.getMinimumValue();
    },
    cleanUp: function() {
      var orderModel;
      orderModel = this.get("orderModel");
      orderModel.get("orderedItemsCollection").reset();
      orderModel.set({
        total: 0,
        tip: 0,
        comment: "",
        couponCode: "",
        subcardCode: ""
      });
      return this.set("termsAccepted", false);
    },
    isCouponCodeValid: function() {
      return this.get("orderModel").isCouponCodeValid();
    },
    _initializeData: function() {
      var couldBeFetched;
      couldBeFetched = true;
      this.fetch({
        error: function() {
          return couldBeFetched = false;
        }
      });
      this.on("change", (function() {
        return this.save({}, {
          silent: true
        });
      }), this);
      if (!couldBeFetched) {
        this.set("orderModel", new OrderModel());
      }
      return this._listenToOrderModel();
    },
    _resetOrderModel: function() {
      var addressModel, orderModel;
      addressModel = this.get("orderModel").get("addressModel");
      orderModel = new OrderModel({
        addressModel: addressModel
      });
      this.set("orderModel", orderModel);
      this._listenToOrderModel();
      return this._adjustCustomerAddress();
    },
    _listenToOrderModel: function() {
      var orderModel,
        _this = this;
      orderModel = this.get("orderModel");
      return orderModel.on("change", function() {
        return _this.trigger("change");
      });
    },
    _listenToStoreModelChange: function() {
      var _this = this;
      return stateModel.on("change:storeModel", function() {
        _this._resetOrderModel();
        return _this._listenToDeliveryAreaSelection();
      });
    },
    _listenToDeliveryAreaSelection: function() {
      var storeModel;
      storeModel = stateModel.get("storeModel");
      if (storeModel) {
        return storeModel.on("change", this._adjustCustomerAddress, this);
      }
    },
    _adjustCustomerAddress: function() {
      var addressModel, orderModel, selectedDeliveryAreaModel, storeModel;
      storeModel = stateModel.get("storeModel");
      if (!storeModel) {
        return;
      }
      orderModel = this.get("orderModel");
      addressModel = orderModel.get("addressModel");
      selectedDeliveryAreaModel = storeModel.getSelectedDeliveryAreaModel();
      return addressModel.set({
        postal: selectedDeliveryAreaModel.get("postal"),
        city: selectedDeliveryAreaModel.get("city"),
        district: selectedDeliveryAreaModel.get("district")
      });
    }
  });
  return new CartModel();
});

/*
//@ sourceMappingURL=cartModel.js.map
*/