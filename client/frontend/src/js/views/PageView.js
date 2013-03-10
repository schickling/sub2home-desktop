define([
    'jquery',
    'jqueryEasing',
    'underscore',
    'backbone',
    'router',
    'notificationcenter',
    'models/stateModel',
    'views/assets/transitions'
    ], function ($, jqueryEasing, _, Backbone, router, notificationcenter, stateModel, transitions) {

	// "static" variable needed here
	var pageWasInitialized = false;

	var PageView = Backbone.View.extend({

		className: 'main',

		// current page title
		pageTitle: '',

		// animation time for page switching
		_animationTime: 600,

		// referenced sub views
		subViews: {},

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

		pageNotFound: function () {
			router.navigate('404', {
				trigger: true,
				replace: true
			});
		},

		_transition: function () {

			var prevRoute = stateModel.get('prevRoute'),
				currentRoute = stateModel.get('currentRoute');

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
					case 'c.forward':
						this._transitionCFoward();
						break;
					case 'c.backward':
						this._transitionCBackward();
						break;
				}
			} else {
				this._transitionDefault();
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
			}, this._animationTime, function () {
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
			}, this._animationTime, 'easeInOutQuad', function () {
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
			}, this._animationTime, function () {
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
			}, this._animationTime, 'easeInOutQuad', function () {
				$currentContent.remove();

				// reassign $el for events
				self.$el = $current;
				self.delegateEvents();
			});

		},

		/**
		 * Pages slides down
		 *
		 * @return void
		 */
		_transitionBFoward: function () {
			var $new = this.$el,
				$current = $('.main');

			$new.addClass('bFwd').appendTo($('body'));

			$new.animate({
				top: 0
			}, this._animationTime, 'easeInOutQuad', function () {
				$new.removeClass('bFwd');
			});

			$current.stop().animate({
				top: '100%'
			}, this._animationTime, 'easeInOutQuad', function () {
				$current.remove();
			});
		},


		/**
		 * Pages slides up
		 *
		 * @return void
		 */
		_transitionBBackward: function () {
			var $new = this.$el,
				$current = $('.main');

			$new.addClass('bBwd').appendTo($('body'));

			$new.animate({
				top: 0
			}, this._animationTime, 'easeInOutQuad', function () {
				$new.removeClass('bBwd');
			});

			$current.stop().animate({
				top: '-100%'
			}, this._animationTime, 'easeInOutQuad', function () {
				$current.remove();
			});

		},


		/**
		 * Pages slides left
		 *
		 * @return void
		 */
		_transitionCFoward: function () {
			var $new = this.$el,
				$current = $('.main');

			$new.addClass('cFwd').appendTo($('body'));

			$new.animate({
				left: 0
			}, this._animationTime, 'easeInOutQuad', function () {
				$new.removeClass('cFwd');
			});

			$current.stop().animate({
				left: '-100%'
			}, this._animationTime, 'easeInOutQuad', function () {
				$current.remove();
			});
		},


		/**
		 * Pages slides right
		 *
		 * @return void
		 */
		_transitionCBackward: function () {
			var $new = this.$el,
				$current = $('.main');

			$new.addClass('cBwd').appendTo($('body'));

			$new.animate({
				left: 0
			}, this._animationTime, 'easeInOutQuad', function () {
				$new.removeClass('cBwd');
			});

			$current.stop().animate({
				left: '100%'
			}, this._animationTime, 'easeInOutQuad', function () {
				$current.remove();
			});

		},

		_transitionDefault: function () {

			var $new = this.$el,
				$current = $('.main');

			$new.css({
				opacity: 0
			}).appendTo($('body'));


			$new.animate({
				opacity: 1
			}, this._animationTime, function () {
				$current.remove();
			});

		},

		destroy: function () {
			this.destroyAllSubViews();
		},

		destroyAllSubViews: function () {
			// this syntax needed since this.subViews is an object not an array
			for (var key in this.subViews) {
				this.subViews[key].trigger('destroy');
			}
		}

	});

	return PageView;

});