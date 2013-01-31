// Filename: src/js/views/store/selection/info/IngredientView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/store/selection/info/ingredientsSelection/IngredientTemplate.html'
	], function ($, _, Backbone, IngredientTemplate) {

	var IngredientView = Backbone.View.extend({

		className: 'ingredient',

		template: _.template(IngredientTemplate),

		events: {
			'click span': 'unselect'
		},

		initialize: function() {
			this.render();
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
		},

		unselect: function () {
			this.model.set('selected', false);
		}

	});

	return IngredientView;

});