define ["models/IngredientCategoryModel", "models/IngredientModel"], (IngredientCategoryModel, IngredientModel) ->

  describe "check isComplete", ->

    beforeEach ->
      @ingredientCategoryModel = new IngredientCategoryModel
      @ingredientsCollection = @ingredientCategoryModel.get("ingredientsCollection")

    it "shoud return true for empty optional ingredient category", ->
      @ingredientCategoryModel.set isMandatory: false
      expect(@ingredientCategoryModel.isComplete()).toBe true

    it "shoud return false for non empty mandatory ingredient category if non checked", ->
      @ingredientCategoryModel.set isMandatory: true
      @ingredientsCollection.add new IngredientModel
      expect(@ingredientCategoryModel.isComplete()).toBe false

    it "shoud return true for non empty mandatory ingredient category if one checked", ->
      @ingredientCategoryModel.set isMandatory: true
      @ingredientsCollection.add new IngredientModel(isSelected: true)
      expect(@ingredientCategoryModel.isComplete()).toBe true