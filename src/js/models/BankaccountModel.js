define(["underscore", "backbone", "services/notificationcenter"], function(_, Backbone, notificationcenter) {
  var BankaccountModel;
  return BankaccountModel = Backbone.Model.extend({
    defaults: {
      name: "",
      bic: "",
      iban: ""
    },
    initialize: function() {
      return this.on("invalid", function(model, error) {
        return notificationcenter.notify("models.bankaccountModel.invalid", {
          error: error
        });
      });
    },
    urlRoot: "bankaccounts",
    validate: function(attributes) {
      if (attributes.name === "") {
        return "name";
      }
      if (attributes.bic === "") {
        return "bic";
      }
      if (attributes.iban === "") {
        return "iban";
      }
    }
  });
});

/*
//@ sourceMappingURL=BankaccountModel.js.map
*/