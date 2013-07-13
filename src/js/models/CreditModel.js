//Filename: src/js/models/CreditModel.js
define([
    'jquery',
    'underscore',
    'backbone'
    ], function ($, _, Backbone) {

	"use strict";

	var CreditModel = Backbone.Model.extend({

		defaults: {
			isAccepted: false,
			description: '',
			total: 0
		}

	});

	return CreditModel;
});