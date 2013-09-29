define ["models/OrderedItemModel", "models/OrderedArticleModel"], (OrderedItemModel, OrderedArticleModel) ->

  describe "check isComplete", ->

    beforeEach ->
      @orderedItemModel = new OrderedItemModel
      @orderedArticlesCollection = @orderedItemModel.get("orderedArticlesCollection")

    it "should return true", ->
      firstOrderedArticleModel = new OrderedArticleModel
      secondOrderedArticleModel = new OrderedArticleModel
      spyOn(firstOrderedArticleModel, "isComplete").andReturn(true)
      spyOn(secondOrderedArticleModel, "isComplete").andReturn(true)
      @orderedArticlesCollection.add firstOrderedArticleModel
      @orderedArticlesCollection.add secondOrderedArticleModel
      expect(@orderedItemModel.isComplete()).toBe(true)

    it "should return false", ->
      firstOrderedArticleModel = new OrderedArticleModel
      secondOrderedArticleModel = new OrderedArticleModel
      spyOn(firstOrderedArticleModel, "isComplete").andReturn(true)
      spyOn(secondOrderedArticleModel, "isComplete").andReturn(false)
      @orderedArticlesCollection.add firstOrderedArticleModel
      @orderedArticlesCollection.add secondOrderedArticleModel
      expect(@orderedItemModel.isComplete()).toBe(false)
