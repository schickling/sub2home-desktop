define(["jquery", "jqueryOverscroll", "underscore", "backbone", "views/store/dashboard/revenues/RevenuesYearView"], function($, jqueryOverscroll, _, Backbone, RevenuesYearView) {
  var RevenuesView;
  return RevenuesView = Backbone.View.extend({
    wasRendered: false,
    $turnoverContainer: null,
    $orderControls: null,
    events: {
      "click #toggleRevenues": "_toggle"
    },
    initialize: function() {
      return this._cacheDom();
    },
    _render: function() {
      this._renderRevenuesYears();
      return this.$turnoverContainer.overscroll({
        showThumbs: false,
        direction: "horizontal",
        wheelDirection: "horizontal"
      });
    },
    _cacheDom: function() {
      this.$turnoverContainer = this.$("#turnoverContainer");
      return this.$orderControls = this.$("#orderControls");
    },
    _renderRevenuesYears: function() {
      var year, yearsCollection;
      yearsCollection = this.collection.getSplittedCollectionsByYears();
      for (year in yearsCollection) {
        this._renderRevenuesYear(yearsCollection[year]);
      }
      return this.wasRendered = true;
    },
    _renderRevenuesYear: function(invoicesCollection) {
      var revenuesYearView;
      revenuesYearView = new RevenuesYearView({
        collection: invoicesCollection
      });
      return this.$turnoverContainer.prepend(revenuesYearView.el);
    },
    _toggle: function() {
      var $content, $el, $iTurnover, $orderControls, $revenues, $toggleRevenues, animationTime;
      animationTime = 300;
      $el = this.$el;
      $toggleRevenues = this.$("#toggleRevenues");
      $revenues = this.$("#revenues");
      $content = $(".content");
      $orderControls = this.$orderControls;
      $iTurnover = $toggleRevenues.find("#turnover");
      if (!this.wasRendered) {
        this._render();
      }
      if ($toggleRevenues.hasClass("toggled")) {
        $toggleRevenues.removeClass("toggled");
        $iTurnover.animate({
          paddingLeft: 0
        }, animationTime);
        return $revenues.animate({
          opacity: 0
        }, animationTime / 2, function() {
          $el.animate({
            height: 150
          }, animationTime);
          $content.animate({
            top: 150
          }, animationTime);
          return $orderControls.fadeIn(animationTime);
        });
      } else {
        $el.animate({
          height: 400
        }, animationTime, function() {
          return $revenues.animate({
            opacity: 1
          }, animationTime / 2);
        });
        $orderControls.fadeOut(animationTime);
        $iTurnover.animate({
          paddingLeft: 40
        }, animationTime, function() {
          return $toggleRevenues.addClass("toggled");
        });
        return $content.animate({
          top: 400
        }, animationTime);
      }
    }
  });
});

/*
//@ sourceMappingURL=RevenuesView.js.map
*/