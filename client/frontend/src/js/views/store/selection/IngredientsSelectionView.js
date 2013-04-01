// Filename: src/js/views/store/selection/IngredientsSelectionView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/selection/info/ingredientsSelection/InfoView',
    'models/TimelineItemModel',
    'views/store/selection/SelectionView',
    'views/store/selection/stage/ingredientsSelection/IngredientCategoriesView'
    ], function ($, _, Backbone, InfoView, TimelineItemModel, SelectionView, IngredientCategoriesView) {

	var IngredientsSelectionView = SelectionView.extend({

		stageViewClass: IngredientCategoriesView,

		infoViewClass: InfoView,

		prepare: function () {
			var articleModel = this.model.get('articleModel');

			if (articleModel && articleModel.get('allowsIngredients')) {

				var ingredientCategoriesCollection = articleModel.get('ingredientCategoriesCollection');

				if (ingredientCategoriesCollection) {

					this.active = true;

					// TODO could be optimized
					_.each(ingredientCategoriesCollection.models, function (ingredientCategoryModel) {

						var timelineItemModel = new TimelineItemModel({
							image: '../../../' + ingredientCategoryModel.get('smallImage'),
							icon: ingredientCategoryModel.get('icon'),
							phrase: 'Wähle deine Zutaten'
						});

						this.timelineItemsCollection.add(timelineItemModel);

						if (ingredientCategoryModel.get('isMandatory')) {

							// lock on init
							timelineItemModel.set('isLocked', true);


							var ingredientsCollection = ingredientCategoryModel.get('ingredientsCollection');

							_.each(ingredientsCollection.models, function (ingredientModel) {

								// update timeline items on ingredient select/unselect
								ingredientModel.bind('change:isSelected', function() {
									this._updateTimelineModel(ingredientModel, timelineItemModel);
								}, this);

								// update timeline items initially for editing ordered items
								this._updateTimelineModel(ingredientModel, timelineItemModel);

							}, this);
						}


					}, this);

				}

			}

		},

		_updateTimelineModel: function (ingredientModel, timelineItemModel) {
			// count isSelected items
			var isSelectedCount = ingredientModel.collection.where({
				isSelected: true
			}).length;

			// mark as locked if no ingredient isSelected
			timelineItemModel.set('isLocked', (isSelectedCount === 0));

		}

	});

	return IngredientsSelectionView;

});