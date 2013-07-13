// Filename: src/js/views/store/selection/info/ingredientsSelection/ArticleView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/store/selection/info/ingredientsSelection/ArticleTemplate.html'
    ], function ($, _, Backbone, ArticleTemplate) {

	"use strict";

	var ArticleView = Backbone.View.extend({

		template: _.template(ArticleTemplate),

		initialize: function () {
			this._render();

			this._listenForPriceChange();

			this._listenForDestory();
		},

		_render: function () {
			var json = {
				total: this.model.get('total'),
				image: this.model.get('largeImage'),
				title: this.model.get('title'),
				info: this.model.get('info'),
				description: this.model.get('description')
			};

			this.$el.html(this.template(json));

			this.$el.addClass(this._getImageClass());
		},

		_getImageClass: function () {
			var image = this.model.get('largeImage'),
				imageWithoutFileExtension = image.substr(0, image.lastIndexOf('.'));

			return imageWithoutFileExtension.split('-').pop() || '';
		},

		_listenForPriceChange: function () {
			this.listenTo(this.model, 'change:total', this._render);
		},

		_listenForDestory: function () {
			this.options.selectionView.once('destroy', this.stopListening, this);
		}

	});

	return ArticleView;

});