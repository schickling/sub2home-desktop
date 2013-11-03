define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/selection/info/ingredientsSelection/InfoView"
  "models/TimelineItemModel"
  "views/store/selection/SelectionView"
  "views/store/selection/stage/ingredientsSelection/IngredientCategoriesView"
], ($, _, Backbone, InfoView, TimelineItemModel, SelectionView, IngredientCategoriesView) ->

  IngredientsSelectionView = SelectionView.extend

    stageViewClass: IngredientCategoriesView
    infoViewClass: InfoView

    _prepare: ->
      articleModel = @model.get("articleModel")
      if articleModel and articleModel.get("allowsIngredients")
        ingredientCategoriesCollection = articleModel.get("ingredientCategoriesCollection")
        if ingredientCategoriesCollection
          @active = true

          # TODO could be optimized
          _.each ingredientCategoriesCollection.models, ((ingredientCategoryModel) ->
            timelineItemModel = new TimelineItemModel(
              image: ingredientCategoryModel.get("smallImage")
              icon: ingredientCategoryModel.get("icon")
              phrase: "Wähle deine Zutaten"
            )
            @timelineItemsCollection.add timelineItemModel
            if ingredientCategoryModel.get("isMandatory")

              # lock on init
              timelineItemModel.set "isLocked", true
              ingredientsCollection = ingredientCategoryModel.get("ingredientsCollection")
              _.each ingredientsCollection.models, ((ingredientModel) ->

                # update timeline items on ingredient select/unselect
                ingredientModel.bind "change:isSelected", (->
                  @_updateTimelineModel ingredientCategoryModel, timelineItemModel
                ), this

                # update timeline items initially for editing ordered items
                @_updateTimelineModel ingredientCategoryModel, timelineItemModel
              ), this
          ), this

    _updateTimelineModel: (ingredientCategoryModel, timelineItemModel) ->
      timelineItemModel.set "isLocked", not ingredientCategoryModel.isComplete()


