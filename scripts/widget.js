/*Hi YouGlish just playing around with your scripts. Love you <3 明凯 */
var YG = (function (D, x) {
    var e = {},
        S = {},
        Y = [],
        i = "3.5";
    console.log("yg widget vers: " + i);
    var n,
        L,
        k = 1,
        W = 1024,
        G = 2048,
        M = 4096,
        B = !1;
    var a = !1;
    var H = { NONE: 0, YG: 1, PARTNER: 2 };
    var U = { LEFT: 1, RIGHT: 2, TOP: 4, BOTTOM: 8 };
    function z(e) {
        var t = "???";
        switch (Number(e)) {
            case U.TOP:
                t = "plc_top";
                break;
            case U.BOTTOM:
                t = "plc_bottom";
                break;
            case U.LEFT:
                t = "plc_left";
                break;
            case U.RIGHT:
                t = "plc_right";
        }
        return t;
    }
    var F = "%%AF%%",
        q = { ad_network_name: "google adsense", responsive: !0, code: "<ins class='adsbygoogle' style='display:block' data-ad-client='ca-pub-4884889260645232' data-ad-slot='7940721009' data-ad-format='" + F + "'></ins>" },
        V = 30;
    var Z = 120;
    var j = { PLAYER: 1, OUTDATED_BROWSER: 2, TIMEOUT: 3, BOT: 4 };
    W_ACTION = {
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
        UNREADY: 100,
    };
    var t = !(P_ACTION = { PLAY: 1, REPLAY: 2, PAUSE: 3, PREV: 4, NEXT: 5, DELTA: 6, SEARCH: 7, SIZE: 8, SETPLAYERSPEED: 9, SETDELAYSTART: 10 });
    function r(e) {
        try {
            return JSON.parse(e);
        } catch (e) {}
        return "";
    }
    function o(e) {
        if ("https://youglish.com" === (e.origin || e.originalEvent.origin)) {
            var t = r(e.data);
            if (t && t.wid && t.action) {
                if (!S[t.wid]) return;
                if ((S[t.wid].serverHit(), t.action === W_ACTION.DOC_READY)) S[t.wid].broadcast("onWidgetReady", t);
                else if (t.action === W_ACTION.YT_IFRAME_READY) S[t.wid].broadcast("onYouTubeReady", t);
                else if (t.action === W_ACTION.PLAYER_READY) S[t.wid].setReady(!0), S[t.wid].broadcast("onPlayerReady", t);
                else if (t.action === W_ACTION.WIDGET_RESIZE) {
                    var o = t.update === x || 1 == t.update;
                    S[t.wid].resize(t.width, t.height, o);
                } else
                    t.action === W_ACTION.ADV
                        ? ((a = 1 == t.is_partner),
                          console.log("------------v: " + i),
                          console.log("Ads raw data: " + e.data),
                          console.log(
                              "-> key used: " +
                                  t.key +
                                  " -isPartner: " +
                                  a +
                                  " -adToDisplay: " +
                                  (function (e) {
                                      var t = "???";
                                      switch (Number(e)) {
                                          case H.NONE:
                                              t = "NONE";
                                              break;
                                          case H.YG:
                                              t = "YG";
                                              break;
                                          case H.PARTNER:
                                              t = "PARTNER";
                                      }
                                      return t;
                                  })(t.ads_display)
                          ),
                          console.log("-> YGAds: " + t.ads_code + " -YGLocations: " + t.ads_loc),
                          console.log("------------"),
                          S[t.wid].setAdConfig(t.ads_display, r(t.ads_code), t.ads_loc, 1 == Number(t.show_logo)))
                        : t.action === W_ACTION.SEARCH_DONE
                        ? (S[t.wid].display(), S[t.wid].broadcast("onSearchDone", t), S[t.wid].broadcast("onFetchDone", t))
                        : t.action === W_ACTION.VIDEO_CHANGE
                        ? S[t.wid].broadcast("onVideoChange", t)
                        : t.action === W_ACTION.CAPTION_CHANGE
                        ? S[t.wid].broadcast("onCaptionChange", t)
                        : t.action === W_ACTION.CAPTION_CONSUMED
                        ? S[t.wid].broadcast("onCaptionConsumed", t)
                        : t.action === W_ACTION.PLAYER_STATECHANGE
                        ? S[t.wid].broadcast("onPlayerStateChange", t)
                        : t.action === W_ACTION.PLAYER_SPEED_UPDATED
                        ? (S[t.wid].onSpeedUpdated(t.speed), S[t.wid].broadcast("onSpeedChange", t))
                        : t.action === W_ACTION.ERROR
                        ? +t.code == j.BOT
                            ? S[t.wid].display(!1)
                            : (+t.code == j.OUTDATED_BROWSER &&
                                  (S[t.wid].display(),
                                  S[t.wid].resize(t.width, t.height, !1),
                                  n && clearTimeout(n),
                                  (n = setTimeout(function () {
                                      S[t.wid].close();
                                  }, 3e3))),
                              S[t.wid].broadcast("onError", t))
                        : t.action === W_ACTION.UNREADY && S[t.wid].setReady(!1);
            }
        }
    }
    function J(e) {
        return encodeURIComponent(e).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
    }
    function Q(e, t) {
        e && (e.contentWindow || e.contentDocument).postMessage(JSON.stringify(t), "*");
    }
    function l(e) {
        e && ((S = {}), (Y = []));
        for (var t = document.querySelectorAll("a.youglish-widget"), o = 0; o < t.length; o++) s(t[o]);
    }
    function s(e) {
        var t = new c(e.id, {
            width: e.getAttribute("width") || e.getAttribute("data-width"),
            height: e.getAttribute("height") || e.getAttribute("data-height"),
            components: e.getAttribute("data-components"),
            scroll: e.getAttribute("data-scroll"),
            backgroundColor: e.getAttribute("data-bkg-color"),
            linkColor: e.getAttribute("data-link-color"),
            titleColor: e.getAttribute("data-ttl-color"),
            captionColor: e.getAttribute("data-cap-color"),
            markerColor: e.getAttribute("data-marker-color"),
            queryColor: e.getAttribute("data-query-color"),
            captionSize: e.getAttribute("data-cap-size"),
            restrictionMode: e.getAttribute("data-rest-mode"),
            videoQuality: e.getAttribute("data-video-quality"),
            title: e.getAttribute("data-title"),
            toggleUI: e.getAttribute("data-toggle-ui"),
            autoStart: e.getAttribute("data-auto-start"),
            panelsBackgroundColor: e.getAttribute("data-panels-bkg-color"),
            textColor: e.getAttribute("data-text-color"),
            keywordColor: e.getAttribute("data-keyword-color"),
            client: e.getAttribute("data-client"),
            lang: e.getAttribute("data-lang"),
            accent: e.getAttribute("data-accent"),
            zones: e.getAttribute("data-zones"),
            playlist: e.getAttribute("data-playlist"),
        });
        +e.getAttribute("data-delay-load") || t.fetch(e.getAttribute("data-query"), e.getAttribute("data-lang"), e.getAttribute("data-accent"));
    }
    function c(e, t) {
        var y,
            A,
            r,
            o,
            i = {},
            l = 0,
            s = null,
            f = !1,
            E = !1;
        (o = e), (y = ("object" == typeof HTMLElement ? o instanceof HTMLElement : o && "object" == typeof o && null !== o && 1 === o.nodeType && "string" == typeof o.nodeName) ? e.getAttribute("id") : e), (A = "fr_" + y);
        var h = t || {},
            n = {};
        if (((h.scroll = h.scroll ? h.scroll : "inner"), (h.components = h.components ? h.components : 255), h.events)) for (var a in h.events) C(a, h.events[a]);
        function _(e, t, o, i, n) {
            return "<" + e + (t ? " id='" + t + "'" : "") + (o ? " class='" + o + "'" : "") + (i ? " style='" + i + "'" : "") + ">" + (n || "") + "</" + e + ">";
        }
        function c(e, t, o, i, n) {
            if (E && !i) N(), Q(R(), { source: "youglish", action: P_ACTION.SEARCH, query: e, lang: t, accent: o, cid: i, playlist: n });
            else {
                var a = Number(h.components);
                if (((p = e), !(0 < (a & k) || p))) return;
                var r =
                        ((u = h.width),
                        (g = h.height),
                        "position: static;visibility: visible;display: inline-block;padding: 0px;border: none;max-width: 100%;margin-top: 0px;margin-bottom: 1px;width: " +
                            (u = u && 0 < Number(u) ? u + "px" : "100%") +
                            ";height: " +
                            (g = g && 0 < Number(g) ? g + "px" : "1px")),
                    l = (function (e, t, o, i, n, a, r, l, s, c, d, u, g, p, y, A, f, E, h, _, b, m, T, v, C, N, R, w) {
                        var O = !1,
                            I = s,
                            P = l;
                        s && 0 < Number(s) ? "inner" != c && (s = -1) : ((O = !0), (s = -1));
                        var D = "";
                        

                        return (
                            (D = w
                                ? "https://youglish.com/getbyid/" + w + "/" + J(t) + "/" + (o || "-1") + "/" + (i ? i.toLowerCase() : "all")
                                : "https://youglish.com/pronounce/" + (t ? J(t) : "") + "/" + (o || "-1") + "/" + (i ? i.toLowerCase() : "all")),
                            (D +=
                                "/emb=1&e_id=" +
                                e +
                                "&e_comp=" +
                                r +
                                (null == n ? "" : "&e_zones=" + n) +
                                (null == a ? "" : "&e_playlist=" + a) +
                                (null == m ? "" : "&e_start=" + m) +
                                (s ? "&e_h=" + s : "") +
                                (O ? "&e_notif_h=1" : "") +
                                (R ? "&e_hidepwdby=1" : "") +
                                (d ? "&e_bg_color=" + J(d) : "") +
                                (T ? "&e_partbg_color=" + J(T) : "") +
                                (v ? "&e_txt_color=" + J(v) : "") +
                                (C ? "&e_kw_color=" + J(C) : "") +
                                (u ? "&e_link_color=" + J(u) : "") +
                                (g ? "&e_ttl_color=" + J(g) : "") +
                                (p ? "&e_cap_color=" + J(p) : "") +
                                (y ? "&e_marker_color=" + J(y) : "") +
                                (A ? "&e_query_color=" + J(A) : "") +
                                (f ? "&e_cap_size=" + f : "") +
                                (E ? "&e_rest_mode=" + E : "") +
                                (h ? "&e_vid_quality=" + h : "") +
                                (_ ? "&e_title=" + J(_) : "") +
                                (b != x ? "&e_toggle_ui=" + b : "") +
                                (I ? "&e_cur_h=" + I : "") +
                                (P ? "&e_cur_w=" + P : "") +
                                (N ? "&e_client=" + N : "") +
                                (L ? "&e_partner=" + L : ""))
                        );
                    })(
                        y,
                        e,
                        t || h.lang,
                        o || h.accent,
                        h.zones,
                        n || h.playlist,
                        h.components,
                        h.width,
                        h.height,
                        h.scroll,
                        h.backgroundColor,
                        h.linkColor,
                        h.titleColor,
                        h.captionColor,
                        h.markerColor,
                        h.queryColor,
                        h.captionSize,
                        h.restrictionMode,
                        h.videoQuality,
                        h.title,
                        h.toggleUI,
                        h.autoStart,
                        h.panelsBackgroundColor,
                        h.textColor,
                        h.keywordColor,
                        h.client,
                        f,
                        i
                    ),
                    s = h.height && 0 < Number(h.height) && "inner" != h.scroll ? "" : "scrolling='no'",
                    c = 0 < (a & (W | G | M)),
                    d =
                        "<div style='display:none;" +
                        (c ? "border: 1px solid #bec3e4" : "") +
                        "' class='ygPanel'>" +
                        (c
                            ? (function (e) {
                                  var t = "<div style='font-size: 20px;padding: 4px;background-color: #3e4571;color: white;" + (0 < (e & W) ? "cursor: move" : "") + "'>&nbsp;\n";
                                  0 < (e & M) &&
                                      (t += "<span title='close widget' style='cursor:hand;cursor:pointer;float: right;color: #b9b9b9;margin-left:5px;line-height: 23px;font-size:30px' onclick='YG.close(\"" + y + "\")'>&times</span>");
                                  0 < (e & G) && (t += "<span title='Show/hide widget' style='cursor:hand;cursor:pointer;float: right;color: #b9b9b9;margin-left:5px;line-height: 23px;' onclick='YG.toggle(\"" + y + "\")'>&#9776</span>   ");
                                  return (t += "</div>");
                              })(a)
                            : "") +
                        "<div class='ygContentEx' style='display:flex;'><div style='flex-grow: 0;margin-right:5px;display:none' class='plc_left'></div><div style='flex-grow: 1' class='ygContent'><div style='display:flex;flex-direction:column;align-items:center'><div style='margin-bottom:5px;display:none' class='plc_top'></div><iframe allow='autoplay' id='" +
                        A +
                        "' class='ygFrame'" +
                        s +
                        " style='" +
                        r +
                        "'  src='" +
                        l +
                        "'></iframe><div style='margin-top:5px;display:none' class='plc_bottom'></div></div></div><div style='flex-grow: 0;margin-left:5px;display:none' class='plc_right'></div></div></div>";
                _("div", null, "ygProgress", "padding:12px;border: 1px solid lightgrey;font-size:18px;font-style: italic", "Loading Youglish...");
                (d = _(
                    "div",
                    y,
                    0 < (a & W) ? "ygContainer ygDraggable" : "ygContainer",
                    "background-color:white;z-index:999999",
                    "<div class='ygProgress' style='padding:12px;border: 1px solid lightgrey;font-size:18px;font-style: italic'>Loading Youglish...</div>\n" + d
                )),
                    (document.getElementById(y).outerHTML = d),
                    0 < (a & W) &&
                        ("undefined" == typeof DragModule
                            ? (D.onDragModuleReady = function (e) {
                                  e.registerAll();
                              })
                            : DragModule.registerAll()),
                    null;
            }
            var u, g, p;
            !(function () {
                w && clearTimeout(w);
                w = setTimeout(P, 5e3);
            })();
        }
        function d(e, t, o) {
            return o == U.TOP || o == U.BOTTOM ? e.replace(F, "horizontal") : e.replace(F, "vertical");
        }
        function u(e, t, o, i) {
            var n = s.ygAds[e];
            n = n || q;
            var a = s.ygAds[e];
            (a = a || q), Number(n.responsive) && (t.style.width = i + "px"), -1 != n.ad_network_name.indexOf("adsense") ? ((t.innerHTML = d(a.code, 0, e)), (adsbygoogle = D.adsbygoogle || []).push({})) : (t.innerHTML = d(a.code, 0, e));
        }
        function g(e, t, o, i) {
            "function" == typeof onYouglishDisplayAd && onYouglishDisplayAd(y, e, t, i);
        }
        function p(e, t) {
            var o = -1;
            if (e == U.LEFT || e == U.RIGHT) {
                var i = U.LEFT | U.RIGHT,
                    n = document.getElementById(y).offsetWidth;
                if ((o = Math.floor(n * (V / 100))) < Z && (t & i) == i && e == U.LEFT) {
                    var a = 2 * V;
                    50 < a && (a = 50), (o = Math.floor(n * (a / 100)));
                }
            } else o = R().offsetWidth;
            return Z <= o ? o : -1;
        }
        function b() {
            N(), Q(R(), { source: "youglish", action: P_ACTION.PLAY });
        }
        function m() {
            Q(R(), { source: "youglish", action: P_ACTION.PAUSE });
        }
        h.query && c(h.query, h.lang, h.accent),
            0 < (Number(h.components) & W) &&
                !B &&
                ((B = !0),
                (function () {
                    var e = document.createElement("script");
                    (e.async = !0), (e.src = "https://youglish.com/public/emb/ext_min.js");
                    var t = document.getElementsByTagName("script")[0];
                    t.parentNode.insertBefore(e, t);
                })());
        var T = 1;
        function v(e, t) {
            if (n[e]) for (var o = 0; o < n[e].length; o++) n[e][o](t);
        }
        function C(e, t) {
            void 0 === n[e] && (n[e] = []), n[e].push(t);
        }
        function N() {
            R().style.display = "block";
        }
        function R() {
            return document.getElementById(A);
        }
        var w,
            O,
            I = !1;
        function P() {
            v("onError", { wid: y, action: W_ACTION.ERROR, code: j.TIMEOUT });
        }
        return (
            (i.broadcast = v),
            (i.addEventListener = C),
            (i.removeEventListener = function (e, t) {
                if (n[e])
                    for (var o = 0; o < n[e].length; o++)
                        if (n[e][o] === t) {
                            n[e].splice(o, 1);
                            break;
                        }
            }),
            (i.fetch = c),
            (i.search = function (e, t, o) {
                console.log("The method 'search' is deprecated. Use 'fetch' instead."), c(e, null, t, o);
            }),
            (i.replay = function () {
                N(), Q(R(), { source: "youglish", action: P_ACTION.REPLAY });
            }),
            (i.play = b),
            (i.pause = m),
            (i.previous = function () {
                N(), Q(R(), { source: "youglish", action: P_ACTION.PREV });
            }),
            (i.next = function () {
                N(), Q(R(), { source: "youglish", action: P_ACTION.NEXT });
            }),
            (i.move = function (e) {
                N(), Q(R(), { source: "youglish", action: P_ACTION.DELTA, delta: e });
            }),
            (i.getId = function () {
                return y;
            }),
            (i.resize = function (e, t, o) {
                var i = { source: "youglish", action: P_ACTION.SIZE },
                    n = R();
                t && 0 < Number(t) && ((n.style.height = t + "px"), (i.height = t)), e && 0 < Number(e) && ((n.style.width = e + "px"), (i.width = e)), o && Q(n, i);
            }),
            (i.toggle = function () {
                var e = document.getElementById(y).getElementsByClassName("ygContentEx")[0];
                null == e.style.display || "none" == e.style.display ? ((e.style.display = "flex"), b()) : ((e.style.display = "none"), m());
            }),
            (i.close = function () {
                (E = !1), (document.getElementById(y).innerHTML = "");
            }),
            (i.show = N),
            (i.hide = function () {
                R().style.display = "none";
            }),
            (i.display = function (e) {
                var t = document.getElementById(y),
                    o = t.getElementsByClassName("ygPanel")[0];
                (I && "block" == o.style.display) ||
                    ((t.getElementsByClassName("ygProgress")[0].style.display = "none"),
                    (o.style.display = "block"),
                    !s ||
                        (s.display != H.PARTNER && s.display != H.YG) ||
                        (function () {
                            var e, t;
                            t = s.display == H.YG ? (console.log("\nDisplaying YG ads..."), (e = s.ygLocations), u) : (console.log("\nDisplaying PARTNER ads..."), (e = l), g);
                            for (var o = 1; o <= 8; o *= 2)
                                if (0 < (e & o)) {
                                    var i = z(o);
                                    console.log("...draw " + i + " ad unit ...?");
                                    var n = document.getElementById(y).getElementsByClassName(i)[0],
                                        a = p(o, e);
                                    -1 != a ? ((n.style.display = "block"), console.log("-----\x3e YES, sugWidth: " + a), t(o, n, e, a)) : console.log("-----\x3e NOP, not enough space");
                                }
                            console.log("done.\n");
                        })(),
                    (I = void 0 === e || e));
            }),
            (i.serverHit = function () {
                w && (clearTimeout(w), (w = null));
            }),
            (i.setAdsLocation = function (e) {
                (f = 0 < ((l = e) & U.BOTTOM) || 0 < (e & U.RIGHT)), (E = !1);
            }),
            (i.setAdConfig = function (e, t, o, i) {
                var n, a;
                (s = { display: Number(e), ygAds: t, ygLocations: Number(o) }),
                    i &&
                        document
                            .getElementById(r || y)
                            .appendChild(
                                ((n =
                                    "<div style='position:relative'><div style='margin-top: 15px;float: right;color: grey;font-size: 11px;font-style: oblique;padding: 2px 5px;border-top: 1px solid #d4d4d4'> Powered by <a style='text-decoration: none;color:#337ab7' href='https://youglish.com'>Youglish.com</a></div><div style='clear: both;float:none'></div></div>"),
                                ((a = document.createElement("div")).innerHTML = n),
                                a.firstChild)
                            );
            }),
            (i.setContainerId = function (e) {
                r = e;
            }),
            (i.setReady = function (e) {
                E = e;
            }),
            (i.onSpeedUpdated = function (e) {
                T = e;
            }),
            (i.getSpeed = function () {
                return T;
            }),
            (i.setSpeed = function (e) {
                Q(R(), { source: "youglish", action: P_ACTION.SETPLAYERSPEED, speed: e });
            }),
            (i.setDelayStart = function (e) {
                Q(R(), { source: "youglish", action: P_ACTION.SETDELAYSTART, delay: e });
            }),
            (S[(O = i).getId()] = O),
            Y.push(O),
            i
        );
    }
    return (
        t || ((t = !0), D.addEventListener("message", o, !1)),
        l(),
        (e.PlayerState = { UNSTARTED: -1, ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5 }),
        (e.Error = j),
        (e.AdLocations = U),
        (e.setParnterKey = function (e) {
            L = e;
        }),
        (e.parsePage = l),
        (e.getWidget = function (e) {
            return S[e];
        }),
        (e.getWidgets = function () {
            return Y;
        }),
        (e.Widget = c),
        (e.toggle = function (e) {
            S[e].toggle();
        }),
        (e.close = function (e) {
            S[e].close();
        }),
        (e.setAdWidthRatio = function (e) {
            10 < e && e <= 50 && (V = e);
        }),
        (e.setMinAdWidth = function (e) {
            Z = e;
        }),
        e
    );
})(window);
"function" == typeof onYouglishAPIReady && onYouglishAPIReady();
