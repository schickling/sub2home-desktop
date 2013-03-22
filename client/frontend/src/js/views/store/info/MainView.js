// Filename: src/js/views/store/info/MainView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'models/stateModel',
    'views/PageView',
    'text!templates/store/info/MainTemplate.html'
    ], function ($, _, Backbone, stateModel, PageView, MainTemplate) {

	var MainView = PageView.extend({

		initialize: function () {

			// set page title
			var storeModel = stateModel.get('storeModel');
			this.pageTitle = 'Infotheke ' + storeModel.get('title') + ' - sub2home';

			this._render();
		},

		_render: function () {
			this.$el.html(MainTemplate);

			this.append();
		}

	});

	return MainView;

});