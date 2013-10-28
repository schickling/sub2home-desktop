define [
  "jquery"
  "underscore"
  "backbone"
  "collections/IngredientsCollection"
  "views/store/selection/info/ingredientsSelection/IngredientView"
], ($, _, Backbone, IngredientsCollection, IngredientView) ->

  IngredientsView = Backbone.View.extend

    initialize: ->
      
      # listen for further selection / deselection
      _.each @collection.models, ((ingredientModel) ->
        @listenTo ingredientModel, "change:isSelected", @_render
      ), this
      @_render()
      @_listenForDestory()

    _render: ->
      
      # reset view
      @$el.html ""
      
      # filter active ingredients
      activeIngredientModels = @collection.filter((ingredientModel) ->
        ingredientModel.get "isSelected"
      )
      _.each activeIngredientModels, ((ingredientModel) ->
        @_renderIngredient ingredientModel
      ), this
      
      # mark penultimate ingredient
      @$(".ingredient:last").prev().addClass "penultimate"  if @collection.length > 1
      
      # mark category as "unused"
      @$el.parent().toggleClass "unused", activeIngredientModels.length is 0

    _renderIngredient: (ingredientModel) ->
      ingredientView = new IngredientView(model: ingredientModel)
      ingredientView.parentView = this
      @$el.append ingredientView.el

    _listenForDestory: ->
      @options.selectionView.once "destroy", @stopListening, this

