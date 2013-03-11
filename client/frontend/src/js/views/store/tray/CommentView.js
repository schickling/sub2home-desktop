// Filename: src/js/views/store/tray/CommentView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'models/cartModel',
    'text!templates/store/tray/CommentTemplate.html'
    ], function ($, _, Backbone, cartModel, CommentTemplate) {

	var CommentView = Backbone.View.extend({

		template: _.template(CommentTemplate),

		events: {
			'focusout textarea': '_saveComment'
		},

		initialize: function () {
			this._render();
		},

		_render: function () {

			var json = {
				comment: cartModel.getComment()
			};

			this.$el.html(this.template(json));

		},

		_saveComment: function (e) {
			var $textarea = $(e.target),
				comment = $textarea.val();

			cartModel.setComment(comment);
		}
	});

	return CommentView;

});