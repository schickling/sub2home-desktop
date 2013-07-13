// Filename: src/js/views/store/selection/stage/ingredientsSelection/IngredientView.js
define([
    'jquery',
    'jqueryRotate',
    'underscore',
    'backbone',
    'text!templates/store/selection/stage/ingredientsSelection/IngredientTemplate.html'
    ], function ($, jqueryRotate, _, Backbone, IngredientTemplate) {

	"use strict";

	var IngredientView = Backbone.View.extend({

		className: 'item ingredient',

		template: _.template(IngredientTemplate),

		events: {
			'click': '_toggleSelected'
		},

		initialize: function () {
			this.model.bind('change:isSelected', this._updateView, this);

			this._render();

			this._updateView();
		},

		_render: function () {
			this.$el.html(this.template(this.model.toJSON()));

			// rotate circle
			this.$('.accentIngredient').rotate();

		},

		_updateView: function () {
			this.$el.toggleClass('selected', !!this.model.get('isSelected'));
		},

		_toggleSelected: function () {
			this.model.set('isSelected', !this.model.get('isSelected'));
			this.parentView.notifyOtherIngredients(this.model);
		}

	});

	return IngredientView;

});