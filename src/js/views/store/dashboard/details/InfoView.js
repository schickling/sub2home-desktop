// Filename: src/js/views/store/dashboard/details/InfoView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/store/dashboard/details/InfoTemplate.html'
    ], function ($, _, Backbone, InfoTemplate) {

	"use strict";

	var InfoView = Backbone.View.extend({

		template: _.template(InfoTemplate),

		initialize: function () {
			this._render();
		},

		_render: function () {
			var json = {
				comment: this.model.get('comment')
			};

			this.$el.html(this.template(json));
		}

	});

	return InfoView;

});