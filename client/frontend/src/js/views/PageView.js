define([
	'jquery',
	'jqueryEasing',
	'underscore',
	'backbone',
	'models/stateModel',
	'router'
	], function ($, jqueryEasing, _, Backbone, stateModel, router) {

	// "static" variable needed here
	var pageWasInitialized = false;

	var PageView = Backbone.View.extend({

		className: 'main',

		pageTitle: '',

		animationTime: 600,

		append: function () {

			if (pageWasInitialized) {
				this._transition();
			} else {
				this.$el.appendTo($('body'));
				pageWasInitialized = true;
			}

			// set page title
			document.title = this.pageTitle;

		},

		_transition: function () {

			var prevRoute = stateModel.get('prevRoute'),
				currentRoute = stateModel.get('currentRoute'),
				transitions = [
				// from home
					{
					origin: 'home',
					destination: 'store.home',
					type: 'a.forward'
				},
				// from client.login
					{
					origin: 'client.login',
					destination: 'client.dashboard',
					type: 'b.forward'
				},
				// from store.home
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
					origin: 'store.home',
					destination: 'store.tray',
					type: 'b.forward'
				},
					{
					origin: 'store.home',
					destination: 'store.config',
					type: 'b.forward'
				},
				// from store.selection
					{
					origin: 'store.selection',
					destination: 'store.home',
					type: 'b.backward'
				},
					{
					origin: 'store.selection',
					destination: 'store.tray',
					type: 'b.forward'
				},
				// from store.config
					{
					origin: 'store.config',
					destination: 'store.home',
					type: 'b.backward'
				},
				// from store.tray
					{
					origin: 'store.tray',
					destination: 'store.home',
					type: 'b.backward'
				},
					{
					origin: 'store.tray',
					destination: 'store.selection',
					type: 'b.backward'
				},
					{
					origin: 'store.tray',
					destination: 'store.checkout',
					type: 'b.backward'
				},
				// from store.checkout
					{
					origin: 'store.checkout',
					destination: 'store.home',
					type: 'b.forward'
				}
				];

			var currentTransition = _.find(transitions, function (transition) {
				return (transition.origin === prevRoute && transition.destination === currentRoute);
			});

			if (currentTransition) {
				switch (currentTransition.type) {

				case 'a.forward':
					this._transitionAFoward();
					break;
				case 'a.backward':
					this._transitionABackward();
					break;
				case 'b.forward':
					this._transitionBFoward();
					break;
				case 'b.backward':
					this._transitionBBackward();
					break;
				}
			}
		},

		_transitionAFoward: function () {
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

		_transitionABackward: function () {
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

		_transitionBFoward: function () {
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

		_transitionBBackward: function () {
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