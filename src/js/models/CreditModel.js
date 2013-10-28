define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
  var CreditModel;
  return CreditModel = Backbone.Model.extend({
    defaults: {
      isAccepted: false,
      description: "",
      total: 0
    }
  });
});

/*
//@ sourceMappingURL=CreditModel.js.map
*/