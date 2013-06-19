// Filename: src/js/models/MenuComponentOptionArticleModel.js
define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

	// needed because of cyclic dependencies

	var MenuComponentOptionArticleModel = Backbone.Model.extend({

		defaults: {
			title: '',
			image: '',
			description: '',
			info: '',
			isSelected: false
		}

	});

	return MenuComponentOptionArticleModel;

});