// Filename: src/js/views/store/assortment/menuBundles/MenuBundleView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/assortment/ItemBaseView',
    'text!templates/store/assortment/menuBundles/MenuBundleTemplate.html'
    ], function ($, _, Backbone, ItemBaseView, MenuBundleTemplate) {

	var MenuBundleView = ItemBaseView.extend({

		template: _.template(MenuBundleTemplate),

		className: 'menuBundle'

	});

	return MenuBundleView;

});