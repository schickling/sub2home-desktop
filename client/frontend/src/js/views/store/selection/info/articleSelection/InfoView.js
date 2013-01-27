// Filename: src/js/views/store/selection/info/articleSelection/InfoView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/selection/info/InfoBaseView',
	'text!templates/store/selection/info/articleSelection/InfoTemplate.html'
	], function ($, _, Backbone, InfoBaseView, InfoTemplate) {

	var InfoView = InfoBaseView.extend({
		
		template: _.template(InfoTemplate)

	});

	return InfoView;

});