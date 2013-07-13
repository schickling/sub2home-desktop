// Filename: src/js/views/store/selection/info/menuUpgradeSelection/InfoView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/info/InfoBaseView',
	'text!templates/store/selection/info/menuUpgradeSelection/InfoTemplate.html'
	], function ($, _, Backbone, InfoBaseView, InfoTemplate) {

	"use strict";

	var InfoView = InfoBaseView.extend({
		
		template: _.template(InfoTemplate)

	});

	return InfoView;

});