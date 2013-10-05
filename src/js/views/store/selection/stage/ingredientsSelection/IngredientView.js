define(["jquery", "jqueryRotate", "underscore", "backbone", "text!templates/store/selection/stage/ingredientsSelection/IngredientTemplate.html"], function($, jqueryRotate, _, Backbone, IngredientTemplate) {
  var IngredientView;
  return IngredientView = Backbone.View.extend({
    className: "item ingredient",
    template: _.template(IngredientTemplate),
    events: {
      click: "_toggleSelected"
    },
    initialize: function() {
      this.model.bind("change:isSelected", this._updateView, this);
      this._render();
      return this._updateView();
    },
    _render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this.$(".accentIngredient").rotate();
    },
    _updateView: function() {
      return this.$el.toggleClass("selected", !!this.model.get("isSelected"));
    },
    _toggleSelected: function() {
      var isSelected;
      isSelected = this.model.get("isSelected");
      this.model.set({
        isSelected: !isSelected
      }, {
        silent: true
      });
      if (this.parentView.model.isComplete()) {
        this.model.trigger("change:isSelected");
        return this.parentView.notifyOtherIngredients(this.model);
      } else {
        return this.model.set({
          isSelected: isSelected
        }, {
          silent: true
        });
      }
    }
  });
});
