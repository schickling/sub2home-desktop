// Filename: src/js/views/store/selection/stage/articleSelection/MenuComponentOptionArticleView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'models/ArticleModel',
	'text!templates/store/selection/stage/articleSelection/MenuComponentOptionArticleTemplate.html'
	], function ($, _, Backbone, ArticleModel, MenuComponentOptionArticleTemplate) {

	var MenuComponentOptionArticleView = Backbone.View.extend({

		className: 'article',

		template: _.template(MenuComponentOptionArticleTemplate),

		events: {
			'click': 'select'
		},

		initialize: function () {
			this.orderedArticleModel = this.options.orderedArticleModel;

			// listen if model gets isSelected
			this.model.on('change:isSelected', this.update, this);

			this.update();

		},

		render: function () {

			var json = {
				title: this.model.get('title'),
				image: this.model.get('largeImage'),
				description: this.model.get('description')
			};

			this.$el.html(this.template(json));

			return this;
		},

		update: function() {
			this.$el.toggleClass('selected', this.model.get('isSelected'));
		},

		select: function () {
			var self = this,
				completeArticleModel = new ArticleModel({
					id: this.model.get('id')
				});

			completeArticleModel.fetch({
				success: function () {
					// add to ordered article
					self.orderedArticleModel.set('articleModel', completeArticleModel);

					// mark current as isSelected
					self.model.set('isSelected', true);
				}
			});
		}

	});

	return MenuComponentOptionArticleView;

});