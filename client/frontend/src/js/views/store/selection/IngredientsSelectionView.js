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

				this.active = true;

				ingredientCategoriesCollection.each(function (ingredientCategoryModel) {

					var timelineItemModel = new TimelineItemModel({
						image: ingredientCategoryModel.get('image'),
						icon: ingredientCategoryModel.get('image'),
						phrase: 'Waehle deine Zutaten'
					});

					this.timelineItemsCollection.add(timelineItemModel);

					// update timeline items on ingredient select/unselect
					if (ingredientCategoryModel.get('isMandatory')) {
						var ingredientsCollection = ingredientCategoryModel.get('ingredientsCollection');

						ingredientsCollection.each(function (ingredientModel) {
							ingredientModel.bind('change:selected', function () {
								// count selected items
								var selectedCount = ingredientModel.collection.where({
									selected: true
								}).length;
								// mark as locked if no ingredient selected
								timelineItemModel.set('locked', (selectedCount === 0));
							});

						});

						// lock on init
						timelineItemModel.set('locked', true);
					}


				}, this);

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