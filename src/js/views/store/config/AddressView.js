define(["jquery", "underscore", "backbone", "services/notificationcenter", "text!templates/store/config/AddressTemplate.html"], function($, _, Backbone, notificationcenter, AddressTemplate) {
  var AddressView;
  return AddressView = Backbone.View.extend({
    events: {
      "focusout input": "_update"
    },
    template: _.template(AddressTemplate),
    initialize: function() {
      return this._render();
    },
    _render: function() {
      var addressModel, json;
      addressModel = this.model.get("addressModel");
      json = {
        firstName: addressModel.get("firstName"),
        lastName: addressModel.get("lastName"),
        street: addressModel.get("street"),
        streetNumber: addressModel.get("streetNumber"),
        streetAdditional: addressModel.get("streetAdditional"),
        city: addressModel.get("city"),
        district: addressModel.get("district"),
        phone: addressModel.get("phone"),
        email: addressModel.get("email"),
        postal: addressModel.get("postal")
      };
      return this.$el.html(this.template(json));
    },
    _update: function(e) {
      var $input, addressModel, field, shouldReloadStoreModel, storeModel, val;
      storeModel = this.model;
      addressModel = this.model.get("addressModel");
      $input = $(e.target);
      field = $input.attr("data-field");
      val = $input.val();
      shouldReloadStoreModel = _.contains(["street", "postal", "city"], field);
      if (val !== addressModel.get(field)) {
        addressModel.set(field, val);
        return addressModel.save({}, {
          success: function() {
            notificationcenter.notify("views.store.config.address.success");
            if (shouldReloadStoreModel) {
              return storeModel.fetch();
            }
          },
          error: function() {
            return notificationcenter.notify("views.store.config.address.error");
          }
        });
      }
    }
  });
});

/*
//@ sourceMappingURL=AddressView.js.map
*/