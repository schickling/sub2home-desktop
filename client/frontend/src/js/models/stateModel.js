// Filename: src/js/models/stateModel.js
define([
	'underscore',
	'backbone',
	'backboneLocalStorage',
	'models/StoreModel'
	], function (_, Backbone, backboneLocalStorage, StoreModel) {

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

			// parameters for selection
			selectionRessourceType: '',
			selectionRessourceId: '',

			// route names
			currentRoute: '',
			prevRoute: ''

		},

		initialize: function () {

			// fetch if exists
			this.fetch(0);


			// save on change
			this.on('change', function () {
				console.log('state saved:');
				console.log(this.changedAttributes());
				this.save({}, {
					silent: true
				});
			}, this);


			// initialize store model if needed
			if (!this.get('storeModel') && this.get('storeAlias') !== '') {
				this.fetchNewStore();
			}


			// save old route
			this.on('change:currentRoute', function () {
				this.set({
					prevRoute: this.previous('currentRoute')
				}, {
					silent: true
				});
			}, this);


			// load new store on alias change
			this.on('change:storeAlias', function () {
				this.fetchNewStore();
			}, this);


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

		// fetch store from server
		fetchNewStore: function () {

			console.log('fetched');

			var storeModel = new StoreModel({
				alias: this.get('storeAlias')
			});

			var self = this;

			storeModel.fetch({
				success: function () {
					self.set({
						storeModel: storeModel,

						// cache store changed in boolean
						// needed if listener for storeAlias:change wasn't initialized yet in cartModel
						changedStore: true
					});
				},
				error: function () {
					// improved that
					Backbone.history.navigate('404', {
						trigger: true,
						replace: true
					});
				}
			});
		},

		hasChangedStore: function () {
			if (this.get('changedStore')) {
				this.set('changedStore', false);

				return true;
			}

			return false;
		}

	});

	return new StateModel();
});