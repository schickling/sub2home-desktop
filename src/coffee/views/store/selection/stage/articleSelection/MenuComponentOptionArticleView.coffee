define [
  "jquery"
  "underscore"
  "backbone"
  "services/imageSuffixer"
  "models/ArticleModel"
  "text!templates/store/selection/stage/articleSelection/MenuComponentOptionArticleTemplate.html"
], ($, _, Backbone, imageSuffixer, ArticleModel, MenuComponentOptionArticleTemplate) ->

  MenuComponentOptionArticleView = Backbone.View.extend

    className: "article"

    template: _.template(MenuComponentOptionArticleTemplate)

    events:
      click: "_select"

    initialize: ->
      @orderedArticleModel = @options.orderedArticleModel
      @_render()

      # listen if model gets isSelected
      @listenTo @model, "change:isSelected", @_update
      @_update()
      @_listenForDestory()

    _render: ->
      json =
        title: @model.get("title")
        image: @model.get("largeImage")
        deposit: @model.get("deposit") * 100 # cent
        description: @model.get("description")

      @$el.html @template(json)
      @$el.addClass imageSuffixer.getClass(@model.get("largeImage"))

    _update: ->
      @$el.toggleClass "selected", @model.get("isSelected")

    _select: ->
      unless @options.selectionView.clickLocked
        @options.selectionView.clickLocked = true
        oldArticleModel = @orderedArticleModel.get("articleModel")
        newArticleModel = new ArticleModel(id: @model.get("id"))
        @model.set { isSelected: true }, { silent: true }
        @_update()
        newArticleModel.fetch
          success: =>
            # copy old article model's ingredients
            if oldArticleModel isnt null
              newIngredientCategoriesCollection = newArticleModel.get("ingredientCategoriesCollection")
              oldIngredientCategoriesCollection = oldArticleModel.get("ingredientCategoriesCollection")
              if newIngredientCategoriesCollection and oldIngredientCategoriesCollection

                newIngredientCategoriesCollection.each (newIngredientCategoryModel) ->
                  oldIngredientCategoryModel = oldIngredientCategoriesCollection.find (oldIngredientCategoryModel) ->
                    oldIngredientCategoryModel.get("title") is newIngredientCategoryModel.get("title")

                  if oldIngredientCategoryModel
                    newIngredientsCollection = newIngredientCategoryModel.get("ingredientsCollection")
                    oldIngredientsCollection = oldIngredientCategoryModel.get("ingredientsCollection")

                    newIngredientsCollection.each (newIngredientModel) ->
                      oldIngredientModel = oldIngredientsCollection.find (oldIngredientModel) ->
                        oldIngredientModel.get("id") is newIngredientModel.get("id")
                      newIngredientModel.set("isSelected", oldIngredientModel && oldIngredientModel.get("isSelected"))

            # add to ordered article
            @orderedArticleModel.set "articleModel", newArticleModel
            @model.trigger "change:isSelected"
            @$el.trigger "fetched"
            setTimeout ( =>
              @options.selectionView.clickLocked = false
            ), 600

          error: =>
            @options.selectionView.clickLocked = false
            @model.set { isSelected: true }, { silent: true }

    _listenForDestory: ->
      @options.selectionView.once "destroy", @stopListening, this

