define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
  var NavigationView;
  return NavigationView = Backbone.View.extend({
    events: {
      "click .infoNavigation li": "_jumpToNavigationItem"
    },
    $content: null,
    $navigation: null,
    $articles: null,
    currentIndex: 0,
    scrollListnening: true,
    initialize: function() {
      this._cacheDom();
      this._render();
      return this._listenToScroll();
    },
    _cacheDom: function() {
      this.$content = this.$(".content");
      this.$articles = this.$content.find("article");
      return this.$navigation = this.$(".infoNavigation");
    },
    _render: function() {
      var $articleHeader, $navigationList, $newListItem;
      $navigationList = this.$navigation.find("ul");
      $articleHeader = void 0;
      $newListItem = void 0;
      this.$articles.each(function() {
        $articleHeader = $(this).find("header h1");
        $newListItem = $("<li>" + $articleHeader.attr("data-nav") + "</li>");
        return $navigationList.append($newListItem);
      });
      return $navigationList.find("li").first().addClass("active");
    },
    _listenToScroll: function() {
      var $articles, $content, antepenultimate, currentIndex, self, timer;
      self = this;
      $content = this.$content;
      $articles = this.$articles;
      antepenultimate = $articles.length - 3;
      currentIndex = void 0;
      timer = void 0;
      return $content.on("scroll", function() {
        if (self.scrollListnening) {
          clearTimeout(timer);
          return timer = setTimeout(function() {
            currentIndex = -1;
            $articles.each(function() {
              if ($(this).offset().top <= 150) {
                return currentIndex++;
              }
            });
            if (currentIndex > antepenultimate && currentIndex < ($articles.length - 1) && $content.scrollTop() === $content[0].scrollHeight - $content.height()) {
              currentIndex++;
            }
            if (currentIndex !== self.currentIndex) {
              self.currentIndex = currentIndex;
              return self._changeActiveNavigationItem();
            }
          }, 20);
        }
      });
    },
    _changeActiveNavigationItem: function() {
      var $newActive, $oldActive;
      $oldActive = this.$navigation.find(".active");
      $newActive = this.$navigation.find("li").eq(this.currentIndex);
      $oldActive.removeClass("active");
      return $newActive.addClass("active");
    },
    _jumpToNavigationItem: function(e) {
      var $currentArticle, $currentNavigationItem, currentIndex, scrollTop, self;
      $currentNavigationItem = $(e.target);
      currentIndex = $currentNavigationItem.index();
      $currentArticle = this.$articles.eq(currentIndex);
      scrollTop = $currentArticle.offset().top + this.$content.scrollTop() - 100;
      self = this;
      this.scrollListnening = false;
      this.currentIndex = currentIndex;
      this._changeActiveNavigationItem();
      return this.$content.animate({
        scrollTop: scrollTop
      }, function() {
        return self.scrollListnening = true;
      });
    }
  });
});

/*
//@ sourceMappingURL=NavigationView.js.map
*/