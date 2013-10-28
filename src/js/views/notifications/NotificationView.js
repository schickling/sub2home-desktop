define(["jquery", "underscore", "backbone", "text!templates/notifications/NotificationTemplate.html"], function($, _, Backbone, NotificationTemplate) {
  var NotificationView;
  return NotificationView = Backbone.View.extend({
    className: "notification",
    template: _.template(NotificationTemplate),
    timer: 0,
    zIndex: 0,
    events: {
      "click .bClose": "_close",
      close: "_close",
      mouseenter: "_stopTimer",
      mouseleave: "_countdown"
    },
    initialize: function() {
      this.zIndex = this.options.zIndex;
      this._render();
      return this._countdown();
    },
    _render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.addClass(this.model.get("className"));
      return this.$el.css({
        zIndex: this.zIndex
      });
    },
    _countdown: function() {
      var self;
      if (this.model.get("duration") > 0) {
        self = this;
        return this.timer = setTimeout(function() {
          return self._destroy();
        }, this.model.get("duration"));
      }
    },
    _stopTimer: function() {
      return clearTimeout(this.timer);
    },
    _close: function() {
      this._stopTimer();
      return this._destroy();
    },
    _destroy: function() {
      var $el;
      $el = this.$el;
      return $el.animate({
        marginTop: -($el.outerHeight(true)),
        opacity: 0
      }, 400, function() {
        return $el.remove();
      });
    },
    slideIn: function() {
      var $el;
      $el = this.$el;
      return $el.css({
        marginTop: -($el.outerHeight(true))
      }).animate({
        marginTop: 0,
        opacity: 1
      }, 300);
    }
  });
});

/*
//@ sourceMappingURL=NotificationView.js.map
*/