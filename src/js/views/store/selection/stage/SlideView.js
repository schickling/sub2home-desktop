define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
  var SlideView;
  return SlideView = Backbone.View.extend({
    className: "slide",
    isScrollIconVisible: true,
    $scrollIcon: null,
    events: {
      "click .showAll": "_scrollDown",
      scroll: "_hideScrollIcon"
    },
    initialize: function() {
      var self;
      self = this;
      this._renderSlideWrapper();
      this._renderScrollIcon();
      this.afterInitialize();
      return this.$el.parent().on("align", function() {
        return self._alignView();
      });
    },
    _alignView: function() {
      var $slideContainer, isScrollable, marginTop, newHeight, showScrollIcon, totalHeight, wrappedHeight;
      this.adjustWidth();
      $slideContainer = this.$el.parent();
      wrappedHeight = $slideContainer.height();
      totalHeight = this.el.scrollHeight;
      newHeight = void 0;
      marginTop = void 0;
      isScrollable = totalHeight > wrappedHeight;
      showScrollIcon = (totalHeight - wrappedHeight) > 140;
      if (isScrollable) {
        newHeight = wrappedHeight;
        marginTop = 0;
      } else {
        newHeight = totalHeight;
        marginTop = (wrappedHeight - totalHeight) / 2;
      }
      this.$el.css({
        height: newHeight,
        marginTop: marginTop
      });
      this.$el.toggleClass("isScrollable", isScrollable);
      return this.$scrollIcon.toggle(showScrollIcon);
    },
    adjustWidth: function() {
      return this.$el.width(window.innerWidth - 160);
    },
    afterInitialize: function() {},
    _renderSlideWrapper: function() {
      var $el;
      $el = $("<div>").addClass(this.className).appendTo(this.$el);
      this.$el = $el;
      return this.el = $el.get(0);
    },
    _renderScrollIcon: function() {
      var $scrollIcon;
      $scrollIcon = $("<div class=\"showAll\">&#xe09b</div>");
      this.$el.append($scrollIcon);
      return this.$scrollIcon = $scrollIcon;
    },
    _scrollDown: function() {
      var wrappedHeight;
      wrappedHeight = this.$el.parent().height();
      return this.$el.animate({
        scrollTop: wrappedHeight
      });
    },
    _hideScrollIcon: function() {
      if (this.isScrollIconVisible) {
        this.$scrollIcon.fadeOut(200);
        return this.isScrollIconVisible = false;
      }
    }
  });
});

/*
//@ sourceMappingURL=SlideView.js.map
*/