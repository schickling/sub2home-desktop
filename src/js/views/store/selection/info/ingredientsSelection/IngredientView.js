define(["jquery", "underscore", "backbone", "text!templates/store/selection/info/ingredientsSelection/IngredientTemplate.html"], function($, _, Backbone, IngredientTemplate) {
  var IngredientView;
  return IngredientView = Backbone.View.extend({
    className: "ingredient",
    template: _.template(IngredientTemplate),
    events: {
      "click span": "unselect"
    },
    initialize: function() {
      return this.render();
    },
    render: function() {
      return this.$el.html(this.template(this.model.toJSON()));
    },
    unselect: function() {
      this.model.set({
        isSelected: false
      }, {
        silent: true
      });
      if (this.parentView.model.isComplete()) {
        return this.model.trigger("change:isSelected");
      } else {
        return this.model.set({
          isSelected: true
        }, {
          silent: true
        });
      }
    }
  });
});
