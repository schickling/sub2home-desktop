// Filename: src/js/views/store/assortment/SectionBaseView.js
define([
    'jquery',
    'underscore',
    'backbone'
    ], function ($, _, Backbone) {

	var SectionBaseView = Backbone.View.extend({

		// dom
		$content: null,
		$assortmentControls: null,
		$loader: null,

		className: '',

		// controll view class
		controlViewClass: null,
		collectionClass: null,

		controlView: null,

		initialize: function () {
			this._cacheDom();
			this._initializeCollection();
			this._renderControl();
			this._fetchCollection();
		},

		_cacheDom: function () {
			this.$content = this.$('.slide.' + this.className);
			this.$assortmentControls = this.$('.assortmentControls.' + this.className);
			this.$loader = this.$('#loader');
		},

		_initializeCollection: function () {
			this.collection = new this.collectionClass();
		},

		_fetchCollection: function () {},

		_renderContent: function () {},

		_renderControl: function () {
			this.controlView = new this.controlViewClass({
				el: this.$assortmentControls,
				$loader: this.$loader,
				collection: this.collection
			});
		},

		destroy: function () {
			this.controlView.destroy();
		}

	});

	return SectionBaseView;

});