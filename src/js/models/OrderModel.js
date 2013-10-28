define(["jquery", "underscore", "backbone", "moment", "services/notificationcenter", "models/AddressModel", "models/CreditModel", "collections/OrderedItemsCollection"], function($, _, Backbone, moment, notificationcenter, AddressModel, CreditModel, OrderedItemsCollection) {
  var OrderModel, now;
  now = new Date();
  OrderModel = Backbone.Model.extend({
    defaults: {
      paymentMethod: "cash",
      subcardCode: "",
      couponCode: "",
      comment: "",
      total: 0,
      tip: 0,
      addressModel: null,
      orderedItemsCollection: null,
      dueAt: "",
      dueDate: null,
      isDelivered: false,
      createdAt: "",
      createdDate: null,
      creditModel: null
    },
    urlRoot: function() {
      if (this.isNew()) {
        return "stores/storeAlias/orders";
      } else {
        return "orders";
      }
    },
    initialize: function() {
      this._initializeRelations();
      return this.on("invalid", function(model, error) {
        return notificationcenter.notify("models.orderModel.invalid", {
          error: error
        });
      });
    },
    _initializeRelations: function() {
      var orderedItemsCollection;
      if (!this.get("orderedItemsCollection")) {
        this.set("orderedItemsCollection", new OrderedItemsCollection());
      }
      orderedItemsCollection = this.get("orderedItemsCollection");
      orderedItemsCollection.on("add remove reset change", (function() {
        this.set({
          total: orderedItemsCollection.getTotal()
        }, {
          silent: true
        });
        return this.trigger("change");
      }), this);
      if (!this.get("dueDate")) {
        this.set("dueDate", new Date());
      }
      if (!this.get("addressModel")) {
        this.set("addressModel", new AddressModel());
      }
      return this.get("addressModel").on("change", (function() {
        return this.trigger("change");
      }), this);
    },
    parse: function(response) {
      var c, d;
      if (response) {
        if (response.hasOwnProperty("addressModel")) {
          response.addressModel = new AddressModel(response.addressModel, {
            parse: true
          });
        }
        if (response.hasOwnProperty("creditModel") && response.creditModel) {
          response.creditModel = new CreditModel(response.creditModel);
        }
        if (response.hasOwnProperty("orderedItemsCollection")) {
          response.orderedItemsCollection = new OrderedItemsCollection(response.orderedItemsCollection, {
            parse: true
          });
        }
        if (response.hasOwnProperty("createdAt")) {
          c = response.createdAt;
          response.createdDate = new Date(c.substr(0, 4), c.substr(5, 2) - 1, c.substr(8, 2), c.substr(11, 2), c.substr(14, 2), c.substr(17, 2));
        }
        if (response.hasOwnProperty("dueAt") && response.dueAt) {
          d = response.dueAt;
          response.dueDate = new Date(d.substr(0, 4), d.substr(5, 2) - 1, d.substr(8, 2), d.substr(11, 2), d.substr(14, 2), d.substr(17, 2));
        }
        return response;
      }
    },
    toJSON: function() {
      var attributes, dueMoment;
      attributes = _.clone(this.attributes);
      if (this.get("orderedItemsCollection")) {
        attributes.orderedItemsCollection = attributes.orderedItemsCollection.toJSON();
      }
      if (this.get("addressModel")) {
        attributes.addressModel = attributes.addressModel.toJSON();
      }
      if (this.get("creditModel")) {
        attributes.creditModel = attributes.creditModel.toJSON();
      }
      if (this.get("dueDate")) {
        dueMoment = moment(attributes.dueDate);
        attributes.dueAt = dueMoment.format("YYYY-MM-DD HH:mm:ss");
      }
      return attributes;
    },
    wasCreatedToday: function() {
      return now.toDateString() === this.get("createdDate").toDateString();
    },
    validate: function(attributes) {
      var comment, validPaymentMethods;
      validPaymentMethods = ["cash", "ec", "paypal"];
      if (!_.contains(validPaymentMethods, attributes.paymentMethod)) {
        return "Keine erlaubte Bezahlmethode";
      }
      comment = attributes.comment;
      if (comment.length > 1000 || comment.split(/\n|\f/).length > 6) {
        return "Kommentar ist zu lang";
      }
      if (attributes.total < 0 || attributes.tip < 0) {
        return "Kein erlaubter Wert";
      }
    },
    increaseTip: function() {
      var benefit, isRound, step, tip, total, totalWithTip;
      tip = this.get("tip");
      total = this.get("total");
      totalWithTip = total + tip;
      step = 0.50;
      isRound = (totalWithTip % step) === 0;
      if (isRound) {
        tip += step;
      } else {
        benefit = Math.ceil(total) - total;
        if (benefit > step) {
          tip = benefit - step;
        } else {
          tip = benefit;
        }
      }
      return this.set({
        tip: tip
      }, {
        validate: true
      });
    },
    decreaseTip: function() {
      var step, tip;
      tip = this.get("tip");
      step = 0.50;
      if (tip >= step) {
        tip -= step;
      } else {
        tip = 0;
      }
      return this.set({
        tip: tip
      }, {
        validate: true
      });
    },
    getNumber: function() {
      var number;
      number = "00000" + this.get("id");
      return number.substr(number.length - 6);
    },
    hasCredit: function() {
      return this.get("creditModel") !== null;
    },
    isCouponCodeValid: function() {
      var code, regex;
      regex = /^(\d){2}-(\d){5}-(\d)-(\d){4}-(\d){4}$/;
      code = this.get("couponCode");
      return regex.test(code);
    }
  });
  return OrderModel;
});

/*
//@ sourceMappingURL=OrderModel.js.map
*/