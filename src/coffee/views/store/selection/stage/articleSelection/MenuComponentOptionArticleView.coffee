define ["jquery", "underscore", "backbone", "models/ArticleModel", "text!templates/store/selection/stage/articleSelection/MenuComponentOptionArticleTemplate.html"], ($, _, Backbone, ArticleModel, MenuComponentOptionArticleTemplate) ->

  MenuComponentOptionArticleView = Backbone.View.extend

    className: "article"

    template: _.template(MenuComponentOptionArticleTemplate)

    clickLocked: false

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
      @$el.addClass @_getImageClass()

    _getImageClass: ->
      image = @model.get("largeImage")
      imageWithoutFileExtension = image.substr(0, image.lastIndexOf("."))
      imageWithoutFileExtension.split("-").pop() or ""

    _update: ->
      @$el.toggleClass "selected", @model.get("isSelected")

    _select: ->
      unless @clickLocked
        @clickLocked = true
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
            @clickLocked = false

          error: =>
            @clickLocked = false
            @model.set { isSelected: true }, { silent: true }

    _listenForDestory: ->
      @options.selectionView.once "destroy", @stopListening, this

