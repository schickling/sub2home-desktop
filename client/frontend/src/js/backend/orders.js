(function () {
	"use strict"

	var template_order = $("#template_order").html();

	var Order = Backbone.Model.extend({
		urlRoot: './'
	});

	var Orders = Backbone.Collection.extend({
		model: Order
	});

	var OrderView = Backbone.View.extend({

		className: 'order',
		template: _.template(template_order),
		events: {
			'click .order_add_credit': 'add_credit',
			'click .order_delete_credit': 'delete_credit'
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		add_credit: function() {
			do {
				var total = prompt('Geben Sie den Betrag der Gutschrift ein.', '0.00');
			} while (parseFloat(total) != total);

			var recent_order = this.model,
				new_order = new Order({
					credit: recent_order.id,
					store_id: recent_order.get('store_id'),
					total: parseFloat(total)
				});

			new_order.save({}, {
				success: function() {
					orders_view.collection.add(recent_order);
					orders_view.render_order(new_order, true);
				}
			});
		},

		delete_credit: function() {
			var self = this;
			this.$el.fadeOut(function () {
				self.model.destroy();
				self.remove();
			});
		},

		leading_zeros: function (number) {
			var str = '' + number,
				length = 7;
			while (str.length < length) {
				str = '0' + str;
			}
			return str;
		},

	});

	var OrdersView = Backbone.View.extend({
		el: $('#content'),

		search_timeout: 0,

		events: {
			'click .load_more': 'load_more',
			'click .icon_clear': 'clear_searchbar',
			'keyup .searchbar': 'search_with_timeout'
		},

		initialize: function (json_orders) {
			this.$list = this.$el.find('.order_listing section');

			this.collection = new Orders(json_orders);
			this.render();
		},

		render: function () {
			_.each(this.collection.models, function (item) {
				this.render_order(item);
			}, this);
		},

		render_order: function (item, prepend) {
			var order_view = new OrderView({
				model: item
			});

			if (prepend) {
				this.$list.prepend(order_view.render().el);
			} else {
				this.$list.append(order_view.render().el);
			}
		},

		search_with_timeout: function (e) {
			clearTimeout(this.search_timeout);

			var self = this,
				$icon_wait = this.$el.find('.icon_wait'),
				$icon_clear = this.$el.find('.icon_clear');

			$icon_wait.show();
			$icon_clear.hide();

			this.search_timeout = setTimeout(function() {
				self.search(e);
				$icon_wait.hide();
			}, 600);
		},

		search: function (e) {
			var keyword = e.target.value,
				$icon_clear = this.$el.find('.icon_clear'),
				$load_more = this.$el.find('.load_more');

			if (keyword) {

				var self = this;

				$.ajax({
					url: './search/' + keyword,
					type: 'get',
					success: function(data) {
						var results = $.parseJSON(data);

						$load_more.hide();
						$icon_clear.show();
						self.$list.html('');

						_.each(results, function (item) {
							var model = new Order(item);
							self.render_order(model);
						});
					}
				});
			} else {
				if (!this.filter_cleared) {
					this.reset_view();
				}
			}
		},

		clear_searchbar: function () {
			this.$el.find('.searchbar').val('');
			this.reset_view();
		},

		reset_view: function() {
			var $load_more = this.$el.find('.load_more'),
				$searchbar = this.$el.find('.searchbar'),
				$icon_clear = this.$el.find('.icon_clear');

			this.$list.html('');
			this.render();
			$icon_clear.hide();
			$load_more.show();
		},

		load_more: function () {
			var self = this,
				offset = this.collection.length;

			$.ajax({
					url: './' + offset,
					type: 'get',
					success: function(data) {
						var new_orders = $.parseJSON(data);
						self.collection.add(new_orders);

						for (var i = offset; i < self.collection.length; i++) {
							self.render_order(self.collection.at(i));
						}
					}
				});
		}
	});

	var orders_view = new OrdersView(json_orders);

})();