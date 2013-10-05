define ["collections/IngredientCategoriesCollection", "models/ArticleModel", "models/OrderedArticleModel", "models/IngredientCategoryModel"], (IngredientCategoriesCollection, ArticleModel, OrderedArticleModel, IngredientCategoryModel) ->

  describe "check isComplete", ->

    beforeEach ->
      @orderedArticle = new OrderedArticleModel
      @orderedArticle.set("articleModel", new ArticleModel(ingredientCategoriesCollection: new IngredientCategoriesCollection))
      @ingredientCategoriesCollection = @orderedArticle.get("articleModel").get("ingredientCategoriesCollection")

    it "shoud return true", ->
      firstIngredientCategoryModel = new IngredientCategoryModel
      secondIngredientCategoryModel = new IngredientCategoryModel
      spyOn(firstIngredientCategoryModel, "isComplete").andReturn(true)
      spyOn(secondIngredientCategoryModel, "isComplete").andReturn(true)
      @ingredientCategoriesCollection.add firstIngredientCategoryModel
      @ingredientCategoriesCollection.add secondIngredientCategoryModel
      expect(@orderedArticle.isComplete()).toBe(true)

    it "shoud return false", ->
      firstIngredientCategoryModel = new IngredientCategoryModel
      secondIngredientCategoryModel = new IngredientCategoryModel
      spyOn(firstIngredientCategoryModel, "isComplete").andReturn(true)
      spyOn(secondIngredientCategoryModel, "isComplete").andReturn(false)
      @ingredientCategoriesCollection.add firstIngredientCategoryModel
      @ingredientCategoriesCollection.add secondIngredientCategoryModel
      expect(@orderedArticle.isComplete()).toBe(false)
