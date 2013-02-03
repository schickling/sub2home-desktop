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

					_.each(ingredientCategoriesCollection.models, function (ingredientCategoryModel) {

						var timelineItemModel = new TimelineItemModel({
							image: '../../../' + ingredientCategoryModel.get('smallImage'),
							icon: ingredientCategoryModel.get('icon'),
							phrase: 'Waehle deine Zutaten'
						});

						this.timelineItemsCollection.add(timelineItemModel);

						// update timeline items on ingredient select/unselect
						if (ingredientCategoryModel.get('isMandatory')) {
							var ingredientsCollection = ingredientCategoryModel.get('ingredientsCollection');

							ingredientsCollection.each(function (ingredientModel) {
								ingredientModel.bind('change:isSelected', function () {
									
									// count isSelected items
									var isSelectedCount = ingredientModel.collection.where({
										isSelected: true
									}).length;

									// mark as locked if no ingredient isSelected
									timelineItemModel.set('isLocked', (isSelectedCount === 0));
								});

							});


							// lock on init
							timelineItemModel.set('isLocked', true);
						}


					}, this);

				}

			}


		},

		initializeArticleChangeListener: function () {

			// listen for selection
			this.model.bind('change', function () {
				if (this.model.hasChanged('articleModel')) {
					console.log(this.model.get('articleModel').toJSON());
					// this.renderIngredientsSelection();
				}
			}, this);

		}

	});

	return IngredientsSelectionView;

});