// Filename: src/js/views/client/dashboard/MainView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'models/stateModel',
	'models/ClientModel',
	'views/PageView',
	'views/client/dashboard/StoresView',
	'text!templates/client/dashboard/MainTemplate.html'
	], function ($, _, Backbone, router, stateModel, ClientModel, PageView, StoresView, MainTemplate) {

	var MainView = PageView.extend({

		initialize: function () {
			this.model = new ClientModel();
			this.model.fetch({
				async: false
			});

			// select store model if not already selected
			this._selectFirstStoreModel();

			this._switchHeaderToClientView();

			this._render();
		},

		_render: function () {
			this.$el.html(MainTemplate);

			new StoresView({
				el: this.$('#clientStores'),
				collection: this.model.get('storesCollection')
			});

			this.append();
		},

		_switchHeaderToClientView: function() {
			stateModel.set('isClientHeaderActive', true);
		},

		_checkIfClientOwnsJustOneStore: function () {
			var storesCollection = this.model.get('storesCollection');

			if (storesCollection.length === 1) {
				var storeModel = storesCollection.first();

				router.navigate(storeModel.get('alias'), {
					trigger: true,
					replace: true
				});
			}
		}


	});

	return MainView;

});