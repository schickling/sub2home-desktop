define(["jquery", "jqueryEasing", "jqueryBrowserDetection", "jqueryPlaceholder", "underscore", "backbone", "services/router", "services/notificationcenter", "models/stateModel", "views/assets/transitions"], function($, jqueryEasing, jqueryBrowserDetection, jqueryPlaceholder, _, Backbone, router, notificationcenter, stateModel, transitions) {
  var PageView, pageWasInitialized;
  pageWasInitialized = false;
  return PageView = Backbone.View.extend({
    className: "main",
    pageTitle: "",
    _animationTime: 600,
    subViews: {},
    append: function() {
      if (pageWasInitialized) {
        this._transition();
      } else {
        this._initializePage();
      }
      return document.title = this.pageTitle;
    },
    pageNotFound: function() {
      return router.navigate("404", {
        trigger: true,
        replace: true
      });
    },
    _initializePage: function() {
      this.$el.appendTo($("body"));
      this._finalizeLoad();
      $.browserDetection({
        addClasses: true
      });
      return pageWasInitialized = true;
    },
    _finalizeLoad: function() {
      if (pageWasInitialized) {
        this.options.currentPageView.destroy();
      }
      if (!("placeholder" in document.createElement("input"))) {
        this.$el.find("input").placeholder();
      }
      if (!("placeholder" in document.createElement("textarea"))) {
        return this.$el.find("textarea").placeholder();
      }
    },
    _transition: function() {
      var currentRoute, currentTransition, prevRoute;
      prevRoute = stateModel.get("prevRoute");
      currentRoute = stateModel.get("currentRoute");
      currentTransition = _.find(transitions, function(transition) {
        return transition.origin === prevRoute && transition.destination === currentRoute;
      });
      if (currentTransition) {
        switch (currentTransition.type) {
          case "a.forward":
            return this._transitionAFoward();
          case "a.backward":
            return this._transitionABackward();
          case "b.forward":
            return this._transitionBFoward();
          case "b.backward":
            return this._transitionBBackward();
          case "c.forward":
            return this._transitionCFoward();
          case "c.backward":
            return this._transitionCBackward();
        }
      } else {
        return this._transitionDefault();
      }
    },
    _transitionAFoward: function() {
      var $current, $currentContent, $currentNote, $currentNoteContainer, $new, $newContent, $newNote, $newNoteContainer, self;
      $new = this.$el;
      $newNote = $new.find("#storeNote");
      $newNoteContainer = $newNote.children(".container");
      $newContent = $new.find(".content");
      $current = $(".main");
      $currentNote = $current.find("#homeNote");
      $currentNoteContainer = $currentNote.children(".container");
      $currentContent = $current.find(".content");
      self = this;
      $currentNote.delay(300).animate({
        height: 150,
        paddingBottom: 0
      }, this._animationTime, function() {
        $currentNoteContainer.remove();
        $newNoteContainer.hide().appendTo($currentNote).fadeIn();
        return $currentNote.attr("id", "storeNote");
      });
      $currentNoteContainer.fadeOut();
      $newContent.css({
        top: 150
      }).appendTo($current);
      return $currentContent.delay(300).animate({
        top: "100%"
      }, this._animationTime, "easeInOutQuad", function() {
        $currentContent.remove();
        self.$el = $current;
        self.delegateEvents();
        return self._finalizeLoad();
      });
    },
    _transitionABackward: function() {
      var $current, $currentContent, $currentNote, $currentNoteContainer, $new, $newContent, $newNote, $newNoteContainer, self;
      $new = this.$el;
      $newNote = $new.find("#homeNote");
      $newNoteContainer = $newNote.children(".container");
      $newContent = $new.find(".content");
      $current = $(".main");
      $currentNote = $current.find("#storeNote");
      $currentNoteContainer = $currentNote.children(".container");
      $currentContent = $current.find(".content");
      self = this;
      $currentNote.animate({
        height: 240
      }, this._animationTime, function() {
        $currentNoteContainer.remove();
        $newNoteContainer.hide().appendTo($currentNote).fadeIn();
        return $currentNote.attr("id", "homeNote");
      });
      $currentNoteContainer.fadeOut();
      return $newContent.css({
        top: "100%"
      }).appendTo($current).animate({
        top: 0
      }, this._animationTime, "easeInOutQuad", function() {
        $currentContent.remove();
        self.$el = $current;
        self.delegateEvents();
        return self._finalizeLoad();
      });
    },
    _transitionBFoward: function() {
      var $current, $new, self;
      $new = this.$el;
      $current = $(".main");
      self = this;
      $new.addClass("bFwd").appendTo($("body"));
      $new.animate({
        top: 0
      }, this._animationTime, "easeInOutQuad", function() {
        return $new.removeClass("bFwd");
      });
      return $current.stop().animate({
        top: "100%"
      }, this._animationTime, "easeInOutQuad", function() {
        $current.remove();
        return self._finalizeLoad();
      });
    },
    _transitionBBackward: function() {
      var $current, $new, self;
      $new = this.$el;
      $current = $(".main");
      self = this;
      $new.addClass("bBwd").appendTo($("body"));
      $new.animate({
        top: 0
      }, this._animationTime, "easeInOutQuad", function() {
        return $new.removeClass("bBwd");
      });
      return $current.stop().animate({
        top: "-100%"
      }, this._animationTime, "easeInOutQuad", function() {
        $current.remove();
        return self._finalizeLoad();
      });
    },
    _transitionCFoward: function() {
      var $current, $new, self;
      $new = this.$el;
      $current = $(".main");
      self = this;
      $new.addClass("cFwd").appendTo($("body"));
      $new.animate({
        left: 0
      }, this._animationTime, "easeInOutQuad", function() {
        return $new.removeClass("cFwd");
      });
      return $current.stop().animate({
        left: "-100%"
      }, this._animationTime, "easeInOutQuad", function() {
        $current.remove();
        return self._finalizeLoad();
      });
    },
    _transitionCBackward: function() {
      var $current, $new, self;
      $new = this.$el;
      $current = $(".main");
      self = this;
      $new.addClass("cBwd").appendTo($("body"));
      $new.animate({
        left: 0
      }, this._animationTime, "easeInOutQuad", function() {
        return $new.removeClass("cBwd");
      });
      return $current.stop().animate({
        left: "100%"
      }, this._animationTime, "easeInOutQuad", function() {
        $current.remove();
        return self._finalizeLoad();
      });
    },
    _transitionDefault: function() {
      var $current, $new, self;
      $new = this.$el;
      $current = $(".main");
      self = this;
      $new.css({
        opacity: 0
      }).appendTo($("body"));
      return $new.animate({
        opacity: 1
      }, this._animationTime, function() {
        $current.remove();
        return self._finalizeLoad();
      });
    },
    destroy: function() {
      return this.destroyAllSubViews();
    },
    destroyAllSubViews: function() {
      var key, _results;
      _results = [];
      for (key in this.subViews) {
        if (this.subViews[key]) {
          _results.push(this.subViews[key].destroy());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  });
});
