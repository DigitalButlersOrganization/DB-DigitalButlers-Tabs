var R = Object.defineProperty;
var V = (u, t, e) => t in u ? R(u, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : u[t] = e;
var i = (u, t, e) => (V(u, typeof t != "symbol" ? t + "" : t, e), e), B = (u, t, e) => {
  if (!t.has(u))
    throw TypeError("Cannot " + e);
};
var h = (u, t, e) => (B(u, t, "read from private field"), e ? e.call(u) : t.get(u)), l = (u, t, e) => {
  if (t.has(u))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(u) : t.set(u, e);
}, o = (u, t, e, s) => (B(u, t, "write to private field"), s ? s.call(u, e) : t.set(u, e), e);
const r = {
  ACTIVE: "js--active",
  UNACTIVE: "js--unactive",
  VISIBLE: "js--visible",
  TAB: "js--tab",
  PANEL: "js--panel",
  TABS_WRAPPER: "js--tabs-wrapper",
  TAB_LIST: "js--tab-list",
  PANEL_LIST: "js--panel-list"
}, d = {
  END: "End",
  HOME: "Home",
  LEFT: "ArrowLeft",
  UP: "ArrowUp",
  RIGHT: "ArrowRight",
  DOWN: "ArrowDown",
  DELETE: "Delete",
  ENTER: "Enter",
  SPACE: " "
};
const P = (u) => u ? Array.prototype.slice.call(u.children) : [], N = (u = 5) => {
  let t = "";
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", s = e.length;
  let a = 0;
  for (; a < u; )
    t += e.charAt(Math.floor(Math.random() * s)), a += 1;
  return t;
}, y = ["click", "mouseover"];
var I, m, L, b, A, E, v, c, p, f, w, D;
class H {
  constructor(t = '[data-tabs="wrapper"]', { tabbuttonsListSelector: e = '[data-tabs="tabs"]', tabpanelsListSelector: s = '[data-tabs="content"]', deletableTabs: a = !1, initialTab: n = 0, equalHeight: T = !1, orientation: M = "horizontal", triggerEvent: g = "click", autoplay: C = {
    delay: 0
  }, on: S = {}, matchMediaRule: k, devMode: F = !1 }) {
    l(this, I, void 0);
    l(this, m, void 0);
    i(this, "activeIndex");
    i(this, "nextIndex");
    i(this, "prevIndex");
    i(this, "lastIndex");
    l(this, L, void 0);
    i(this, "orientation");
    i(this, "triggerEvent");
    l(this, b, void 0);
    l(this, A, void 0);
    l(this, E, void 0);
    i(this, "generatedId");
    l(this, v, void 0);
    i(this, "tabsWrapper");
    i(this, "tabButtonsList");
    i(this, "tabPanelsList");
    i(this, "tabs");
    i(this, "panels");
    i(this, "on");
    l(this, c, void 0);
    l(this, p, void 0);
    l(this, f, void 0);
    l(this, w, void 0);
    i(this, "matchMediaRule");
    i(this, "isInMatchMedia");
    i(this, "devMode");
    i(this, "init", () => {
      if (!this.devMode && window.location.protocol === "http:" && Boolean(window.location.port) && console.warn("TABS DEV MODE: Use option {devMode: true} for debugging. Read the docs https://www.npmjs.com/package/@digital-butlers/tabs | \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0438\u0306\u0442\u0435 \u043E\u043F\u0446\u0438\u044E {devMode: true} \u0434\u043B\u044F \u043E\u0442\u043B\u0430\u0434\u043A\u0438. \u0427\u0438\u0442\u0430\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044E https://www.npmjs.com/package/@digital-butlers/tabs"), this.devMode && console.warn(`TABS DEV MODE: Tabs dev mode enabled! Instance ID: ${this.generatedId}. Read the docs https://www.npmjs.com/package/@digital-butlers/tabs | \u0412 \u0442\u0430\u0431\u0430\u0445 \u0432\u043A\u043B\u044E\u0447\u0435\u043D \u0440\u0435\u0436\u0438\u043C \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430! ID \u044D\u043A\u0437\u0435\u043C\u043F\u043B\u044F\u0440\u0430: ${this.generatedId}. \u0427\u0438\u0442\u0430\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044E https://www.npmjs.com/package/@digital-butlers/tabs`), this.tabsWrapper && !h(this, c)) {
        if (this.on.beforeInit && this.on.beforeInit(this), this.tabButtonsList = this.tabsWrapper.querySelector(h(this, m)), this.tabPanelsList = this.tabsWrapper.querySelector(h(this, I)), this.tabPanelsList)
          this.defineTabsAndPanels(), this.panels.length > 0 && (this.checkMatchMediaRule(), window.addEventListener("resize", this.updateAttributes), this.updateAttributes(), h(this, v) && (this.setEqualHeight(), window.addEventListener("resize", this.setEqualHeight)), h(this, E) || (this.addListenersForTabs(), o(this, E, !0)), h(this, b).delay > 0 && this.isInMatchMedia && this.runAutoPlay());
        else if (this.devMode)
          throw new Error("TABS DEV MODE: Panels not found | \u041F\u0430\u043D\u0435\u043B\u0438 \u0441 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u043E\u043C \u0434\u043B\u044F \u0442\u0430\u0431\u043E\u0432 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B");
        o(this, p, !0), this.isInMatchMedia ? (this.assignTabsAttributes(), this.goTo(this.activeIndex, !1)) : this.removeTabsAttributes(), this.on.afterInit && this.on.afterInit(this);
      } else if (this.tabsWrapper) {
        if (h(this, c) && this.devMode)
          throw new Error("TABS DEV MODE: Tabs already destroyed | \u0422\u0430\u0431\u044B \u0443\u0436\u0435 \u0431\u044B\u043B\u0438 \u0434\u0435\u0441\u0442\u0440\u043E\u0435\u043D\u044B");
      } else if (this.devMode)
        throw new Error("TABS DEV MODE: Tabs wrapper not found | \u041E\u0431\u0435\u0440\u0442\u043A\u0430 \u0442\u0430\u0431\u043E\u0432 \u043D\u0435 \u043D\u0430\u0438\u0306\u0434\u0435\u043D\u0430");
    });
    i(this, "setEqualHeight", () => {
      if (this.isInMatchMedia) {
        this.panels.forEach((e) => {
          e.style.height = "auto";
        });
        const t = Math.max(...this.panels.map((e) => e.offsetHeight));
        this.panels.forEach((e) => {
          e.style.height = `${t}px`;
        });
      }
    });
    l(this, D, (t) => Number.isFinite(t) && t >= 0 && t < this.panels.length);
    i(this, "goTo", (t, e = !0) => {
      if (!h(this, p))
        return;
      const s = h(this, D).call(this, t);
      this.activeIndex = s ? t : -1, this.updateProperties(), this.setUnactiveAll(), s && (this.setActiveAttributes(t), this.setActiveClasses(t), e && this.focusTab(t)), this.on.tabChange && this.on.tabChange(this);
    });
    i(this, "closeAll", (t = !1) => {
      this.goTo(-1, t);
    });
    i(this, "goToNext", (t = {}) => {
      var s;
      ((t && (s = t.loop) != null ? s : !0) || this.lastIndex && this.activeIndex < this.lastIndex) && this.goTo(this.nextIndex);
    });
    i(this, "goToPrev", (t = {}) => {
      var s;
      ((t && (s = t.loop) != null ? s : !0) || this.activeIndex > 0) && this.goTo(this.prevIndex);
    });
    i(this, "stopAutoPlay", () => {
      clearTimeout(h(this, A));
    });
    i(this, "changeTriggerEvent", (t) => {
      if (y.includes(t))
        this.removeListenersForTabs(), this.triggerEvent = t, this.addListenersForTabs();
      else if (this.devMode)
        throw new Error(`TABS DEV MODE: Icorrect type of event. Correct types are: ${y.join(", ")} | \u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0442\u0438\u043F \u0441\u043E\u0431\u044B\u0442\u0438\u044F. \u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435 \u0442\u0438\u043F\u044B: ${y.join(", ")}`);
    });
    i(this, "runAutoPlay", () => {
      o(this, A, setTimeout(() => {
        this.goTo(this.nextIndex, !1), this.runAutoPlay();
      }, h(this, b).delay));
    });
    i(this, "addListenersForTabs", () => {
      this.tabsWrapper.addEventListener(this.triggerEvent, this.clickHandler), window.addEventListener("keydown", this.keydownHandler);
    });
    i(this, "removeListenersForTabs", () => {
      this.tabsWrapper.removeEventListener(this.triggerEvent, this.clickHandler), window.removeEventListener("keydown", this.keydownHandler);
    });
    i(this, "clickHandler", (t) => {
      if (this.isInMatchMedia) {
        this.stopAutoPlay();
        const { targetIndex: e, targetButton: s } = this.getEventDetails(t);
        e !== void 0 && this.tabs.includes(s) && this.goTo(+e);
      }
    });
    i(this, "keydownHandler", (t) => {
      if (this.isInMatchMedia) {
        const e = this.getEventDetails(t), { targetButton: s, targetIndex: a, key: n } = e;
        if (s && a !== void 0 && this.tabs.includes(s))
          switch (this.stopAutoPlay(), n) {
            case d.LEFT:
            case d.RIGHT: {
              t.preventDefault(), this.orientation === "horizontal" && this.switchTabOnArrowPress(e);
              break;
            }
            case d.UP:
            case d.DOWN: {
              t.preventDefault(), this.orientation === "vertical" && this.switchTabOnArrowPress(e);
              break;
            }
            case d.DELETE: {
              t.preventDefault(), this.deleteTab(e);
              break;
            }
            case d.ENTER: {
              t.preventDefault(), this.goTo(+a);
              break;
            }
            case d.SPACE: {
              t.preventDefault(), s.click();
              break;
            }
            case d.END: {
              t.preventDefault(), this.focusTab(this.lastIndex);
              break;
            }
            case d.HOME: {
              t.preventDefault(), this.focusTab(0);
              break;
            }
          }
      }
    });
    i(this, "setUnactiveAll", () => {
      this.setUnactiveAttributesAll(), [this.tabs, this.panels].flat().forEach((t) => {
        t.classList.remove(r.ACTIVE), t.classList.add(r.UNACTIVE);
      });
    });
    i(this, "setUnactiveAttributesAll", () => {
      this.tabs.forEach((t) => {
        t.setAttribute("tabindex", "-1"), t.setAttribute("aria-selected", "false");
      }), this.panels.forEach((t) => {
        t.setAttribute("inert", "true");
      });
    });
    i(this, "setActiveAttributes", (t) => {
      !this.tabs[t] || !this.panels[t] || (this.tabs[t].setAttribute("tabindex", "0"), this.tabs[t].setAttribute("aria-selected", "true"), this.panels[t].removeAttribute("inert"));
    });
    i(this, "setActiveClasses", (t) => {
      !this.tabs[t] || !this.panels[t] || (this.tabs[t].classList.remove(r.UNACTIVE), this.tabs[t].classList.add(r.ACTIVE), this.panels[t].classList.remove(r.UNACTIVE), this.panels[t].classList.add(r.ACTIVE));
    });
    i(this, "focusTab", (t) => {
      var e;
      (e = this.tabs[t]) == null || e.focus();
    });
    i(this, "switchTabOnArrowPress", (t) => {
      const { key: e, targetIndex: s, event: a } = t;
      switch (a.preventDefault(), e) {
        case d.LEFT:
        case d.UP: {
          if (s !== void 0) {
            const n = s - 1 < 0 ? Number(this.lastIndex) : s - 1;
            this.triggerEvent === "mouseover" ? this.goTo(n) : this.focusTab(n);
          }
          break;
        }
        case d.RIGHT:
        case d.DOWN: {
          if (s !== void 0) {
            const n = s >= Number(this.lastIndex) ? 0 : s + 1;
            this.triggerEvent === "mouseover" ? this.goTo(n) : this.focusTab(n);
          }
          break;
        }
      }
    });
    i(this, "deleteTab", (t) => {
      const { targetButton: e, targetIndex: s } = t;
      if (e.dataset.deletable === "true" && s !== void 0 && (this.tabs[s].remove(), this.panels[s].remove(), this.update(), this.tabs.length > 0 && this.panels.length > 0)) {
        const a = this.tabs.length - 1;
        s < this.activeIndex || this.activeIndex > a ? this.goTo(this.activeIndex - 1) : this.goTo(this.activeIndex);
      }
    });
    i(this, "assignTabsAttributes", () => {
      var t, e;
      this.tabsWrapper.classList.add(r.TABS_WRAPPER), this.tabsWrapper.setAttribute("aria-orientation", this.orientation), (t = this.tabButtonsList) == null || t.classList.add(r.TAB_LIST), (e = this.tabPanelsList) == null || e.classList.add(r.PANEL_LIST), this.panels.forEach((s, a) => {
        this.tabs[a] && (this.tabs[a].classList.add(r.TAB), this.tabs[a].setAttribute("aria-label", `${a}`), this.tabs[a].setAttribute("role", h(this, f).tab), this.tabs[a].setAttribute("id", `${this.generatedId}-tab-${a}`), this.tabs[a].setAttribute("aria-controls", `${this.generatedId}-tabpanel-${a}`), this.tabs[a].dataset.deletable = `${h(this, L)}`), s.classList.add(r.PANEL), s.setAttribute("aria-labelledby", `${this.generatedId}-tab-${a}`), s.setAttribute("id", `${this.generatedId}-tabpanel-${a}`), s.setAttribute("aria-label", `${a}`), s.setAttribute("role", h(this, f).tabpanel);
      }), this.setUnactiveAll();
    });
    i(this, "removeTabsAttributes", () => {
      var t, e;
      this.tabsWrapper.classList.remove(r.TABS_WRAPPER), this.tabsWrapper.removeAttribute("aria-orientation"), (t = this.tabButtonsList) == null || t.classList.remove(r.TAB_LIST), (e = this.tabPanelsList) == null || e.classList.remove(r.PANEL_LIST), this.tabs.forEach((s, a) => {
        if (s.classList.remove(r.TAB), s.classList.remove(r.ACTIVE), s.classList.remove(r.UNACTIVE), s.removeAttribute("tabindex"), s.removeAttribute("aria-label"), s.removeAttribute("aria-selected"), s.removeAttribute("role"), s.removeAttribute("id"), s.removeAttribute("aria-controls"), delete s.dataset.deletable, this.panels[a].classList.remove(r.PANEL), this.panels[a].classList.remove(r.ACTIVE), this.panels[a].classList.remove(r.UNACTIVE), this.panels[a].removeAttribute("aria-labelledby"), this.panels[a].removeAttribute("id"), this.panels[a].removeAttribute("aria-label"), this.panels[a].removeAttribute("role"), this.panels[a].removeAttribute("inert"), h(this, v)) {
          const n = this.panels[a].getAttribute("style");
          if (n) {
            let T = n.split(";").filter((g) => g.trim() !== "");
            T = T.filter((g) => !g.trim().toLowerCase().startsWith("height:"));
            const M = T.join(";");
            this.panels[a].setAttribute("style", M);
          }
          this.panels[a].removeAttribute("style");
        }
      });
    });
    i(this, "getEventDetails", (t) => {
      const e = t instanceof KeyboardEvent ? t.key : void 0, s = t.target, a = s.closest(h(this, w).tab), n = a == null ? void 0 : a.getAttribute("aria-label");
      return {
        target: s,
        targetIndex: n ? +n : void 0,
        targetButton: a,
        key: e,
        event: t
      };
    });
    i(this, "updateProperties", () => {
      this.lastIndex = this.panels.length - 1, this.nextIndex = this.activeIndex >= this.lastIndex ? 0 : this.activeIndex + 1, this.prevIndex = this.activeIndex - 1 < 0 ? this.lastIndex : this.activeIndex - 1;
    });
    i(this, "updateAttributes", () => {
      this.checkMatchMediaRule(), this.isInMatchMedia ? (this.assignTabsAttributes(), this.goTo(this.activeIndex, !1)) : (this.devMode && console.warn(`TABS DEV MODE: Tabs is disabled due to media query not matching. Media query rule used: ${this.matchMediaRule} | \u0422\u0430\u0431\u044B \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u044B \u0438\u0437-\u0437\u0430 \u043D\u0435\u0441\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u044F \u043C\u0435\u0434\u0438\u0430-\u0437\u0430\u043F\u0440\u043E\u0441\u0430. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u043C\u0435\u0434\u0438\u0430-\u0437\u0430\u043F\u0440\u043E\u0441: ${this.matchMediaRule}`), this.removeTabsAttributes());
    });
    i(this, "defineTabsAndPanels", () => {
      this.tabs = P(this.tabButtonsList), this.panels = P(this.tabPanelsList);
    });
    i(this, "checkMatchMediaRule", () => {
      this.isInMatchMedia = !this.matchMediaRule || window.matchMedia(this.matchMediaRule).matches;
    });
    i(this, "update", () => {
      this.checkMatchMediaRule(), this.defineTabsAndPanels(), this.updateAttributes();
    });
    i(this, "destroy", () => {
      this.removeTabsAttributes(), this.removeListenersForTabs(), window.removeEventListener("resize", this.setEqualHeight), window.removeEventListener("resize", this.updateAttributes), this.devMode && console.warn("TABS DEV MODE: Tabs destroyed using the destroy method | \u0422\u0430\u0431\u044B \u0443\u043D\u0438\u0447\u0442\u043E\u0436\u0435\u043D\u044B c \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u043C\u0435\u0442\u043E\u0434\u0430 destroy"), o(this, c, !0);
    });
    o(this, I, s), o(this, m, e), o(this, L, a), this.tabsWrapper = typeof t == "string" ? document.querySelector(t) : t, this.tabButtonsList = void 0, this.tabPanelsList = void 0, this.tabButtonsList = void 0, this.tabs = [], this.panels = [], this.orientation = M === "vertical" ? "vertical" : "horizontal", this.triggerEvent = g, this.activeIndex = n, this.nextIndex = void 0, this.prevIndex = void 0, this.lastIndex = void 0, o(this, b, C), o(this, A, 0), o(this, E, !1), this.on = S, this.matchMediaRule = k, this.isInMatchMedia = !1, this.generatedId = N(), o(this, v, T), o(this, f, {
      tab: "tab",
      tabpanel: "tabpanel"
    }), o(this, w, {
      tab: '[role="tab"]',
      tabpanel: '[role="tabpanel"]'
    }), o(this, c, !1), o(this, p, !1), this.devMode = F, this.init();
  }
}
I = new WeakMap(), m = new WeakMap(), L = new WeakMap(), b = new WeakMap(), A = new WeakMap(), E = new WeakMap(), v = new WeakMap(), c = new WeakMap(), p = new WeakMap(), f = new WeakMap(), w = new WeakMap(), D = new WeakMap();
export {
  H as Tabs
};
