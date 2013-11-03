define ["jquery", "underscore", "backbone", "text!templates/store/selection/info/ingredientsSelection/IngredientTemplate.html"], ($, _, Backbone, IngredientTemplate) ->

  IngredientView = Backbone.View.extend

    className: "ingredient"
    template: _.template(IngredientTemplate)
    events:
      "click span": "unselect"

    initialize: ->
      @render()

    render: ->
      @$el.html @template(@model.toJSON())

    unselect: ->
      # first try if change is possible
      @model.set { isSelected: false }, { silent: true }
      if @parentView.model.isComplete()
        @model.trigger "change:isSelected"
      else
        @model.set { isSelected: true }, { silent: true }

