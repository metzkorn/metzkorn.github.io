if ("undefined" == typeof jQuery)
    throw new Error("Bootstrap's JavaScript requires jQuery");
!function() {
    "use strict";
    var t = jQuery.fn.jquery.split(" ")[0].split(".");
    if (t[0] < 2 && t[1] < 9 || 1 == t[0] && 9 == t[1] && t[2] < 1)
        throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(),
function(o) {
    "use strict";
    o.fn.emulateTransitionEnd = function(t) {
        var e = !1
          , n = this;
        o(this).one("bsTransitionEnd", function() {
            e = !0
        });
        return setTimeout(function() {
            e || o(n).trigger(o.support.transition.end)
        }, t),
        this
    }
    ,
    o(function() {
        o.support.transition = function() {
            var t = document.createElement("bootstrap")
              , e = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
            for (var n in e)
                if (void 0 !== t.style[n])
                    return {
                        end: e[n]
                    };
            return !1
        }(),
        o.support.transition && (o.event.special.bsTransitionEnd = {
            bindType: o.support.transition.end,
            delegateType: o.support.transition.end,
            handle: function(t) {
                return o(t.target).is(this) ? t.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery),
function(r) {
    "use strict";
    function a(t) {
        r(t).on("click", e, this.close)
    }
    var e = '[data-dismiss="alert"]';
    a.VERSION = "3.3.2",
    a.TRANSITION_DURATION = 150,
    a.prototype.close = function(t) {
        function e() {
            i.detach().trigger("closed.bs.alert").remove()
        }
        var n = r(this)
          , o = n.attr("data-target");
        o || (o = (o = n.attr("href")) && o.replace(/.*(?=#[^\s]*$)/, ""));
        var i = r(o);
        t && t.preventDefault(),
        i.length || (i = n.closest(".alert")),
        i.trigger(t = r.Event("close.bs.alert")),
        t.isDefaultPrevented() || (i.removeClass("in"),
        r.support.transition && i.hasClass("fade") ? i.one("bsTransitionEnd", e).emulateTransitionEnd(a.TRANSITION_DURATION) : e())
    }
    ;
    var t = r.fn.alert;
    r.fn.alert = function(n) {
        return this.each(function() {
            var t = r(this)
              , e = t.data("bs.alert");
            e || t.data("bs.alert", e = new a(this)),
            "string" == typeof n && e[n].call(t)
        })
    }
    ,
    r.fn.alert.Constructor = a,
    r.fn.alert.noConflict = function() {
        return r.fn.alert = t,
        this
    }
    ,
    r(document).on("click.bs.alert.data-api", e, a.prototype.close)
}(jQuery),
function(r) {
    "use strict";
    function n(o) {
        return this.each(function() {
            var t = r(this)
              , e = t.data("bs.button")
              , n = "object" == typeof o && o;
            e || t.data("bs.button", e = new i(this,n)),
            "toggle" == o ? e.toggle() : o && e.setState(o)
        })
    }
    var i = function(t, e) {
        this.$element = r(t),
        this.options = r.extend({}, i.DEFAULTS, e),
        this.isLoading = !1
    };
    i.VERSION = "3.3.2",
    i.DEFAULTS = {
        loadingText: "loading..."
    },
    i.prototype.setState = function(t) {
        var e = "disabled"
          , n = this.$element
          , o = n.is("input") ? "val" : "html"
          , i = n.data();
        t += "Text",
        null == i.resetText && n.data("resetText", n[o]()),
        setTimeout(r.proxy(function() {
            n[o](null == i[t] ? this.options[t] : i[t]),
            "loadingText" == t ? (this.isLoading = !0,
            n.addClass(e).attr(e, e)) : this.isLoading && (this.isLoading = !1,
            n.removeClass(e).removeAttr(e))
        }, this), 0)
    }
    ,
    i.prototype.toggle = function() {
        var t = !0
          , e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var n = this.$element.find("input");
            "radio" == n.prop("type") && (n.prop("checked") && this.$element.hasClass("active") ? t = !1 : e.find(".active").removeClass("active")),
            t && n.prop("checked", !this.$element.hasClass("active")).trigger("change")
        } else
            this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        t && this.$element.toggleClass("active")
    }
    ;
    var t = r.fn.button;
    r.fn.button = n,
    r.fn.button.Constructor = i,
    r.fn.button.noConflict = function() {
        return r.fn.button = t,
        this
    }
    ,
    r(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(t) {
        var e = r(t.target);
        e.hasClass("btn") || (e = e.closest(".btn")),
        n.call(e, "toggle"),
        t.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(t) {
        r(t.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(t.type))
    })
}(jQuery),
function(u) {
    "use strict";
    function a(i) {
        return this.each(function() {
            var t = u(this)
              , e = t.data("bs.carousel")
              , n = u.extend({}, h.DEFAULTS, t.data(), "object" == typeof i && i)
              , o = "string" == typeof i ? i : n.slide;
            e || t.data("bs.carousel", e = new h(this,n)),
            "number" == typeof i ? e.to(i) : o ? e[o]() : n.interval && e.pause().cycle()
        })
    }
    function h(t, e) {
        this.$element = u(t),
        this.$indicators = this.$element.find(".carousel-indicators"),
        this.options = e,
        this.paused = this.sliding = this.interval = this.$active = this.$items = null,
        this.options.keyboard && this.$element.on("keydown.bs.carousel", u.proxy(this.keydown, this)),
        "hover" != this.options.pause || "ontouchstart"in document.documentElement || this.$element.on("mouseenter.bs.carousel", u.proxy(this.pause, this)).on("mouseleave.bs.carousel", u.proxy(this.cycle, this))
    }
    h.VERSION = "3.3.2",
    h.TRANSITION_DURATION = 600,
    h.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    },
    h.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
            }
            t.preventDefault()
        }
    }
    ,
    h.prototype.cycle = function(t) {
        return t || (this.paused = !1),
        this.interval && clearInterval(this.interval),
        this.options.interval && !this.paused && (this.interval = setInterval(u.proxy(this.next, this), this.options.interval)),
        this
    }
    ,
    h.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"),
        this.$items.index(t || this.$active)
    }
    ,
    h.prototype.getItemForDirection = function(t, e) {
        var n = this.getItemIndex(e);
        if (("prev" == t && 0 === n || "next" == t && n == this.$items.length - 1) && !this.options.wrap)
            return e;
        var o = (n + ("prev" == t ? -1 : 1)) % this.$items.length;
        return this.$items.eq(o)
    }
    ,
    h.prototype.to = function(t) {
        var e = this
          , n = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || t < 0 ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            e.to(t)
        }) : n == t ? this.pause().cycle() : this.slide(n < t ? "next" : "prev", this.$items.eq(t))
    }
    ,
    h.prototype.pause = function(t) {
        return t || (this.paused = !0),
        this.$element.find(".next, .prev").length && u.support.transition && (this.$element.trigger(u.support.transition.end),
        this.cycle(!0)),
        this.interval = clearInterval(this.interval),
        this
    }
    ,
    h.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }
    ,
    h.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }
    ,
    h.prototype.slide = function(t, e) {
        var n = this.$element.find(".item.active")
          , o = e || this.getItemForDirection(t, n)
          , i = this.interval
          , r = "next" == t ? "left" : "right"
          , a = this;
        if (o.hasClass("active"))
            return this.sliding = !1;
        var s = o[0]
          , l = u.Event("slide.bs.carousel", {
            relatedTarget: s,
            direction: r
        });
        if (this.$element.trigger(l),
        !l.isDefaultPrevented()) {
            if (this.sliding = !0,
            i && this.pause(),
            this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var c = u(this.$indicators.children()[this.getItemIndex(o)]);
                c && c.addClass("active")
            }
            var d = u.Event("slid.bs.carousel", {
                relatedTarget: s,
                direction: r
            });
            return u.support.transition && this.$element.hasClass("slide") ? (o.addClass(t),
            o[0].offsetWidth,
            n.addClass(r),
            o.addClass(r),
            n.one("bsTransitionEnd", function() {
                o.removeClass([t, r].join(" ")).addClass("active"),
                n.removeClass(["active", r].join(" ")),
                a.sliding = !1,
                setTimeout(function() {
                    a.$element.trigger(d)
                }, 0)
            }).emulateTransitionEnd(h.TRANSITION_DURATION)) : (n.removeClass("active"),
            o.addClass("active"),
            this.sliding = !1,
            this.$element.trigger(d)),
            i && this.cycle(),
            this
        }
    }
    ;
    var t = u.fn.carousel;
    u.fn.carousel = a,
    u.fn.carousel.Constructor = h,
    u.fn.carousel.noConflict = function() {
        return u.fn.carousel = t,
        this
    }
    ;
    function e(t) {
        var e, n = u(this), o = u(n.attr("data-target") || (e = n.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, ""));
        if (o.hasClass("carousel")) {
            var i = u.extend({}, o.data(), n.data())
              , r = n.attr("data-slide-to");
            r && (i.interval = !1),
            a.call(o, i),
            r && o.data("bs.carousel").to(r),
            t.preventDefault()
        }
    }
    u(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e),
    u(window).on("load", function() {
        u('[data-ride="carousel"]').each(function() {
            var t = u(this);
            a.call(t, t.data())
        })
    })
}(jQuery),
function(a) {
    "use strict";
    function i(t) {
        var e, n = t.attr("data-target") || (e = t.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "");
        return a(n)
    }
    function s(o) {
        return this.each(function() {
            var t = a(this)
              , e = t.data("bs.collapse")
              , n = a.extend({}, l.DEFAULTS, t.data(), "object" == typeof o && o);
            !e && n.toggle && "show" == o && (n.toggle = !1),
            e || t.data("bs.collapse", e = new l(this,n)),
            "string" == typeof o && e[o]()
        })
    }
    var l = function(t, e) {
        this.$element = a(t),
        this.options = a.extend({}, l.DEFAULTS, e),
        this.$trigger = a(this.options.trigger).filter('[href="#' + t.id + '"], [data-target="#' + t.id + '"]'),
        this.transitioning = null,
        this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
        this.options.toggle && this.toggle()
    };
    l.VERSION = "3.3.2",
    l.TRANSITION_DURATION = 350,
    l.DEFAULTS = {
        toggle: !0,
        trigger: '[data-toggle="collapse"]'
    },
    l.prototype.dimension = function() {
        return this.$element.hasClass("width") ? "width" : "height"
    }
    ,
    l.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var t, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && ((t = e.data("bs.collapse")) && t.transitioning))) {
                var n = a.Event("show.bs.collapse");
                if (this.$element.trigger(n),
                !n.isDefaultPrevented()) {
                    e && e.length && (s.call(e, "hide"),
                    t || e.data("bs.collapse", null));
                    var o = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[o](0).attr("aria-expanded", !0),
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0),
                    this.transitioning = 1;
                    var i = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[o](""),
                        this.transitioning = 0,
                        this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition)
                        return i.call(this);
                    var r = a.camelCase(["scroll", o].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(i, this)).emulateTransitionEnd(l.TRANSITION_DURATION)[o](this.$element[0][r])
                }
            }
        }
    }
    ,
    l.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var t = a.Event("hide.bs.collapse");
            if (this.$element.trigger(t),
            !t.isDefaultPrevented()) {
                var e = this.dimension();
                this.$element[e](this.$element[e]())[0].offsetHeight,
                this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1),
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
                this.transitioning = 1;
                var n = function() {
                    this.transitioning = 0,
                    this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return a.support.transition ? void this.$element[e](0).one("bsTransitionEnd", a.proxy(n, this)).emulateTransitionEnd(l.TRANSITION_DURATION) : n.call(this)
            }
        }
    }
    ,
    l.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }
    ,
    l.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(t, e) {
            var n = a(e);
            this.addAriaAndCollapsedClass(i(n), n)
        }, this)).end()
    }
    ,
    l.prototype.addAriaAndCollapsedClass = function(t, e) {
        var n = t.hasClass("in");
        t.attr("aria-expanded", n),
        e.toggleClass("collapsed", !n).attr("aria-expanded", n)
    }
    ;
    var t = a.fn.collapse;
    a.fn.collapse = s,
    a.fn.collapse.Constructor = l,
    a.fn.collapse.noConflict = function() {
        return a.fn.collapse = t,
        this
    }
    ,
    a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(t) {
        var e = a(this);
        e.attr("data-target") || t.preventDefault();
        var n = i(e)
          , o = n.data("bs.collapse") ? "toggle" : a.extend({}, e.data(), {
            trigger: this
        });
        s.call(n, o)
    })
}(jQuery),
function(s) {
    "use strict";
    function r(o) {
        o && 3 === o.which || (s(".dropdown-backdrop").remove(),
        s(c).each(function() {
            var t = s(this)
              , e = l(t)
              , n = {
                relatedTarget: this
            };
            e.hasClass("open") && (e.trigger(o = s.Event("hide.bs.dropdown", n)),
            o.isDefaultPrevented() || (t.attr("aria-expanded", "false"),
            e.removeClass("open").trigger("hidden.bs.dropdown", n)))
        }))
    }
    function l(t) {
        var e = t.attr("data-target");
        e || (e = (e = t.attr("href")) && /#[A-Za-z]/.test(e) && e.replace(/.*(?=#[^\s]*$)/, ""));
        var n = e && s(e);
        return n && n.length ? n : t.parent()
    }
    function o(t) {
        s(t).on("click.bs.dropdown", this.toggle)
    }
    var c = '[data-toggle="dropdown"]';
    o.VERSION = "3.3.2",
    o.prototype.toggle = function(t) {
        var e = s(this);
        if (!e.is(".disabled, :disabled")) {
            var n = l(e)
              , o = n.hasClass("open");
            if (r(),
            !o) {
                "ontouchstart"in document.documentElement && !n.closest(".navbar-nav").length && s('<div class="dropdown-backdrop"/>').insertAfter(s(this)).on("click", r);
                var i = {
                    relatedTarget: this
                };
                if (n.trigger(t = s.Event("show.bs.dropdown", i)),
                t.isDefaultPrevented())
                    return;
                e.trigger("focus").attr("aria-expanded", "true"),
                n.toggleClass("open").trigger("shown.bs.dropdown", i)
            }
            return !1
        }
    }
    ,
    o.prototype.keydown = function(t) {
        if (/(38|40|27|32)/.test(t.which) && !/input|textarea/i.test(t.target.tagName)) {
            var e = s(this);
            if (t.preventDefault(),
            t.stopPropagation(),
            !e.is(".disabled, :disabled")) {
                var n = l(e)
                  , o = n.hasClass("open");
                if (!o && 27 != t.which || o && 27 == t.which)
                    return 27 == t.which && n.find(c).trigger("focus"),
                    e.trigger("click");
                var i = " li:not(.divider):visible a"
                  , r = n.find('[role="menu"]' + i + ', [role="listbox"]' + i);
                if (r.length) {
                    var a = r.index(t.target);
                    38 == t.which && 0 < a && a--,
                    40 == t.which && a < r.length - 1 && a++,
                    ~a || (a = 0),
                    r.eq(a).trigger("focus")
                }
            }
        }
    }
    ;
    var t = s.fn.dropdown;
    s.fn.dropdown = function(n) {
        return this.each(function() {
            var t = s(this)
              , e = t.data("bs.dropdown");
            e || t.data("bs.dropdown", e = new o(this)),
            "string" == typeof n && e[n].call(t)
        })
    }
    ,
    s.fn.dropdown.Constructor = o,
    s.fn.dropdown.noConflict = function() {
        return s.fn.dropdown = t,
        this
    }
    ,
    s(document).on("click.bs.dropdown.data-api", r).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", c, o.prototype.toggle).on("keydown.bs.dropdown.data-api", c, o.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', o.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', o.prototype.keydown)
}(jQuery),
function(r) {
    "use strict";
    function a(o, i) {
        return this.each(function() {
            var t = r(this)
              , e = t.data("bs.modal")
              , n = r.extend({}, s.DEFAULTS, t.data(), "object" == typeof o && o);
            e || t.data("bs.modal", e = new s(this,n)),
            "string" == typeof o ? e[o](i) : n.show && e.show(i)
        })
    }
    function s(t, e) {
        this.options = e,
        this.$body = r(document.body),
        this.$element = r(t),
        this.$backdrop = this.isShown = null,
        this.scrollbarWidth = 0,
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, r.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    }
    s.VERSION = "3.3.2",
    s.TRANSITION_DURATION = 300,
    s.BACKDROP_TRANSITION_DURATION = 150,
    s.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    },
    s.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t)
    }
    ,
    s.prototype.show = function(n) {
        var o = this
          , t = r.Event("show.bs.modal", {
            relatedTarget: n
        });
        this.$element.trigger(t),
        this.isShown || t.isDefaultPrevented() || (this.isShown = !0,
        this.checkScrollbar(),
        this.setScrollbar(),
        this.$body.addClass("modal-open"),
        this.escape(),
        this.resize(),
        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', r.proxy(this.hide, this)),
        this.backdrop(function() {
            var t = r.support.transition && o.$element.hasClass("fade");
            o.$element.parent().length || o.$element.appendTo(o.$body),
            o.$element.show().scrollTop(0),
            o.options.backdrop && o.adjustBackdrop(),
            o.adjustDialog(),
            t && o.$element[0].offsetWidth,
            o.$element.addClass("in").attr("aria-hidden", !1),
            o.enforceFocus();
            var e = r.Event("shown.bs.modal", {
                relatedTarget: n
            });
            t ? o.$element.find(".modal-dialog").one("bsTransitionEnd", function() {
                o.$element.trigger("focus").trigger(e)
            }).emulateTransitionEnd(s.TRANSITION_DURATION) : o.$element.trigger("focus").trigger(e)
        }))
    }
    ,
    s.prototype.hide = function(t) {
        t && t.preventDefault(),
        t = r.Event("hide.bs.modal"),
        this.$element.trigger(t),
        this.isShown && !t.isDefaultPrevented() && (this.isShown = !1,
        this.escape(),
        this.resize(),
        r(document).off("focusin.bs.modal"),
        this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"),
        r.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", r.proxy(this.hideModal, this)).emulateTransitionEnd(s.TRANSITION_DURATION) : this.hideModal())
    }
    ,
    s.prototype.enforceFocus = function() {
        r(document).off("focusin.bs.modal").on("focusin.bs.modal", r.proxy(function(t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }
    ,
    s.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", r.proxy(function(t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }
    ,
    s.prototype.resize = function() {
        this.isShown ? r(window).on("resize.bs.modal", r.proxy(this.handleUpdate, this)) : r(window).off("resize.bs.modal")
    }
    ,
    s.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(),
        this.backdrop(function() {
            t.$body.removeClass("modal-open"),
            t.resetAdjustments(),
            t.resetScrollbar(),
            t.$element.trigger("hidden.bs.modal")
        })
    }
    ,
    s.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(),
        this.$backdrop = null
    }
    ,
    s.prototype.backdrop = function(t) {
        var e = this
          , n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var o = r.support.transition && n;
            if (this.$backdrop = r('<div class="modal-backdrop ' + n + '" />').prependTo(this.$element).on("click.dismiss.bs.modal", r.proxy(function(t) {
                t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            }, this)),
            o && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !t)
                return;
            o ? this.$backdrop.one("bsTransitionEnd", t).emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION) : t()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var i = function() {
                e.removeBackdrop(),
                t && t()
            };
            r.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", i).emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION) : i()
        } else
            t && t()
    }
    ,
    s.prototype.handleUpdate = function() {
        this.options.backdrop && this.adjustBackdrop(),
        this.adjustDialog()
    }
    ,
    s.prototype.adjustBackdrop = function() {
        this.$backdrop.css("height", 0).css("height", this.$element[0].scrollHeight)
    }
    ,
    s.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }
    ,
    s.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }
    ,
    s.prototype.checkScrollbar = function() {
        this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight,
        this.scrollbarWidth = this.measureScrollbar()
    }
    ,
    s.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }
    ,
    s.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", "")
    }
    ,
    s.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure",
        this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t),
        e
    }
    ;
    var t = r.fn.modal;
    r.fn.modal = a,
    r.fn.modal.Constructor = s,
    r.fn.modal.noConflict = function() {
        return r.fn.modal = t,
        this
    }
    ,
    r(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(t) {
        var e = r(this)
          , n = e.attr("href")
          , o = r(e.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, ""))
          , i = o.data("bs.modal") ? "toggle" : r.extend({
            remote: !/#/.test(n) && n
        }, o.data(), e.data());
        e.is("a") && t.preventDefault(),
        o.one("show.bs.modal", function(t) {
            t.isDefaultPrevented() || o.one("hidden.bs.modal", function() {
                e.is(":visible") && e.trigger("focus")
            })
        }),
        a.call(o, i, this)
    })
}(jQuery),
function(m) {
    "use strict";
    function v(t, e) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null,
        this.init("tooltip", t, e)
    }
    v.VERSION = "3.3.2",
    v.TRANSITION_DURATION = 150,
    v.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    },
    v.prototype.init = function(t, e, n) {
        this.enabled = !0,
        this.type = t,
        this.$element = m(e),
        this.options = this.getOptions(n),
        this.$viewport = this.options.viewport && m(this.options.viewport.selector || this.options.viewport);
        for (var o = this.options.trigger.split(" "), i = o.length; i--; ) {
            var r = o[i];
            if ("click" == r)
                this.$element.on("click." + this.type, this.options.selector, m.proxy(this.toggle, this));
            else if ("manual" != r) {
                var a = "hover" == r ? "mouseenter" : "focusin"
                  , s = "hover" == r ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, m.proxy(this.enter, this)),
                this.$element.on(s + "." + this.type, this.options.selector, m.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = m.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }
    ,
    v.prototype.getDefaults = function() {
        return v.DEFAULTS
    }
    ,
    v.prototype.getOptions = function(t) {
        return (t = m.extend({}, this.getDefaults(), this.$element.data(), t)).delay && "number" == typeof t.delay && (t.delay = {
            show: t.delay,
            hide: t.delay
        }),
        t
    }
    ,
    v.prototype.getDelegateOptions = function() {
        var n = {}
          , o = this.getDefaults();
        return this._options && m.each(this._options, function(t, e) {
            o[t] != e && (n[t] = e)
        }),
        n
    }
    ,
    v.prototype.enter = function(t) {
        var e = t instanceof this.constructor ? t : m(t.currentTarget).data("bs." + this.type);
        return e && e.$tip && e.$tip.is(":visible") ? void (e.hoverState = "in") : (e || (e = new this.constructor(t.currentTarget,this.getDelegateOptions()),
        m(t.currentTarget).data("bs." + this.type, e)),
        clearTimeout(e.timeout),
        e.hoverState = "in",
        e.options.delay && e.options.delay.show ? void (e.timeout = setTimeout(function() {
            "in" == e.hoverState && e.show()
        }, e.options.delay.show)) : e.show())
    }
    ,
    v.prototype.leave = function(t) {
        var e = t instanceof this.constructor ? t : m(t.currentTarget).data("bs." + this.type);
        return e || (e = new this.constructor(t.currentTarget,this.getDelegateOptions()),
        m(t.currentTarget).data("bs." + this.type, e)),
        clearTimeout(e.timeout),
        e.hoverState = "out",
        e.options.delay && e.options.delay.hide ? void (e.timeout = setTimeout(function() {
            "out" == e.hoverState && e.hide()
        }, e.options.delay.hide)) : e.hide()
    }
    ,
    v.prototype.show = function() {
        var t = m.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(t);
            var e = m.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (t.isDefaultPrevented() || !e)
                return;
            var n = this
              , o = this.tip()
              , i = this.getUID(this.type);
            this.setContent(),
            o.attr("id", i),
            this.$element.attr("aria-describedby", i),
            this.options.animation && o.addClass("fade");
            var r = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement
              , a = /\s?auto?\s?/i
              , s = a.test(r);
            s && (r = r.replace(a, "") || "top"),
            o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(r).data("bs." + this.type, this),
            this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element);
            var l = this.getPosition()
              , c = o[0].offsetWidth
              , d = o[0].offsetHeight;
            if (s) {
                var u = r
                  , h = this.options.container ? m(this.options.container) : this.$element.parent()
                  , p = this.getPosition(h);
                r = "bottom" == r && l.bottom + d > p.bottom ? "top" : "top" == r && l.top - d < p.top ? "bottom" : "right" == r && l.right + c > p.width ? "left" : "left" == r && l.left - c < p.left ? "right" : r,
                o.removeClass(u).addClass(r)
            }
            var f = this.getCalculatedOffset(r, l, c, d);
            this.applyPlacement(f, r);
            var g = function() {
                var t = n.hoverState;
                n.$element.trigger("shown.bs." + n.type),
                n.hoverState = null,
                "out" == t && n.leave(n)
            };
            m.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", g).emulateTransitionEnd(v.TRANSITION_DURATION) : g()
        }
    }
    ,
    v.prototype.applyPlacement = function(t, e) {
        var n = this.tip()
          , o = n[0].offsetWidth
          , i = n[0].offsetHeight
          , r = parseInt(n.css("margin-top"), 10)
          , a = parseInt(n.css("margin-left"), 10);
        isNaN(r) && (r = 0),
        isNaN(a) && (a = 0),
        t.top = t.top + r,
        t.left = t.left + a,
        m.offset.setOffset(n[0], m.extend({
            using: function(t) {
                n.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, t), 0),
        n.addClass("in");
        var s = n[0].offsetWidth
          , l = n[0].offsetHeight;
        "top" == e && l != i && (t.top = t.top + i - l);
        var c = this.getViewportAdjustedDelta(e, t, s, l);
        c.left ? t.left += c.left : t.top += c.top;
        var d = /top|bottom/.test(e)
          , u = d ? 2 * c.left - o + s : 2 * c.top - i + l
          , h = d ? "offsetWidth" : "offsetHeight";
        n.offset(t),
        this.replaceArrow(u, n[0][h], d)
    }
    ,
    v.prototype.replaceArrow = function(t, e, n) {
        this.arrow().css(n ? "left" : "top", 50 * (1 - t / e) + "%").css(n ? "top" : "left", "")
    }
    ,
    v.prototype.setContent = function() {
        var t = this.tip()
          , e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e),
        t.removeClass("fade in top bottom left right")
    }
    ,
    v.prototype.hide = function(t) {
        function e() {
            "in" != n.hoverState && o.detach(),
            n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type),
            t && t()
        }
        var n = this
          , o = this.tip()
          , i = m.Event("hide.bs." + this.type);
        return this.$element.trigger(i),
        i.isDefaultPrevented() ? void 0 : (o.removeClass("in"),
        m.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", e).emulateTransitionEnd(v.TRANSITION_DURATION) : e(),
        this.hoverState = null,
        this)
    }
    ,
    v.prototype.fixTitle = function() {
        var t = this.$element;
        !t.attr("title") && "string" == typeof t.attr("data-original-title") || t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }
    ,
    v.prototype.hasContent = function() {
        return this.getTitle()
    }
    ,
    v.prototype.getPosition = function(t) {
        var e = (t = t || this.$element)[0]
          , n = "BODY" == e.tagName
          , o = e.getBoundingClientRect();
        null == o.width && (o = m.extend({}, o, {
            width: o.right - o.left,
            height: o.bottom - o.top
        }));
        var i = n ? {
            top: 0,
            left: 0
        } : t.offset()
          , r = {
            scroll: n ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop()
        }
          , a = n ? {
            width: m(window).width(),
            height: m(window).height()
        } : null;
        return m.extend({}, o, r, a, i)
    }
    ,
    v.prototype.getCalculatedOffset = function(t, e, n, o) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - n / 2
        } : "top" == t ? {
            top: e.top - o,
            left: e.left + e.width / 2 - n / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - o / 2,
            left: e.left - n
        } : {
            top: e.top + e.height / 2 - o / 2,
            left: e.left + e.width
        }
    }
    ,
    v.prototype.getViewportAdjustedDelta = function(t, e, n, o) {
        var i = {
            top: 0,
            left: 0
        };
        if (!this.$viewport)
            return i;
        var r = this.options.viewport && this.options.viewport.padding || 0
          , a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var s = e.top - r - a.scroll
              , l = e.top + r - a.scroll + o;
            s < a.top ? i.top = a.top - s : l > a.top + a.height && (i.top = a.top + a.height - l)
        } else {
            var c = e.left - r
              , d = e.left + r + n;
            c < a.left ? i.left = a.left - c : d > a.width && (i.left = a.left + a.width - d)
        }
        return i
    }
    ,
    v.prototype.getTitle = function() {
        var t = this.$element
          , e = this.options;
        return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
    }
    ,
    v.prototype.getUID = function(t) {
        for (; t += ~~(1e6 * Math.random()),
        document.getElementById(t); )
            ;
        return t
    }
    ,
    v.prototype.tip = function() {
        return this.$tip = this.$tip || m(this.options.template)
    }
    ,
    v.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }
    ,
    v.prototype.enable = function() {
        this.enabled = !0
    }
    ,
    v.prototype.disable = function() {
        this.enabled = !1
    }
    ,
    v.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }
    ,
    v.prototype.toggle = function(t) {
        var e = this;
        t && ((e = m(t.currentTarget).data("bs." + this.type)) || (e = new this.constructor(t.currentTarget,this.getDelegateOptions()),
        m(t.currentTarget).data("bs." + this.type, e))),
        e.tip().hasClass("in") ? e.leave(e) : e.enter(e)
    }
    ,
    v.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout),
        this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type)
        })
    }
    ;
    var t = m.fn.tooltip;
    m.fn.tooltip = function(o) {
        return this.each(function() {
            var t = m(this)
              , e = t.data("bs.tooltip")
              , n = "object" == typeof o && o;
            !e && "destroy" == o || (e || t.data("bs.tooltip", e = new v(this,n)),
            "string" == typeof o && e[o]())
        })
    }
    ,
    m.fn.tooltip.Constructor = v,
    m.fn.tooltip.noConflict = function() {
        return m.fn.tooltip = t,
        this
    }
}(jQuery),
function(i) {
    "use strict";
    function r(t, e) {
        this.init("popover", t, e)
    }
    if (!i.fn.tooltip)
        throw new Error("Popover requires tooltip.js");
    r.VERSION = "3.3.2",
    r.DEFAULTS = i.extend({}, i.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }),
    ((r.prototype = i.extend({}, i.fn.tooltip.Constructor.prototype)).constructor = r).prototype.getDefaults = function() {
        return r.DEFAULTS
    }
    ,
    r.prototype.setContent = function() {
        var t = this.tip()
          , e = this.getTitle()
          , n = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e),
        t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof n ? "html" : "append" : "text"](n),
        t.removeClass("fade top bottom left right in"),
        t.find(".popover-title").html() || t.find(".popover-title").hide()
    }
    ,
    r.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }
    ,
    r.prototype.getContent = function() {
        var t = this.$element
          , e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }
    ,
    r.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }
    ,
    r.prototype.tip = function() {
        return this.$tip || (this.$tip = i(this.options.template)),
        this.$tip
    }
    ;
    var t = i.fn.popover;
    i.fn.popover = function(o) {
        return this.each(function() {
            var t = i(this)
              , e = t.data("bs.popover")
              , n = "object" == typeof o && o;
            !e && "destroy" == o || (e || t.data("bs.popover", e = new r(this,n)),
            "string" == typeof o && e[o]())
        })
    }
    ,
    i.fn.popover.Constructor = r,
    i.fn.popover.noConflict = function() {
        return i.fn.popover = t,
        this
    }
}(jQuery),
function(r) {
    "use strict";
    function i(t, e) {
        var n = r.proxy(this.process, this);
        this.$body = r("body"),
        this.$scrollElement = r(r(t).is("body") ? window : t),
        this.options = r.extend({}, i.DEFAULTS, e),
        this.selector = (this.options.target || "") + " .nav li > a",
        this.offsets = [],
        this.targets = [],
        this.activeTarget = null,
        this.scrollHeight = 0,
        this.$scrollElement.on("scroll.bs.scrollspy", n),
        this.refresh(),
        this.process()
    }
    function e(o) {
        return this.each(function() {
            var t = r(this)
              , e = t.data("bs.scrollspy")
              , n = "object" == typeof o && o;
            e || t.data("bs.scrollspy", e = new i(this,n)),
            "string" == typeof o && e[o]()
        })
    }
    i.VERSION = "3.3.2",
    i.DEFAULTS = {
        offset: 10
    },
    i.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }
    ,
    i.prototype.refresh = function() {
        var o = "offset"
          , i = 0;
        r.isWindow(this.$scrollElement[0]) || (o = "position",
        i = this.$scrollElement.scrollTop()),
        this.offsets = [],
        this.targets = [],
        this.scrollHeight = this.getScrollHeight();
        var t = this;
        this.$body.find(this.selector).map(function() {
            var t = r(this)
              , e = t.data("target") || t.attr("href")
              , n = /^#./.test(e) && r(e);
            return n && n.length && n.is(":visible") && [[n[o]().top + i, e]] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            t.offsets.push(this[0]),
            t.targets.push(this[1])
        })
    }
    ,
    i.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset, n = this.getScrollHeight(), o = this.options.offset + n - this.$scrollElement.height(), i = this.offsets, r = this.targets, a = this.activeTarget;
        if (this.scrollHeight != n && this.refresh(),
        o <= e)
            return a != (t = r[r.length - 1]) && this.activate(t);
        if (a && e < i[0])
            return this.activeTarget = null,
            this.clear();
        for (t = i.length; t--; )
            a != r[t] && e >= i[t] && (!i[t + 1] || e <= i[t + 1]) && this.activate(r[t])
    }
    ,
    i.prototype.activate = function(t) {
        this.activeTarget = t,
        this.clear();
        var e = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]'
          , n = r(e).parents("li").addClass("active");
        n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")),
        n.trigger("activate.bs.scrollspy")
    }
    ,
    i.prototype.clear = function() {
        r(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    }
    ;
    var t = r.fn.scrollspy;
    r.fn.scrollspy = e,
    r.fn.scrollspy.Constructor = i,
    r.fn.scrollspy.noConflict = function() {
        return r.fn.scrollspy = t,
        this
    }
    ,
    r(window).on("load.bs.scrollspy.data-api", function() {
        r('[data-spy="scroll"]').each(function() {
            var t = r(this);
            e.call(t, t.data())
        })
    })
}(jQuery),
function(s) {
    "use strict";
    function e(n) {
        return this.each(function() {
            var t = s(this)
              , e = t.data("bs.tab");
            e || t.data("bs.tab", e = new a(this)),
            "string" == typeof n && e[n]()
        })
    }
    function a(t) {
        this.element = s(t)
    }
    a.VERSION = "3.3.2",
    a.TRANSITION_DURATION = 150,
    a.prototype.show = function() {
        var t = this.element
          , e = t.closest("ul:not(.dropdown-menu)")
          , n = t.data("target");
        if (n || (n = (n = t.attr("href")) && n.replace(/.*(?=#[^\s]*$)/, "")),
        !t.parent("li").hasClass("active")) {
            var o = e.find(".active:last a")
              , i = s.Event("hide.bs.tab", {
                relatedTarget: t[0]
            })
              , r = s.Event("show.bs.tab", {
                relatedTarget: o[0]
            });
            if (o.trigger(i),
            t.trigger(r),
            !r.isDefaultPrevented() && !i.isDefaultPrevented()) {
                var a = s(n);
                this.activate(t.closest("li"), e),
                this.activate(a, a.parent(), function() {
                    o.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: t[0]
                    }),
                    t.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: o[0]
                    })
                })
            }
        }
    }
    ,
    a.prototype.activate = function(t, e, n) {
        function o() {
            i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1),
            t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0),
            r ? (t[0].offsetWidth,
            t.addClass("in")) : t.removeClass("fade"),
            t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0),
            n && n()
        }
        var i = e.find("> .active")
          , r = n && s.support.transition && (i.length && i.hasClass("fade") || !!e.find("> .fade").length);
        i.length && r ? i.one("bsTransitionEnd", o).emulateTransitionEnd(a.TRANSITION_DURATION) : o(),
        i.removeClass("in")
    }
    ;
    var t = s.fn.tab;
    s.fn.tab = e,
    s.fn.tab.Constructor = a,
    s.fn.tab.noConflict = function() {
        return s.fn.tab = t,
        this
    }
    ;
    function n(t) {
        t.preventDefault(),
        e.call(s(this), "show")
    }
    s(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', n).on("click.bs.tab.data-api", '[data-toggle="pill"]', n)
}(jQuery),
function(l) {
    "use strict";
    function n(o) {
        return this.each(function() {
            var t = l(this)
              , e = t.data("bs.affix")
              , n = "object" == typeof o && o;
            e || t.data("bs.affix", e = new c(this,n)),
            "string" == typeof o && e[o]()
        })
    }
    var c = function(t, e) {
        this.options = l.extend({}, c.DEFAULTS, e),
        this.$target = l(this.options.target).on("scroll.bs.affix.data-api", l.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", l.proxy(this.checkPositionWithEventLoop, this)),
        this.$element = l(t),
        this.affixed = this.unpin = this.pinnedOffset = null,
        this.checkPosition()
    };
    c.VERSION = "3.3.2",
    c.RESET = "affix affix-top affix-bottom",
    c.DEFAULTS = {
        offset: 0,
        target: window
    },
    c.prototype.getState = function(t, e, n, o) {
        var i = this.$target.scrollTop()
          , r = this.$element.offset()
          , a = this.$target.height();
        if (null != n && "top" == this.affixed)
            return i < n && "top";
        if ("bottom" == this.affixed)
            return null != n ? !(i + this.unpin <= r.top) && "bottom" : !(i + a <= t - o) && "bottom";
        var s = null == this.affixed
          , l = s ? i : r.top;
        return null != n && i <= n ? "top" : null != o && t - o <= l + (s ? a : e) && "bottom"
    }
    ,
    c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset)
            return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var t = this.$target.scrollTop()
          , e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }
    ,
    c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(l.proxy(this.checkPosition, this), 1)
    }
    ,
    c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var t = this.$element.height()
              , e = this.options.offset
              , n = e.top
              , o = e.bottom
              , i = l("body").height();
            "object" != typeof e && (o = n = e),
            "function" == typeof n && (n = e.top(this.$element)),
            "function" == typeof o && (o = e.bottom(this.$element));
            var r = this.getState(i, t, n, o);
            if (this.affixed != r) {
                null != this.unpin && this.$element.css("top", "");
                var a = "affix" + (r ? "-" + r : "")
                  , s = l.Event(a + ".bs.affix");
                if (this.$element.trigger(s),
                s.isDefaultPrevented())
                    return;
                this.affixed = r,
                this.unpin = "bottom" == r ? this.getPinnedOffset() : null,
                this.$element.removeClass(c.RESET).addClass(a).trigger(a.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == r && this.$element.offset({
                top: i - t - o
            })
        }
    }
    ;
    var t = l.fn.affix;
    l.fn.affix = n,
    l.fn.affix.Constructor = c,
    l.fn.affix.noConflict = function() {
        return l.fn.affix = t,
        this
    }
    ,
    l(window).on("load", function() {
        l('[data-spy="affix"]').each(function() {
            var t = l(this)
              , e = t.data();
            e.offset = e.offset || {},
            null != e.offsetBottom && (e.offset.bottom = e.offsetBottom),
            null != e.offsetTop && (e.offset.top = e.offsetTop),
            n.call(t, e)
        })
    })
}(jQuery),
function() {
    "use strict";
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var t = document.createElement("style");
        t.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")),
        document.querySelector("head").appendChild(t)
    }
}();
var Y = function() {
    var u, t = {}, e = e || new Date, n = /webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), o = /android/i.test(navigator.userAgent), r = !1, l = "";
    function j(t) {
        l += "<br>elapse: " + (new Date - e) + " msec -msg: " + t
    }
    var c = 0
      , d = 1
      , h = 2
      , p = 3
      , f = 4
      , g = 5
      , m = 6
      , v = 8
      , y = 9
      , b = 10
      , C = 11
      , w = 12
      , T = 13
      , _ = 19
      , E = 25
      , A = 27
      , I = 100;
    var k = 0
      , S = 1
      , x = 2
      , N = 5
      , D = 8
      , O = 9
      , L = 10
      , R = 12
      , P = 13
      , U = 14
      , M = 15
      , F = 18
      , Y = 19
      , Q = 28
      , V = 29
      , G = 36
      , z = 52
      , W = 53
      , q = 54
      , B = 55
      , H = 57
      , K = 66
      , Z = 83
      , J = 158
      , X = 168
      , tt = 11
      , et = 16
      , nt = 30
      , ot = 33
      , it = 68
      , rt = 91
      , at = 116
      , st = 124
      , lt = 127
      , ct = 123
      , dt = 125
      , ut = 126
      , ht = 128
      , pt = 129
      , ft = 131
      , gt = 137;
    var mt = 5
      , vt = 0;
    function yt(t) {
        return "string" == typeof t || t instanceof String
    }
    function bt(t) {
        try {
            return JSON && JSON.parse(t) || $.parseJSON(t)
        } catch (t) {}
        return ""
    }
    jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(e) {
        return function(t) {
            return 0 <= jQuery(t).text().toUpperCase().indexOf(e.toUpperCase())
        }
    });
    var a = 0;
    function $t() {
        1 < ++a || (console.log("reloading (" + a + "): " + document.location),
        document.location.reload(!0))
    }
    function Ct(t) {
        for (var e = "", n = 0; n < t; n++) {
            var o = String.fromCharCode(97 + Math.floor(26 * Math.random()));
            e += Math.floor(2 * Math.random()) % 2 == 0 ? o : o.toUpperCase()
        }
        return e
    }
    function s() {
        var t = $("#controlID");
        t.length && t.show(),
        (t = $("#caption")).length && t.show()
    }
    var wt = !1
      , Tt = !1
      , _t = !0
      , Et = !0
      , jt = !0
      , At = 0
      , It = !1;
    var kt = 0
      , St = 1
      , xt = 2
      , Nt = 1
      , Dt = {
        ERROR: 1,
        WIDGET_RESIZE: 2,
        SERVER_HIT: 3,
        ADV: 4,
        SEARCH_DONE: 20,
        VIDEO_CHANGE: 21,
        CAPTION_CHANGE: 22,
        CAPTION_CONSUMED: 23,
        PLAYER_READY: 40,
        PLAYER_STATECHANGE: 41,
        PLAYER_SPEED_UPDATED: 42,
        YT_IFRAME_READY: 43,
        DOC_READY: 44,
        UNREADY: 100
    }
      , Ot = {};
    function Lt(t, e) {
        var n = Ot[t];
        n || (n = [],
        Ot[t] = n),
        n[n.length] = e
    }
    function Rt(t) {
        var e = !1
          , n = Ot[t];
        if (n)
            for (var o = n.length, i = 0; i < o; i++)
                e = e || n[i]();
        return e
    }
    var Pt = {
        REGULAR: "0",
        NO_SEGMENTATION: "1"
    }
      , Ut = Pt.REGULAR
      , Mt = {
        SEARCH: "0",
        GETCID: "1",
        LESSON_VIDEO: "2",
        LESSON_WORD: "3",
        INDEX: "4"
    }
      , Ft = !0
      , Yt = null
      , Qt = {
        minErr: 99,
        bEditMode: !1,
        userLang: c,
        bLocal: !1,
        reqType: Mt.SEARCH,
        jsDidumPro: !1,
        jsTotalResult: 0,
        loggedIn: !1,
        dbg: 0,
        allowCapSynch: !0,
        jsStart: !0,
        jsPatchYTDelay: 0,
        jsChromePatchDelay: 1e4,
        jsQuery: "",
        jsIndexQuery: "",
        jsEmbClient: "",
        jsIsGenderQuery: !1,
        jsEmbedded: !1,
        jsDico: !0,
        jsEmbeddedNotifHeight: !1,
        jsEmbHeight: -1,
        jsLang: c,
        jsAccent: 0,
        jsURLToken: "",
        jsURLTokenLight: "",
        jsHCCode: 1e3,
        jsControlButtonVisibilityDelay: 5e3,
        jsYTAccess: kt,
        jsPlayList: "",
        ck_v: ""
    };
    function Vt(t, e) {
        Qt.jsLang = t,
        Qt.jsAccent = e;
        var n = $("#searchbut");
        n.length && (n.data("lang", t),
        n.data("accent", e)),
        nn.normalize()
    }
    $.fn.removeClassPrefix = function(o) {
        return this.each(function(t, e) {
            var n = e.className.split(" ").filter(function(t) {
                return 0 !== t.lastIndexOf(o, 0)
            });
            e.className = $.trim(n.join(" "))
        }),
        this
    }
    ;
    function Gt() {
        this.buffer = [],
        this.index = 0
    }
    function zt(t, e, n) {
        void 0 !== window.parent.postMessage && (e = e || Qt.jsEmbId) && (t.wid = e,
        (Qt.jsEmbedded || n) && window.parent.postMessage(JSON.stringify(t), "*"))
    }
    Gt.prototype = {
        append: function(t) {
            return this.buffer[this.index] = t,
            this.index += 1,
            this
        },
        toString: function() {
            return this.buffer.join("")
        }
    },
    Array.prototype.insert = function(t, e) {
        this.splice(t, 0, e)
    }
    ,
    String.prototype.endsWith = function(t) {
        var e = this.length - t.length;
        return 0 <= e && this.lastIndexOf(t) === e
    }
    ,
    String.prototype.replaceAll = function(t, e) {
        return this.replace(new RegExp(t,"g"), e)
    }
    ,
    String.prototype.startsWith || (String.prototype.startsWith = function(t, e) {
        return e = e || 0,
        this.indexOf(t, e) === e
    }
    );
    var Wt = "^|[^\\wÀ-ɏ]"
      , qt = "[^\\wÀ-ɏ]|$"
      , Bt = ""
      , Ht = ""
      , Kt = "yg_session"
      , Zt = "yg_username"
      , Jt = "yg_name"
      , Xt = "cookie_consent"
      , te = "cookie_support"
      , ee = "adult"
      , ne = "romanization"
      , oe = "vidinfo"
      , ie = "autonext"
      , re = "autoplay"
      , ae = "show_thb"
      , se = "extui"
      , le = "history"
      , ce = "capcol"
      , de = "markercol"
      , ue = "width"
      , he = "capsize"
      , pe = "lnksize"
      , fe = "vquality"
      , ge = "langtrg"
      , me = "theme"
      , ve = "pl_speed"
      , ye = "vid_pad_bottom"
      , be = "accent_required"
      , $e = "back_duration"
      , Ce = "delay_start"
      , we = "vrs"
      , Te = "sync"
      , _e = "uc_size"
      , Ee = "chrome_patch"
      , je = "extended_search"
      , Ae = "cookie_dico"
      , Ie = "cookie_mother_tongue"
      , ke = "_xtx_"
      , Se = .1;
    function xe(t) {
        try {
            return t.charAt(0).toUpperCase() + t.substring(1).toLowerCase()
        } catch (t) {}
        return t
    }
    (new Date).getTime();
    function Ne(t) {
        document.getElementById("audio" + t).play()
    }
    function De(t, e) {
        (t = $(t)).scrollTop(0),
        t.stop().animate({
            scrollTop: $(e).position().top
        }, 250, "swing")
    }
    function Oe(t) {
        return $("<div/>").html(t).text()
    }
    function Le(t) {
        return encodeURIComponent(t).replace(/%2F/g, "%252F").replace(/[!'()*]/g, escape)
    }
    function Re() {
        if (Qt.jsQuery) {
            var t = "/didum.jsp?q=" + encodeURIComponent(Qt.jsQuery);
            $.ajax({
                url: t,
                success: function(t) {
                    if (0 < (t = $.trim(t)).length) {
                        var e = $("#didum")
                          , n = "Did you mean " + function(t, e) {
                            try {
                                t = t.trim();
                                var n = "/pronounce/" + encodeURIComponent(t).replace(/'/g, "%27") + NaN + Qt.jsURLTokenLight;
                                return "<a" + (e ? " class='" + e + "'" : "") + " href='" + (n += "/" + $("#serializeMe :input").serialize()) + "'>" + t + "</a>"
                            } catch (t) {}
                            return t
                        }(t, "nodec") + " ?";
                        e.html(n),
                        e.show(),
                        ir()
                    }
                }
            })
        }
    }
    function Pe() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    }
    function Ue(t) {
        return "https://youglish.com/images/" + (Qt.ex_img_path ? Qt.ex_img_path : "") + t
    }
    function Me(t, e, n) {
        return n ? n * Math.floor(Math.random() * (e - t + 1) + t) : Math.floor(Math.random() * (e - t + 1) + t)
    }
    function Fe(t) {
        return t ? (-1 != t.indexOf("[[[") && (t = (t = t.replace(/\[\[\[/g, "")).replace(/]]]/g, "")),
        Oe(t)) : ""
    }
    function Ye(t) {
        return t ? (-1 != t.indexOf("[[[") && (t = (t = Qt.jsMarkerStyle ? t.replace(/\[\[\[/g, "<span style='" + Qt.jsMarkerStyle + "' class='marker lg_" + Qt.jsLang + "'>") : t.replace(/\[\[\[/g, "<span class='marker lg_" + Qt.jsLang + "'>")).replace(/\]\]\]/g, "</span>")),
        t) : ""
    }
    function Qe(t, e) {
        var n;
        if ((n = e) && -1 != n.indexOf("~") && (n = (n = n.replaceAll('"', "")).replaceAll("~\\d+", "")),
        e = n,
        !t)
            return "";
        if (-1 == t.indexOf("[[[")) {
            for (var o = new RegExp('"[^"]+"|[^ ]+',"gim"), i = o.exec(e), r = {}; null != i; )
                r[i[0]] = "",
                i = o.exec(e);
            var a = [];
            for (var s in r)
                r.hasOwnProperty(s) && a.push(s);
            a.sort(function(t, e) {
                return e.length - t.length
            });
            var l = 0;
            for (l = 0; l < a.length; l++)
                t = Ve(t, a[l])
        }
        return t
    }
    function Ve(t, e) {
        var n, o = Wt, i = qt;
        (n = Qt.jsLang) != m && n != g && n != C && n != T || (o = Bt,
        i = Ht),
        e = function(t) {
            var e = t;
            e = We(e, !1);
            var n = t.replace(/oe/gi, "œ");
            e != t && (e = e + "|" + t);
            n != t && (e = e + "|" + n);
            return e
        }(e = (e = e.replace(/["%]/g, "")).replace(/[ ]+/g, "[^\\w]+")),
        Qt.jsLang == C && (e = function(t) {
            for (var e = "", n = 0; n < t.length; n++)
                e += t[n],
                o = t[n],
                1536 <= (i = o.charCodeAt(0)) && i <= 2304 && (e += "([\\u0610-\\u061A]|[\\u06D6-\\u06ED]|[\\u0640]|[\\u064B-\\u065F]|[\\u0670]|[\\u0670]){0,}");
            var o, i;
            return e
        }(e)),
        -1 < e.indexOf("*") && (e = e.replace(/[*]/g, "[a-z0-9" + We("eaciouyn", !0) + "]*"));
        for (var r = new RegExp(ze(o, !1) + ze(e) + ze(i, !1),"gim"), a = r.exec(t), s = {}; null != a; )
            s[Ge(a[1])] = "",
            a = r.exec(t);
        for (var l in s)
            s.hasOwnProperty(l) && (r = new RegExp(ze(o) + ze(l) + ze(i),"gm"),
            t = t.replace(r, "$1[[[" + l + "]]]$3"));
        return t
    }
    function Ge(t) {
        var e = t.indexOf("[[[");
        return -1 != e && (t = t.substring(0, e)),
        -1 != (e = t.indexOf("]]]")) && (t = t.substring(e + 3)),
        t
    }
    function ze(t, e) {
        return void 0 === e && (e = !0),
        "(" + (e ? "" : "?:") + t + ")"
    }
    function We(t, e) {
        for (var n = ["aaàâãäáâåą", "eéèêëę", "cçć", "gğ", "iîïíìıi̇İį", "lł", "oôöóò", "nñń", "sşś", "uùûüú", "yÿ", "zżź"], o = n.length, i = 0; i < o; i++) {
            var r = "[" + n[i] + "]";
            t = t.replace(new RegExp(r,"ig"), r)
        }
        return e && (t = t.replace(/[\[\]]/gi, "")),
        t
    }
    function qe(t) {
        return t = t && (t = (t = t.replace(/(:[a-z]+)/gi, "")).replace(/[!?]/gi, "")).replace(/(#\S+)/gi, "")
    }
    function Be() {
        Je(we),
        He(we, Qt.ck_v, 600)
    }
    function He(t, e, n) {
        He(t, e, n, Qt.bLocal ? null : ".youglish.com")
    }
    function He(t, e, n, o) {
        if (-1 == (n = n || 365) || dn(t)) {
            var i = "";
            if (n) {
                var r = new Date;
                r.setTime(r.getTime() + 24 * n * 60 * 60 * 1e3),
                i = "; expires=" + r.toGMTString()
            }
            document.cookie = t + "=" + e + i + (o ? "; domain=" + o : "") + "; path=/"
        }
    }
    function Ke(t) {
        for (var e = encodeURIComponent(t) + "=", n = document.cookie.split(";"), o = 0; o < n.length; o++) {
            for (var i = n[o]; " " === i.charAt(0); )
                i = i.substring(1, i.length);
            if (0 === i.indexOf(e))
                return decodeURIComponent(i.substring(e.length, i.length))
        }
        return null
    }
    function Ze(t, e) {
        He(t, "", -1, e)
    }
    function Je(t) {
        Ze(t, ".youglish.com"),
        Ze(t, "")
    }
    function Xe(t) {
        return (0 ^ (t = parseInt(t))) === t
    }
    function tn(t, e) {
        this.lang = t,
        this.acc = e
    }
    var en, nn = ((en = {}).toAccentStr = rn,
    en.toLangStr = on,
    en.normalize = function() {
        var t, e, n, o, i, r = Qt.jsLang, a = Qt.jsAccent;
        if (null == r || "" === r || -1 == Number(r)) {
            var s = null == (n = a) || null == n ? new tn(c,k) : 0 == (n = ("" + n).toLowerCase()).length || "all" == n ? new tn(c,k) : "us" == n ? new tn(c,S) : "uk" == n ? new tn(c,x) : "aus" == n ? new tn(c,R) : "spanish" == n ? new tn(h,k) : "allfrench" == n ? new tn(d,k) : "french" == n ? new tn(d,N) : "quebec" == n ? new tn(d,Q) : "belgian" == n ? new tn(d,V) : "swiss" == n ? new tn(d,G) : "portuguese" == n ? new tn(y,k) : "portuguese-br" == n ? new tn(y,L) : "portuguese-pt" == n ? new tn(y,O) : "italian" == n ? new tn(f,k) : "hebrew" == n ? new tn(T,k) : "polish" == n ? new tn(A,k) : "greek" == n ? new tn(_,k) : "german" == n ? new tn(p,k) : "korean" == n ? new tn(v,k) : "turkish" == n ? new tn(E,k) : "russian" == n ? new tn(b,k) : "japanese" == n ? new tn(g,k) : "chinese" == n ? new tn(m,k) : "cn" == n ? new tn(m,Y) : "tw" == n ? new tn(m,z) : "sg" == n ? new tn(m,W) : "hk" == n ? new tn(m,q) : "sh" == n ? new tn(m,B) : "mo" == n ? new tn(m,H) : "mn" == n ? new tn(m,J) : new tn(c,k);
            Qt.jsLang = s.lang,
            Qt.jsAccent = s.acc
        } else
            0 == Xe(r) && (r = "english" == (e = (e = r) ? e.toLowerCase().trim() : e) ? c : "french" == e ? d : "spanish" == e ? h : "german" == e ? p : "korean" == e ? v : "turkish" == e ? E : "russian" == e ? b : "arabic" == e ? C : "dutch" == e ? w : "japanese" == e ? g : "italian" == e ? f : "hebrew" == e ? T : "polish" == e ? A : "greek" == e ? _ : "chinese" == e ? m : "portuguese" == e ? y : "signlanguage" == e ? I : c),
            Qt.jsLang = parseInt(r),
            0 == Xe(a) && (a = "us" == (t = (t = a) ? t.toLowerCase().trim() : t) ? S : "uk" == t ? x : "aus" == t ? R : "ca" == t ? P : "ie" == t ? U : "sco" == t ? M : "nz" == t ? F : "is" == t ? X : "fr" == t ? N : "qc" == t ? Q : "be" == t ? V : "ch" == t ? G : "sa" == t ? et : "eg" == t ? ot : "dz" == t ? nt : "ma" == t ? ct : "tn" == t ? ut : "lb" == t ? dt : "jo" == t ? ht : "qa" == t ? rt : "ae" == t ? at : "kw" == t ? st : "bh" == t ? lt : "om" == t ? pt : "af" == t ? it : "ps" == t ? gt : "il" == t ? tt : "ly" == t ? ft : "la" == t ? K : "es" == t ? D : "pt" == t ? O : "br" == t ? L : "cn" == t ? Y : "tw" == t ? z : "sg" == t ? W : "hk" == t ? q : "sh" == t ? B : "mo" == t ? H : "mn" == t ? J : k),
            Qt.jsAccent = parseInt(a);
        o = on(Qt.jsLang),
        i = rn(Qt.jsLang, Qt.jsAccent),
        Qt.jsURLToken = o + "/" + i,
        Qt.jsURLTokenLight = o + ("all" == i ? "" : "/" + i)
    }
    ,
    en);
    function on(t) {
        return t == c ? "english" : t == d ? "french" : t == h ? "spanish" : t == p ? "german" : t == v ? "korean" : t == E ? "turkish" : t == b ? "russian" : t == g ? "japanese" : t == f ? "italian" : t == T ? "hebrew" : t == A ? "polish" : t == _ ? "greek" : t == m ? "chinese" : t == y ? "portuguese" : t == C ? "arabic" : t == w ? "dutch" : t == I ? "signlanguage" : "english"
    }
    function rn(t, e) {
        if (!e || e == k)
            return "all";
        if (t == I) {
            if (e == S)
                return "us";
            if (e == x)
                return "uk";
            if (e == U)
                return "ie";
            if (e == R)
                return "aus";
            if (e == F)
                return "nz";
            if (e == X)
                return "is"
        }
        if (t == C) {
            if (e == ot)
                return "eg";
            if (e == et)
                return "sa";
            if (e == nt)
                return "dz";
            if (e == ct)
                return "ma";
            if (e == ut)
                return "tn";
            if (e == dt)
                return "lb";
            if (133 == e)
                return "sy";
            if (e == ht)
                return "jo";
            if (132 == e)
                return "iq";
            if (e == rt)
                return "qa";
            if (e == at)
                return "ae";
            if (e == st)
                return "kw";
            if (e == lt)
                return "bh";
            if (e == pt)
                return "om";
            if (e == it)
                return "af";
            if (e == gt)
                return "ps";
            if (e == tt)
                return "il";
            if (e == ft)
                return "ly"
        }
        if (t == w) {
            if (e == Z)
                return "nl";
            if (e == V)
                return "be"
        }
        if (t == c) {
            if (e == S)
                return "us";
            if (e == x)
                return "uk";
            if (e == R)
                return "aus";
            if (e == P)
                return "ca";
            if (e == U)
                return "ie";
            if (e == M)
                return "sco";
            if (e == F)
                return "nz"
        }
        return e == N ? "fr" : e == Q ? "qc" : e == V ? "be" : e == G ? "ch" : e == O ? "pt" : e == L ? "br" : e == D ? "es" : e == K ? "la" : e == Y ? "cn" : e == z ? "tw" : e == W ? "sg" : e == q ? "hk" : e == B ? "sh" : e == H ? "mo" : e == J ? "mn" : "all"
    }
    var an = {
        MANDATORY: 1,
        REQUIRED: 2,
        FUNCTIONAL: 4,
        ADS: 8,
        SOCIAL_MEDIA: 16
    };
    var sn, ln = (sn = Ke(te)) ? Number(sn) : an.REQUIRED + an.FUNCTIONAL + an.ADS + an.SOCIAL_MEDIA;
    console.log("cookieSupport: " + ln);
    var cn = {};
    function dn(t) {
        if (!t)
            return !1;
        var e = (t = t.toLowerCase().trim()).indexOf(ke);
        t = -1 < e ? t.substr(0, e) : t;
        var n = cn[t];
        return n == an.MANDATORY || !!(n && 0 < (n & ln))
    }
    function un(t) {
        He(ee, (_t = t) + "", 600)
    }
    cn[te.toLowerCase().trim()] = an.MANDATORY,
    cn[Xt.toLowerCase().trim()] = an.MANDATORY,
    cn[Kt.toLowerCase().trim()] = an.REQUIRED,
    cn[Zt.toLowerCase().trim()] = an.REQUIRED,
    cn[Jt.toLowerCase().trim()] = an.REQUIRED,
    cn[we.toLowerCase().trim()] = an.REQUIRED,
    cn[Ee.toLowerCase().trim()] = an.REQUIRED,
    cn[ue.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[ee.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[ne.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[oe.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[ie.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[ae.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[re.toLowerCase().trim()] = an.FUNCTIONAL,
    cn["toggle_ui_nb".toLowerCase().trim()] = an.FUNCTIONAL,
    cn[se.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[le.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[ce.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[de.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[he.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[pe.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[fe] = an.FUNCTIONAL,
    cn[ge.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[me.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[ve.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[ye.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[be.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[$e.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[Ce.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[Te.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[_e.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[je.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[Ae.toLowerCase().trim()] = an.FUNCTIONAL,
    cn[Ie.toLowerCase().trim()] = an.FUNCTIONAL;
    var hn, pn, fn, gn = (fn = pn = !(hn = {}),
    hn.onPlayerStatusChange = function(t) {
        return Pn.activate(!1),
        t == YT.PlayerState.PAUSED ? void $("#b_pause img").attr("src", Ue("play.png")) : t == YT.PlayerState.PLAYING ? ($("#b_pause img").attr("src", Ue("pause.png")),
        Pn.activate(!0),
        pn = !0,
        Qt.reqType == Mt.LESSON_VIDEO ? fn ? Io.yourTurn() && Io.reset() : (s(),
        $("#ienv").show(),
        Jo.isWatchAndRepeatMode() && $(".vdisplay").show(),
        startTimer()) : fn || (s(),
        ir()),
        void (fn = !0)) : void 0
    }
    ,
    hn.ready = function() {
        return pn
    }
    ,
    hn);
    function mn(t, e, n) {
        return "<" + t + (e ? ' class="' + e + '"' : "") + ">" + n + "</" + t + ">"
    }
    var vn, yn, bn, $n, Cn, wn, Tn, _n, En, jn, An, In, kn, Sn = (kn = {},
    (In = {}).registerEvent = function() {
        vn = $("#modalDef"),
        yn = vn.find(".d_mainttl"),
        bn = vn.find(".data"),
        $n = vn.find(".data1"),
        Cn = vn.find(".prog"),
        wn = vn.find(".btn-more"),
        jn = vn.find(".def_btn_add"),
        An = vn.find(".def_btn_cancel"),
        En = vn.find(".def_extui"),
        Tn = vn.find("#tr_res"),
        _n = vn.find("#tr_prog"),
        $(document).on("click", ".definable", function(t) {
            var e, n, o, i = t.ctrlKey || t.metaKey, r = $(this).text();
            if (i) {
                var a = (e = this,
                n = "",
                o = -1,
                $("#r_caption .marker").each(function() {
                    var t = $(this).index();
                    $(this).find(e).length && (o = t),
                    -1 < o && t == o && (n += " " + $(this).text(),
                    o++)
                }),
                $.trim(n));
                a && (r = a)
            }
            vn.data("more", "0"),
            Ii.pause(),
            Ln(r)
        }),
        vn.on("hide.bs.modal", function() {
            $("#modalDef .modal-body").scrollTop(0),
            "1" !== vn.data("more") && Ii.resume()
        }),
        wn.click(function(t) {
            var e = vn.data("term");
            e && (vn.data("more", "1"),
            Xi("https://fraze.it/n_search.jsp?q=" + escape(e)))
        }),
        jn.click(function(t) {
            var e = vn.data("term");
            return e && (En.hide(),
            On(e, $("#def_cat").val(), $("#def_note").val())),
            !1
        }),
        An.click(function(t) {
            return En.hide(),
            !1
        }),
        yn.on("click", ".edit", function(t) {
            !function() {
                if (-1 == yn.html().indexOf("<input")) {
                    yn.html("<div class='editD'><input class='editDI' type=\"text\" /><button type='button'>OK</button></div>");
                    var e = yn.find(".editDI");
                    e.val(vn.data("term").toLowerCase()),
                    e.focus(),
                    e.on("keyup", function(t) {
                        13 == t.keyCode && Ln($(this).val())
                    }),
                    yn.find("button").click(function(t) {
                        Ln(e.val())
                    })
                }
            }()
        }),
        yn.on("click", ".save", function(t) {
            var e = vn.data("term");
            Tt ? ($("#def_cat").val(""),
            $("#def_note").val(""),
            En.show()) : On(e)
        }),
        vn.on("click", ".defineMe", function(t) {
            Ln($(this).text())
        })
    }
    ,
    In.registerWordEvent = function() {
        Tn = $("#tr_res"),
        _n = $("#tr_prog")
    }
    ,
    In.makeDefinable = function(t) {
        return (e = Qt.jsLang) != c && e != I || !Qt.jsDico ? t : t.replace(new RegExp("([\\wÀ-ɏ]+)","g"), '<span class="hand definable">$1</span>');
        var e
    }
    ,
    In.translateTo = function(t, e) {
        if (-1 == t)
            return _n.hide(),
            void Tn.hide();
        He(ge, t),
        e = e || vn.data("term"),
        _n.show(),
        Tn.hide();
        var n = $("#serializeMe :input").serialize()
          , o = "/translate.jsp?q=" + encodeURIComponent(e) + "&accent=" + Qt.jsAccent + "&l=" + t + "&" + n;
        $.ajax({
            url: o,
            success: function(t) {
                if (-1 == t.indexOf("captchaSubmit.jsp")) {
                    var e = "<h4>No result found.</h4>";
                    if (0 < (t = $.trim(t)).length) {
                        var n = bt(t);
                        n && (e = "<h2>" + n.result + "</h2>",
                        e += "<span style='color:white'>" + n.type + "</span>")
                    }
                    _n.hide(),
                    Tn.html(e),
                    Tn.show();
                    var o = $("#modalDef .modal-body");
                    o.length && o.scrollTop(o[0].scrollHeight)
                } else
                    $t()
            },
            error: function() {
                console.log("translate error occurs!")
            }
        })
    }
    ,
    In.switchLangSelection = Rn,
    In.define = Ln,
    In.save = On,
    In);
    function xn(t, e) {
        e && (t.startsWith("http") || (t = "http://" + t));
        return t = t.replace(/\\u([\d\w]{4})/gi, function(t, e) {
            return String.fromCharCode(parseInt(e, 16))
        }),
        t = (t = unescape(t)).replace(new RegExp("\\\\","g"), "")
    }
    function Nn(t, e) {
        if (null == t)
            return null;
        var n = new Gt;
        try {
            var o = function(t) {
                if (!t || !t.all || 0 == t.all.length)
                    return "";
                for (var e = new Gt, n = 0; n < t.all.length; n++) {
                    var o = new Gt
                      , i = t.all[n]
                      , r = null;
                    void 0 !== i.type && 2 < i.type.length && (r = mn("div", "d_ttl", i.type + ":"));
                    var a = new Gt;
                    if (void 0 !== i.related) {
                        a.append('<div class="d_related">');
                        for (var s = 0; s < i.related.length; s++) {
                            var l = i.related[s];
                            a.append(" " + mn("span", "d_color hand defineMe", l.val)),
                            l.relation && a.append("(" + l.relation + ")&nbsp;&nbsp;")
                        }
                        a.append("</div>")
                    }
                    var c = new Gt;
                    if (void 0 !== i.definitions) {
                        c.append("<ol>");
                        for (s = 0; s < i.definitions.length; s++)
                            c.append(mn("li", s % 2 == 1 ? "d_bg_color" : null, i.definitions[s]));
                        c.append("</ol>")
                    }
                    o.append('<div class="' + (0 === n ? "d_def  d_section" : "d_section") + '">'),
                    null != r && o.append(Dn(r)),
                    o.append(a.toString()),
                    o.append(c.toString()),
                    o.append("</div>"),
                    e.append(o.toString())
                }
                return e.toString()
            }(t.definitions);
            n.append(o.toString()),
            o = function(t) {
                if (!t || !t.all || 0 == t.all.length)
                    return "";
                var e = new Gt;
                e.append('<div class="d_syno  d_section">'),
                e.append(mn("div", "d_ttl", "SYNONYMS:"));
                for (var n = 0; n < t.all.length; n++) {
                    var o = t.all[n];
                    e.append(mn("div", "d_color small", xe(o.type))),
                    e.append("<ul>");
                    for (var i = 0; i < o.values.length; i++) {
                        for (var r = o.values[i], a = r.related, s = a ? "(" + a + ") " : "", l = 0; l < r.synonyms.length; l++) {
                            var c = r.synonyms[l];
                            c = xn(c, !1),
                            s += mn("span", "d_color hand defineMe", c) + (l < r.synonyms.length - 1 ? ", " : "")
                        }
                        e.append(mn("li", i % 2 == 1 ? "d_bg_color" : null, s))
                    }
                    e.append("</ul>")
                }
                return e.append("</div>"),
                e.toString()
            }(t.synonyms),
            n.append(o.toString()),
            o = function(t) {
                if (!t || !t.all || 0 == t.all.length)
                    return "";
                var e = new Gt;
                e.append('<div class="d_web d_section">'),
                e.append(mn("div", "d_ttl", "FROM THE WEB:")),
                e.append("<ol>");
                for (var n = 0; n < t.all.length; n++) {
                    var o = t.all[n]
                      , i = " <span class='small'>[<a rel='noopener' target=_blank href='" + xn(o.url, !0) + "'>source</a>]</span>";
                    e.append(mn("li", n % 2 == 1 ? "d_bg_color" : null, xn(o.def, !1) + i))
                }
                return e.append("</ol></div>"),
                e.toString()
            }(t.wd),
            n.append(o.toString()),
            o = function(t, e) {
                if (!t || !t.results || 0 == t.results.length)
                    return "";
                var n = new Gt;
                n.append('<div class="d_usage  d_section">'),
                n.append(mn("div", "d_ttl", "Usage Examples:")),
                n.append("<ol>");
                for (var o = 0; o < t.results.length; o++) {
                    var i = t.results[o];
                    n.append(mn("li", o % 2 == 1 ? "d_bg_color" : null, Ye(Qe(i.phrase, e))))
                }
                return n.append("</ol></div>"),
                n.toString()
            }(t.usages, e),
            n.append(o.toString())
        } catch (t) {
            j("exception occurs: " + t),
            alert(t.message)
        }
        return n.toString()
    }
    function Dn(t) {
        try {
            var e = t.indexOf("[[");
            if (-1 == e)
                return t;
            var n = t.indexOf("]]", e);
            return -1 == n ? t : t.substring(0, e) + mn("span", "d_color hand defineMe", t.substring(e + 2, n)) + t.substring(n + 2)
        } catch (t) {
            j("exception occurs: " + t)
        }
        return t
    }
    function On(t, e, n) {
        var o = yn ? yn.find(".save") : $(".save");
        if (!Qt.loggedIn)
            return alert("Login is required to perform this operation!"),
            void tr("/login.jsp");
        o.html("Saving...");
        var i = "/mng_uc.jsp?op=add_voca&term=" + encodeURIComponent(t) + (e ? "&cat=" + encodeURIComponent(e) : "") + (n ? "&note=" + encodeURIComponent(n) : "");
        $.ajax({
            url: i,
            success: function(t) {
                if (-1 == t.indexOf("captchaSubmit.jsp")) {
                    var e = bt(t = $.trim(t));
                    if (e.err) {
                        if (o.html("Save"),
                        "LOGIN_REQUIRED" == e.msg)
                            return Qt.loggedIn = !1,
                            alert("Login is required to perform this operation."),
                            void tr("/login.jsp");
                        11 == e.error_code ? alert("You have exceeded your content quota. Contact admin@youglish.com to increase your quota.") : alert("An error has occured. Re-login and try again. If it persists, contact admin@youglish.com to get support (errcode: " + e.error_type + "/" + e.error_code + ")")
                    } else
                        o.removeClass("witem hand").addClass("saved").html("Saved!").delay(1e3).fadeOut(400)
                } else
                    $t()
            },
            error: function() {
                o.html("Save"),
                alert("An error occurs. Try again later.")
            }
        })
    }
    function Ln(n, o) {
        if (!o) {
            vn.data("term", n),
            yn.html((e = n.toUpperCase(),
            $("<div/>").text(e).html() + " <span class='hand small witem edit'>[Edit]</span><span class='hand small witem save'>[Save]</span>")),
            $("#d_tr_what").html(n.toUpperCase()),
            $(".d_tr_sel").val(-1),
            Tn.html('<h4 style="text-align:left"></h4>');
            var t = Ke(ge);
            t && 0 < $("#langControl select").length && Rn(1, t),
            bn.hide(),
            Cn.show(),
            vn.modal("show")
        }
        var e, i = kn[n];
        if (i)
            return o ? void o(n, i) : ($n.html(i),
            bn.show(),
            Cn.hide(),
            void vn.modal("show"));
        var r = $("#serializeMe :input").serialize()
          , a = "/define.jsp?q=" + encodeURIComponent(n) + "&accent=" + Qt.jsAccent + "&" + r;
        $.ajax({
            url: a,
            success: function(t) {
                if (-1 == t.indexOf("captchaSubmit.jsp")) {
                    var e = Nn(bt(t = $.trim(t)), n);
                    null == e && (e = "<h4>No result found.</h4>"),
                    kn[n] = e,
                    o ? o(n, e) : (Cn.hide(),
                    $n.html(e),
                    bn.show())
                } else
                    $t()
            },
            error: function() {
                console.log("define error occurs!")
            }
        })
    }
    function Rn(t, e) {
        var n = $("#serializeMe :input").serialize()
          , o = "/languages_ctrl.jsp?op=" + t + "&accent=" + Qt.jsAccent + (e ? "&lang=" + e : "") + "&" + n;
        $.ajax({
            url: o,
            success: function(t) {
                -1 == t.indexOf("captchaSubmit.jsp") ? (t = $.trim(t),
                $("#langControl").html(t)) : $t()
            }
        })
    }
    var Pn = function() {
        var t = {}
          , l = []
          , s = null
          , c = -1
          , d = 10
          , u = {
            id: "-1",
            cid: "-1",
            display: "&nbsp;",
            hl_display: "&nbsp;"
        }
          , i = {}
          , h = null
          , p = null
          , f = !1;
        function r(t, e, n, o, i) {
            this.vid = t,
            this.fid = e,
            this.lid = n,
            this.start = o,
            this.end = i
        }
        function g(t, e) {
            return t ? "[id: " + t.id + " -cid: " + t.cid + " -vid: " + t.vid + " -start: " + t.start + " -end: " + t.end + (e ? " -display: " + t.display : "") + "]" : t
        }
        function m(t, e) {
            if (s && s.cid === t.cid)
                return !0;
            var n = !0;
            return Jo.isWatchAndRepeatMode() && (n = Io.onNewCaption(t, e)),
            n && o(t, e, "setCaption"),
            n
        }
        function o(t, e, n) {
            if (1 & Qt.dbg && (console.log("--------------------------------------------"),
            console.log("setCaptionProper for: " + g(t, !0) + " -info: " + n),
            console.log("--------------------------------------------")),
            1 & Qt.dbg && (t.display = t.display + " [vid: " + t.vid + " -cid: " + t.cid + " -speaker: " + t.speaker + "]"),
            s && t) {
                var o = Number(s.id);
                if (Number(t.id) == 1 + o && zt({
                    action: Dt.CAPTION_CONSUMED,
                    id: s.cid
                }),
                It)
                    return void Hn.next()
            }
            if (!Rt(Dt.CAPTION_CONSUMED)) {
                (s = t).hl_display || (s.display = Qe(Oe(s.display).replace(/\\/g, ""), Qt.jsCleanQuery),
                s.hl_display = s.display,
                0 < s.hl_display.length && (s.hl_display == s.hl_display.toUpperCase() && (s.hl_display = s.hl_display.toLowerCase()),
                s.hl_display = Ye(Sn.makeDefinable(s.hl_display))));
                var i = $("#r_caption");
                if (i.length) {
                    e ? i.fadeOut("fast", function() {
                        $(this).html(s.hl_display).fadeIn("fast", function() {
                            ir()
                        })
                    }) : (i.html(s.hl_display),
                    setTimeout(function() {
                        ir()
                    }, 1e3));
                    var r = $("#rom_caption");
                    if (r.length)
                        Et && !Qt.jsEmbedded ? (r.show(),
                        e ? r.fadeOut("fast", function() {
                            $(this).html(s.pinyin).fadeIn("fast", function() {
                                ir()
                            })
                        }) : (r.html(s.pinyin),
                        setTimeout(function() {
                            ir()
                        }, 1e3))) : r.hide()
                }
                zt({
                    action: Dt.CAPTION_CHANGE,
                    id: s.cid,
                    caption: escape(s.display),
                    current_time: Ii.getCurrentTime()
                }),
                Qt.reqType != Mt.LESSON_VIDEO && co.refreshSavedBut(s.cid),
                Rt(Dt.CAPTION_CHANGE),
                a()
            }
        }
        function a() {
            if (s) {
                $("#rep_cap_txt").val(Fe(s.display)),
                $("#dbg_cid").html("cid: " + s.cid);
                var t = $("#rep_cap_segmented_txt");
                t.length && t.val(Fe(s.seg));
                var e = $("#rep_cap_rom_txt");
                e.length && e.val(Fe(s.pinyin))
            }
        }
        function v() {
            try {
                return i[Hn.getCurrentTrack().vid]
            } catch (t) {
                j("exception occurs: " + t)
            }
            return null
        }
        function y(t, e) {
            return t && t.start <= e && e < t.end
        }
        function b(t) {
            var e, n = (e = t,
            0 != l.length && l[0].start <= e && e < l[l.length - 1].end);
            if (!n)
                return -1;
            if (-1 !== c) {
                if (n = y(l[c], t))
                    return c;
                if (n = y(l[c + 1], t))
                    return c + 1
            }
            for (var o = 0; o < l.length; o++)
                if (n = y(l[o], t))
                    return o;
            return -1
        }
        r.prototype.toString = function() {
            return "vid: " + this.vid + " -fid: " + this.fid + " -lid: " + this.lid + " -start: " + this.start + " -end: " + this.end
        }
        ;
        var C = !(r.prototype.isValide = function() {
            return !(isNaN(this.vid) || isNaN(this.fid) || isNaN(this.lid) || isNaN(this.start) || isNaN(this.end))
        }
        )
          , e = 0
          , w = !1;
        function T(t) {
            c = t,
            Jo.isWatchAndRepeatMode() && Io.refreshUI(c, l ? l.length : -1)
        }
        function _() {
            return !!(c + 2 >= l.length && (t = l[l.length - 1],
            e = v(),
            t && t.end < e.end));
            var t, e
        }
        function E(t, e, n) {
            2 & Qt.dbg && (console.log("\n==================================================="),
            console.log("Welcome to fetchCaptions... cid: " + t.cid + " -from: " + e + " -info: " + n));
            var o = v();
            if (o) {
                var i = !1
                  , r = "/fetchcap.jsp?vers=4&op=0&query=" + encodeURIComponent(Qt.jsQuery) + "&hm=" + d + "&lg=" + Qt.jsLang + "&accent=" + Qt.jsAccent;
                if (r += null !== e ? "&from=" + e : "&cid=" + t.cid,
                r += "&fid=" + o.fid + "&lid=" + o.lid + "&vid=" + o.vid,
                t && t.id && (r += "&id=" + t.id,
                i = t.id > o.fid && t.id < o.lid && !e),
                h !== r)
                    if (!p || 1e3 < (new Date).getTime() - p) {
                        p = (new Date).getTime(),
                        h = r,
                        2 & Qt.dbg && console.log("processing: [" + h + "&calltime=" + p + "]");
                        var a = $("#serializeMe :input").serialize()
                          , s = h + "&calltime=" + p + "&" + a;
                        $.ajax({
                            url: s,
                            success: function(t) {
                                yt(t) && -1 != t.indexOf("captchaSubmit.jsp") ? $t() : (null !== e && (l = []),
                                function(t, e) {
                                    2 & Qt.dbg && console.log("\nWelcome to fill - got: " + t.total + " entries....capMap size: " + l.length);
                                    if (0 == t.total)
                                        return;
                                    var n = t.results.length;
                                    0 == l.length && T(-1);
                                    for (var o = 0; o < n; o++) {
                                        var i = t.results[o]
                                          , r = Number(i.start)
                                          , a = Number(i.end);
                                        if (0 == l.length && (r -= 1),
                                        o < n - 1) {
                                            var s = t.results[o + 1];
                                            a = Number(s.start)
                                        }
                                        i.start = r,
                                        i.end = a,
                                        l.push(i),
                                        2 & Qt.dbg && console.log("------ add capID: " + i.id + " --cID: " + i.cid + " -start: " + i.start + " -end: " + i.end)
                                    }
                                    2 & Qt.dbg && (console.log("Done....capArr now: " + l.length),
                                    console.log(JSON.stringify(l, null, 4)));
                                    e && 0 == n && (w = !0)
                                }(t, i),
                                h = null)
                            },
                            error: function() {
                                console.log("fetchcap.jsp error occurs!")
                            }
                        })
                    } else
                        2 & Qt.dbg && console.log("deltaCall issue....ignoring - callTime was: " + p);
                else
                    2 & Qt.dbg && console.log("in process....ignoring - callTime was: " + p)
            }
        }
        return t.start = function t() {
            C && 0 === e ? (e++,
            setTimeout(t, 2e3)) : (function() {
                if (!w && f && Qt.allowCapSynch) {
                    var t, e, n, o, i = !1, r = null;
                    try {
                        i = Jo.isWatchAndRepeatMode(),
                        t = Ii.getCurrentTime(),
                        e = Hn.getCurrentTrack(),
                        n = Math.floor(Se + t),
                        o = (new Date).getTime(),
                        r = v()
                    } catch (t) {
                        return j("exception occurs: " + t)
                    }
                    if (t && e && r)
                        try {
                            if (4 & Qt.dbg && (console.log("\n********************************************************"),
                            console.log("CheckCaption -  PlayerTime: " + t + " -RTime: " + n + " -time: " + o + " -vid-info:[ " + r + "] -playVideo: " + e.vid + " -capArr.length: " + l.length + " ...current: " + g(s)),
                            console.log("bReplay: " + C)),
                            function(t) {
                                var e = v();
                                return !e || t < e.start || t >= e.end
                            }(n))
                                return 4 & Qt.dbg && console.log("noCaption@time: " + n + " -> EMPTY caption"),
                                m(u);
                            if (0 == l.length)
                                return E(e, null);
                            var a = b(n);
                            if (4 & Qt.dbg && console.log("getAt@" + n + " sec -> ind: " + a + " [curIndex: " + c + " -out of: " + l.length + "]"),
                            -1 == a)
                                return C ? (l = [],
                                E(e, null)) : E(e, n);
                            if (a != c) {
                                if (i && t - l[a].start < .7)
                                    return;
                                m(l[a], !0) && (T(a),
                                _() && E(l[l.length - 1], null))
                            }
                            4 & Qt.dbg && console.log("CheckCaption done!")
                        } finally {
                            C = !1
                        }
                }
            }(),
            setTimeout(t, 150))
        }
        ,
        t.setCaption = m,
        t.setCaptionProper = o,
        t.getCaption = function() {
            return s
        }
        ,
        t.onStartTrack = function(t) {
            e = 0,
            p = h = null,
            w = !1,
            (C = t) || (s = null,
            T(-1),
            l = [],
            i[Hn.getCurrentTrack().vid] || function(o) {
                2 & Qt.dbg && (console.log("\n==================================================="),
                console.log("Welcome to fetchInfo... vid: " + o),
                console.log("==================================================="));
                var t = $("#serializeMe :input").serialize();
                j("ajax to fetchcap.jsp");
                var e = "/fetchcap.jsp?vers=4&op=1&vid=" + o + "&query=" + encodeURIComponent(Qt.jsQuery) + "&lg=" + Qt.jsLang + "&accent=" + Qt.jsAccent + "&" + t;
                2 & Qt.dbg && console.log("processing: [" + e + "]");
                $.ajax({
                    url: e,
                    success: function(t) {
                        if (yt(t) && -1 != t.indexOf("captchaSubmit.jsp"))
                            $t();
                        else {
                            var e = t
                              , n = new r(Number(e.id),Number(e.fid),Number(e.lid),Number(e.start),Number(e.end));
                            e.vid && n.isValide() ? (i[e.vid] = n,
                            2 & Qt.dbg && console.log("\nGot Video Details: " + n + " -for video: " + e.vid + "\n\n")) : console.log("Ops..." + o + " [v-info] could not be located in the DB!")
                        }
                    },
                    error: function(t, e, n) {
                        console.log("fetchInfo error occurs -error: " + t.status + "\nthrownError: " + n)
                    }
                })
            }(Hn.getCurrentTrack().vid))
        }
        ,
        t.activate = function(t) {
            f = t
        }
        ,
        t.moveToNext = function() {
            try {
                var t = function() {
                    try {
                        return l[c + 1]
                    } catch (t) {
                        j("exception occurs: " + t)
                    }
                    return null
                }();
                if (null == t)
                    return;
                T(c + 1),
                Io.reset(),
                o(t),
                Ii.seek(t.start),
                _() && E(l[l.length - 1], null)
            } catch (t) {
                j("exception occurs: " + t)
            }
            return null
        }
        ,
        t.moveToPrev = function() {
            try {
                var t = function() {
                    try {
                        return l[c - 1]
                    } catch (t) {
                        j("exception occurs: " + t)
                    }
                    return null
                }();
                if (null == t)
                    return;
                T(c - 1),
                Io.reset(),
                o(t),
                Ii.seek(t.start)
            } catch (t) {
                j("exception occurs: " + t)
            }
            return null
        }
        ,
        t.refreshActionUI = a,
        t.fetchAllCaptions = function(t, e) {
            var n, o = $("#serializeMe :input").serialize(), i = "/fetchcap.jsp?vers=4&ts=" + 1e6 * Math.random() + "&hm=10&op=2&scw=" + (n = t,
            Ct(2) + n + Ct(8)) + "&lg=" + Qt.jsLang + "&accent=" + Qt.jsAccent;
            o && (i += "&" + o),
            console.log("fetchAllCaption: " + i),
            $.ajax({
                url: i,
                success: function(t) {
                    yt(t) && -1 != t.indexOf("captchaSubmit.jsp") ? $t() : e(t)
                },
                error: function() {
                    console.log("fetchcap.jsp error occurs!")
                }
            })
        }
        ,
        t
    }();
    Pn.start();
    var Un, Mn, Fn, Yn, Qn, Vn, Gn, zn, Wn, qn, Bn = ((Un = {}).reset = function() {}
    ,
    Un.fetch = function(t, e) {
        var n = $("#serializeMe :input").serialize();
        $.ajax({
            url: t + "?accent=" + Qt.jsAccent + "&lg=" + Qt.jsLang + "&q=" + encodeURIComponent(Qt.jsQuery) + (_t ? "" : "&adult=0") + "&" + n,
            success: function(t) {
                -1 == t.indexOf("captchaSubmit.jsp") ? (t = $.trim(t),
                e(t)) : $t()
            },
            error: function() {
                console.log("GenFetcher error occurs!")
            }
        })
    }
    ,
    Un), Hn = (Fn = {},
    Yn = [],
    Qn = [],
    Vn = !0,
    Gn = -1,
    Wn = -(zn = 1),
    qn = null,
    (Mn = {}).next = function() {
        j("welcome to next - currentInd: " + Gn + " -total videos: " + (Qn ? "" + Qn.length : "N/A")),
        Gn + 1 < Qn.length && (j("..in next1 - bFirstTime: " + Vn + " -PlayerAPI.ready(): " + Ii.ready()),
        j("..in next2 - will play video: " + ++Gn),
        eo(Gn)),
        ao() && ro()
    }
    ,
    Mn.prev = function() {
        0 < Gn && eo(--Gn)
    }
    ,
    Mn.play = eo,
    Mn.fill = Jn,
    Mn.jump2 = function(t, e) {
        var n = Jn(t, e);
        -1 == n ? ro({
            cid: e,
            onFind: function(t) {
                Kn(t)
            }
        }) : Kn(n)
    }
    ,
    Mn.getCurrentInd = function() {
        return Gn
    }
    ,
    Mn.getTotal = function() {
        return Wn
    }
    ,
    Mn.getCurrentTrack = Xn,
    Mn.addShared = function(t) {
        Zn(t),
        qn = t
    }
    ,
    Mn.totalLoaded = function() {
        return Qn.length
    }
    ,
    Mn.reset = function() {
        Fn = {},
        Yn = [],
        Qn = [],
        Vn = !0,
        zn = 0,
        Wn = Gn = -1,
        qn = null
    }
    ,
    Mn.fetchable = ao,
    Mn.fetch = ro,
    Mn);
    function Kn(t) {
        Gn = -1 == t ? -1 : t - 1,
        Vi(),
        Vn = !1
    }
    function Zn(t) {
        if ($.isArray(t))
            for (index = 0; index < t.length; index++)
                Qn.push(t[index]),
                Yi.onNewEntry(t[index], Qn.length);
        else
            Qn.push(t),
            Yi.onNewEntry(t, Qn.length)
    }
    function Jn(t, e, n) {
        j("Welcome to EntryMng:fill"),
        1 & Qt.dbg && console.log("\nWelcome to FILL ...bFirstTime: " + Vn + " -cid2find: " + e);
        var o = -1
          , i = yt(t) ? bt(t) : t;
        Wn = i.total_results,
        Yt = i.altered_query,
        Qt.jsHCCode = i.hc / 3,
        n && n();
        var r = i.results ? i.results.length : 0;
        1 & Qt.dbg && console.log("got: " + r + " entries..");
        for (var a = 0; a < r; a++) {
            var s = i.results[a];
            1 & Qt.dbg && console.log("\nchecking video: " + s.vid + " -speaker: " + s.speaker + " -cid: " + s.cid),
            null == qn || qn.cid != s.cid ? jt && (Fn[s.speaker] || Fn[s.vid]) ? (Yn.push(s),
            At++,
            1 & Qt.dbg && console.log("...video:" + s.vid + " -speaker:" + s.speaker + " already in .. skipping it! -shunkRejected: " + At),
            50 < At && (jt = !1,
            Zn(Yn, Yn.length),
            Yn = [],
            1 & Qt.dbg && console.log("Ooops..will allow duplicate video ...merging (rejectedVideos->videos)...videos size: " + Qn.length + " -rejectedVideos size: " + Yn.length))) : (At = 0,
            Zn(s, s.vid),
            s.speaker && (Fn[s.speaker] = 1),
            Fn[s.vid] = 1,
            null != e && e == s.cid && (o = Qn.length - 1),
            1 & Qt.dbg && console.log("video:" + s.vid + " -speaker:" + s.speaker + " -cid:" + s.cid + " added. Total videos:" + Qn.length + " -cidIndex: " + o)) : 1 & Qt.dbg && console.log("found shared video.. skipping it!")
        }
        return Qn.length + Yn.length == Wn && (1 & Qt.dbg && console.log("merging (rejectedVideos->videos)...videos size: " + Qn.length + " -rejectedVideos size: " + Yn.length),
        Zn(Yn, Yn.length),
        null != e && -1 == o && (o = function(t) {
            for (var e = Qn.length, n = 0; n < e; n++)
                if (Qn[n].cid == t)
                    return n;
            return -1
        }(e)),
        Yn = [],
        1 & Qt.dbg && console.log("merging done. videos size: " + Qn.length + " -rejectedVideos size: " + Yn.length + " -cidIndex: " + o)),
        1 & Qt.dbg && (console.log("\n-----------------------------------------------"),
        console.log("EOF FILL - AvoidDupVid: " + jt + " -shunkRejected: " + At + " -Videos size: " + Qn.length + " -rejectedVideos size: " + Yn.length + " -total: " + (Qn.length + Yn.length) + " -cidIndex: " + o),
        console.log("-----------------------------------------------")),
        null == e && (Vn && Vi(),
        Vn = !1),
        Yi.onFillDone(),
        j("EntryMng:fill done. -Videos size: " + Qn.length),
        o
    }
    function Xn() {
        return null == Qn ? null : Qn[Gn]
    }
    function to() {
        var t;
        $("#ttl_indx").length && $("#ttl_indx").html(Gn + 1 + ""),
        zt({
            action: Dt.VIDEO_CHANGE,
            trackNumber: Gn + 1,
            video: Qn[Gn].vid
        }),
        (t = Xn()) && t.cid && He(le, t.cid + "/" + encodeURIComponent(Qt.jsQuery) + "/" + Qt.jsURLTokenLight, 600),
        Xo.onVideoChange(Qn[Gn].vid)
    }
    function eo(t) {
        if (0 <= t && t < Qn.length) {
            var e = Qn[Gn = t];
            e.display;
            Ii.loadVideo(e.vid, e.start - vt),
            to(),
            Pn.onStartTrack(!1),
            Pn.setCaption(e),
            1 & Qt.dbg && $("#dbg_info").slideUp("fast", function() {
                $(this).html(e.dbg.replaceAll("<s2>", "<strong>").replaceAll("<e2>", "</strong>").replaceAll("<s1>", "<div style='padding:6px'>").replaceAll("<e1>", "</div>")).slideDown()
            }),
            Gi(),
            Yi.onPlaying(Gn)
        }
    }
    function no(t, e, n, o, i, r) {
        return 1024 < n && (i = e + 2 * i % 27 + (r || 101) + e + t),
        function(t, e, n, o, i) {
            11 < n && (i = i + 23 * n + e + t);
            return 17 < n ? Me(n, 191) + "" + t + n + o + i : t + "" + n + e + Me(n, 57) + o + i
        }(t, e, n, o, i)
    }
    function oo(t) {
        return t || 1
    }
    function io(t) {
        return t || 1
    }
    function ro(n, o) {
        zn++;
        var t, e = Me(2, 9), i = no(Qt.jsHCCode, Qt.jsQuery.length, e, (t = e) > Me(oo(t + 121), io(t + 191)) ? Me(1, 101) + (new Date).getTime() : Me(oo(t + 1), io(t + 10)) + (new Date).getTime(), function(t, e, n) {
            12 < t && (t = t % 10 + n);
            var o, i, r = Me(11 + 10 * t, 21 + 21 * t);
            return r < t ? r * t * e ^ Me(1, 7) : (o = t * e << 2,
            i = t ^ e,
            n ? i >> 4 : o / 4)
        }(e, zn));
        1 & Qt.dbg && (console.log("----------------------"),
        console.log("FETCH called(nagla: " + zn + ") currentInd: " + Gn + " -videos: " + Qn.length + " -rejectedVideos: " + Yn.length + " (total: " + (Qn.length + Yn.length) + ")"),
        null != n && console.log("findCID: " + n.cid));
        var r = $("#serializeMe :input").serialize();
        j("ajax to fetch.jsp"),
        $.ajax({
            url: "/fetch.jsp?vers=4&ts=" + i + "&qp=" + Ut + "&lg=" + Qt.jsLang + "&accent=" + Qt.jsAccent + (Qt.jsPlayList ? "&pl=" + Qt.jsPlayList : "") + "&nagla=" + zn + "&query=" + encodeURIComponent(Qt.jsQuery) + (_t ? "" : "&adult=0") + (r ? "&" + r : ""),
            success: function(t) {
                if (yt(t) && -1 != t.indexOf("captchaSubmit.jsp"))
                    $t();
                else {
                    var e = Jn(t, null == n ? n : n.cid, o);
                    if (1 & Qt.dbg && console.log("...NAGLA FETCH(#" + zn + ") done. currentInd: " + Gn + " [findCID: " + (null == n ? n : n.cid) + " ->indF: " + e + "] -videos: " + Qn.length + " -rejectedVideos: " + Yn.length + " (total: " + (Qn.length + Yn.length) + ")"),
                    null == n || -1 == e) {
                        if (ao(null == n ? n : Number.MAX_VALUE))
                            ro(n);
                        else if (null != n)
                            return void n.onFind(-1)
                    } else
                        n.onFind(e)
                }
            },
            error: function() {
                console.log("fetch error occurs!"),
                j("ajax to fetch.jsp - error occurs!")
            }
        })
    }
    function ao(t) {
        return (t = null == t ? Gn : t) + 2 >= Qn.length && Qn.length + Yn.length < Wn
    }
    var so, lo, co = (lo = {},
    (so = {}).togglePanel = function(t) {
        Hn.getCurrentTrack();
        var e = $(t);
        if (Qt.loggedIn && e.hasClass("openSave")) {
            var n = e.hasClass("but_saved");
            if (!Tt || n) {
                var o = Pn.getCaption();
                return void (o && (n ? tr("/content.jsp?cid=" + o.cid + (Qt.bLocal ? "&userlang=" + Qt.userLang : "")) : e.hasClass("but_save") && ho(o.cid, o.display)))
            }
        }
        var i, r = (i = e).hasClass("openReport") ? $("#a_report") : i.hasClass("openShare") ? $("#a_share") : i.hasClass("openSave") ? $("#a_save") : i.hasClass("openRecord") ? $("#a_record") : null;
        if (r) {
            var a = r.attr("id");
            !function(t) {
                t.find(".rset_hide").hide(),
                t.find(".rset_show").show(),
                t.find(".rset_txt").val(""),
                t.find("select").prop("selected", !1),
                t.find("input[type=radio]").prop("checked", !1),
                t.find("#edt_video").prop("checked", !1),
                t.find("#edt_video_gender").prop("checked", !1),
                mo($("#i_s_cat")),
                mo($("#i_s_note"));
                var e = $("#i_s_caption")
                  , n = Pn.getCaption();
                e.length && e.val(n ? Fe(n.display) : "")
            }(r),
            r.slideToggle("fast"),
            -1 < a.indexOf("share") && r.is(":visible") && $o(!1),
            (-1 < a.indexOf("report") || -1 < a.indexOf("save") || -1 < a.indexOf("record")) && (r.is(":visible") ? Ii.pause() : Ii.resume()),
            $("#dbg_cid").show()
        }
    }
    ,
    so.closePanel = bo,
    so.closePanels = function() {
        $("#all_actions").find(".menu_body").each(function() {
            $(this).hide()
        })
    }
    ,
    so.submitPanel = function(t) {
        $("#dbg_cid").hide();
        var e = t instanceof jQuery ? t : $(t)
          , n = (e.html(),
        e.hasClass("doit-but"))
          , o = function(t) {
            if (t.hasClass("report-btn"))
                return "report"
        }(e);
        if (n) {
            if (!function(t) {
                if ("report" === t) {
                    var e = $("input[name=r1]:checked", fo(t)).val();
                    if (void 0 === e && 0 == $("textarea[name=r_comment]", fo(t)).val().length)
                        return yo(t, "Enter your selection"),
                        0;
                    if ("wrong_accent" == e) {
                        if (void 0 === (e = $("input[name=r2]:checked", fo(t)).val()))
                            return yo(t, "Select a location"),
                            0;
                        if ("other" === e && 0 == $("input[name=i_country]", fo(t)).val().length)
                            return yo(t, "Enter your location"),
                            0
                    }
                }
                return 1
            }(o))
                return;
            var i = Hn.getCurrentTrack()
              , r = Pn.getCaption()
              , a = r ? r.cid : "-1"
              , s = $(fo(o)).find("form:first").serialize();
            s = "lang=" + Qt.jsLang + "&accent=" + Qt.jsAccent + "&userlang=" + Qt.userLang + "&emb=" + Qt.jsEmbedded + "&aj=1&result=" + (1 + Hn.getCurrentInd()) + "&query=" + encodeURIComponent(Qt.jsQuery) + "&ccid=" + a + "&cid=" + i.cid + "&vid=" + i.vid + "&start=" + i.start + "&player_start=" + Ii.getStart() + "&allcmd=" + encodeURIComponent(l) + "&" + s,
            $(".prog_i").show(),
            $.ajax({
                type: "POST",
                url: "/access.jsp",
                data: s,
                success: function(t) {
                    $(".prog_i").hide(),
                    bt(t = $.trim(t)).err ? vo(o, 500 < Pe() ? "An error occurs! Try again later." : "An error occurs!", !0) : (vo(o, 380 < Pe() ? go("MSGSENT") + ". " + go("THANKYOU") + "!" : go("THANKYOU") + "!", !0),
                    Ii.resume())
                },
                error: function() {
                    vo(o, "An error occurs!!", !0)
                }
            })
        } else
            $(po(o)).slideUp()
    }
    ,
    so.refresh = function() {
        var t = Hn.getCurrentInd();
        Hn.getCurrentTrack(),
        0 == t ? ($("#toolbar .tb_twitter").html(""),
        $("#toolbar .tb_fb").html(""),
        $(".tb_copy").css("background-color", "white"),
        $(".tb_copy a").text("Copy link")) : $o(!0)
    }
    ,
    so.save = function() {
        var t = Pn.getCaption()
          , e = null
          , n = null;
        t && ($("#i_s_caption").length && (e = $("#i_s_cat").val(),
        n = $("#i_s_note").val()),
        ho(t.cid, t.display, e, n, "#a_save"))
    }
    ,
    so.unSave = function(t, o) {
        $.ajax({
            type: "POST",
            url: "/access.jsp",
            data: "lang=" + t + "&userlang=" + Qt.userLang + "&emb=" + Qt.jsEmbedded + "&op=remcontent&cid=" + o,
            success: function(t) {
                var e = bt(t = $.trim(t));
                if (e.err) {
                    if ("LOGIN_REQUIRED" == e.msg)
                        return Qt.loggedIn = !1,
                        alert("Login is required to perform this operation"),
                        void tr("/login.jsp");
                    console.log("An error occurs. Try again later.")
                } else
                    lo[o] = 0,
                    tr("/content.jsp" + (Qt.bLocal ? "?userlang=" + Qt.userLang : ""))
            },
            error: function(t, e, n) {
                console.log("unSave error occur for cid: " + o + " -error: " + t.status + "\nthrownError: " + n)
            }
        })
    }
    ,
    so.copyLink = function() {
        var t = Hn.getCurrentTrack();
        null != t && function(t) {
            var e = document.createElement("textarea");
            e.style.position = "fixed",
            e.style.top = 0,
            e.style.left = 0,
            e.style.width = "2em",
            e.style.height = "2em",
            e.style.padding = 0,
            e.style.border = "none",
            e.style.outline = "none",
            e.style.boxShadow = "none",
            e.style.background = "transparent",
            e.value = t,
            document.body.appendChild(e),
            e.select();
            try {
                var n = "Copied!";
                document.execCommand("copy") || (n = "Ops,unable!")
            } catch (t) {
                n = "Ops,unable!"
            }
            $(".tb_copy a").css("background-color", "red").css("color", "white").text(n),
            document.body.removeChild(e)
        }(window.location.protocol + "//" + window.location.host + "/getbyid/" + t.cid + "/" + encodeURIComponent(Qt.jsQuery) + "/" + Qt.jsURLTokenLight)
    }
    ,
    so.refreshSavedBut = function(n, o) {
        0 < n && Qt.loggedIn && !Qt.jsEmbedded && (uo(n) || $.ajax({
            type: "POST",
            url: "/access.jsp",
            data: "lang=" + Qt.jsLang + "&emb=" + Qt.jsEmbedded + "&op=exist&cid=" + n,
            success: function(t) {
                var e = bt(t = $.trim(t));
                e.err ? (lo[n] = !1,
                uo(n)) : (lo[n] = e.exist,
                uo(n),
                0 == e.exist && o && o())
            }
        }))
    }
    ,
    so);
    function uo(t, e) {
        var n = lo[t];
        if (null == n)
            return !1;
        var o = $("#butsave");
        if (!o.length)
            return !1;
        if (!e && -1 != o.html().indexOf("Saving"))
            return !1;
        if (1 == n) {
            var i = o.data("saved");
            o.html(i || "Saved!"),
            o.prop("title", "Got to my content"),
            o.removeClassPrefix("but_").addClass("but_saved")
        } else {
            var r = o.data("save");
            o.html(r || "Save"),
            o.prop("title", "Save this track"),
            o.removeClassPrefix("but_").addClass("but_save")
        }
        return !0
    }
    function ho(n, t, e, o, i) {
        0 < n && ($("#butsave").html("Saving..."),
        $(".prog_i").show(),
        $.ajax({
            type: "POST",
            url: "/mng_uc.jsp",
            data: "lang=" + Qt.jsLang + "&emb=" + Qt.jsEmbedded + "&aj=1&op=add_track&query=" + encodeURIComponent(Qt.jsQuery) + "&cid=" + n + "&caption=" + encodeURIComponent(t) + (e ? "&cat=" + encodeURIComponent(e) : "") + (o ? "&note=" + encodeURIComponent(o) : ""),
            success: function(t) {
                $(".prog_i").hide();
                var e = bt(t = $.trim(t));
                if (e.err) {
                    if ("LOGIN_REQUIRED" == e.msg)
                        return Qt.loggedIn = !1,
                        alert("Login is required to perform this operation"),
                        void tr("/login.jsp");
                    if ("DB_ALREADYSAVED" == e.msg)
                        return lo[n] = 1,
                        void uo(n, !0);
                    11 == e.error_code ? alert("You have exceeded your content quota. Contact admin@youglish.com to increase your quota.") : alert("An error has occured. Re-login and try again. If it persists, contact admin@youglish.com to get support (errcode: " + e.error_type + "/" + e.error_code + ")")
                } else
                    lo[n] = 1,
                    uo(n, !0);
                i && $(i).length && ($(i).slideUp(),
                Ii.resume())
            },
            error: function() {
                vo(whichOne, "An error occurs.", !0)
            }
        }))
    }
    function po(t) {
        return "#a_" + t
    }
    function fo(t) {
        return "#a_" + t
    }
    function go(t) {
        if ("THANKYOU" == t)
            switch (Qt.userLang) {
            case c:
                return "Thank you";
            case d:
                return "Merci";
            case h:
                return "Gracias";
            case p:
                return "Vielen Dank";
            case f:
                return "Grazie";
            case y:
                return "Obrigado";
            case C:
                return "شكرا جزيلا";
            default:
                return "Thank you"
            }
        if ("MSGSENT" == t)
            switch (Qt.userLang) {
            case c:
                return Qt.bEditMode ? "Operation done" : "Message sent";
            case d:
                return "Message envoy&eacute;";
            case h:
                return "Mensaje enviado";
            case p:
                return "Nachricht gesendet";
            case f:
                return "Messaggio inviato";
            case y:
                return "Mensagem enviada";
            case C:
                return "تم الارسال";
            default:
                return "Message sent"
            }
    }
    function mo(t) {
        t.length && t.val("")
    }
    function vo(t, e, n, o) {
        $(".pan-ttl-text", fo(t)).hide(),
        $(".ttldone", fo(t)).html(e).show(),
        n && $(".panel-body", fo(t)).slideUp(),
        setTimeout(function() {
            bo(t, !0)
        }, o || (Qt.bEditMode ? 3e3 : 2e3))
    }
    function yo(t, e) {
        $(fo(t)).find(".a_err").html(e).show()
    }
    function bo(t, e) {
        e ? $(po(t)).fadeOut() : $(po(t)).hide()
    }
    function $o(t) {
        $(".tb_copy a").css("background-color", "white").css("color", "#337ab7").text("Copy link");
        var e = Hn.getCurrentTrack();
        if (null != e) {
            var n = window.location.protocol + "//" + window.location.host + "/getbyid/" + e.cid + "/" + encodeURIComponent(Qt.jsQuery) + "/" + Qt.jsLang + "/" + Qt.jsAccent
              , o = "Check out "
              , i = null;
            try {
                for (; ; ) {
                    if (!t)
                        try {
                            if (0 < $("#toolbar .tb_twitter").html().length)
                                break
                        } catch (t) {}
                    (i = $("#toolbar .tb_twitter")).html('<a href="https://twitter.com/share" class="twitter-share-button" data-url="' + n + '" data-text="' + o + '" data-count="none">Tweet</a>'),
                    twttr.widgets.load();
                    break
                }
            } catch (t) {}
            try {
                for (; ; ) {
                    if (!t)
                        try {
                            if (0 < $("#toolbar .tb_fb").html().length)
                                break
                        } catch (t) {}
                    (i = $("#toolbar .tb_fb")).html('<div class="fb-share-button" data-href="' + n + '" data-type="button"></div>'),
                    FB.XFBML.parse();
                    break
                }
            } catch (t) {}
            i = $("#toolbar .tb_gmail");
            var r = "https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=" + (o = "Check out this YouGlish video") + "&body=" + encodeURI(n);
            i.html('<a rel="noopener" class="gmail nodec" target="_blank" href="' + r + '"><img src="' + Ue("gmail_logo.gif") + '" /></a>')
        }
    }
    var Co, wo, To, _o, Eo, jo, Ao, Io = (Ao = (jo = {
        UNKNOW: -1,
        WATCH: Eo = 0,
        REPEAT: 1
    }).UNKNOW,
    (_o = {}).onNewCaption = function(t, e) {
        wo = t,
        To = e;
        var n, o = Jo.getWatchTime(), i = Jo.getRepeatDuration(), r = Pn.getCaption(), a = function(t, e) {
            if (null == t || null == t || null == e || null == e)
                return !1;
            var n = e.cid - t.cid;
            return 0 < n && n < 3
        }(r, t);
        if (a || ko(),
        a && Eo < o)
            return n = r.start,
            Ao = jo.WATCH,
            $(".vdisplay").show(),
            Eo++,
            $("#vttl").html(Eo).show(),
            Ii.seek(n),
            Ii.pause(),
            Ne(1),
            window.setTimeout(So, 1e3),
            !1;
        if (a) {
            if (0 < i)
                return Ii.pause(),
                $("#vttl").html("Your turn").css("color", "green"),
                Ne(2),
                function(t) {
                    xo();
                    var e = t
                      , n = setInterval(function() {
                        Ao = jo.REPEAT,
                        $("#vtimer").html("(" + e + " sec)").show(),
                        --e < 0 && (Eo = 1,
                        Ao = jo.WATCH,
                        Pn.setCaptionProper(wo, To, "resumeTimer"),
                        $("#vttl").html(Eo).css("color", "red"),
                        $("#vtimer").hide(),
                        clearInterval(n),
                        Ii.resume())
                    }, 1e3);
                    Co = n
                }(i),
                !1;
            Eo = 0
        }
        return !0
    }
    ,
    _o.prev = function() {
        Pn.moveToPrev()
    }
    ,
    _o.next = function() {
        Pn.moveToNext()
    }
    ,
    _o.yourTurn = function() {
        return Ao == jo.REPEAT
    }
    ,
    _o.reset = ko,
    _o.refreshUI = function(t, e) {
        t < 1 ? $("#v_prev").css({
            opacity: .2
        }).removeClass("hand") : $("#v_prev").css({
            opacity: .8
        }).removeClass("hand").addClass("hand"),
        0 <= t && t < e - 1 ? $("#v_next").css({
            opacity: .8
        }).removeClass("hand").addClass("hand") : $("#v_next").css({
            opacity: .2
        }).removeClass("hand")
    }
    ,
    _o);
    function ko() {
        Ao = jo.UNKNOW,
        Eo = 0,
        xo(),
        $("#vttl").html("").css("color", "red"),
        $("#vtimer").html(""),
        Jo.isWatchAndRepeatMode() || $(".vdisplay").hide()
    }
    function So() {
        Ii.resume()
    }
    function xo() {
        Co && (clearInterval(Co),
        Co = null)
    }
    var No, Do, Oo, Lo, Ro, Po, Uo, Mo, Fo, Yo, Qo, Vo, Go, zo, Wo, qo, Bo, Ho, Ko, Zo, Jo = (Do = "0",
    Oo = "1",
    Lo = -1,
    Ro = 2,
    Po = 3,
    (No = {}).init = function() {
        null == (Lo = Ke("vmod")) && (Lo = Do),
        $("input[name=voptions][value=" + Lo + "]").prop("checked", !0),
        $("input[type=radio][name=voptions]").change(function() {
            Lo = this.value,
            He("vmod", Lo, 600),
            Io.reset()
        }),
        null == (Ro = Ke("vtm")) && (Ro = 2),
        $("#vtime").val("" + Ro),
        $("#vtime").on("change", function() {
            Ro = this.value,
            He("vtm", Ro, 600)
        }),
        null == (Po = Ke("vdur")) && (Po = 3),
        $("#vdur").val("" + Po),
        $("#vdur").on("change", function() {
            Po = this.value,
            He("vdur", Po, 600)
        })
    }
    ,
    No.isWatchAndRepeatMode = function() {
        return Qt.reqType == Mt.LESSON_VIDEO && Lo == Oo
    }
    ,
    No.getWatchTime = function() {
        return parseInt(Ro)
    }
    ,
    No.getRepeatDuration = function() {
        return parseInt(Po)
    }
    ,
    No), Xo = (Fo = {},
    Yo = {},
    Qo = [],
    Vo = -1,
    Go = !0,
    zo = $("#ac_container"),
    Wo = $("#ac_data"),
    qo = $("#ac_msg"),
    Bo = $("#ac_options"),
    Ko = Ho = !1,
    Zo = null,
    Lt(Dt.CAPTION_CONSUMED, ai),
    Lt(Dt.CAPTION_CHANGE, si),
    $("#ac_query").keyup(function(t) {
        var n;
        ri(),
        n = $("#ac_query").val(),
        Wo.find(".ac_sr_highlight").removeClass("ac_sr_highlight"),
        n ? (hi(),
        Wo.find("li:Contains(" + n + ")").each(function() {
            var t = $(this).find(".ac_caption")
              , e = t.text().replace(new RegExp(n,"ig"), "<span class='ac_sr_highlight'>$&</span>");
            t.html(e),
            Qo.push($(this).attr("id"))
        }),
        Bo.find(".ac_sr_count").html("(" + Qo.length + ")").show(),
        0 < Qo.length ? (Bo.find(".ac_barrow").show(),
        Bo.find(".ac_breplay").hide()) : Bo.find(".beffect:not(.ac_close,.ac_sync,.ac_loopmode)").hide()) : hi()
    }),
    Bo.find(".ac_bdown").on("click", function(t) {
        pi(1)
    }),
    Bo.find(".ac_bup").on("click", function(t) {
        pi(-1)
    }),
    Bo.find(".ac_breplay").on("click", function(t) {
        pi(0)
    }),
    Bo.find(".ac_close").on("click", function(t) {
        ri(),
        ei()
    }),
    Bo.find(".ac_sync").on("click", function(t) {
        Go = !Go,
        mi(),
        Go && li(300)
    }),
    Bo.find(".ac_loopmode").on("click", function(t) {
        Ko = !Ko,
        gi()
    }),
    Fo.toggle = ei,
    Fo.show = oi,
    Fo.hide = ni,
    Fo.scroll = li,
    Fo.synchCap = fi,
    Fo.clean = function() {
        $("#ac_container").css("width", ""),
        $("#player").css("width", "")
    }
    ,
    Fo.onVideoChange = function(t) {
        fi(!0),
        Mo = t,
        Ho = !1,
        ri(),
        ti() ? zo.is(":visible") && ii() : zo.hide(),
        hi(!0)
    }
    ,
    Fo);
    function ti() {
        return "videowrapper" == zo.parent().attr("id")
    }
    function ei() {
        zo.is(":visible") ? ni(!0) : oi(!0)
    }
    function ni(t) {
        ti() ? zo.animate({
            width: 0
        }, 300, function() {
            zo.hide(),
            $("#player").animate({
                width: "100%"
            }, 300)
        }) : zo.slideUp({
            complete: function() {
                ir()
            }
        })
    }
    function oi(t) {
        ii(),
        ti() ? ($("#player").animate({
            width: "60%"
        }, 300),
        zo.show().animate({
            width: "40%"
        }, 300, function() {
            li(300)
        })) : (zo.slideDown({
            complete: function() {
                ir()
            }
        }),
        li(300)),
        fi(!0)
    }
    function ii() {
        Mo && (Ho ? ui() : Yo[Mo] ? (di(),
        ui(Yo[Mo])) : (di(),
        Pn.fetchAllCaptions(Mo, ci)))
    }
    function ri() {
        Ko = !1,
        Zo = null,
        gi()
    }
    function ai() {
        if (Ko && Zo) {
            var t = Zo.attr("data-start");
            return Ii.seek(t),
            !0
        }
        return !1
    }
    function si(t) {
        t = t || Pn.getCaption().cid;
        if (Uo = t,
        Go)
            li();
        else {
            var e = $("#ac_" + Uo);
            e.length && (Zo = e)
        }
    }
    function li(t) {
        try {
            if (Uo && zo.is(":visible")) {
                var e = $("#ac_" + Uo);
                if (!e.length)
                    return;
                var n = Wo.height() / 2;
                n -= .2 * n;
                var o = e.offset().top - Wo.offset().top + Wo.scrollTop() - n;
                o < 0 && (o = 0),
                Wo.animate({
                    scrollTop: o
                }, {
                    duration: t || 500,
                    complete: function() {
                        Wo.find(".ac_current_cap").removeClass("ac_current_cap"),
                        e.addClass("ac_current_cap"),
                        Zo = e
                    }
                })
            }
        } catch (t) {
            console.log("Oops... " + t.message)
        }
    }
    function ci(t) {
        try {
            var e = t.results
              , n = "<ul>";
            for (i = 0; i < e.length; i++) {
                var o = e[i].display
                  , r = e[i].cid
                  , a = e[i].start;
                n += "<li id='ac_" + r + "' data-start='" + a + "'><div style='display:flex'><div data-id='" + r + "' data-start='" + a + "' class='ac_play_but beffect'><img  title='play' width=20 height=20 src='/images/play.png' class='hand' /></div><div class='ac_caption'>" + o + "</div></div></li>"
            }
            n += "</ul>",
            ui(Yo[Mo] = n)
        } catch (t) {
            console.log(t.message),
            Wo.html("<div class='well'>No result found!</div>")
        }
    }
    function di() {
        qo.html("<div class='loading'>Loading, please wait...</div>").show(),
        Wo.hide()
    }
    function ui(t) {
        t && (Wo.html(t),
        Wo.find(".ac_play_but").on("click", function(t) {
            var e = $(this).attr("data-start");
            Ii.seek(e);
            var n = $(this).parent().parent();
            Wo.find(".ac_current_cap").removeClass("ac_current_cap"),
            n.addClass("ac_current_cap"),
            Zo = null,
            Qt.jsYTAccess != kt && (Uo = $(this).attr("data-id"),
            li())
        })),
        qo.hide(),
        Wo.show(),
        si(Uo),
        ir(),
        Ho = !0
    }
    function hi(t) {
        t && $("#ac_query").val(""),
        Bo.find(".ac_sr_count").html("").hide(),
        Bo.find(".beffect:not(.ac_close,.ac_sync,.ac_loopmode)").hide(),
        Qo = [],
        Vo = -1,
        Zo = null
    }
    function pi(t) {
        fi(!(Zo = null)),
        (Vo += t) < 0 && (Vo = 0),
        Vo >= Qo.length && (Vo = Qo.length - 1);
        var e = Qo[Vo]
          , n = $("#" + e).attr("data-start");
        Ii.seek(n),
        Bo.find(".ac_sr_count").html("(" + (Vo + 1) + "/" + Qo.length + ")").show(),
        Bo.find(".ac_breplay").show(),
        Qt.jsYTAccess != kt && (Uo = $("#" + e).find(".ac_play_but").attr("data-id"),
        li())
    }
    function fi(t) {
        (t && !Go || Go && !t) && (Go = t,
        mi())
    }
    function gi() {
        var t = Bo.find(".ac_loopmode");
        Ko ? (t.prop("title", "Turn off loop mode"),
        t.css("color", "red").css("border-color", "red")) : (t.prop("title", "Turn on loop mode"),
        t.css("color", "#6495BF").css("border-color", "#6495BF"))
    }
    function mi() {
        var t = Bo.find(".ac_sync");
        Go ? (t.html("U"),
        t.prop("title", "Unsync with player"),
        t.css("color", "#6495BF").css("border-color", "#6495BF")) : (t.html("S"),
        t.prop("title", "Sync with player"),
        t.css("color", "red").css("border-color", "red"))
    }
    var vi, yi, bi, $i, Ci, wi, Ti, _i, Ei, ji, Ai, Ii = (Ci = !($i = yi = null),
    Ti = !(wi = bi = -1),
    _i = "default",
    Ei = null,
    Ai = ji = -1,
    (vi = {}).loadVideo = function(t, e) {
        if (j("Welcome to loadVideo - video: " + t + " -sec: " + e),
        $i = t,
        ji = bi = e,
        Qt.jsYTAccess == kt)
            null == yi ? (sr("creating YT.Player...config.jsPatchYTDelay: " + Qt.jsPatchYTDelay + " msec"),
            j("creating YT.Player (NOT asynch & youtube.com) -config.jsPatchYTDelay: " + Qt.jsPatchYTDelay + " -jsChromePatchDelay: " + Qt.jsChromePatchDelay),
            yi = new YT.Player("player",{
                videoId: $i,
                playerVars: {
                    playsinline: 1,
                    iv_load_policy: 3,
                    rel: 0,
                    showinfo: wt ? 1 : 0,
                    controls: 1,
                    fs: 0,
                    start: bi,
                    autoplay: Qt.jsStart ? 1 : 0
                },
                events: {
                    onReady: Si,
                    onStateChange: xi,
                    onError: Oi,
                    onPlaybackRateChange: ki
                }
            }),
            console.log("patchForChrome - config.jsChromePatchDelay: " + Qt.jsChromePatchDelay),
            setTimeout(function() {
                Ti || $("#noAPIBugDlg").modal()
            }, Qt.jsChromePatchDelay),
            console.log("player created(v1) - playsinline set to 1 -start: " + Qt.jsStart),
            j("YT.Player created  -player: " + yi + " -start: " + Qt.jsStart)) : yi.loadVideoById($i, e, _i);
        else {
            Si();
            var n = null;
            Qt.jsYTAccess == St ? (n = "<div data-video='" + t + "' data-loc='" + e + "' class='player_noapi unselectable'>",
            n += "<img  src='https://img.youtube.com/vi/" + t + "/0.jpg'>",
            n += "<div class='warning'>YouTube API is not available. Click below to watch this track on YouTube.</div>",
            n += "<div class='centered'><span class='play material-icons'>play_circle_outline</span></div>",
            n += "</div>") : Qt.jsYTAccess == xt && (n = "<iframe src='https://www.youtube-nocookie.com/embed/" + t + "?autoplay=1&start=" + e + "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"),
            n && $("#player").html(n)
        }
    }
    ,
    vi.seek = Di,
    vi.stop = function() {
        Ti && yi && yi.stopVideo()
    }
    ,
    vi.pause = function t(e) {
        if (Ti && yi)
            if (e) {
                if (yi.hasOwnProperty("getVolume")) {
                    var n = yi.getVolume();
                    return n <= 0 ? (yi.pauseVideo(),
                    yi.unMute(),
                    yi.setVolume(100)) : (yi.setVolume(n - 5),
                    setTimeout(function() {
                        return t(!0)
                    }, 100))
                }
            } else
                yi.pauseVideo()
    }
    ,
    vi.resume = function() {
        Ti && yi && yi.playVideo()
    }
    ,
    vi.play = function() {
        Ti && yi && yi.playVideo()
    }
    ,
    vi.restart = function() {
        Ti && yi && ("app" == Qt.jsEmbClient == 0 && (n || o) ? setTimeout(function() {
            yi.seekTo(bi, !0),
            yi.playVideo()
        }, 1e3) : (yi.seekTo(bi, !0),
        yi.playVideo()))
    }
    ,
    vi.reset = function() {
        vi = {},
        bi = -1,
        Ci = !($i = yi = null)
    }
    ,
    vi.ready = function() {
        return Ti
    }
    ,
    vi.move = function(t) {
        if (Ti) {
            t = Number(t);
            var e = Ni() - t;
            Di(e = 0 < e ? e : 0)
        }
    }
    ,
    vi.getCurrentTime = Ni,
    vi.isPlaying = function() {
        return wi == YT.PlayerState.PLAYING
    }
    ,
    vi.setQuality = function(t) {
        t && (_i = t)
    }
    ,
    vi.getQuality = function() {
        return _i
    }
    ,
    vi.updateSpeed = function(t, e) {
        if (Ti && yi)
            try {
                var n = yi.getPlaybackRate()
                  , o = e ? .1 : .05
                  , i = t ? n + o : n - o;
                (i = (i = i > Ei[Ei.length - 1] ? Ei[Ei.length - 1] : i) < Ei[0] ? Ei[0] : i) && yi.setPlaybackRate(i)
            } catch (t) {
                console.log("ooops.... " + t.message)
            }
    }
    ,
    vi.setSpeed = function(t) {
        if (Ti && yi)
            try {
                yi.setPlaybackRate(Number(t))
            } catch (t) {
                console.log("ooops.... " + t.message)
            }
    }
    ,
    vi.getVideo = function() {
        return $i
    }
    ,
    vi.getStart = function() {
        return bi
    }
    ,
    vi);
    function ki(t) {
        var e = t.data;
        if (e) {
            He(ve, e);
            var n = "&times" + e;
            1 == e ? n = "normal" : .25 == e ? n = "min" : 2 == e && (n = "max"),
            $(".speedval").html(n),
            Qt.jsEmbId && zt({
                action: Dt.PLAYER_SPEED_UPDATED,
                speed: e
            })
        }
    }
    function Si(t) {
        if (j("******* YT Event - Welcome to onPlayerReady - event: " + t + " -player: " + yi),
        $("#noAPIBugDlg").modal("hide"),
        sr("onPlayerReady(S)"),
        s(),
        r = Ti = !0,
        zt({
            action: Dt.PLAYER_READY
        }),
        Qt.jsYTAccess == kt) {
            yi.setPlaybackQuality(_i);
            var e = Ke(ve);
            e && yi.setPlaybackRate(e),
            null == (Ei = yi.getAvailablePlaybackRates()) || null == Ei || Ei.length < 2 ? Ei = null : $(".speed").css("display", "flex")
        }
        Gi(),
        j("onPlayerReady done.")
    }
    function xi(t) {
        wi = -1,
        j("******* YT Event - Welcome to onPlayerStateChange - event: " + t + " -player: " + yi),
        yi && (Ti || (j("****calling onPlayerReady from ...onPlayerStateChange event.data: " + function(t) {
            switch (t) {
            case YT.PlayerState.ENDED:
                return "ENDED";
            case YT.PlayerState.PLAYING:
                return "PLAYING";
            case YT.PlayerState.PAUSED:
                return "PAUSED";
            case YT.PlayerState.BUFFERING:
                return "BUFFERING";
            case YT.PlayerState.CUED:
                return "CUED";
            case Ai:
                return "UNSTARTED"
            }
            return "???"
        }(t.data)),
        Si()),
        zt({
            action: Dt.PLAYER_STATECHANGE,
            state: t.data
        }),
        Ci && t.data == YT.PlayerState.PLAYING && (j("payer state set to YT.PlayerState.PLAYING..."),
        sr("Player playing......."),
        s(),
        Ci = !1),
        wi = t.data,
        gn.onPlayerStatusChange(wi))
    }
    function Ni() {
        if (Qt.jsYTAccess == kt) {
            if (!yi)
                return;
            try {
                return yi.getCurrentTime()
            } catch (t) {
                return -1
            }
        }
        return ji
    }
    function Di(t) {
        if (Ti)
            if (t = null == t ? bi : t,
            t = Number(t),
            ji = t,
            Qt.jsYTAccess == kt)
                yi.seekTo(t, !0),
                yi.playVideo();
            else if (Qt.jsYTAccess == St) {
                Xi("https://www.youtube.com/watch?v=" + $i + "&t=" + t + "s")
            } else if (Qt.jsYTAccess == xt) {
                var e = "https://www.youtube-nocookie.com/embed/" + $i + "?autoplay=1&start=" + t;
                $("#player iframe").attr("src", e)
            }
    }
    function Oi(t) {
        if (j("******* YT Event - Welcome to onPlayerError - event: " + t + " -player: " + yi),
        zt({
            action: Dt.ERROR,
            code: Nt,
            idx: t.data
        }),
        t.data && Number(t.data) > Qt.minErr) {
            var e = "/access.jsp?lang=" + Qt.jsLang + "&op=player_error&err=" + t.data + "&vid=" + $i + "&accent=" + Qt.jsAccent + "&query=" + encodeURIComponent(Qt.jsQuery);
            $.ajax({
                url: e,
                success: function(t) {}
            })
        }
        Ci && (s(),
        Ci = !1,
        gn.onPlayerStatusChange(YT.PlayerState.PLAYING))
    }
    var Li, Ri, Pi, Ui, Mi, Fi, Yi = (Li = {},
    Ui = 4,
    Mi = (Pi = Ri = 0) < $(".video-slider").length,
    Fi = !0,
    Li.init = function() {
        Mi && ($(".video-slider").slick({
            focusOnSelect: !0,
            accessibility: !1,
            speed: 280,
            slidesToShow: Ui,
            slidesToScroll: Ui,
            infinite: !1,
            prevArrow: !1,
            nextArrow: $(".slidder-next"),
            responsive: [{
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }]
        }),
        $("body").on("click", ".slidder-prev", function() {
            var t = Ri - 1;
            $(".video-slider").slick("slickGoTo", 0 < t ? t : 0)
        }),
        $(".video-slider").on("beforeChange", function(t, e, n, o) {
            Fi = !0,
            n < (Ri = o) && Qi(),
            0 == Ri ? $(".slidder-prev").removeClass("beffect hand").addClass("desactivated") : $(".slidder-prev").addClass("beffect hand").removeClass("desactivated")
        }),
        $("body").on("mouseenter", ".vs-unit", function() {
            $(this).addClass("on-hover")
        }),
        $("body").on("mouseleave", ".vs-unit", function() {
            $(this).removeClass("on-hover")
        }),
        $("body").on("click", ".vs-unit", function() {
            var t = $(this);
            if (t.hasClass("selected-video"))
                zi();
            else {
                var e = t.find(".pos").html();
                Hn.play(e - 1)
            }
        }))
    }
    ,
    Li.onNewEntry = function(t, e) {
        if (Mi) {
            Fi = !0,
            1 & Qt.dbg && console.log("[SLIDDER]  - onNewEntry: " + t.vid + " -pos: " + e),
            $(".video-slider").width();
            var n = "<div data-pos='" + e + "' class='vs-unit'>";
            n += "<img  src='https://img.youtube.com/vi/" + t.vid + "/mqdefault.jpg'>",
            n += "<span class='pos'>" + e + "</span></div>",
            $(".video-slider").slick("slickAdd", n),
            Pi++
        }
    }
    ,
    Li.onFillDone = function() {
        if (1 & Qt.dbg && console.log("[SLIDDER]  - FillDone"),
        Mi) {
            var t = "content-thumnail";
            $(".video-slider .play").length && (t = "content-play"),
            $(".slider_wrapper").removeClass(function(t, e) {
                return (e.match(/\bcontent-\S+/g) || []).join(" ")
            }).addClass(t),
            Qi()
        }
    }
    ,
    Li.onPlaying = function(t) {
        Mi && (Fi = !0,
        $(".vs-unit").removeClass("selected-video"),
        $('.vs-unit[data-pos="' + (t + 1) + '"]').addClass("selected-video"),
        $(".video-slider").slick("slickGoTo", t))
    }
    ,
    Li.refresh = function() {
        Mi && Fi && ($(".video-slider").slick("refresh"),
        Fi = !1)
    }
    ,
    Li);
    function Qi() {
        1 & Qt.dbg && console.log("[SLIDDER]  - Fill -slideIndex: " + Ri + " -limit: " + (Ri + 2 * Ui) + " -totalSlide: " + Pi + " -isFetchable: " + Hn.fetchable(Pi)),
        Pi < Ri + 2 * Ui && Hn.fetchable(Pi) && (1 & Qt.dbg && console.log("[SLIDDER]  - calling EntryMng.fetch"),
        Hn.fetch())
    }
    function Vi() {
        j("Welcome to setUpPlayer  - EntryMng.totalLoaded(): " + Hn.totalLoaded()),
        0 == Hn.totalLoaded() ? (r = !1,
        $("#player").hide(),
        Ii.pause(),
        $("#caption").hide(),
        $("#controlID").hide(),
        $(".result_container").html(""),
        0 == Qt.jsTotalResult && zt({
            action: Dt.UNREADY
        })) : ($("#player").show(),
        $("#info").hide(),
        Hn.next()),
        ir()
    }
    function Gi() {
        var t, e, n = Hn.getCurrentInd(), o = Hn.getCurrentTrack();
        if (o && o.tags && $("#htags").length) {
            var r = ""
              , a = o.tags.split(",");
            for (i = 0; i < a.length; i++) {
                r += "<li><a rel='nofollow' href='" + (t = a[i],
                -1 != (e = (t = t.replace(/[- ]/g, "")).indexOf("(")) && (t = t.substring(0, e)),
                "/pronounce/" + Le(Qt.jsQueryTerm + " #" + t)) + "' class='nodec'>" + a[i] + "</a></li>"
            }
            $("#htags .list-inline").html(r),
            $("#htags").show()
        }
        Qt.reqType != Mt.LESSON_VIDEO && co.refresh(),
        co.closePanels(),
        Ii.ready() && ($("#controlID .disable").addClass("hand").removeClass("disable"),
        n < 1 && $("#b_prev").removeClass("hand").addClass("disable"),
        n + 1 == Hn.getTotal() && $("#b_next").removeClass("hand").addClass("disable"))
    }
    function zi() {
        Pn.onStartTrack(!0),
        Pn.setCaption(Hn.getCurrentTrack()),
        Ii.seek(),
        Yi.onPlaying(Hn.getCurrentInd())
    }
    function Wi(t) {
        Ii.move(t)
    }
    function qi() {
        -1 != $("#b_pause img").attr("src").indexOf("pause") ? Ii.pause() : Ii.resume()
    }
    var Bi = 0;
    function Hi(t, e) {
        e ? ($(document).on("mousedown", t, function(t) {
            $(this).animate({
                bottom: "-=2",
                right: "-=2"
            }, 0),
            Bi = 1,
            t.preventDefault()
        }),
        $(document).on("mouseup", t, function() {
            1 == Bi && ($(this).animate({
                bottom: "+=2",
                right: "+=2"
            }, 0),
            Bi = 0)
        }),
        $(document).on("mouseout", t, function() {
            1 == Bi && ($(this).animate({
                bottom: "+=2",
                right: "+=2"
            }, 0),
            Bi = 2)
        })) : ($(document).on("mousedown", t, function(t) {
            $(this).animate({
                top: "+=2",
                right: "-=2"
            }, 0),
            Bi = 1,
            t.preventDefault()
        }),
        $(document).on("mouseup", t, function() {
            1 == Bi && ($(this).animate({
                top: "-=2",
                right: "+=2"
            }, 0),
            Bi = 0)
        }),
        $(document).on("mouseout", t, function() {
            1 == Bi && ($(this).animate({
                top: "-=2",
                right: "+=2"
            }, 0),
            Bi = 2)
        }))
    }
    function Ki(t) {
        t ? $("#dico_sel").hide() : $("#dico_sel").slideToggle(100)
    }
    function Zi() {
        Qt.reqType != Mt.INDEX && Qt.reqType != Mt.LESSON_WORD && ($(".dico_opener").click(function(t) {
            Ki(!1)
        }),
        $("body").on("click", "#dico_sel .hand", function(t) {
            var e = $(this).data("target");
            $(".openDico").hide(),
            $('.openDico[data-me="' + e + '"]').show(),
            He(Ae, e),
            Ki(!0),
            $("#dico_sel li").removeClass("selected hand").addClass("hand"),
            $(this).removeClass("selected hand").addClass("selected")
        }),
        Hi(".beffect", !1),
        Hi(".beffect_bt", !0),
        $("#controlID .beffect").on("click", function(t) {
            j("---------------------------START"),
            j("Wecome to beffect handler");
            var e = t.ctrlKey || t.metaKey;
            if ($(this).hasClass("disable"))
                Ii.ready() || $("#noAPIBugDlg").modal();
            else {
                j("...beffect pass test1 OK"),
                t.stopPropagation(),
                t.preventDefault();
                var n = $(this).attr("id");
                if (j("...beffect pass test2 OK [" + n + "]"),
                "b_next" == n)
                    Hn.next();
                else if ("b_prev" == n)
                    Hn.prev();
                else if ("b_replay" == n)
                    zi();
                else if ("b_back" == n)
                    Wi(mt);
                else if ("b_pause" == n)
                    qi();
                else if ($(this).hasClass("faster"))
                    Ii.updateSpeed(!0, e);
                else if ($(this).hasClass("slower"))
                    Ii.updateSpeed(!1, e);
                else if ($(this).hasClass("toggleplayersize")) {
                    var o = Number($(this).data("delta"));
                    e && (o = -o),
                    0 != (o = function(t, e) {
                        if (Qt.jsEmbedded)
                            return 0;
                        if (!$("#videowrapper").length || Qt.reqType != Mt.SEARCH && Qt.reqType != Mt.GETCID)
                            return 0;
                        var n = $("#videowrapper iframe").height()
                          , o = 0 < t && n < 410 || t < 0 && (!n || 200 < n);
                        o || (t = -t);
                        var i = Number($("#videowrapper").data("pad_bottom")) + (0 < t && !o ? 2 * t : t);
                        return $("#videowrapper").animate({
                            paddingBottom: i + "%"
                        }),
                        $("#videowrapper").data("pad_bottom", i),
                        e && He(ye, i),
                        t
                    }(o, !0)) && $(this).data("delta", o),
                    $(".toggleplayersize .material-icons").html(0 < o ? "vertical_align_bottom" : "vertical_align_top"),
                    $(".toggleplayersize").prop("title", 0 < o ? "Increase player frame (CTRL to reverse)" : "Reduce player frame (CTRL to reverse)")
                } else if ($(this).hasClass("togglethumbnail")) {
                    var i = $(".slider_wrapper");
                    i.length && i.slideToggle("fast", "swing", function() {
                        var t = 0 == $(this).is(":hidden");
                        t && Yi.refresh(),
                        He(ae, t + "", 600),
                        ir()
                    })
                }
                j("...beffect process done!"),
                j("---------------------------END")
            }
        }),
        $(".togglelight").click(function() {
            var t = $(this).data("theme");
            Ji(t = "theme_light" == (t = t || "theme_light") ? "theme_dark" : "theme_light", !0, !0)
        }),
        $(".togglecaps").click(function(t) {
            t.ctrlKey || t.metaKey ? $("#caption").toggle() : Xo.toggle()
        }),
        $(".nextcap").click(function(t) {
            Io.next()
        }),
        $(".prevcap").click(function(t) {
            Io.prev()
        }),
        $("body").on("click", ".player_noapi", function() {
            var t = $(this);
            Xi("https://www.youtube.com/watch?v=" + t.data("video") + "&t=" + t.data("loc") + "s")
        }),
        $("body").on("click", ".extended_search .ctrl", function() {
            He(je, !$(this).hasClass("on"), 365),
            document.location.reload(!0)
        }),
        $("body").on("click", ".extended_search .help", function() {
            $(".extended_search .help_panel").slideToggle("fast")
        }),
        $(document).keydown(function(t) {
            if (!$(t.target).is(":input, [contenteditable]")) {
                var e = t.ctrlKey || t.metaKey
                  , n = t.shiftKey
                  , o = !0;
                39 == t.keyCode && e && n ? Wi(-mt) : 37 == t.keyCode && e && n ? Wi(mt) : 39 == t.keyCode && e ? Hn.next() : 37 == t.keyCode && e ? Hn.prev() : 187 == t.keyCode && n ? Ii.updateSpeed(!0) : 189 == t.keyCode && n ? Ii.updateSpeed(!1) : 13 == t.keyCode && e ? zi() : 32 == t.keyCode && e ? qi() : o = !1,
                o && (t.stopPropagation(),
                t.preventDefault())
            }
        }),
        Qt.jsEmbedded || Ji(Ke(me), !1, !1))
    }
    function Ji(t, e, n) {
        t && (e && He(me, t),
        $(".togglelight").data("theme", t),
        $(".toggle-light-listener, #player_container iframe").each(function() {
            $(this).removeClass("light-transition"),
            n && $(this).addClass("light-transition"),
            $(this).removeClass(function(t, e) {
                return (e.match(/\btheme_\S+/g) || []).join(" ")
            }).addClass(t)
        }))
    }
    function Xi(t) {
        window.open(t, "_blank").focus()
    }
    function tr(t) {
        window.location.href = t
    }
    function er() {
        if (Qt.jsEmbPartBGColor) {
            var t = $(".ygPanel");
            t.css("background-color", Qt.jsEmbPartBGColor),
            t.css("border-color", Qt.jsEmbPartBGColor)
        }
        if (Qt.jsEmbTextColor && $("body").css("color", Qt.jsEmbTextColor),
        Qt.jsEmbKeywordColor && $(".keyword").css("color", Qt.jsEmbKeywordColor),
        Qt.jsEmbBGColor && ("#000000" == Qt.jsEmbBGColor && (Qt.jsEmbBGColor = "theme_dark"),
        Qt.jsEmbBGColor.startsWith("theme") ? Ji(Qt.jsEmbBGColor, !1, !1) : ($("body").css("background-color", Qt.jsEmbBGColor),
        $("#caption").css("background-color", Qt.jsEmbBGColor),
        $("#controlID").css("background-color", Qt.jsEmbBGColor),
        $(".ygSearch").css("background-color", Qt.jsEmbBGColor))),
        Qt.jsEmbLinkColor && $("a").css("color", Qt.jsEmbLinkColor),
        Qt.jsEmbTitleColor && $("#ttlr h1").css("color", Qt.jsEmbTitleColor),
        Qt.jsEmbCapColor && $(".caption").css("color", Qt.jsEmbCapColor),
        Qt.jsEmbQueryColor && $(".query ").css("color", Qt.jsEmbQueryColor),
        Qt.jsEmbMarkerColor) {
            var e = $("<style>.marker{ background-color: " + Qt.jsEmbMarkerColor + "; }</style>");
            $("html > head").append(e)
        }
        Qt.jsEmbCapSize && 0 < Qt.jsEmbCapSize && 40 != Qt.jsEmbCapSize && $(".caption").css("font-size", Qt.jsEmbCapSize + "px")
    }
    function nr(t, e) {
        var n = $(t).data("trgid");
        $("#all_actions .menu_body:not(#" + n + ")").hide(),
        co.togglePanel(t),
        e.preventDefault()
    }
    var or = -1;
    function ir(t) {
        if ((t || Qt.jsEmbeddedNotifHeight) && Qt.jsEmbId) {
            var e = $("#last").offset().top;
            if (0 == e)
                return;
            e !== or && (or = e,
            Ft = !1,
            zt({
                action: Dt.WIDGET_RESIZE,
                height: e + 19
            }))
        }
    }
    function rr(t) {
        for (var e in "undefined" != typeof accentsRequestedStr && (u = Number(accentsRequestedStr)),
        t)
            t.hasOwnProperty(e) && (Qt[e] = t[e]);
        var n, o, i, r, a, s, l, c;
        console.log(">>>>> API mode: " + Qt.jsYTAccess),
        Vt(t.jsLang, t.jsAccent),
        Qt.jsQuery && (Qt.jsQuery = Oe(unescape(Qt.jsQuery)),
        Qt.jsLang == T && (Qt.jsCleanQuery = qe(Qt.jsQuery))),
        Qt.jsIndexQuery && (Qt.jsIndexQuery = Oe(unescape(Qt.jsIndexQuery)),
        Qt.jsLang != T && (Qt.jsCleanQuery = qe(Qt.jsIndexQuery))),
        He(ue, Pe() + "", 30),
        (n = Ke(ee)) && (_t = bt(n),
        $("#restricted").text(_t ? "OFF" : "ON")),
        (o = Ke(ne)) && (Et = bt(o)),
        (i = Ke(oe)) && (wt = bt(i)),
        (r = Ke(re)) && bt(r),
        (a = Ke(ie)) && (It = bt(a)) && (Se = -.8),
        (s = Ke(ae)) && bt(s),
        (l = Ke(se)) && (Tt = bt(l)),
        (c = Ke(ye)) && 5 < (c = Number(c)) && c < 100 && ($("#videowrapper").css("paddingBottom", c + "%"),
        $("#videowrapper").data("pad_bottom", c));
        var d = Ke($e);
        d && (mt = Number(d)),
        (d = Ke(Ce)) && (vt = Number(d)),
        (d = Ke(fe)) ? Ii.setQuality(d) : Qt.jsVidQuality && Ii.setQuality(Qt.jsVidQuality)
    }
    window.onYouTubeIframeAPIReady = function() {
        sr("onYouTubeIframeAPIReady(S)"),
        zt({
            action: Dt.YT_IFRAME_READY
        }),
        j("onYouTubeIframeAPIReady"),
        Qt.reqType == Mt.LESSON_VIDEO ? "undefined" == typeof YT || void 0 === YT.Player ? window.onYouTubeIframeAPIReady = function() {
            Vi()
        }
        : Vi() : Qt.jsonData && (Qt.jumpToCID ? Hn.jump2(Qt.jsonData, Qt.jumpToCID) : Hn.fill(Qt.jsonData))
    }
    ;
    var ar = 1;
    function sr(t) {
        console.log("[TM] " + t + " [time: " + (new Date - e) + " msec]")
    }
    function lr() {
        cr($("#q").val())
    }
    function cr(t) {
        if (Qt.jsEmbedded && r)
            dr(t, Qt.jsLang, Qt.jsAccent);
        else {
            var e = t;
            if (0 === e.trim().length)
                return !1;
            e = "/pronounce/" + function(t) {
                try {
                    return t.replace(/\\/g, "/")
                } catch (t) {
                    j("exception occurs: " + t)
                }
                return t
            }(e = Le(e));
            var n = Ut != Pt.REGULAR;
            e += "/" + (n ? Qt.jsURLToken : Qt.jsURLTokenLight),
            n && (e += "/qp=" + Ut),
            $("#gform").attr("action", e),
            $("#gform").submit()
        }
    }
    function dr(t, e, n, o) {
        var i, r;
        if (t = !(i = t) || 75 < i.length ? null : ((i = (i = (i = (i = (i = (i = (i = i.replaceAll("[“”]", '"')).replaceAll("’", "'")).replaceAll("[\\%\\-\\+\\;\\,\\<\\>]", " ")).replaceAll("#", " #")).replaceAll("\\s+", " ")).replaceAll("[\\[\\]\\(\\)]", "")).trim()).endsWith("#") && (i = i.substring(0, i.length - 1)),
        -1 != i.indexOf(" * ") && (i = i.replaceAll(" \\* ", " ")),
        i = i.replaceAll("\\.", ""),
        i = -1 == (r = i).indexOf('"') ? r : (r.split('"').length - 1) % 2 == 1 ? r.replaceAll('"', "") : r)) {
            $("#q").val(t),
            Vt(e, n),
            Qt.jsQuery = t,
            Qt.jsCleanQuery = qe(Qt.jsQuery),
            Qt.jsQueryTerm = Qt.jsCleanQuery,
            Qt.jsIndexQuery = t,
            Qt.jsPlayList = o,
            Hn.reset(),
            Hn.fetch(null, function() {
                if (Ut = Pt.REGULAR,
                Qt.jsTotalResult = Hn.getTotal(),
                $("#ttlrx").hide(),
                $("#didum").html(""),
                Qt.jsIndexQuery = Yt,
                Qt.jsLang != T && (Qt.jsCleanQuery = qe(Qt.jsIndexQuery)),
                $("#accentgrp").length && ($("#accentgrp button").removeAttr("checked").prop("checked", !1).removeClass("active"),
                $('#accentgrp button[data-lang="' + Qt.jsLang + '"][data-accent="' + Qt.jsAccent + '"]').prop("checked", !0).addClass("active")),
                Qt.jsTotalResult < 1)
                    $("#ttlr").hide(),
                    $("#ttlrx").show(),
                    $("#ttlrx .noresult").html("No result found."),
                    0 == Qt.jsTotalResult && zt({
                        action: Dt.UNREADY
                    });
                else {
                    var t = $("#ttlr");
                    if (t.length) {
                        t.show();
                        var e = t.find(".htag");
                        e.length && e.remove(),
                        $("#ttl_total").html(Qt.jsTotalResult),
                        $("#ttl_indx").html(1),
                        $("#ttl_lang").html((n = Qt.jsLang,
                        o = Qt.jsAccent,
                        n == c ? o == k ? "English" : o == S ? "American English" : o == x ? "British English" : o == R ? "Australian English" : o == P ? "Canadian English" : o == U ? "Irish English" : o == M ? "Scottish English" : o == F ? "New Zealand English" : "English" : n == d ? o == k ? "French" : o == N ? "(Fr.) French" : o == Q ? "(Qc.) French" : o == V ? "(Be.) French" : o == G ? "(Ch.) French" : "French" : n == h ? o == k ? "Spanish" : o == D ? "(SP.) Spanish" : o == K ? "(LA.) Spanish" : "Spanish" : n == f ? "Italian" : n == T ? "Hebrew" : n == A ? "Polish" : n == _ ? "Greek" : n == p ? "German" : n == v ? "Korean" : n == E ? "Turkish" : n == b ? "Russian" : n == C ? o == k ? "Arabic" : o == ot ? "(EG.) Arab" : o == et ? "(SA.) Arab" : o == nt ? "(DZ.) Arab" : o == ct ? "(MA) Arab" : o == ut ? "(TN.) Arab" : o == dt ? "(LB.) Arab" : o == ht ? "(JO.) Arab" : o == rt ? "(QA.) Arab" : o == at ? "(AE.) Arab" : o == st ? "(kW.) Arab" : o == lt ? "(BH.) Arab" : o == pt ? "(OM.) Arab" : o == it ? "(AF.) Arab" : o == gt ? "(PS.) Arab" : o == tt ? "(IL.) Arab" : o == ft ? "(LY.) Arab" : "Arabic" : n == g ? "Japanese" : n == y ? o == k ? "Portuguese" : o == L ? "(BR.) Portuguese" : o == O ? "(PT.) Portuguese" : "Portuguese" : n == w ? o == k ? "Dutch" : o == Z ? "(NL.) Dutch" : o == V ? "Flemish" : "Dutch" : n == m ? o == Y ? "(cn) Chinese" : o == z ? "(tw) Chinese" : o == W ? "(sg) Chinese" : o == q ? "(hk) Chinese" : o == B ? "(sh) Chinese" : o == H ? "(mo) Chinese" : o == J ? "(mn) Chinese" : "Chinese" : n == I ? o == k ? "Sign Language" : o == S ? "(US) Sign Language" : o == x ? "(UK) Sign Language" : o == U ? "(IE) Sign Language" : o == R ? "(AUS) Sign Language" : o == F ? "(NZ) Sign Language" : o == X ? "(Int.) Sign Language" : "Sign Language" : "English")),
                        $("#ttl_q").html(Qt.jsQuery)
                    }
                }
                var n, o;
                Qt.jsEmbedded && zt({
                    action: Dt.SEARCH_DONE,
                    query: Qt.jsQuery,
                    lang: nn.toLangStr(Qt.jsLang),
                    accent: nn.toAccentStr(Qt.jsLang, Qt.jsAccent),
                    totalResult: Qt.jsTotalResult
                })
            });
            var a, s, l = $("#phoneticPanel");
            l.length && (a = l,
            Bn.fetch("/fetchphonetic.jsp", function(t) {
                a.html(t),
                Qt.jsEmbBGColor && er()
            })),
            (l = $("#nearByPanel")).length && (s = l,
            Bn.fetch("/fetchsuggestions.jsp", function(t) {
                s.html(t),
                Qt.jsEmbBGColor && er()
            }))
        }
    }
    return $(document).ready(function() {
        if (zt({
            action: Dt.DOC_READY
        }),
        Zi(),
        Yi.init(),
        Qt.shrVideo && Hn.addShared(Qt.shrVideo),
        $(".accent_selection").change(function() {
            var t = Number($(this).attr("data-bitwise"));
            $(this).is(":checked") ? u |= t : u &= ~t,
            He(be + ke + Qt.jsLang, u + "", 600),
            Be();
            var e = $(this).attr("data-target-id");
            e && ($(this).is(":checked") ? $("#" + e).show() : $("#" + e).hide())
        }),
        $("#exp_accent_button").click(function(t) {
            t.preventDefault(),
            $(".accents_panel").slideToggle("fast")
        }),
        $(".ap_controls .closeBut").click(function(t) {
            t.preventDefault(),
            $(".accents_panel").slideUp("fast")
        }),
        $(".accent .btn_acc").click(function(t) {
            Vt($(this).data("lang"), $(this).data("accent")),
            lr()
        }),
        $("#searchbut").click(function(t) {
            Vt($(this).data("lang"), $(this).data("accent")),
            lr()
        }),
        $(document).on("click", "._ctxSearch", function(t) {
            Qt.jsLang == T && (Ut = Pt.NO_SEGMENTATION),
            cr($(this).html())
        }),
        $(".act_hl_caption").click(function(t) {
            var e = $("#r_caption");
            $("html, body").stop().animate({
                scrollTop: $(".result_container").offset().top
            }, 250, "swing"),
            e.addClass("highlight"),
            setTimeout(function() {
                e.removeClass("highlight"),
                setTimeout(function() {
                    e.addClass("highlight"),
                    setTimeout(function() {
                        e.removeClass("highlight")
                    }, 500)
                }, 250)
            }, 500)
        }),
        Qt.jsEmbedded) {
            er();
            var t = $("#content_scroll").length;
            t && 0 < Qt.jsEmbHeight && $("#content_scroll").height(Qt.jsEmbHeight - $("#content_scroll").offset().top),
            $("#yg_link").click(function(t) {
                Ii.pause()
            }),
            $(window).resize(function() {
                t && 0 < Qt.jsEmbHeight && $("#content_scroll").height(Qt.jsEmbHeight - $("#content_scroll").offset().top),
                Ft ? ir() : Ft = !0
            })
        } else
            $("#all_actions").on("click", ".menu_ttl", function(t) {
                if (t.preventDefault(),
                $(this).hasClass("openYT")) {
                    Ii.pause();
                    var e = Hn.getCurrentTrack().vid;
                    Xi("https://www.youtube.com/watch?time_continue=" + Math.floor(Ii.getCurrentTime()) + "&v=" + e)
                } else if ($(this).hasClass("openDico")) {
                    if (Ii.pause(),
                    $(this).data("enable")) {
                        var n = Fe(Pn.getCaption().display)
                          , o = $(this).data("url");
                        Xi(o = o.replace("%txt%", Le(n)))
                    } else
                        $("#noMotherTongueDlg").modal()
                } else if (3 == ar)
                    nr(this, t);
                else {
                    if (2 == ar)
                        return;
                    ar = 2;
                    var i = this
                      , r = t;
                    $("#actionpanels .lprogress").html("Loading, please wait...").show(),
                    $.ajax({
                        url: "/loadui.jsp?userlang=" + Qt.userLang + "&gender_query=" + Qt.jsIsGenderQuery + "&lg=" + Qt.jsLang + "&accent=" + Qt.jsAccent + "&lui=actions",
                        success: function(t) {
                            0 < (t = $.trim(t)).length && ($("#actionpanels").html(t),
                            nr(i, r),
                            ar = 3)
                        }
                    })
                }
            }),
            $("#all_actions").on("click", ".at_btn", function(t) {
                co.submitPanel(this),
                t.preventDefault()
            });
        $("body").on("mouseup touchend", function(t) {
            var e = $("#lang_pan_sel");
            e.length && (e.is(t.target) || 0 !== e.has(t.target).length || triggerLangPanel(!0)),
            (e = $("#dico_selector_panel")).length && (e.is(t.target) || 0 !== e.has(t.target).length || Ki(!0))
        }),
        $("body").on("click", ".social-icons .social", function() {
            $(this).hasClass("fb") ? Xi("https://www.facebook.com/youglish") : Xi("https://twitter.com/youglish")
        });
        var e = $("#q");
        e.length && (e.keypress(function(t) {
            if (13 == t.which) {
                var e = $("#searchbut");
                return Vt(e.data("lang"), e.data("accent")),
                lr(),
                t.stopPropagation(),
                t.preventDefault(),
                !1
            }
        }),
        e.val(Qt.jsQuery),
        e.focus()),
        $("#lang_sel li").hover(function() {
            $(this).addClass("hover")
        }, function() {
            $(this).removeClass("hover")
        });
        var n = Ke(pe);
        n && (n = Number(n),
        $("a").each(function() {
            var t = $(this);
            t.css("font-size", parseInt(t.css("font-size")) + n + "px")
        }),
        0 < n && ($("body").css("margin-bottom", "250px"),
        $(".footer").height("250px")))
    }),
    t.PlayerAPI = Ii,
    t.EntryMng = Hn,
    t.DefineMng = Sn,
    t.Actions = co,
    t.CaptionMng = Pn,
    t.W_ACTION = Dt,
    t.K_ADULT = ee,
    t.K_ROMANIZATION = ne,
    t.K_VID_PADDING_BOTTOM = ye,
    t.K_SHOWVIDEOINFO = oe,
    t.K_AUTO_NEXT = ie,
    t.K_SHOWEXTUI = se,
    t.K_CAPCOLOR = ce,
    t.K_MARKERCOLOR = de,
    t.K_CAPSIZE = he,
    t.K_VID_QUALITY = fe,
    t.K_LANGTRG = ge,
    t.K_LNKSIZE = pe,
    t.K_BACK_DURATION = $e,
    t.K_DELAY_START = Ce,
    t.K_UC_SIZE = _e,
    t.K_COOKIE_DICO = Ae,
    t.K_MOTHER_TONGUE = Ie,
    t.K_VERSION = we,
    t.K_COOKIE_CONSENT = Xt,
    t.K_CHROME_PATCH = Ee,
    t.resetCookies = function(t) {
        Je(ce),
        Je(de),
        Je(he),
        Je(pe),
        function() {
            for (var t = document.cookie.split("; "), e = 0; e < t.length; e++)
                for (var n = window.location.hostname.split("."); 0 < n.length; ) {
                    var o = encodeURIComponent(t[e].split(";")[0].split("=")[0]) + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" + n.join(".") + " ;path="
                      , i = location.pathname.split("/");
                    for (document.cookie = o + "/"; 0 < i.length; )
                        document.cookie = o + i.join("/"),
                        i.pop();
                    n.shift()
                }
        }(),
        Je(we),
        Je(Ee),
        t && (Je(ee),
        Je(oe),
        Je(ie),
        Je(ne),
        Je(re),
        Je(se),
        Je(fe),
        Je($e),
        Je(Ce),
        Je(ye),
        Je(Ae),
        Je(Ie))
    }
    ,
    t.getAllowExtUI = function() {
        return Tt
    }
    ,
    t.postMsg = zt,
    t.init = function(t) {
        if (console.log("Welcome to YG-JS, vs: vs9.2"),
        j("init called - JS_VERSION: vs9.2"),
        sr("init(B)"),
        typeof displayGDPR == typeof Function && displayGDPR(),
        rr(t),
        Qt.jsResizeFrame && zt({
            action: Dt.WIDGET_RESIZE,
            height: Qt.jsCurH,
            width: Qt.jsCurW,
            update: 0
        }),
        Qt.reqType != Mt.INDEX) {
            if (Qt.reqType != Mt.LESSON_WORD) {
                if (Qt.reqType == Mt.LESSON_VIDEO ? Jo.init() : (Qt.jsYTAccess == kt ? null !== Qt.jsonData && ("undefined" == typeof YT || void 0 === YT.Player || (null != Qt.jumpToCID ? Hn.jump2(Qt.jsonData, Qt.jumpToCID) : Hn.fill(Qt.jsonData))) : Hn.fill(Qt.jsonData),
                Qt.jsDidumPro && Re()),
                Qt.jsEmbedded) {
                    var e = $("#serializeMe :input[name=e_rest_mode]").val();
                    _t = 0 == e,
                    0 == Qt.jsTotalResult && zt({
                        action: Dt.UNREADY
                    }),
                    zt({
                        action: Dt.SEARCH_DONE,
                        query: Qt.jsQuery,
                        lang: nn.toLangStr(Qt.jsLang),
                        accent: nn.toAccentStr(Qt.jsLang, Qt.jsAccent),
                        totalResult: Qt.jsTotalResult
                    }),
                    ir()
                }
                Sn.registerEvent(),
                sr("init(E)")
            }
        } else
            "function" == typeof initHP && initHP()
    }
    ,
    t.search = dr,
    t.replay = zi,
    t.go2 = tr,
    t.scrollDlg = function(t, e, n) {
        if ($(e).length)
            De("#modalDef .modal-body", e);
        else {
            if (void 0 === n)
                return void alert(t + " not available.");
            $(n).length ? De("#modalDef .modal-body", n) : alert(t + " not available.")
        }
    }
    ,
    t.scrollToTrg = function(t, e) {
        var n = $(t);
        n.length ? $("html, body").stop().animate({
            scrollTop: n.offset().top
        }, 250, "swing") : e && e()
    }
    ,
    t.pronounce = lr,
    t.showLs = function(t) {
        $("#" + t + "Msg").hide(),
        $("#" + t).toggle("fast")
    }
    ,
    t.registerLs = function(o, i) {
        var r = $("#email" + o).val();
        if (r.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            var a = $("#f" + o).val()
              , t = $(".pan_" + o + " textarea[name=g-recaptcha-response]").val()
              , e = "/access.jsp?lang=" + Qt.jsLang + "&op=reglesson&type=" + o + "&freq=" + a + "&email=" + encodeURIComponent(r) + "&g-recaptcha-response=" + t;
            $.ajax({
                url: e,
                success: function(t) {
                    $("#email" + i).val(r),
                    $("#f" + i).val(a);
                    var e = bt(t = $.trim(t));
                    $("#" + o).hide();
                    var n = $("#" + o + "Msg");
                    n.removeClass("lmsgerr").removeClass("lmsgok"),
                    n.addClass(e.err ? "lmsgerr" : "lmsgok"),
                    n.find("." + o + "txt").html(e.err ? e.msg : "You have successfully registered for this lesson."),
                    n.show(),
                    e.err || setTimeout(function() {
                        n.slideUp("fast")
                    }, 2e3)
                },
                error: function() {
                    alert("Registration error. Try again later")
                }
            })
        } else
            alert("Enter a correct email and try again.")
    }
    ,
    t.closeById = function(t, e) {
        e ? $("#" + t).fadeOut() : $("#" + t).hide()
    }
    ,
    t.readCookie = Ke,
    t.createCookie = He,
    t.eraseCookie = Je,
    t.toggleAdult = function(t) {
        un(!_t)
    }
    ,
    t.showVideoInfo = function(t) {
        He(oe, (wt = t) + "", 600)
    }
    ,
    t.autoNext = function(t) {
        He(ie, (It = t) + "", 600),
        It && (Se = -.8)
    }
    ,
    t.showExtUI = function(t) {
        He(se, (Tt = t) + "", 600)
    }
    ,
    t.autoPlay = function(t) {
        He(re, t + "", 600)
    }
    ,
    t.setCookieSupport = function(t) {
        ln = Number(t),
        He(te, t, 3650),
        function() {
            for (var t = document.cookie.split(";"), e = 0; e < t.length; e++) {
                var n = t[e]
                  , o = n.indexOf("=")
                  , i = -1 < o ? n.substr(0, o) : n;
                dn(i) ? console.log("skipping: " + i) : Je(i)
            }
        }()
    }
    ,
    t.setAdult = un,
    t.showRomanization = function(t) {
        He(ne, (Et = t) + "", 600)
    }
    ,
    t.logout = function(t) {
        Je(Kt),
        Je(Zt),
        Je(Jt),
        tr(t ? "/" + nn.toLangStr(t) : "/")
    }
    ,
    t.getBackDuration = function() {
        return mt
    }
    ,
    t.getDelayStart = function() {
        return vt
    }
    ,
    t.setDelayStart = function(t) {
        vt = t
    }
    ,
    t.setVersion = Be,
    t
}();
