define [
  "jquery"
  "underscore"
  "backbone"
  "views/store/selection/info/InfoBaseView"
  "views/store/selection/info/ingredientsSelection/ArticleView"
  "views/store/selection/info/ingredientsSelection/IngredientCategoriesView"
  "views/store/selection/info/ingredientsSelection/IngredientsView"
  "text!templates/store/selection/info/ingredientsSelection/InfoTemplate.html"
], ($, _, Backbone, InfoBaseView, ArticleView, IngredientCategoriesView, IngredientsView, InfoTemplate) ->

  InfoView = InfoBaseView.extend

    renderContent: ->
      @$el.html InfoTemplate
      articleModel = @model.get("articleModel")
      if articleModel
        @renderArticleView()
        @renderIngredientCategoriesView()  if articleModel.get("allowsIngredients")

    renderArticleView: ->
      @articleView = new ArticleView(
        model: @model.get("articleModel")
        el: @$(".articleInfo")
        selectionView: @options.selectionView
      )

    renderIngredientCategoriesView: ->
      articleModel = @model.get("articleModel")
      @ingredientCategoriesView = new IngredientCategoriesView(
        el: @$(".ingredientInfo")
        collection: articleModel.get("ingredientCategoriesCollection")
        selectionView: @options.selectionView
      )

