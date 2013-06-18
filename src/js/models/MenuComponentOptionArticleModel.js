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
			image: 'https://s3-eu-west-1.amazonaws.com/sub2home-static/images/categories/smallimages/getraenk.png/articles/subs/bbq_rib.png',

			isSelected: false
		}

	});

	return MenuComponentOptionArticleModel;

});