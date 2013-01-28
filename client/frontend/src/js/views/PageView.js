define([
	'jquery',
	'jqueryEasing',
	'underscore',
	'backbone',
	'models/stateModel',
	'router'
	], function ($, jqueryEasing, _, Backbone, stateModel, router) {

	var PageView = Backbone.View.extend({

		className: 'main',

		pageTitle: '',

		animationTime: 600,

		append: function () {
			// page already loaded
			var pageHasSwiched = $('.main').length > 0;

			if (pageHasSwiched) {
				this.transition();
			} else {
				this.$el.appendTo($('body'));
			}

			// set page title
			document.title = this.pageTitle;

		},

		transition: function () {

			var prevRoute = stateModel.get('prevRoute'),
				currentRoute = stateModel.get('currentRoute'),
				transitions = [
					{
					origin: 'home',
					destination: 'store.home',
					type: 'a.forward'
				},
					{
					origin: 'store.home',
					destination: 'home',
					type: 'a.backward'
				},
					{
					origin: 'store.home',
					destination: 'store.selection',
					type: 'b.forward'
				},
					{
					origin: 'store.selection',
					destination: 'store.home',
					type: 'b.backward'
				},
					{
					origin: 'store.home',
					destination: 'store.config',
					type: 'b.forward'
				},
					{
					origin: 'store.config',
					destination: 'store.home',
					type: 'b.backward'
				},
					{
					origin: 'store.tray',
					destination: 'store.home',
					type: 'b.backward'
				},
					{
					origin: 'store.home',
					destination: 'store.tray',
					type: 'b.forward'
				},
					{
					origin: 'store.tray',
					destination: 'store.selection',
					type: 'b.forward'
				},
					{
					origin: 'store.selection',
					destination: 'store.tray',
					type: 'b.backward'
				}
				];

			var currentTransition = _.find(transitions, function (transition) {
				return (transition.origin === prevRoute && transition.destination === currentRoute);
			});

			if (currentTransition) {
				switch (currentTransition.type) {

				case 'a.forward':
					this.transitionAFoward();
					break;
				case 'a.backward':
					this.transitionABackward();
					break;
				case 'b.forward':
					this.transitionBFoward();
					break;
				case 'b.backward':
					this.transitionBBackward();
					break;
				}
			}
		},

		transitionAFoward: function () {
			var $new = this.$el,
				$newNote = $new.find('.note'),
				$newNoteContainer = $newNote.children('.container'),
				$newContent = $new.find('.content'),
				$current = $('.main'),
				$currentNote = $current.find('.note'),
				$currentNoteContainer = $currentNote.children('.container'),
				$currentContent = $current.find('.content'),
				self = this;

			// load new note
			$currentNote.delay(300).animate({
				height: 150
			}, this.animationTime, function () {
				$currentNoteContainer.remove();
				$newNoteContainer.hide().appendTo($currentNote).fadeIn();
				// toggle classes
				$currentNote.removeClass('home').addClass('store');
			});

			$currentNoteContainer.fadeOut();

			// add new content
			$newContent.css({
				top: 150
			}).appendTo($current);

			// slide old content down
			$currentContent.delay(300).animate({
				top: '100%'
			}, this.animationTime, 'easeInOutQuad', function () {
				$currentContent.remove();

				// reassign $el for events
				self.$el = $current;
				self.delegateEvents();
			});

		},

		transitionABackward: function () {
			var $new = this.$el,
				$newNote = $new.find('.note'),
				$newNoteContainer = $newNote.children('.container'),
				$newContent = $new.find('.content'),
				$current = $('.main'),
				$currentNote = $current.find('.note'),
				$currentNoteContainer = $currentNote.children('.container'),
				$currentContent = $current.find('.content'),
				self = this;

			// load new note
			$currentNote.animate({
				height: '35%'
			}, this.animationTime, function () {
				$currentNoteContainer.remove();
				$newNoteContainer.hide().appendTo($currentNote).fadeIn();
				// toggle classes
				$currentNote.removeClass('store').addClass('home');
			});

			$currentNoteContainer.fadeOut();

			// slide up new content
			$newContent.css({
				top: '100%'
			}).appendTo($current).animate({
				top: 0
			}, this.animationTime, 'easeInOutQuad', function () {
				$currentContent.remove();

				// reassign $el for events
				self.$el = $current;
				self.delegateEvents();
			});

		},

		transitionBFoward: function () {
			var $new = this.$el,
				$current = $('.main');

			$new.addClass('bFwd').appendTo($('body'));

			$new.animate({
				top: 0
			}, this.animationTime, 'easeInOutQuad', function () {
				$new.removeClass('bFwd');
			});

			$current.stop().animate({
				top: '100%'
			}, this.animationTime, 'easeInOutQuad', function () {
				$current.remove();
			});
		},

		transitionBBackward: function () {
			var $new = this.$el,
				$current = $('.main');

			$new.addClass('bBwd').appendTo($('body'));

			$new.animate({
				top: 0
			}, this.animationTime, 'easeInOutQuad', function () {
				$new.removeClass('bBwd');
			});

			$current.stop().animate({
				top: '-100%'
			}, this.animationTime, 'easeInOutQuad', function () {
				$current.remove();
			});

		}

	});

	return PageView;

});