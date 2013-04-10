// Filename: src/js/modules/global.js
define([], function () {

	// wrapper for global variables
	var Global = {

		storeAlias: '',

		getStoreAlias: function () {
			return this.storeAlias;
		},

		setStoreAlias: function (storeAlias) {
			this.storeAlias = storeAlias;
		}
		
	};

	return Global;
});