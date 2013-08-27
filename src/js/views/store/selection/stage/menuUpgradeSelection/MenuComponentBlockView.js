// Filename: src/js/views/store/selection/stage/menuUpgradeSelection/MenuComponentBlockView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/store/selection/stage/menuUpgradeSelection/MenuComponentBlockTemplate.html'
], function ($, _, Backbone, MenuComponentBlockTemplate) {

	"use strict";

	var MenuComponentBlockView = Backbone.View.extend({

		className: 'menuComponentBlock',

		template: _.template(MenuComponentBlockTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {

			var menuComponentBlockMediaModel = this.model.get('menuComponentBlockMediaModel'),
				json = {
					title: this._getComposedTitle(),
					image: menuComponentBlockMediaModel.get('largeImage')
				};

			this.$el.html(this.template(json));

			this.$el.addClass(menuComponentBlockMediaModel.get('placeholder'));
		},

		_getComposedTitle: function () {
			var menuComponentOptionsCollection = this.model.get('menuComponentOptionsCollection'),
				composedTitle = '',
				menuComponentOptionTitle;

			for (var i = 0; i < menuComponentOptionsCollection.length; i++) {
				menuComponentOptionTitle = menuComponentOptionsCollection.models[i].get('title');

				if (i === menuComponentOptionsCollection.length - 1) { // if last
					composedTitle += menuComponentOptionTitle;
				} else if (i === menuComponentOptionsCollection.length - 2) { // if penultimate
					composedTitle += menuComponentOptionTitle + ' oder ';
				} else {
					composedTitle += menuComponentOptionTitle + ', ';
				}
			}

			return composedTitle;
		}

	});

	return MenuComponentBlockView;

});