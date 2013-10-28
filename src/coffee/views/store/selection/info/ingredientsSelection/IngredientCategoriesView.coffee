define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/selection/info/ingredientsSelection/IngredientCategoryView"
], ($, _, Backbone, IngredientCategoryView) ->

  IngredientCategoriesView = Backbone.View.extend

    $firstColumn: null
    $secondColumn: null
    isFirstColumn: true

    initialize: ->
      @render()

    render: ->
      
      # cache dom
      @$firstColumn = @$(".ingredientCategories").first()
      @$secondColumn = @$(".ingredientCategories").last()
      _.each @collection.models, ((ingredientCategoryModel) ->
        @renderIngredientCategory ingredientCategoryModel
      ), this

    renderIngredientCategory: (ingredientCategoryModel) ->
      ingredientCategoryView = new IngredientCategoryView(
        model: ingredientCategoryModel
        selectionView: @options.selectionView
      )
      if @isFirstColumn
        @$firstColumn.append ingredientCategoryView.el
      else
        @$secondColumn.append ingredientCategoryView.el
      
      # flip
      @isFirstColumn = not @isFirstColumn

