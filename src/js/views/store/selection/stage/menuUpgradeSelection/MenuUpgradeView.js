// Filename: src/js/views/store/selection/stage/menuUpgradeSelection/MenuUpgradeView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/selection/stage/menuUpgradeSelection/MenuComponentBlockView',
    'text!templates/store/selection/stage/menuUpgradeSelection/MenuUpgradeTemplate.html'
    ], function ($, _, Backbone, MenuComponentBlockView, MenuUpgradeTemplate) {

	"use strict";

	var MenuUpgradeView = Backbone.View.extend({

		$menuComponentBlocks: null,

		className: 'menuUpgrade',

		template: _.template(MenuUpgradeTemplate),

		events: {
			'click': '_select'
		},

		initialize: function () {
			this.orderedArticleModel = this.options.orderedArticleModel;

			this._render();
		},

		_render: function () {
			var baseArticleModel = this.orderedArticleModel.get('articleModel');

			var json = {
				title: this.model.get('title'),
				price: this.model.get('price'),
				description: this.model.get('description'),
				baseArticleImage: baseArticleModel.get('largeImage')
			};

			this.$el.html(this.template(json));

			this._checkSelected();

			this._cacheDom();
			this._renderMenuComponentBlocks();
		},

		_checkSelected: function () {
			var menuUpgradeModel = this.orderedArticleModel.get('menuUpgradeModel');

			if (menuUpgradeModel && menuUpgradeModel.get('id') === this.model.get('id')) {
				this.$el.addClass('selected');
			}
		},

		_cacheDom: function () {
			this.$menuComponentBlocks = this.$('.menuComponentBlocks');
		},

		_renderMenuComponentBlocks: function () {
			var menuComponentBlocksCollection = this.model.get('menuComponentBlocksCollection');

			_.each(menuComponentBlocksCollection.models, function (menuComponentBlockModel) {
				this._renderMenuComponentBlock(menuComponentBlockModel);
			}, this);
		},

		_renderMenuComponentBlock: function (menuComponentBlockModel) {
			var menuComponentBlockView = new MenuComponentBlockView({
				model: menuComponentBlockModel
			});

			this.$menuComponentBlocks.append(menuComponentBlockView.el);
		},

		_select: function () {
			// mark current menu upgrade as selected
			this.$el.addClass('selected');

			// unmark other menu upgrades
			this.$el.siblings().removeClass('selected');

			this.orderedArticleModel.set('menuUpgradeModel', this.model);
		}

	});

	return MenuUpgradeView;

});