define(["jquery", "underscore", "backbone", "services/router", "models/stateModel", "views/PageView", "views/store/assortment/SectionsNavigationView", "views/store/assortment/articles/CategoriesView", "views/store/assortment/menuUpgrades/MenuUpgradesView", "views/store/assortment/menuBundles/MenuBundlesView", "views/store/assortment/ingredients/IngredientCategoriesView", "text!templates/store/assortment/MainTemplate.html"], function($, _, Backbone, router, stateModel, PageView, SectionsNavigationView, CategoriesView, MenuUpgradesView, MenuBundlesView, IngredientCategoriesView, MainTemplate) {
  var MainView;
  return MainView = PageView.extend({
    subViews: {
      categoriesView: null,
      ingredientCategoriesView: null,
      menuUpgradesView: null,
      menuBundlesView: null
    },
    initialize: function() {
      this.model = stateModel.get("storeModel");
      this.model.fetch({
        url: "stores/storeAlias/auth",
        async: false
      });
      this.pageTitle = "Sortimentverwaltung " + this.model.get("title") + " - sub2home";
      if (stateModel.clientOwnsThisStore()) {
        return this._render();
      } else {
        return router.navigate("login", {
          trigger: true,
          replace: true
        });
      }
    },
    _render: function() {
      this.$el.html(MainTemplate);
      this._renderSectionsNavigation();
      this._renderArticleSection();
      this._renderMenuUpgradesSection();
      this._renderMenuBundlesSection();
      this._renderIngredientsSection();
      return this.append();
    },
    _renderSectionsNavigation: function() {
      return new SectionsNavigationView({
        el: this.$el
      });
    },
    _renderArticleSection: function() {
      return this.subViews.categoriesView = new CategoriesView({
        el: this.$el
      });
    },
    _renderMenuUpgradesSection: function() {
      return this.subViews.menuUpgradesView = new MenuUpgradesView({
        el: this.$el
      });
    },
    _renderMenuBundlesSection: function() {
      return this.subViews.menuBundlesView = new MenuBundlesView({
        el: this.$el
      });
    },
    _renderIngredientsSection: function() {
      return this.subViews.ingredientCategoriesView = new IngredientCategoriesView({
        el: this.$el
      });
    }
  });
});

/*
//@ sourceMappingURL=MainView.js.map
*/