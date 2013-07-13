// Filename: src/js/views/store/selection/stage/menuUpgradeSelection/NoUpgradeView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/selection/stage/menuUpgradeSelection/NoUpgradeTemplate.html'
	], function ($, _, Backbone, NoUpgradeTemplate) {

	"use strict";

	var NoUpgradeView = Backbone.View.extend({

		/*
		 * this.model: ordered article model
		 */

		template: _.template(NoUpgradeTemplate),

		events: {
			'click': '_resetMenuUpgrade'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {
			var articleModel = this.model.get('articleModel'),
				json = {
					currentArticleImage: articleModel.get('largeImage'),
					currentArticleTitle: articleModel.get('title')
				};

			this.$el.html(this.template(json));

			this.$el.attr('id', 'noUpgrade');
		},

		_resetMenuUpgrade: function () {
			this.model.set('menuUpgradeModel', null);
			this.model.get('orderedItemModel').reduceOrderedArticles();
		}

	});

	return NoUpgradeView;

});