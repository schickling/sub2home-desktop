define(["jquery", "underscore", "backbone", "collections/TimelineItemsCollection", "views/store/shared/timeline/TimelineBaseView"], function($, _, Backbone, TimelineItemsCollection, TimelineBaseView) {
  var SectionsNavigationView;
  return SectionsNavigationView = Backbone.View.extend({
    timelineItemsCollection: null,
    currentSectionIndex: 0,
    animationTime: 400,
    scrollListnening: true,
    $stage: null,
    $slides: null,
    $navigation: null,
    $navigationStage: null,
    $navigationOverlay: null,
    $navigationOverlayWrapper: null,
    $navigationItems: null,
    $assortmentControls: null,
    initialize: function() {
      this._prepareTimelineItems();
      this._render();
      this._cacheDom();
      return this._initializeClickListneres();
    },
    _prepareTimelineItems: function() {
      var timelineItems;
      timelineItems = [
        {
          image: "https://d3uu6huyzvecb1.cloudfront.net/images/categories/smallimages/sub.png",
          icon: "iSub"
        }, {
          image: "https://d3uu6huyzvecb1.cloudfront.net/images/common/menuupgrade.png",
          icon: "iMenuUpgrade"
        }, {
          image: "https://d3uu6huyzvecb1.cloudfront.net/images/common/menubundle.png",
          icon: "iMenuBundle"
        }, {
          image: "https://d3uu6huyzvecb1.cloudfront.net/images/ingredientcategories/smallimages/vegetables.png",
          icon: "iVegetables"
        }
      ];
      return this.timelineItemsCollection = new TimelineItemsCollection(timelineItems);
    },
    _cacheDom: function() {
      this.$stage = this.$("#stage");
      this.$slides = this.$stage.children();
      this.$navigation = this.$("#sectionsNavigation");
      this.$navigationStage = this.$navigation.find("#stageTimeline");
      this.$navigationItems = this.$navigationStage.find(".itemTimeline");
      this.$navigationOverlay = this.$navigation.find("#overlayTimeline");
      this.$navigationOverlayWrapper = this.$navigationOverlay.find("#overlayFrameWrapperTimeline");
      return this.$assortmentControls = this.$(".assortmentControls");
    },
    _render: function() {
      return new TimelineBaseView({
        el: this.$("#sectionsNavigation"),
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
          self.currentSectionIndex = index;
          return self._navigate();
        });
      });
    },
    _navigate: function() {
      this._slideTimeline();
      this._slideContent();
      return this._changeControlView();
    },
    _slideTimeline: function() {
      var offsetRelative;
      offsetRelative = this.currentSectionIndex * 70;
      this.$navigationOverlay.stop().animate({
        left: offsetRelative - 10
      }, this.animationTime);
      return this.$navigationOverlayWrapper.stop().animate({
        left: -offsetRelative
      }, this.animationTime);
    },
    _slideContent: function() {
      var left, leftPercentage;
      left = -(this.currentSectionIndex * 100);
      leftPercentage = left + "%";
      return this.$stage.animate({
        left: leftPercentage
      });
    },
    _changeControlView: function() {
      var $newControl, $oldControls;
      $newControl = this.$assortmentControls.eq(this.currentSectionIndex);
      $oldControls = this.$assortmentControls.not($newControl);
      $oldControls.hide();
      return $newControl.show();
    }
  });
});

/*
//@ sourceMappingURL=SectionsNavigationView.js.map
*/