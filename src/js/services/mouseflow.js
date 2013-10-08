define(["jquery"], function (jQuery) {

	var mouseflow = function (f) {
		function p() {
			b._startTime = +new Date;
			b._bufferTime = +new Date;
			K = setInterval(ba, r._moveScrollInterval);
			L = setInterval(ca, r._pingInterval);
			da();
			l && console.log("MF: Recording starting, version " + B);
			var a = w("mf_block");
			if (ea || "-1" != d._sessionId && ("" != d._sessionId || 1 >= C || 0 == Math.floor(Math.random() * C)) && "" == a) {
				d._isReturningUser = fa();
				d._pageId = x(b._startDateTime.getMonth() + 1, 2) + x(b._startDateTime.getDate(), 2) + x(b._startDateTime.getSeconds(), 2) + x(b._startDateTime.getMilliseconds(), 3).slice(1) + M();
				if ("" == d._sessionId || "-1" == d._sessionId || 0 < b._lastPageViewTime && +new Date - b._lastPageViewTime > r._minTimeSinceLastVisitThatTriggersNewSession) d._sessionId = M();
				D("mf_session", d._sessionId + "|" + d._pageId + "|" + +new Date, 0, E());
				a = F() + "a.gif?v=" + B + "&p=" + t + "&s=" + d._sessionId + "&page=" + d._pageId + "&u=" + d._isReturningUser + "&host=" + encodeURIComponent(k.location.host) + "&prot=" + encodeURIComponent(k.location.protocol) + "&path=" + encodeURIComponent("undefined" == typeof mouseflowPath ? k.location.pathname : mouseflowPath) + "&search=" + encodeURIComponent("undefined" == typeof mouseflowPath ? k.location.search : "") + "&hash=" + encodeURIComponent(k.location.hash) + "&href=" + encodeURIComponent(k.location.href) + "&ref=" + encodeURIComponent(k.referrer) + "&title=" + encodeURIComponent(k.title) + "&res=" + screen.width + "x" + screen.height + "&tz=" + ga() + "&to=" + d._hasTouch + "&jq=" + d._hasJQuery + "&ori=" + ("undefined" != typeof f.orientation ? f.orientation : "");
				G(a, function () {
					_mfq = new mouseflow.ActionQueue(_mfq);
					var a = "";
					"undefined" == typeof mouseflowHtmlFetchMode || "post" == mouseflowHtmlFetchMode ? setTimeout(function () {
						a = "website=" + t + "&session=" + d._sessionId + "&page=" + d._pageId + "&encoding=" + encodeURIComponent(document.charset ? document.charset : document.characterSet) + "&html=" + ha(ia());
						v(s + "b.gif", a, function () {
							u = !0;
							N()
						})
					}, r._delayBeforeSendingHtml) : "crawl-with-cookies" == mouseflowHtmlFetchMode ? setTimeout(function () {
						a = "website=" + t + "&session=" + d._sessionId + "&page=" + d._pageId + "&cookies=" + encodeURIComponent(k.cookie) + NaN + encodeURIComponent(document.charset ? document.charset : document.characterSet);
						v(s + "b.gif", a, function () {
							u = !0;
							N()
						})
					}, r._delayBeforeSendingHtml) : (u = !0, l && console.log("MF: Html not sent due to mouseflowHtmlFecthMode setting"))
				}, function () {
					l && console.log("MF: Init image error - recording not starting.")
				});
				O();
				"undefined" == typeof mouseflowUseCssPaths && P();
				b._currentScroll = {
					x: m(k).scrollLeft(),
					y: m(k).scrollTop()
				};
				l && console.log("MF: Recording started. Session: " + d._sessionId + ", Page: " + d._pageId + ", Last page: " + d._lastPageId)
			} else "" == w("mf_session") ? (l && console.log("MF: Recording not started - recordingRate or blocked"), D("mf_session", "-1", 0, E())) : l && console.log("MF: Recording not started - session blocked earlier")
		}

		function H() {
			l && console.log("MF: Recording stopping");
			Q();
			clearInterval(K);
			clearInterval(L);
			h(20, {});
			I();
			u = !1;
			l && console.log("MF: Recording stopped")
		}

		function ja() {
			var a = JSON.stringify(b._dataCalls);
			b._dataCalls = [];
			a = "website=" + t + "&session=" + d._sessionId + "&page=" + d._pageId + "&type=variable&data=" + encodeURIComponent(a);
			v(s + "data", a, function () {})
		}

		function da() {
			var a = w("mf_session").split("|");
			d._sessionId = a[0];
			1 < a.length && (d._lastPageId = a[1]);
			2 < a.length && (b._lastPageViewTime = parseInt(a[2], 10));
			"" == d._sessionId && "undefined" !== typeof mouseflowSessionId && (d._sessionId = mouseflowSessionId)
		}

		function fa() {
			var a = w("mf_user");
			"" == a && D("mf_user", "1", 1, E());
			return a
		}

		function x(a, c) {
			return (Array(c + 1).join("0") + a).slice(-c)
		}

		function ga() {
			var a = new Date;
			return Math.max((new Date(a.getFullYear(), 0, 1)).getTimezoneOffset(), (new Date(a.getFullYear(), 6, 1)).getTimezoneOffset())
		}

		function O() {
			try {
				m(k).on("scroll.mouseflow", function () {
					b._currentScroll = {
						x: m(k).scrollLeft(),
						y: m(k).scrollTop()
					}
				}).on("mousemove.mouseflow", function (a) {
					b._currentMousePosition = {
						x: a.pageX,
						y: a.pageY
					}
				}).on("click.mouseflow", function (a) {
					R(a, n(a.target))
				}).on("mousedown.mouseflow", "a, :input", function (a) {
					h(3, {
						x: a.pageX,
						y: a.pageY,
						target: n(m(this)[0])
					})
				}).on("click.mouseflow", "a, :input", function (a) {
					R(a, n(m(this)[0]))
				}).on("focus.mouseflow", ":input", function (a) {
					h(11, {
						target: n(a.target)
					})
				}).on("blur.mouseflow", ":input", function (a) {
					h(12, {
						target: n(a.target)
					})
				}).on("submit.mouseflow", "form", function (a) {
					h(13, {
						target: n(a.target)
					})
				}).on("error.mouseflow", function (a, c, e) {
					h(15, {
						x: 0,
						y: e
					})
				});
				try {
					var a = ka();
					m(k).on("mouseenter.mouseflow", a, function (a) {
						h(6, {
							x: a.pageX,
							y: a.pageY,
							target: n(m(this)[0])
						})
					}).on("mouseleave.mouseflow", a, function (a) {
						h(7, {
							x: a.pageX,
							y: a.pageY,
							target: n(m(this)[0])
						})
					})
				} catch (c) {
					l && console.log("MF: Error in getHoverSelectors: " + c.message)
				}
				if ("undefined" == typeof mouseflowDisableKeyLogging || !0 != mouseflowDisableKeyLogging) m(k).on("keypress.mouseflow", ":input:not([type=password]):not(.no-mouseflow)", function (a) {
					h(8, {
						target: n(a.target)
					})
				}).on("keydown.mouseflow", ":input:not([type=password]):not(.no-mouseflow)", function (a) {
					h(33, {
						target: n(a.target),
						value: a.which.toString()
					})
				}).on("keyup.mouseflow", ":input:not([type=password]):not(.no-mouseflow)", function (a) {
					h(9, {
						target: n(a.target),
						value: m(this).val()
					})
				}).on("change.mouseflow", ":input:not([type=password]):not(.no-mouseflow)", function (a) {
					h(10, {
						target: n(a.target),
						value: a.target.value
					})
				});
				if (d._hasTouch) m(k).on("touchstart.mouseflow", function (a) {
					a = a.originalEvent.changedTouches;
					0 < a.length && h(21, {
						x: a[0].pageX,
						y: a[0].pageY
					})
				}).on("touchmove.mouseflow", function (a) {
					a = a.originalEvent.changedTouches;
					0 < a.length && (b._lastTouchMoveEventTime < +new Date - b._startTime - r._moveScrollInterval && (h(22, {
						x: a[0].pageX,
						y: a[0].pageY
					}), b._lastTouchMoveEventTime = +new Date - b._startTime), b._currentScroll = {
						x: m(k).scrollLeft(),
						y: m(k).scrollTop()
					}, b._lastScrollEventTime < +new Date - b._startTime - r._moveScrollInterval && !y(b._currentScroll, b._lastScroll) && (b._lastScroll = b._currentScroll, h(1, b._currentScroll), b._lastScrollEventTime = +new Date - b._startTime))
				}).on("touchend.mouseflow", function (a) {
					a = a.originalEvent.changedTouches;
					0 < a.length && (h(23, {
						x: a[0].pageX,
						y: a[0].pageY
					}), b._currentScroll = {
						x: m(k).scrollLeft(),
						y: m(k).scrollTop()
					})
				}).on("orientationchange.mouseflow", function () {
					h(24, {
						x: f.orientation,
						y: 0
					})
				})
			} catch (e) {
				l && console.log("MF: Error in bindDomEvents: " + e.message)
			}
		}

		function Q() {
			m("*").off(".mouseflow")
		}

		function R(a, c) {
			if (!(20 > +new Date - b._lastClickTime)) {
				b._lastClickTime = +new Date;
				h(5, {
					x: a.pageX,
					y: a.pageY,
					target: c
				});
				var e;
				var g = a.target;
				g.getBoundingClientRect ? (g = g.getBoundingClientRect(), g = {
					x: g.left,
					y: g.top,
					width: g.width,
					height: g.height
				}, /msie/i.test(navigator.appVersion) && (g.x -= k.documentElement.clientLeft, g.y -= k.documentElement.clientTop), e = g) : e = null;
				g = parseInt(65535 * ((a.pageX - b._currentScroll.x - e.x) / parseFloat(e.width)));
				e = parseInt(65535 * ((a.pageY - b._currentScroll.y - e.y) / parseFloat(e.height)));
				h(4, {
					x: g,
					y: e,
					target: n(a.target)
				})
			}
		}

		function ka() {
			for (var a = {}, c = /:hover/, e = 0; e < k.styleSheets.length; e++) {
				var b = k.styleSheets[e];
				try {
					for (var d = b.cssRules ? b.cssRules : b.rules, f = 0; f < d.length; f++) {
						var h = b.cssRules[f];
						if (c.test(h.selectorText))
							for (var m = h.selectorText.split(","), q, n = 0; n < m.length; n++) q = m[n].trim(), c.test(q) && (q = q.substring(0, q.indexOf(":hover")), q = q.replace(":active", "").replace(":visited", ""), q in a || (a[q] = !0))
					}
				} catch (p) {
					l && console.log("MF: Cannot inspect external css file, :hover support may fail: " + b.href)
				}
			}
			c = "a";
			for (q in a) c += ", " + q;
			return c
		}

		function ha(a) {
			return encodeURIComponent(a)
		}

		function h(a, c) {
			try {
				var e = [],
					g = -1;
				if (!(2 <= a && 7 >= a) || void 0 != c.x && void 0 != c.y) {
					l && 2 != a && console.log("MF: Event, type: " + a + ", time: " + (+new Date - b._startTime) + ", details: " + JSON.stringify(c));
					J(+new Date - b._bufferTime, e);
					e.push(a);
					void 0 != c.x && 0 > c.x && (c.x = 0);
					void 0 != c.y && 0 > c.y && (c.y = 0);
					void 0 != c.x && J(c.x, e);
					void 0 != c.y && J(c.y, e);
					if (void 0 != c.target) {
						"object" == typeof c.target && void 0 != c.target.id && (c.target = c.target.id);
						"" != c.target && void 0 != document.getElementById(c.target) && void 0 != document.getElementById(c.target).form && (c.target = document.getElementById(c.target).form.id + "||" + c.target);
						for (var f = 0; f < b._elementIds.length; f++)
							if (b._elementIds[f] == c.target) {
								g = f;
								break
							}
							"" == c.target ? e.push(254) : -1 == g ? (e.push(b._elementIds.length), b._elementIds.push(c.target), b._newIds.push(c.target), b._newIdLength = z(b._newIds)) : e.push(g)
					} else 2 < a && 14 != a && 19 > a && e.push(255);
					void 0 != c.value && (e.push(b._values.length), b._values.push(c.value), b._valueLength = z(b._values));
					if (b._data.length + e.length + b._newIdLength + b._valueLength > r._maxCharsToSendInUrl) c.value && b._values.pop(), c.target && -1 == g && b._newIds.pop(), I(), b._data = e, b._data[0] = 0, b._data[1] = 0, c.value && b._values.push(c.value), c.target && -1 == g && b._newIds.push(c.target), b._valueLength = z(b._values), b._newIdLength = z(b._newIds);
					else
						for (f = 0; f < e.length; f++) b._data.push(e[f])
				}
			} catch (d) {
				l && console.log("MF: Error adding event type " + a + ", error message: " + d.message)
			}
		}

		function ba() {
			y(S(), b._lastViewport) || (b._lastViewport = S(), h(0, b._lastViewport));
			y(b._currentMousePosition, b._lastMousePosition) || (b._lastMousePosition = b._currentMousePosition, h(2, b._currentMousePosition));
			y(b._currentScroll, b._lastScroll) || (b._lastScroll = b._currentScroll, h(1, b._currentScroll), b._lastScrollEventTime = +new Date - b._startTime)
		}

		function I() {
			var a = b._bufferTime - b._startTime;
			b._data.unshift(Math.floor(a / 65536), Math.floor(Math.floor(a % 65536) / 256), a % 65536 % 256, Math.floor(b._data.length) / 256, b._data.length % 256);
			b._chunks.push(T.e(b._data) + "." + U(b._newIds) + "." + U(b._values));
			b._data = [];
			b._values = [];
			b._newIds = [];
			b._bufferTime = +new Date;
			b._valueLength = b._newIdLength = 0;
			la()
		}

		function la() {
			if (u && 0 < b._chunks.length) {
				for (var a = 0; a < b._chunks.length; a++) G(F() + "c.gif?p=" + d._pageId + "&d=" + b._chunks[a], function () {}, function () {
					u = !1
				});
				b._chunks = []
			}
		}

		function G(a, c, b) {
			var g = new Image;
			g.src = a;
			g.onload = function () {
				3 > this.width ? c() : b()
			};
			g.onerror = b
		}

		function v(a, c, b) {
			if (f.XDomainRequest) try {
				var g = new f.XDomainRequest;
				g.open("post", a);
				g.onload = b;
				g.onerror = function () {
					l && console.log("MF: XDR error: " + a)
				};
				g.onprogress = function () {
					l && console.log("MF: XDR progress:" + a)
				};
				g.ontimeout = function () {
					l && console.log("MF: XDR timeout:" + a)
				};
				g.send(c)
			} catch (d) {
				l && console.log("MF: Error in transmitCrossDomain (XDomainRequest): " + d.message)
			} else if (f.XMLHttpRequest) try {
				var h = new f.XMLHttpRequest;
				h.open("POST", a, !0);
				h.setRequestHeader("Content-type", "text/plain");
				h.onreadystatechange = function () {
					4 == this.readyState && 200 == this.status && b()
				};
				h.send(c)
			} catch (k) {
				l && console.log("MF: Error in transmitCrossDomain (XMLHttpRequest): " + k.message)
			}
		}

		function ma(a) {
			var c = "website=" + t + "&session=" + d._sessionId + "&page=" + d._pageId + "&encoding=" + encodeURIComponent(document.charset ? document.charset : document.characterSet) + "&sequence=" + a._sequence + "&ajaxTime=" + a._time + "&ajaxUrl=" + encodeURIComponent(a._url) + "&contentType=" + encodeURIComponent(a._contentType) + "&ajaxPost=" + encodeURIComponent(a._postData) + "&ajax=" + encodeURIComponent(a._responseText);
			l && console.log("MF: AJAX request #" + a._sequence + ", time: " + a._time + ", url: " + a._url + ", post length: " + a._postData.length + ", response length: " + a._responseText.length + ", content-type: " + a._contentType);
			v(s + "b.gif", c, function () {})
		}

		function ca() {
			0 < b._data.length && 5E3 <= +new Date - b._bufferTime && (h(19, {}), I())
		}

		function y(a, c) {
			return a.x == c.x && a.y == c.y
		}

		function S() {
			var a = {
				x: "undefined" != typeof f.innerWidth ? f.innerWidth : m(f).width(),
				y: "undefined" != typeof f.innerHeight ? f.innerHeight : m(f).height()
			};
			0 == a.x && 0 == a.y && (a = {
				x: document.getElementsByTagName("body")[0].clientWidth,
				y: document.getElementsByTagName("body")[0].clientHeight
			});
			return a
		}

		function n(a) {
			if ("undefined" == typeof mouseflowUseCssPaths) return a.id;
			try {
				var c = [];
				try {
					for (; 1 == a.nodeType;) {
						var b = "";
						if (a.id) {
							b += "#" + a.id;
							c.unshift(b);
							break
						} else {
							for (var b = b + a.nodeName.toLowerCase(), g = a, f = 1; g = g.previousElementSibling;) g.nodeName.toLowerCase() == b && f++;
							1 != f && (b += ":[" + f + "]")
						}
						c.unshift(b);
						a = a.parentNode
					}
				} catch (d) {
					l && console.log("MF: Error in _getCssPath: " + d.message)
				}
				return c.join(" > ").replace("html > body > ", "> ")
			} catch (h) {
				l && console.log("MF: Error in getElementPath: " + h.message)
			}
			return ""
		}

		function P() {
			l && console.log("MF: Creating DOM ids.");
			A("a", "mfa");
			A("form", "mf_form");
			A(":input", "mfi");
			A("body *", "mf")
		}

		function A(a, b) {
			var e = 0;
			m(a).each(function () {
				this.id || "/" == this.tagName.charAt(0) || "#" == this.tagName.charAt(0) || "!" == this.tagName.charAt(0) || /SCRIPT|STYLE|META|TBODY|PARAM|EMBED|FIELD/.test(this.tagName.toUpperCase()) || (this.id = b + e++)
			})
		}

		function J(a, b) {
			b.push(Math.floor(a / 256));
			b.push(a % 256)
		}

		function U(a) {
			for (var b = "", e = 0; e < a.length; e++) b += (0 < b.length ? "," : "") + V.encode(a[e]);
			return b
		}

		function z(a) {
			for (var b = 0, e = 0; e < a.length; e++) b += V.encode(a[e]).length + 1;
			return 0 < b ? b - 1 : b
		}

		function E() {
			if ("undefined" != typeof mouseflowExcludeSubDomains && !0 == mouseflowExcludeSubDomains) return k.location.hostname;
			var a = k.location.href,
				a = a.replace(/^http(s)?\:\/\/?/i, "").replace(/^([^\/]+)\/.*/i, "$1"),
				a = /\.co\.|\.com\.|\.ac\.|\.org\.|\.gov\.|\.edu\.|\.net\./.test(a) ? a.replace(/^([^\.]+\.){1,}([^\.]+\.[^\.]+\.[^\.]+)$/i, "$2") : a.replace(/^([^\.]+\.){1,}([^\.]+\.[^\.]+)$/i, "$2");
			return "." + a
		}

		function D(a, b, e, g) {
			var f = "";
			1 == e && (e = new Date, e.setTime(e.getTime() + r._farFutureCookieLifetime), f = "; expires=" + e.toGMTString());
			document.cookie = a + "=" + b + f + "; path=/; domain=" + g + ";"
		}

		function w(a) {
			var b = document.cookie.indexOf(a + "=");
			return -1 != b ? (b = b + a.length + 1, a = document.cookie.indexOf(";", b), -1 == a && (a = document.cookie.length), unescape(document.cookie.substring(b, a))) : ""
		}

		function ia() {
			for (var a = k.doctype, b = k.documentElement, a = (a && null != a ? "<!DOCTYPE " + a.name + ("" != a.publicId ? ' PUBLIC "' + a.publicId + '" "' + a.systemId + '"' : "") + ">\n" : "<!DOCTYPE html>\n") + "<html", e = 0; e < b.attributes.length; e++) var g = b.attributes[e],
			a = a + ("null" != g.value && "" != g.value ? " " + g.name + '="' + g.value + '"' : "");
			return a += ">" + b.innerHTML.replace(/\x3c!-- MouseflowExcludeStart([\s\S]*?)--\x3e([\s\S]*?)\x3c!-- MouseflowExcludeEnd --\x3e/g, "$1") + "</html>"
		}

		function M() {
			var a = function () {
				return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
			};
			return a() + a() + a() + a() + a() + a() + a() + a()
		}

		function F() {
			return s.replace("//", "https://")
		}

		function N() {
			if (window.XMLHttpRequest && !/msie 5|msie 6|msie 7/i.test(navigator.appVersion)) {
				var a = XMLHttpRequest.prototype.open;
				XMLHttpRequest.prototype.open = function () {
					if (-1 == arguments[1].indexOf(s)) {
						this._ajaxIndex = b._ajaxCalls.length;
						var c = {
							_sequence: this._ajaxIndex + 1,
							_time: +new Date - b._startTime,
							_url: arguments[1],
							_postData: "",
							_responseText: "",
							_contentType: ""
						};
						b._ajaxCalls.push(c);
						h(16, {
							x: c._sequence,
							y: 0
						});
						this.addEventListener ? this.addEventListener("readystatechange", W, !1) : this.attachEvent && this.attachEvent("onreadystatechange", W);
						l && console.log("MF: XHR[" + c._sequence + "] open, url: " + c._url)
					}
					a.apply(this, arguments)
				};
				var c = XMLHttpRequest.prototype.send;
				XMLHttpRequest.prototype.send = function () {
					if (void 0 != this._ajaxIndex && 0 < arguments.length) {
						var a = b._ajaxCalls[this._ajaxIndex];
						a._postData = arguments[0] || "";
						l && console.log("MF: XHR[" + a._sequence + "] send, post length: " + a._postData.length)
					}
					c.apply(this, arguments)
				}
			}
		}

		function W() {
			if (4 == this.readyState && (200 == this.status || 304 == this.status)) {
				var a = b._ajaxCalls[this._ajaxIndex];
				a._responseText = this.responseText;
				a._contentType = this.getResponseHeader("content-type");
				h(17, {
					x: a._sequence,
					y: 0
				});
				ma(a);
				"undefined" == typeof mouseflowUseCssPaths && setTimeout(P, 200)
			}
		}

		function X(a) {
			l && console.log("MF: Initing recorder");
			m = a;
			m(document).ready(function () {
				Y = !0;
				Z && p()
			});
			"complete" != k.readyState ? m(f).load(function () {
				h(14, {
					x: 0,
					y: m(document).height()
				});
				!Y && Z && (l && console.log("MF: DOM-ready handler not executed, starting with onload handler"), p())
			}) : (l && console.log("MF: Onload was already fired, adding event directly."), h(14, {
				x: 0,
				y: m(document).height()
			}));
			m(f).unload(function () {
				H()
			})
		}

		function na(a, b) {
			var e = $(a),
				g = $(b),
				f = Math.max(e.length, g.length);
			if ("NaN" == g || "NaN" == e) return !1;
			for (var d = 0; d < f; d++)
				if (e[d] = e[d] || 0, g[d] = g[d] || 0, e[d] != g[d]) return e[d] > g[d] ? !0 : !1;
			return !0
		}

		function $(a) {
			a = a.split(".");
			for (var b = [], e = 0; e < a.length; e++) b.push(parseInt(a[e]));
			return b
		}
		var s = "//e2.mouseflow.com/",
			t = "715238b5-cc22-46ea-bed7-ecb731d110e6",
			C = 0,
			B = "9.41",
			u = !1,
			l = -1 < f.location.search.indexOf("mf_debug=1"),
			ea = -1 < f.location.search.indexOf("mf_force=1"),
			Z = "undefined" != typeof mouseflowAutoStart ? mouseflowAutoStart : -1 == f.location.search.indexOf("mf_autostart=0"),
			Y = !1,
			m, d = {
				_sessionId: "",
				_pageId: "",
				_isReturningUser: "0",
				_hasTouch: +("ontouchstart" in f && ("undefined" == typeof mouseflowDisableTouch || !0 != mouseflowDisableTouch)),
				_hasJQuery: "0",
				_lastPageId: ""
			}, b = {
				_startDateTime: new Date,
				_startTime: +new Date,
				_bufferTime: +new Date,
				_lastPageViewTime: 0,
				_data: [],
				_chunks: [],
				_values: [],
				_elementIds: [],
				_newIds: [],
				_valueLength: 0,
				_newIdLength: 0,
				_lastClickTime: 0,
				_currentMousePosition: {
					x: 0,
					y: 0
				},
				_lastMousePosition: {
					x: 0,
					y: 0
				},
				_lastTouchMoveEventTime: -100,
				_currentScroll: {
					x: 0,
					y: 0
				},
				_lastScroll: {
					x: 0,
					y: 0
				},
				_lastScrollEventTime: -100,
				_lastViewport: {
					x: 0,
					y: 0
				},
				_ajaxIndex: 0,
				_ajaxCalls: [],
				_dataCalls: []
			}, r = {
				_moveScrollInterval: 100,
				_pingInterval: 1E4,
				_maxCharsToSendInUrl: 1442,
				_minTimeSinceLastVisitThatTriggersNewSession: 36E5,
				_farFutureCookieLifetime: 7776E6,
				_delayBeforeSendingHtml: "undefined" != typeof mouseflowHtmlDelay ? mouseflowHtmlDelay : 1E3
			}, K = 0,
			L = 0,
			aa = 0,
			k = f.document,
			T = new function () {
				for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""), b = 64; b;)--b;
				this.e = function (b) {
					for (var c = [], f = 0, d = 0, h, l = b.length, k = l % 3; f < l;) c[d++] = a[(h = b[f++] << 16 | b[f++] << 8 | b[f++]) >> 18 & 63] + a[h >> 12 & 63] + a[h >> 6 & 63] + a[h & 63];
					if (k)
						for (c[--d] = c[d].substr(0, c[d].length - (k = 3 - k)); k--;) c[d] += "*";
					return c.join("")
				}
			}, V = {
				_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
				encode: function (a) {
					var b = "",
						e, g, d, f, h, k, l = 0;
					for (a = this._utf8_encode(a); l < a.length;) e = a.charCodeAt(l++), g = a.charCodeAt(l++), d = a.charCodeAt(l++), f = e >> 2, e = (e & 3) << 4 | g >> 4, h = (g & 15) << 2 | d >> 6, k = d & 63, isNaN(g) ? h = k = 64 : isNaN(d) && (k = 64), b = b + this._keyStr.charAt(f) + this._keyStr.charAt(e) + this._keyStr.charAt(h) + this._keyStr.charAt(k);
					return b
				},
				_utf8_encode: function (a) {
					a = a.replace(/\r\n/g, "\n");
					for (var b = "", e = 0; e < a.length; e++) {
						var d = a.charCodeAt(e);
						128 > d ? b += String.fromCharCode(d) : (127 < d && 2048 > d ? b += String.fromCharCode(d >> 6 | 192) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128)), b += String.fromCharCode(d & 63 | 128))
					}
					return b
				}
			};
		(function () {
			if ("undefined" == typeof mouseflowPlayback) {
				var a = !1;
				"undefined" != typeof jQuery && na(jQuery.fn.jquery, "1.7.0") ? (l && console.log("MF: New jQuery found, version: " + jQuery.fn.jquery), d._hasJQuery = "1", a = !0) : "undefined" != typeof jQuery ? (l && console.log("MF: Old jQuery found, version: " + jQuery.fn.jquery + ", adding new one."), d._hasJQuery = "1") : l && console.log("MF: jQuery not found, adding");
				if (a) X(jQuery);
				else {
					var b = !1,
						a = document.getElementsByTagName("head")[0],
						e = document.createElement("script");
					e.type = "text/javascript";
					e.src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js?ref=mouseflow";
					e.onload = e.onreadystatechange = function () {
						if (!(b || this.readyState && "loaded" != this.readyState && "complete" != this.readyState)) {
							b = !0;
							var a = jQuery.noConflict(!0);
							X(a)
						}
					};
					a.appendChild(e)
				}
			}
		})();
		return {
			start: p,
			stop: H,
			newPageView: function (a) {
				"undefined" != typeof a && (f.mouseflowPath = a);
				H();
				p()
			},
			rebindEventHandlers: function () {
				Q();
				O()
			},
			getSessionId: function () {
				return d._sessionId
			},
			getPageViewId: function () {
				return d._pageId
			},
			addEvent: function (a) {
				h(18, {
					target: a
				})
			},
			star: function () {
				h(18, {
					target: "*"
				})
			},
			setVariable: function (a, c, e, d) {
				a && (b._dataCalls.push({
					key: a,
					value: c || "",
					scope: e || "session",
					overwrite: void 0 === d ? !0 : d
				}), f.clearTimeout(aa), aa = f.setTimeout(ja, 1E3))
			},
			sendScript: function (a) {
				a = "website=" + t + "&session=" + d._sessionId + "&page=" + d._pageId + "&type=script&time=" + (+new Date - b._startTime) + "&data=" + encodeURIComponent(a);
				v(s + "data", a, function () {})
			},
			formSubmitAttempt: function (a) {
				h(13, {
					target: a.id
				})
			},
			formSubmitSuccess: function (a) {
				h(34, {
					target: a.id
				})
			},
			formSubmitFailure: function (a) {
				a ? h(35, {
					target: a.id
				}) : (a = T.e([0, 0, 0, 0, 0, 0, 0, 35]) + "..", G(F() + "c.gif?p=" + d._lastPageId + "&d=" + a, function () {}, function () {}))
			},
			debug: function () {
				l = !l;
				console.log("MF: Debugging " + (l ? "enabled" : "disabled"))
			},
			baseUrl: s,
			websiteId: t,
			recordingRate: C,
			version: B,
			isRecording: u
		}
	}(window);
	void 0 == window._mfq && (window._mfq = []);
	mouseflow.ActionQueue = function (f) {
		if (f && f.length)
			for (var p = 0; p < f.length; p++) this.push(f[p])
	};
	mouseflow.ActionQueue.prototype.push = function (f) {
		if (f)
			if ("object" == typeof f && f.length) {
				var p = f.splice(0, 1);
				mouseflow[p] && mouseflow[p].apply(mouseflow, f)
			} else "function" == typeof f && f()
	}

	return mouseflow;
});