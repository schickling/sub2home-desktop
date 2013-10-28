define(["jquery", "underscore", "backbone", "models/clientModel", "views/PageView", "views/client/config/ProfileView", "views/client/config/AddressView", "views/client/config/BankaccountView", "text!templates/client/config/MainTemplate.html"], function($, _, Backbone, clientModel, PageView, ProfileView, AddressView, BankaccountView, MainTemplate) {
  var MainView;
  return MainView = PageView.extend({
    subViews: {
      profileView: null
    },
    initialize: function() {
      this.model = clientModel;
      this.pageTitle = "Stammdaten " + this.model.getName() + " - sub2home";
      return this._render();
    },
    _render: function() {
      this.$el.html(MainTemplate);
      this._renderProfile();
      this._renderAddress();
      this._renderBankaccount();
      return this.append();
    },
    _renderProfile: function() {
      return this.subViews.profileView = new ProfileView({
        el: this.$("#clientBasics"),
        model: this.model
      });
    },
    _renderAddress: function() {
      return new AddressView({
        el: this.$("#clientAddress"),
        model: this.model.get("addressModel")
      });
    },
    _renderBankaccount: function() {
      return new BankaccountView({
        el: this.$("#clientBankData"),
        model: this.model.get("bankaccountModel")
      });
    }
  });
});

/*
//@ sourceMappingURL=MainView.js.map
*/