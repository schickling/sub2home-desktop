define([
	'jquery',
	'underscore',
	'backbone',
	'views/store/home/ItemsView',
	'text!templates/store/home/CategoryTemplate.html'
	], function ($, _, Backbone, ItemsView, CategoryTemplate) {

	var CategoryView = Backbone.View.extend({

		className: 'category',

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(_.template(CategoryTemplate, this.model.toJSON()));

			this.$el.attr('id', this.model.get('alias'));

			var itemsView = new ItemsView({
				collection: this.model.get('itemsCollection'),
				el: this.$('.items')
			});
		}

	});

	return CategoryView;

});