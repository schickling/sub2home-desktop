define(["jquery", "libs/jquery.lazyload", "underscore", "backbone", "models/stateModel", "views/PageView", "views/store/home/DeliveryPopupView", "views/store/home/DeliveryView", "views/store/home/CategoriesView", "views/store/home/CategoriesNavigationView", "text!templates/store/home/MainTemplate.html"], function($, jqueryLazyload, _, Backbone, stateModel, PageView, DeliveryPopupView, DeliveryView, CategoriesView, CategoriesNavigationView, MainTemplate) {
  var MainView;
  return MainView = PageView.extend({
    events: {
      "click #currentDeliveryArea": "_renderDeliveryPopupView"
    },
    initialize: function() {
      var storeModel;
      storeModel = stateModel.get("storeModel");
      this.pageTitle = "SUBWAY® " + storeModel.get("title") + " - sub2home";
      return this._render();
    },
    _render: function() {
      this.$el.html(MainTemplate);
      if (!stateModel.get("storeModel").get("deliveryAreaWasSelected")) {
        this._renderDeliveryPopupView();
      }
      this._renderDeliveryView();
      return this._renderCategories();
    },
    _renderDeliveryPopupView: function() {
      return new DeliveryPopupView({
        el: this.$("#preSelectDeliveryArea"),
        model: stateModel.get("storeModel")
      });
    },
    _renderDeliveryView: function() {
      return new DeliveryView({
        el: this.$("#storeDeliveryDetails")
      });
    },
    _renderCategories: function() {
      var $categories, $content, categoriesView, self;
      self = this;
      $content = this.$(".content");
      $categories = $content.find("#categories");
      categoriesView = new CategoriesView({
        el: $categories
      });
      return categoriesView.deffered.done(function() {
        var categoriesNavigationView;
        categoriesNavigationView = new CategoriesNavigationView({
          collection: categoriesView.collection,
          el: self.$el
        });
        self.append();
        return $content.lazyload();
      });
    }
  });
});
