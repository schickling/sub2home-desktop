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
			'click': '_select'
		},

		initialize: function () {
			this.orderedArticleModel = this.options.orderedArticleModel;

			this._render();

			// listen if model gets isSelected
			this.listenTo(this.model, 'change:isSelected', this._update);

			this._update();

			this._listenForDestory();

		},

		_render: function () {

			var json = {
				title: this.model.get('title'),
				image: this.model.get('largeImage'),
				deposit: this.model.get('deposit') * 100, // cent
				description: this.model.get('description')
			};

			this.$el.html(this.template(json));

			return this;
		},

		_update: function() {
			this.$el.toggleClass('selected', this.model.get('isSelected'));
		},

		_select: function () {
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
		},

		_listenForDestory: function () {
			this.options.selectionView.once('destroy', this.stopListening, this);
		}

	});

	return MenuComponentOptionArticleView;

});