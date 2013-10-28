define(["jquery", "underscore", "backbone", "collections/TimelineItemsCollection", "views/store/shared/timeline/TimelineBaseView"], function($, _, Backbone, TimelineItemsCollection, TimelineBaseView) {
  var CategoriesNavigationView;
  return CategoriesNavigationView = Backbone.View.extend({
    timelineItemsCollection: null,
    currentCategoryIndex: 0,
    animationTime: 400,
    scrollListnening: true,
    $content: null,
    $categories: null,
    $navigation: null,
    $navigationStage: null,
    $navigationOverlay: null,
    $navigationOverlayWrapper: null,
    $navigationItems: null,
    initialize: function() {
      this._prepareTimelineItems();
      this._render();
      this._cacheDom();
      this._initializeClickListneres();
      return this._initializeScrollListneres();
    },
    _cacheDom: function() {
      this.$content = this.$(".content");
      this.$categories = this.$content.find("#categories").children();
      this.$navigation = this.$("#categoriesNavigation");
      this.$navigationStage = this.$navigation.find("#stageTimeline");
      this.$navigationItems = this.$navigationStage.find(".itemTimeline");
      this.$navigationOverlay = this.$navigation.find("#overlayTimeline");
      return this.$navigationOverlayWrapper = this.$navigationOverlay.find("#overlayFrameWrapperTimeline");
    },
    _prepareTimelineItems: function() {
      this.timelineItemsCollection = new TimelineItemsCollection();
      return _.each(this.collection.models, (function(categoryModel) {
        return this.timelineItemsCollection.add({
          image: categoryModel.get("smallImage"),
          icon: categoryModel.get("icon")
        });
      }), this);
    },
    _render: function() {
      return new TimelineBaseView({
        el: this.$("#categoriesNavigation"),
        collection: this.timelineItemsCollection
      });
    },
    _initializeClickListneres: function() {
      var self;
      self = this;
      return this.$navigationItems.each(function(index) {
        var $this;
        $this = $(this);
        return $this.on("click", function() {
          self.currentCategoryIndex = index;
          return self._navigate();
        });
      });
    },
    _initializeScrollListneres: function() {
      var $categories, $content, antepenultimate, currentIndex, self, timer;
      self = this;
      $content = this.$content;
      $categories = this.$categories;
      antepenultimate = $categories.length - 3;
      currentIndex = void 0;
      timer = void 0;
      return $content.on("scroll", function() {
        if (self.scrollListnening) {
          clearTimeout(timer);
          return timer = setTimeout(function() {
            currentIndex = -1;
            $categories.each(function() {
              if ($(this).position().top < 90) {
                return currentIndex++;
              }
            });
            if (currentIndex > antepenultimate && currentIndex < ($categories.length - 1) && $content.scrollTop() === $content[0].scrollHeight - $content.height()) {
              currentIndex++;
            }
            self.currentCategoryIndex = currentIndex;
            return self._slideTimeline();
          }, 20);
        }
      });
    },
    _navigate: function() {
      this._slideTimeline();
      return this._scrollContent();
    },
    _slideTimeline: function() {
      var offsetRelative;
      offsetRelative = this.currentCategoryIndex * 70;
      this.$navigationOverlay.stop().animate({
        left: offsetRelative - 10
      }, this.animationTime);
      return this.$navigationOverlayWrapper.stop().animate({
        left: -offsetRelative
      }, this.animationTime);
    },
    _scrollContent: function() {
      var $currentCategory, self;
      $currentCategory = this.$categories.eq(this.currentCategoryIndex);
      self = this;
      this.scrollListnening = false;
      return this.$content.stop().animate({
        scrollTop: $currentCategory.position().top + this.$content.scrollTop() - 10
      }, this.animationTime, function() {
        return self.scrollListnening = true;
      });
    }
  });
});

/*
//@ sourceMappingURL=CategoriesNavigationView.js.map
*/