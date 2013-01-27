// Filename: src/js/views/store/tray/OrderedItemView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'views/store/tray/OrderedArticleSingleView',
	'views/store/tray/OrderedMenuView'
	], function ($, _, Backbone, router, OrderedArticleSingleView, OrderedMenuView) {

	var OrderedItemView = Backbone.View.extend({

		className: 'orderedItem',

		events: {
			'click .deleteItem': 'destroy',
			'click .itemPreview': 'edit'
		},

		initialize: function () {
			if (this.model.isMenu()) {
				this.renderOrderedMenu();
			} else {
				this.renderOrderedArticleSingle();
			}
		},

		renderOrderedMenu: function () {
			var orderedMenuView = new OrderedMenuView({
				model: this.model,
				el: this.$el
			});
		},

		renderOrderedArticleSingle: function () {
			var orderedArticleSingleView = new OrderedArticleSingleView({
				model: this.model,
				el: this.$el
			});
		},

		destroy: function () {
			var self = this;

			this.model.destroy();

			self.$el.fadeOut(function () {
				self.remove();
			});
		},

		edit: function () {
			router.navigate('store/theke/aendern/' + this.model.get('id'), true);
		}

	});

	return OrderedItemView;

});