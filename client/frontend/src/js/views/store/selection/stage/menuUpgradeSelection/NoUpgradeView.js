// Filename: src/js/views/store/selection/stage/menuUpgradeSelection/NoUpgradeView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/selection/stage/menuUpgradeSelection/NoUpgradeTemplate.html'
	], function ($, _, Backbone, NoUpgradeTemplate) {

	var NoUpgradeView = Backbone.View.extend({

		/*
		 * this.model: ordered article model
		 */

		template: _.template(NoUpgradeTemplate),

		className: 'noUpgrade',

		events: {
			'click': 'resetMenuUpgrade'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			var articleModel = this.model.get('articleModel'),
				json = {
					currentArticleImage: articleModel.get('largeImage'),
					currentArticleTitle: articleModel.get('title')
				};

			this.$el.html(this.template(json));
		},

		resetMenuUpgrade: function () {
			this.model.set('menuUpgradeModel', null);
			this.model.get('orderedItemModel').reduceOrderedArticles();
		}

	});

	return NoUpgradeView;

});