// Filename: src/js/views/store/dashboard/details/OrderedItemView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/store/dashboard/details/OrderedArticlesView'
    ], function ($, _, Backbone, OrderedArticlesView) {

	var OrderedItemView = Backbone.View.extend({

		className: 'orderArticle',

		initialize: function () {
			this._render();
		},

		_render: function () {
			new OrderedArticlesView({
				el: this.$el,
				collection: this.model.get('orderedArticlesCollection')
			});
		}

	});

	return OrderedItemView;

});