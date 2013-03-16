// Filename: src/js/views/store/dashboard/details/OrderedArticleView.js
define([
    'jquery',
    'underscore',
    'backbone',
	'text!templates/store/dashboard/details/OrderedArticleTemplate.html'
    ], function ($, _, Backbone, OrderedArticleTemplate) {

	var OrderedArticleView = Backbone.View.extend({

		className: 'orderedArticle',

		template: _.template(OrderedArticleTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {
			var json = {

			};

			this.$el.html(this.template(json));
		}

	});

	return OrderedArticleView;

});