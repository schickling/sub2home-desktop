// Filename: src/js/models/TooltipModel.js
define([
	'underscore',
	'backbone'
	], function (_, Backbone) {

	"use strict";

	var TooltipModel = Backbone.Model.extend({

		defaults: {
			className: 'info',
			text: 'Tooltip'
		}

	});

	return TooltipModel;

});