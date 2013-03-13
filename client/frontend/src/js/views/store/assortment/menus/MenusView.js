// Filename: src/js/views/store/assortment/menus/MenusView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/MenusCollection',
    'views/store/assortment/SectionBaseView',
    'views/store/assortment/menus/MenuView',
    'views/store/assortment/menus/ControlView'
    ], function ($, _, Backbone, MenusCollection, SectionBaseView, MenuView, ControlView) {

	var MenusView = SectionBaseView.extend({

		controlViewClass: ControlView,
		collectionClass: MenusCollection,

		contentDiv: '#menusSection',

		_fetchCollection: function () {
			var self = this;

			this.collection.fetch({
				success: function () {
					self._renderContent();
				}
			});
		},

		_renderContent: function () {
			_.each(this.collection.models, function (menuModel) {
				this._renderMenu(menuModel);
			}, this);
		},

		_renderMenu: function (menuModel) {
			var menuView = new MenuView({
				model: menuModel
			});

			this.$content.append(menuView.el);
		}

	});

	return MenusView;

});