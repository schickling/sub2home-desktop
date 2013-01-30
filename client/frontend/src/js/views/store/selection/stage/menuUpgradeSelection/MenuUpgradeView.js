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

		initialize: function () {
			this.orderedArticleModel = this.options.orderedArticleModel;

			this.render();
		},

		render: function () {
			var currentArticleModel = this.orderedArticleModel.get('articleModel'),
				menuComponentBlocksCollection = this.model.get('menuComponentBlocksCollection'),
				firstMenuComponentBlockModel, menuComponentOptionsCollection, firstMenuComponentOptionModel, secondMenuComponentBlockModel, secondMenuComponentOptionModel;

			var json = {
				title: this.model.get('title'),
				price: this.model.get('price'),
				description: this.model.get('description'),
				currentArticleImage: currentArticleModel.get('largeImage'),
				currentArticleTitle: currentArticleModel.get('title')
			};

			// first menu component option
			if (menuComponentBlocksCollection.length > 0) {
				firstMenuComponentBlockModel = menuComponentBlocksCollection.first();
				menuComponentOptionsCollection = firstMenuComponentBlockModel.get('menuComponentOptionsCollection');
				firstMenuComponentOptionModel = menuComponentOptionsCollection.first();

				json.firstMenuComponentOptionImage = firstMenuComponentOptionModel.get('largeImage');
				json.firstMenuComponentOptionTitle = firstMenuComponentOptionModel.get('title');
			}

			// second menu component option
			if (menuComponentBlocksCollection.length > 1) {
				secondMenuComponentBlockModel = menuComponentBlocksCollection.at(1);
				menuComponentOptionsCollection = secondMenuComponentBlockModel.get('menuComponentOptionsCollection');
				secondMenuComponentOptionModel = menuComponentOptionsCollection.first();

				json.secondMenuComponentOptionImage = secondMenuComponentOptionModel.get('largeImage');
				json.secondMenuComponentOptionTitle = secondMenuComponentOptionModel.get('title');
			}


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