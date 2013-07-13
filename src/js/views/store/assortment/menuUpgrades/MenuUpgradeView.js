// Filename: src/js/views/store/assortment/menuUpgrades/MenuUpgradeView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/assortment/ItemBaseView',
    'text!templates/store/assortment/menuUpgrades/MenuUpgradeTemplate.html'
    ], function ($, _, Backbone, ItemBaseView, MenuUpgradeTemplate) {

    "use strict";

	var MenuUpgradeView = ItemBaseView.extend({

		template: _.template(MenuUpgradeTemplate),

		className: 'menuUpgrade'

	});

	return MenuUpgradeView;

});