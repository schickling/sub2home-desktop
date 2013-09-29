define ["models/OrderedArticleModel", "models/ArticleModel", "text!resources/CompleteArticleModel.json", "text!resources/IncompleteArticleModel.json"], (OrderedArticleModel, ArticleModel, CompleteArticleModelJson, InompleteArticleModelJson) ->

  describe "check isComplete", ->

    it "shoud return true", ->
      articleModel = new ArticleModel JSON.parse(CompleteArticleModelJson), parse: true
      orderedArticleModel = new OrderedArticleModel
      orderedArticleModel.set "articleModel", articleModel
      expect(orderedArticleModel.isComplete()).toBe(true)

    it "shoud return false", ->
      articleModel = new ArticleModel JSON.parse(InompleteArticleModelJson), parse: true
      orderedArticleModel = new OrderedArticleModel
      orderedArticleModel.set "articleModel", articleModel
      expect(orderedArticleModel.isComplete()).toBe(false)
