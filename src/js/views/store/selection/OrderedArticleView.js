define(["jquery", "underscore", "backbone", "views/store/selection/ArticleSelectionView", "views/store/selection/IngredientsSelectionView", "views/store/selection/MenuUpgradeSelectionView"], function($, _, Backbone, ArticleSelectionView, IngredientsSelectionView, MenuUpgradeSelectionView) {
  var OrderedArticleView;
  return OrderedArticleView = Backbone.View.extend({
    articleSelectionView: null,
    ingredientsSelectionView: null,
    menuUpgradeSelectionView: null,
    parentView: null,
    $slidesWrapper: null,
    $infoWrapper: null,
    initialize: function() {
      this.parentView = this.options.parentView;
      this._render();
      this.listenTo(this.model, "destroy", this._remove);
      this.listenTo(this.model, "articleModelWasSelected", this._renderIngredientsSelectionAgain);
      return this._listenForDestory();
    },
    _render: function() {
      this._createWrapperElements();
      this._renderArticleSelection();
      this._renderIngredientsSelection();
      return this._renderMenuUpgradeSelection();
    },
    _createWrapperElements: function() {
      this._createContentWrapper();
      return this._createInfoWrapper();
    },
    _createContentWrapper: function() {
      var $slidesWrapper, $stage;
      $stage = this.$("#stage");
      $slidesWrapper = $("<div class=\"slidesWrapper\">");
      $stage.append($slidesWrapper);
      return this.$slidesWrapper = $slidesWrapper;
    },
    _createInfoWrapper: function() {
      var $infoContainer, $infoWrapper;
      $infoContainer = this.$("#infoContainer");
      $infoWrapper = $("<div class=\"infoWrapper\">");
      $infoContainer.append($infoWrapper);
      return this.$infoWrapper = $infoWrapper;
    },
    _renderArticleSelection: function() {
      return this.articleSelectionView = new ArticleSelectionView({
        model: this.model,
        el: this.$el,
        $slidesWrapper: this.$slidesWrapper,
        $infoWrapper: this.$infoWrapper
      });
    },
    _renderIngredientsSelection: function(timelineElementInsertIndex, timelineItemInsertIndex) {
      return this.ingredientsSelectionView = new IngredientsSelectionView({
        model: this.model,
        el: this.$el,
        $slidesWrapper: this.$slidesWrapper,
        $infoWrapper: this.$infoWrapper,
        timelineElementInsertIndex: timelineElementInsertIndex,
        timelineItemInsertIndex: timelineItemInsertIndex
      });
    },
    _renderMenuUpgradeSelection: function() {
      return this.menuUpgradeSelectionView = new MenuUpgradeSelectionView({
        model: this.model,
        el: this.$el,
        $slidesWrapper: this.$slidesWrapper,
        $infoWrapper: this.$infoWrapper
      });
    },
    _renderIngredientsSelectionAgain: function() {
      var $prevSlidesWrappers, timelineElementInsertIndex, timelineItemInsertIndex;
      $prevSlidesWrappers = this.$slidesWrapper.prevAll();
      timelineElementInsertIndex = $prevSlidesWrappers.children(".slideContainer").length + 1;
      timelineItemInsertIndex = $prevSlidesWrappers.find(".slide").length + 1;
      if (this.model.isMenuUpgradeBase()) {
        timelineElementInsertIndex++;
        timelineItemInsertIndex++;
      }
      this.ingredientsSelectionView.trigger("destroy");
      return this._renderIngredientsSelection(timelineElementInsertIndex, timelineItemInsertIndex);
    },
    _remove: function() {
      this.articleSelectionView.trigger("destroy");
      this.ingredientsSelectionView.trigger("destroy");
      return this.menuUpgradeSelectionView.trigger("destroy");
    },
    _listenForDestory: function() {
      return this.parentView.once("destroy", (function() {
        this.stopListening();
        return this._remove();
      }), this);
    }
  });
});

/*
//@ sourceMappingURL=OrderedArticleView.js.map
*/