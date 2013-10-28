define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
  var SectionBaseView;
  return SectionBaseView = Backbone.View.extend({
    $content: null,
    $assortmentControls: null,
    $loader: null,
    className: "",
    controlViewClass: null,
    collectionClass: null,
    controlView: null,
    initialize: function() {
      this._cacheDom();
      this._initializeCollection();
      this._renderControl();
      return this._fetchCollection();
    },
    _cacheDom: function() {
      this.$content = this.$(".slide." + this.className);
      this.$assortmentControls = this.$(".assortmentControls." + this.className);
      return this.$loader = this.$("#loader");
    },
    _initializeCollection: function() {
      return this.collection = new this.collectionClass();
    },
    _fetchCollection: function() {},
    _renderContent: function() {},
    _renderControl: function() {
      return this.controlView = new this.controlViewClass({
        el: this.$assortmentControls,
        $loader: this.$loader,
        collection: this.collection
      });
    },
    destroy: function() {
      return this.controlView.destroy();
    }
  });
});

/*
//@ sourceMappingURL=SectionBaseView.js.map
*/