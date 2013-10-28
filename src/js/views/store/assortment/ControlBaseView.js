define(["jquery", "underscore", "backbone", "text!templates/store/assortment/ControlTemplate.html"], function($, _, Backbone, ControlTemplate) {
  var ControlBaseView;
  return ControlBaseView = Backbone.View.extend({
    template: ControlTemplate,
    numberOfCurrentRequests: 0,
    numberOfItems: 0,
    $loader: null,
    $loadbar: null,
    initialize: function() {
      this._render();
      this._cacheDom();
      return this.listenTo(this.collection, "sync", this._countItems);
    },
    _render: function() {
      return this.$el.html(this.template);
    },
    _countItems: function() {},
    _cacheDom: function() {
      this.$loader = this.options.$loader;
      return this.$loadbar = this.$loader.find("#loadbar");
    },
    _updateModel: function(model, changedAttributes) {
      var self;
      self = this;
      this.numberOfCurrentRequests++;
      return model.save(changedAttributes, {
        success: function() {
          self.numberOfCurrentRequests--;
          self._updateLoadBar();
          return model.trigger("renderAgain");
        }
      });
    },
    _updateLoadBar: function() {
      var progress, relativeWidth;
      progress = 1 - this.numberOfCurrentRequests / this.numberOfItems;
      relativeWidth = progress * 100 + "%";
      if (progress < 1) {
        this.$loader.fadeIn();
      } else {
        this.$loader.fadeOut();
      }
      return this.$loadbar.width(relativeWidth);
    },
    destroy: function() {
      return this.stopListening();
    }
  });
});

/*
//@ sourceMappingURL=ControlBaseView.js.map
*/