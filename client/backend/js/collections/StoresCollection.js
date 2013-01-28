// Filename: js/models/StoresCollection.js
define([
	'underscore',
	'backbone',
	'models/StoreModel'
	], function (_, Backbone, StoreModel) {

	var StoresCollection = Backbone.Collection.extend({

		model: StoreModel,

		sort_field: 'number',

		direction: 1,

		search: function (keyword) {
			var pattern = new RegExp(keyword, "gi");

			return this.filter(function (data) {
				// Check stores
				var test_store_title = false;
				var test_store_number = false;
				_.each(data.get('stores'), function (store) {
					test_store_title = test_store_title || pattern.test(store.title);
					test_store_number = test_store_number || pattern.test(store.number);
				});

				var test_first_name = pattern.test(data.get('address').first_name),
					test_last_name = pattern.test(data.get('address').last_name),
					test_client_number = pattern.test(data.get('number'));

				return test_first_name || test_last_name || test_client_number || test_store_title || test_store_number;
			});
		},

		comparator: function (client) {
			var val;

			if (this.sort_field == 'name') {
				val = client.get('address').last_name;

				// Hack for reverse string sort
				if (this.direction == -1) {
					val = String.fromCharCode.apply(String, _.map(val.split(""), function (c) {
						return 0xffff - c.charCodeAt();
					}));
				}
			} else {
				val = this.direction * client.get(this.sort_field);
			}

			return val;
		}

	});

	return StoresCollection;

});