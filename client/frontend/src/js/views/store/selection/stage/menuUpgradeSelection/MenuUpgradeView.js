// Filename: src/js/views/store/selection/stage/menuUpgradeSelection/MenuUpgradeView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/selection/stage/menuUpgradeSelection/MenuUpgradeTemplate.html'
	], function ($, _, Backbone, MenuUpgradeTemplate) {

	var MenuUpgradeView = Backbone.View.extend({

		className: 'menuUpgrade',

		template: _.template(MenuUpgradeTemplate),

		events: {
			'click': 'select'
		},

		initialize: function() {
			this.orderedArticleModel = this.options.orderedArticleModel;

			this.render();
		},

		render: function () {
			var currentArticleModel = this.orderedArticleModel.get('articleModel');

			var json = {
				title: this.model.get('title'),
				currentArticleImage: currentArticleModel.get('image'),
				currentArticleTitle: currentArticleModel.get('title')
			};

			this.$el.html(this.template(json));
		},

		select: function () {
			// mark current menu upgrade as selected
			this.$el.addClass('selected');

			// unmark other menu upgrades
			this.$el.siblings().removeClass('selected');

			this.orderedArticleModel.set('menuUpgradeModel', this.model);
		}

	});

	return MenuUpgradeView;

});