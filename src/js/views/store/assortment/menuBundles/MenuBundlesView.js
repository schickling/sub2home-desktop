// Filename: src/js/views/store/assortment/menuBundles/MenuBundlesView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/MenuBundlesCollection',
    'views/store/assortment/SectionBaseView',
    'views/store/assortment/menuBundles/MenuBundleView',
    'views/store/assortment/menuBundles/ControlView'
    ], function ($, _, Backbone, MenuBundlesCollection, SectionBaseView, MenuBundleView, ControlView) {

	var MenuBundlesView = SectionBaseView.extend({

		controlViewClass: ControlView,
		collectionClass: MenuBundlesCollection,

		className: 'menuBundles',

		_fetchCollection: function () {
			var self = this;

			this.collection.fetch({
				success: function () {
					self._renderContent();
				}
			});
		},

		_renderContent: function () {
			_.each(this.collection.models, function (menuBundleModel) {
				this._renderMenuBundle(menuBundleModel);
			}, this);
		},

		_renderMenuBundle: function (menuBundleModel) {
			var menuBundleView = new MenuBundleView({
				model: menuBundleModel
			});

			this.$content.append(menuBundleView.el);
		}

	});

	return MenuBundlesView;

});