define(["jquery", "underscore", "backbone", "models/stateModel", "models/cartModel", "text!templates/store/tray/CheckoutSettingsTemplate.html"], function($, _, Backbone, stateModel, cartModel, CheckoutSettingsTemplate) {
  var CheckoutSettingsView;
  return CheckoutSettingsView = Backbone.View.extend({
    isLocked: false,
    template: _.template(CheckoutSettingsTemplate),
    events: {
      "click #save": "hide",
      "focusout input": "saveAddressData",
      "click #paymentSettings span": "choosePayment"
    },
    initialize: function() {
      return this.render();
    },
    render: function() {
      var addressModel, json, storeModel;
      addressModel = cartModel.getCustomerAddressModel();
      storeModel = stateModel.get("storeModel");
      json = {
        firstName: addressModel.get("firstName"),
        lastName: addressModel.get("lastName"),
        street: addressModel.get("street"),
        streetAdditional: addressModel.get("streetAdditional"),
        streetNumber: addressModel.get("streetNumber"),
        city: addressModel.get("city"),
        district: addressModel.get("district"),
        phone: addressModel.get("phone"),
        email: addressModel.get("email"),
        postal: addressModel.get("postal"),
        selectedPaymentMethod: cartModel.getPaymentMethod(),
        allowsPaymentCash: storeModel.get("allowsPaymentCash"),
        allowsPaymentEc: storeModel.get("allowsPaymentEc"),
        allowsPaymentPaypal: storeModel.get("allowsPaymentPaypal")
      };
      return this.$el.html(this.template(json));
    },
    saveAddressData: function(e) {
      var $input, addressModel, attribute, changedAttributes, value;
      $input = $(e.target);
      attribute = $input.attr("data-attribute");
      value = $input.val();
      addressModel = cartModel.getCustomerAddressModel();
      changedAttributes = [];
      changedAttributes[attribute] = value;
      return addressModel.set(changedAttributes, {
        silent: true
      });
    },
    choosePayment: function(e) {
      var $span, method;
      $span = $(e.target);
      method = $span.attr("data-method");
      $span.addClass("selected").siblings().removeClass("selected");
      return cartModel.setPaymentMethod(method);
    },
    hide: function() {
      var addressModel, valid;
      addressModel = cartModel.getCustomerAddressModel();
      valid = !!addressModel.set({}, {
        validate: true
      });
      if (valid) {
        addressModel.trigger("change");
        return this.$el.trigger("hide");
      }
    }
  });
});

/*
//@ sourceMappingURL=CheckoutSettingsView.js.map
*/