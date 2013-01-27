// Filename: src/js/models/MenuComponentOptionArticleModel.js
define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

	// needed because of cyclic dependencies

	var MenuComponentOptionArticleModel = Backbone.Model.extend({

		defaults: {
			title: '',
			description: '',
			info: '',
			image: '../../../img/articles/subs/bbq_rib.png',

			selected: false
		}

	});

	return MenuComponentOptionArticleModel;

});