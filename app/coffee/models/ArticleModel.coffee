define [
  "underscore"
  "backbone"
  "collections/MenuUpgradesCollection"
  "collections/ArticleChainArticlesCollection"
  "collections/IngredientCategoriesCollection"
  "services/notificationcenter"
], (_, Backbone, MenuUpgradesCollection, ArticleChainArticlesCollection, IngredientCategoriesCollection, notificationcenter) ->

  ArticleModel = Backbone.Model.extend

    defaults:
      title: ""
      description: ""
      info: ""
      largeImage: ""
      smallImage: ""
      menuUpgradesCollection: null
      ingredientCategoriesCollection: null
      chainedArticlesCollection: null
      price: 0
      total: 0
      ingredientsTotal: 0
      deposit: 0
      allowsIngredients: false
      allowsDeposit: false
      allowsMenuUpgrades: false

      # for assortment
      isActive: false
      customPrice: 0
      buyed: 0

    urlRoot: "stores/storeAlias/articles/"

    initialize: ->

      # wait until attributes are set
      @on "change:ingredientCategoriesCollection", (->
        @_listenForIngredientSelection()
      ), this

      # needed to set total initially
      @on "change:price", (->
        @_calculateTotal()
      ), this

      # throw errors
      @on "invalid", (model, error) ->
        notificationcenter.notify "models.articleModel.invalid",
          error: error

    toJSON: ->
      attributes = _.clone(@attributes)
      attributes.menuUpgradesCollection = attributes.menuUpgradesCollection.toJSON()  if @get("menuUpgradesCollection")
      attributes.ingredientCategoriesCollection = attributes.ingredientCategoriesCollection.toJSON()  if @get("ingredientCategoriesCollection")
      attributes

    parse: (response) ->
      if response
        if response.hasOwnProperty("menuUpgradesCollection") and response.menuUpgradesCollection isnt null
          response.menuUpgradesCollection = new MenuUpgradesCollection response.menuUpgradesCollection, parse: true
        if response.hasOwnProperty("ingredientCategoriesCollection") and response.ingredientCategoriesCollection isnt null
          response.ingredientCategoriesCollection = new IngredientCategoriesCollection response.ingredientCategoriesCollection, parse: true
        if response.hasOwnProperty("chainedArticlesCollection") and response.chainedArticlesCollection isnt null
          response.chainedArticlesCollection = new ArticleChainArticlesCollection response.chainedArticlesCollection
        response

    validate: (attributes) ->

      # validate numbers: price, total and ingredientsTotal
      numbers = ["price", "total", "ingredientsTotal", "deposit"]
      i = 0

      while i < numbers.length
        number = numbers[i]
        value = attributes[number]
        return number + " has to be numeric: " + value  if typeof (value) isnt "number" or value isnt parseFloat(value)
        return number + " can't be negative: " + value  if value < 0
        i++

    _listenForIngredientSelection: ->

      # trigger change event if ingredients were selected
      ingredientCategoriesCollection = @get("ingredientCategoriesCollection")
      if ingredientCategoriesCollection and @get("allowsIngredients")
        _.each ingredientCategoriesCollection.models, ((ingredientCategoryModel) ->
          ingredientsCollection = ingredientCategoryModel.get("ingredientsCollection")
          _.each ingredientsCollection.models, ((ingredientModel) ->
            ingredientModel.on "change:isSelected", (->
              @_calculateTotal()
            ), this
          ), this
        ), this

    _calculateIngredientsTotal: ->
      ingredientsTotal = 0
      ingredientCategoriesCollection = @get("ingredientCategoriesCollection")

      # sum up selected ingredients
      if @get("allowsIngredients") and ingredientCategoriesCollection
        _.each ingredientCategoriesCollection.models, (ingredientCategoryModel) ->
          selectedIngredientModels = ingredientCategoryModel.get("ingredientsCollection").where(isSelected: true)
          _.each selectedIngredientModels, (ingredientModel) ->
            ingredientsTotal += ingredientModel.get("price")

      @set "ingredientsTotal", ingredientsTotal

    _calculateTotal: ->
      @_calculateIngredientsTotal()
      total = @get("price") + @get("ingredientsTotal")
      total += @get("deposit")  if @get("allowsDeposit")
      @set "total", total

    # TODO rework perhaps
    hasIngredients: ->
      @get("allowsIngredients") and @get("ingredientCategoriesCollection") isnt null
