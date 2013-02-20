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
			'click .deleteItem': '_destroy',
			'click .itemPreview': '_edit'
		},

		initialize: function () {
			if (this.model.isMenu()) {
				this._renderOrderedMenu();
			} else {
				this._renderOrderedArticleSingle();
			}
		},

		_renderOrderedMenu: function () {
			var orderedMenuView = new OrderedMenuView({
				model: this.model,
				el: this.$el
			});
		},

		_renderOrderedArticleSingle: function () {
			var orderedArticleSingleView = new OrderedArticleSingleView({
				model: this.model,
				el: this.$el
			});
		},

		_destroy: function () {
			var self = this;

			this.model.destroy();

			self.$el.fadeOut(function () {
				self.remove();
			});
		},

		_edit: function () {
			router.navigate('store/theke/aendern/' + this.model.get('id'), true);
		}

	});

	return OrderedItemView;

});