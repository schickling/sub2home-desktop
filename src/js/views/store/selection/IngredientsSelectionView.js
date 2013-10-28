define(["jquery", "underscore", "backbone", "views/store/selection/info/ingredientsSelection/InfoView", "models/TimelineItemModel", "views/store/selection/SelectionView", "views/store/selection/stage/ingredientsSelection/IngredientCategoriesView"], function($, _, Backbone, InfoView, TimelineItemModel, SelectionView, IngredientCategoriesView) {
  var IngredientsSelectionView;
  return IngredientsSelectionView = SelectionView.extend({
    stageViewClass: IngredientCategoriesView,
    infoViewClass: InfoView,
    _prepare: function() {
      var articleModel, ingredientCategoriesCollection;
      articleModel = this.model.get("articleModel");
      if (articleModel && articleModel.get("allowsIngredients")) {
        ingredientCategoriesCollection = articleModel.get("ingredientCategoriesCollection");
        if (ingredientCategoriesCollection) {
          this.active = true;
          return _.each(ingredientCategoriesCollection.models, (function(ingredientCategoryModel) {
            var ingredientsCollection, timelineItemModel;
            timelineItemModel = new TimelineItemModel({
              image: ingredientCategoryModel.get("smallImage"),
              icon: ingredientCategoryModel.get("icon"),
              phrase: "Wähle deine Zutaten"
            });
            this.timelineItemsCollection.add(timelineItemModel);
            if (ingredientCategoryModel.get("isMandatory")) {
              timelineItemModel.set("isLocked", true);
              ingredientsCollection = ingredientCategoryModel.get("ingredientsCollection");
              return _.each(ingredientsCollection.models, (function(ingredientModel) {
                ingredientModel.bind("change:isSelected", (function() {
                  return this._updateTimelineModel(ingredientCategoryModel, timelineItemModel);
                }), this);
                return this._updateTimelineModel(ingredientCategoryModel, timelineItemModel);
              }), this);
            }
          }), this);
        }
      }
    },
    _updateTimelineModel: function(ingredientCategoryModel, timelineItemModel) {
      return timelineItemModel.set("isLocked", !ingredientCategoryModel.isComplete());
    }
  });
});

/*
//@ sourceMappingURL=IngredientsSelectionView.js.map
*/