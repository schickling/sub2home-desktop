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
		contentDiv: '',

		// controll view class
		controlViewClass: null,
		collectionClass: null,

		initialize: function () {
			this._cacheDom();
			this._initializeCollection();
			this._renderControl();
			this._fetchCollection();
		},

		_cacheDom: function () {
			this.$content = this.$(this.contentDiv);
			this.$assortmentControls = this.$('.assortmentControls');
		},

		_initializeCollection: function () {
			this.collection = new this.collectionClass();
		},

		_fetchCollection: function () {},

		_renderContent: function () {},

		_renderControl: function () {
			new this.controlViewClass({
				el: this.$assortmentControls,
				collection: this.collection
			});
		}

	});

	return SectionBaseView;

});