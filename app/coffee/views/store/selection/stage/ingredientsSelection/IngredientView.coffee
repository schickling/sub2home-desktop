define ["jquery", "jqueryRotate", "underscore", "backbone", "text!templates/store/selection/stage/ingredientsSelection/IngredientTemplate.html"], ($, jqueryRotate, _, Backbone, IngredientTemplate) ->

  IngredientView = Backbone.View.extend
    className: "item ingredient"
    template: _.template(IngredientTemplate)
    events:
      click: "_toggleSelected"

    initialize: ->
      @model.bind "change:isSelected", @_updateView, this
      @_render()
      @_updateView()

    _render: ->
      @$el.html @template(@model.toJSON())
      # rotate circle
      @$(".accentIngredient").rotate()

    _updateView: ->
      @$el.toggleClass "selected", !!@model.get("isSelected")

    _toggleSelected: ->
      # first try if change is possible
      isSelected = @model.get("isSelected")
      @model.set { isSelected: not isSelected }, { silent: true }
      if @parentView.model.isComplete()
        @model.trigger "change:isSelected"
        @parentView.notifyOtherIngredients @model
      else
        @model.set { isSelected: isSelected }, { silent: true }


