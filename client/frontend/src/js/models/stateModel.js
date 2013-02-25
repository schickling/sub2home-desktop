// Filename: src/js/models/stateModel.js
define([
	'underscore',
	'backbone',
	'backboneLocalStorage',
	'models/StoreModel',
	'global'
	], function (_, Backbone, backboneLocalStorage, StoreModel, global) {

	var StateModel = Backbone.Model.extend({

		localStorage: new Backbone.LocalStorage('StateModel'),

		defaults: {

			// id needed for singleton
			id: 0,

			postal: 0,

			// store specific data
			storeAlias: '',
			storeModel: null,
			changedStore: false,

			// header state
			isClientHeaderActive: false,
			currentRouteIsClientRelated: false,

			// route names
			currentRoute: '',
			prevRoute: ''

		},

		// TODO: clean up
		initialize: function () {


			// laod from localStorage if exists
			this.fetch();

			var storeModel = this.get('storeModel');

			if (storeModel) {
				this._listenForStoreInternalChanges();
			}


			// save on change
			this.on('change', function () {
				console.log('state saved:');
				console.log(this.changedAttributes());
				this.save({}, {
					silent: true
				});

				this._setGlobalStoreAlias();
			}, this);


			// initialize store model if needed
			if (!storeModel && this.get('storeAlias') !== '') {
				this._fetchStoreModelFromServer();
			}

			// save old route
			this.on('change:currentRoute', function () {
				this.set({
					prevRoute: this.previous('currentRoute')
				}, {
					silent: true
				});

				this.set('currentRouteIsClientRelated', this._currentRouteIsClientRelated());
			}, this);


			// load new store on alias change
			this.on('change:storeAlias', function () {

				var currentStoreModel = this.get('storeModel');

				if (!currentStoreModel || this.get('storeAlias') !== currentStoreModel.get('alias')) {
					this._fetchStoreModelFromServer();
				}

				// switch to store header
				this.set('isClientHeaderActive', false);

			}, this);


			this._setGlobalStoreAlias();


			window.state = this;


		},

		toJSON: function () {

			var attributes = _.clone(this.attributes);

			if (attributes.hasOwnProperty('storeModel')) {
				attributes.storeModel = attributes.storeModel.toJSON();
			}

			return attributes;
		},

		parse: function (response) {

			if (response.hasOwnProperty('storeModel')) {

				var currentStoreModel = this.get('storeModel');

				// if storeModel already initialized it doesn't need to be initialize twice
				if (currentStoreModel) {
					response.storeModel = currentStoreModel;
				} else {
					response.storeModel = new StoreModel(response.storeModel, {
						parse: true
					});
				}
			}

			return response;
		},

		_setGlobalStoreAlias: function () {
			// mirror changes in store alias to global
			global.setStoreAlias(this.get('storeAlias'));
		},

		_fetchStoreModelFromServer: function () {

			console.log('fetched');

			var errorOccured = false,
				storeModel = new StoreModel({
					alias: this.get('storeAlias')
				});

			storeModel.fetch({
				// needed because other views depend on store models
				async: false,
				error: function () {

					errorOccured = true;

					Backbone.history.navigate('404', {
						trigger: true,
						replace: true
					});
				}
			});

			// check if store was avaiable
			if (errorOccured) {

				console.log('damniit');
				this.set('storeModel', null);

			} else {

				this.set({
					storeModel: storeModel,

					// cache store changed in boolean
					// needed if listener for storeAlias:change wasn't initialized yet in cartModel
					changedStore: true
				});

				this._listenForStoreInternalChanges();

			}
		},

		_listenForStoreInternalChanges: function () {
			storeModel = this.get('storeModel');

			storeModel.on('change', function () {
				this.trigger('change');
			}, this);
		},

		// needed for cart model
		hasChangedStore: function () {
			if (this.get('changedStore')) {
				this.set('changedStore', false);

				return true;
			}

			return false;
		},

		doesStoreExist: function () {
			return this.get('storeModel') !== null;
		},

		_currentRouteIsClientRelated: function () {
			var currentRoute = this.get('currentRoute'),
				clientRoutes = [
					'client.dashboard',
					'client.config',
					'store.config',
					'store.dashboard',
					'store.assortment'
					];

			return _.contains(clientRoutes, currentRoute);
		},

		clientOwnsThisStore: function () {
			var storeModel = this.get('storeModel');

			// check with number since number only gets set if client fetches store model
			return storeModel.get('number') !== 0;
		}

	});

	return new StateModel();
});