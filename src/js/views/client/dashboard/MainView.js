define(["jquery", "underscore", "backbone", "services/router", "moment", "models/stateModel", "models/clientModel", "views/PageView", "views/client/dashboard/StoresView", "views/client/dashboard/RevenuesView", "text!templates/client/dashboard/MainTemplate.html"], function($, _, Backbone, router, moment, stateModel, clientModel, PageView, StoresView, RevenuesView, MainTemplate) {
  var MainView;
  moment.lang("de", {
    months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
    monthsShort: "Jan_Febr_Mrz_Apr_Mai_Jun_Jul_Aug_Sept_Okt_Nov_Dez".split("_")
  });
  return MainView = PageView.extend({
    initialize: function() {
      this.model = clientModel;
      this.pageTitle = "Stores&Umsätze " + this.model.getName() + " - sub2home";
      this._selectFirstStoreModel();
      this._switchHeaderToClientView();
      return this._render();
    },
    _render: function() {
      this.$el.html(MainTemplate);
      new StoresView({
        el: this.$("#clientStores .container"),
        collection: this.model.get("storesCollection")
      });
      new RevenuesView({
        el: this.$("#clientRevenues"),
        collection: this.model.get("storesCollection")
      });
      return this.append();
    },
    _switchHeaderToClientView: function() {
      return stateModel.set("isClientHeaderActive", true);
    },
    _selectFirstStoreModel: function() {
      var currentStoreModel, storesCollection;
      currentStoreModel = stateModel.get("storeModel");
      if (!currentStoreModel) {
        storesCollection = this.model.get("storesCollection");
        currentStoreModel = storesCollection.first();
        return stateModel.set("storeAlias", currentStoreModel.get("alias"));
      }
    }
  });
});

/*
//@ sourceMappingURL=MainView.js.map
*/