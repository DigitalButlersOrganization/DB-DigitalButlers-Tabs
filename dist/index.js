var S = Object.defineProperty;
var R = (r, t, e) => t in r ? S(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var a = (r, t, e) => (R(r, typeof t != "symbol" ? t + "" : t, e), e), P = (r, t, e) => {
  if (!t.has(r))
    throw TypeError("Cannot " + e);
};
var h = (r, t, e) => (P(r, t, "read from private field"), e ? e.call(r) : t.get(r)), d = (r, t, e) => {
  if (t.has(r))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(r) : t.set(r, e);
}, o = (r, t, e, s) => (P(r, t, "write to private field"), s ? s.call(r, e) : t.set(r, e), e);
const u = {
  ACTIVE: "js--active",
  UNACTIVE: "js--unactive",
  VISIBLE: "js--visible",
  TAB: "js--tab",
  PANEL: "js--panel",
  TABS_WRAPPER: "js--tabs-wrapper",
  TAB_LIST: "js--tab-list",
  PANEL_LIST: "js--panel-list"
}, l = {
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
const D = (r) => r ? Array.prototype.slice.call(r.children) : [], N = (r = 5) => {
  let t = "";
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", s = e.length;
  let i = 0;
  for (; i < r; )
    t += e.charAt(Math.floor(Math.random() * s)), i += 1;
  return t;
};
var c;
(function(r) {
  r.click = "click", r.mouseover = "mouseover";
})(c || (c = {}));
var L, m, w, v, A, p, f, b, I, E, y;
class F {
  constructor(t = '[data-tabs="wrapper"]', { tabbuttonsListSelector: e = '[data-tabs="tabs"]', tabpanelsListSelector: s = '[data-tabs="content"]', deletableTabs: i = !1, initialTab: n = 0, equalHeight: T = !1, orientation: M = "horizontal", triggerEvent: g = c.click, autoplay: B = {
    delay: 0
  }, on: k = {}, matchMediaRule: x, devMode: C = !1 }) {
    d(this, L, void 0);
    d(this, m, void 0);
    a(this, "activeIndex");
    a(this, "nextIndex");
    a(this, "prevIndex");
    a(this, "lastIndex");
    d(this, w, void 0);
    a(this, "orientation");
    a(this, "triggerEvent");
    d(this, v, void 0);
    d(this, A, void 0);
    d(this, p, void 0);
    a(this, "generatedId");
    d(this, f, void 0);
    a(this, "tabsWrapper");
    a(this, "tabButtonsList");
    a(this, "tabPanelsList");
    a(this, "tabs");
    a(this, "panels");
    a(this, "on");
    d(this, b, void 0);
    d(this, I, void 0);
    d(this, E, void 0);
    d(this, y, void 0);
    a(this, "matchMediaRule");
    a(this, "isInMatchMedia");
    a(this, "devMode");
    a(this, "goTo", (t, e = !0) => {
      h(this, I) && (this.activeIndex = t, this.updateProperties(), this.setUnactiveAll(), this.setActiveAttributes(t), this.setActiveClasses(t), e && this.focusTab(t), this.on.tabChange && this.on.tabChange(this));
    });
    a(this, "goToNext", (t = {}) => {
      var s;
      ((t && (s = t.loop) != null ? s : !0) || this.lastIndex && this.activeIndex < this.lastIndex) && this.goTo(this.nextIndex);
    });
    a(this, "goToPrev", (t = {}) => {
      var s;
      ((t && (s = t.loop) != null ? s : !0) || this.activeIndex > 0) && this.goTo(this.prevIndex);
    });
    a(this, "stopAutoPlay", () => {
      clearTimeout(h(this, A));
    });
    a(this, "changeTriggerEvent", (t) => {
      if (t in c)
        this.removeListenersForTabs(), this.triggerEvent = t, this.addListenersForTabs();
      else if (this.devMode)
        throw new Error(`Icorrect type of event. Correct types are: ${Object.values(c).join(", ")} | \u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0442\u0438\u043F \u0441\u043E\u0431\u044B\u0442\u0438\u044F. \u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435 \u0442\u0438\u043F\u044B: ${Object.values(c).join(", ")}`);
    });
    a(this, "clickHandler", (t) => {
      if (this.isInMatchMedia) {
        this.stopAutoPlay();
        const { targetIndex: e, targetButton: s } = this.getEventDetails(t);
        e !== void 0 && this.tabs.includes(s) && this.goTo(+e);
      }
    });
    a(this, "setUnactiveAll", () => {
      this.setUnactiveAttributesAll(), [this.tabs, this.panels].flat().forEach((t) => {
        t.classList.remove(u.ACTIVE), t.classList.add(u.UNACTIVE);
      });
    });
    a(this, "setUnactiveAttributesAll", () => {
      this.tabs.forEach((t) => {
        t.setAttribute("tabindex", "-1"), t.setAttribute("aria-selected", "false");
      }), this.panels.forEach((t) => {
        t.setAttribute("inert", "true");
      });
    });
    a(this, "setActiveAttributes", (t) => {
      var e, s;
      (e = this.tabs[t]) == null || e.setAttribute("tabindex", "0"), (s = this.tabs[t]) == null || s.setAttribute("aria-selected", "true"), this.panels[t].removeAttribute("inert");
    });
    a(this, "setActiveClasses", (t) => {
      var e, s;
      (e = this.tabs[t]) == null || e.classList.remove(u.UNACTIVE), (s = this.tabs[t]) == null || s.classList.add(u.ACTIVE), this.panels[t].classList.remove(u.UNACTIVE), this.panels[t].classList.add(u.ACTIVE);
    });
    a(this, "focusTab", (t) => {
      var e;
      (e = this.tabs[t]) == null || e.focus();
    });
    a(this, "updateAttributes", () => {
      this.checkMatchMediaRule(), this.isInMatchMedia ? (this.assignTabsAttributes(), this.goTo(this.activeIndex, !1)) : this.removeTabsAttributes();
    });
    a(this, "checkMatchMediaRule", () => {
      this.isInMatchMedia = !this.matchMediaRule || window.matchMedia(this.matchMediaRule).matches;
    });
    a(this, "update", () => {
      this.checkMatchMediaRule(), this.defineTabsAndPanels(), this.updateAttributes();
    });
    a(this, "destroy", () => {
      this.removeTabsAttributes(), this.removeListenersForTabs(), window.removeEventListener("resize", this.setEqualHeight), o(this, b, !0);
    });
    o(this, L, s), o(this, m, e), o(this, w, i), this.tabsWrapper = typeof t == "string" ? document.querySelector(t) : t, this.tabButtonsList = void 0, this.tabPanelsList = void 0, this.tabButtonsList = void 0, this.tabs = [], this.panels = [], this.orientation = M === "vertical" ? "vertical" : "horizontal", this.triggerEvent = g, this.activeIndex = n, this.nextIndex = void 0, this.prevIndex = void 0, this.lastIndex = void 0, o(this, v, B), o(this, A, 0), o(this, p, !1), this.on = k, this.matchMediaRule = x, this.isInMatchMedia = !1, this.generatedId = N(), o(this, f, T), o(this, E, {
      tab: "tab",
      tabpanel: "tabpanel"
    }), o(this, y, {
      tab: '[role="tab"]',
      tabpanel: '[role="tabpanel"]'
    }), o(this, b, !1), o(this, I, !1), this.devMode = C, this.init();
  }
  init() {
    if (this.devMode && console.warn(`Tabs dev mode enabled! Instance ID: ${this.generatedId}. Read the docs https://www.npmjs.com/package/@digital-butlers/tabs | \u0412 \u0442\u0430\u0431\u0430\u0445 \u0432\u043A\u043B\u044E\u0447\u0435\u043D \u0440\u0435\u0436\u0438\u043C \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430! ID \u044D\u043A\u0437\u0435\u043C\u043F\u043B\u044F\u0440\u0430: ${this.generatedId}. \u0427\u0438\u0442\u0430\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044E https://www.npmjs.com/package/@digital-butlers/tabs`), this.tabsWrapper && !h(this, b)) {
      if (this.on.beforeInit && this.on.beforeInit(this), this.tabButtonsList = this.tabsWrapper.querySelector(h(this, m)), this.tabPanelsList = this.tabsWrapper.querySelector(h(this, L)), this.tabPanelsList)
        this.defineTabsAndPanels(), this.panels.length > 0 && (this.checkMatchMediaRule(), window.addEventListener("resize", this.updateAttributes), this.updateAttributes(), h(this, f) && (this.setEqualHeight(), window.addEventListener("resize", this.setEqualHeight)), h(this, p) || (this.addListenersForTabs(), o(this, p, !0)), h(this, v).delay > 0 && this.isInMatchMedia && this.runAutoPlay());
      else if (this.devMode)
        throw new Error("Panels not found | \u041F\u0430\u043D\u0435\u043B\u0438 \u043D\u0435 \u043D\u0430\u0438\u0306\u0434\u0435\u043D\u044B \u0441 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u043E\u043C \u0434\u043B\u044F \u0442\u0430\u0431\u043E\u0432 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B");
      o(this, I, !0), this.isInMatchMedia ? (this.assignTabsAttributes(), this.goTo(this.activeIndex, !1)) : this.removeTabsAttributes(), this.on.afterInit && this.on.afterInit(this);
    } else if (this.tabsWrapper) {
      if (h(this, b) && this.devMode)
        throw new Error("Tabs already destroyed | \u0422\u0430\u0431\u044B \u0443\u0436\u0435 \u0431\u044B\u043B\u0438 \u0434\u0435\u0441\u0442\u0440\u043E\u0435\u043D\u044B");
    } else if (this.devMode)
      throw new Error("Tabs wrapper not found | \u041E\u0431\u0435\u0440\u0442\u043A\u0430 \u0442\u0430\u0431\u043E\u0432 \u043D\u0435 \u043D\u0430\u0438\u0306\u0434\u0435\u043D\u0430");
  }
  setEqualHeight() {
    if (this.isInMatchMedia) {
      this.panels.forEach((e) => {
        e.style.height = "auto";
      });
      const t = Math.max(...this.panels.map((e) => e.offsetHeight));
      this.panels.forEach((e) => {
        e.style.height = `${t}px`;
      });
    }
  }
  runAutoPlay() {
    o(this, A, setTimeout(() => {
      this.goTo(this.nextIndex, !1), this.runAutoPlay();
    }, h(this, v).delay));
  }
  addListenersForTabs() {
    this.tabsWrapper.addEventListener(this.triggerEvent, this.clickHandler), window.addEventListener("keydown", this.keydownHandler);
  }
  removeListenersForTabs() {
    this.tabsWrapper.removeEventListener(this.triggerEvent, this.clickHandler), window.removeEventListener("keydown", this.keydownHandler);
  }
  keydownHandler(t) {
    if (this.isInMatchMedia) {
      const e = this.getEventDetails(t), { targetButton: s, targetIndex: i, key: n } = e;
      if (s && i !== void 0 && this.tabs.includes(s))
        switch (this.stopAutoPlay(), n) {
          case l.LEFT:
          case l.RIGHT: {
            t.preventDefault(), this.orientation === "horizontal" && this.switchTabOnArrowPress(e);
            break;
          }
          case l.UP:
          case l.DOWN: {
            t.preventDefault(), this.orientation === "vertical" && this.switchTabOnArrowPress(e);
            break;
          }
          case l.DELETE: {
            t.preventDefault(), this.deleteTab(e);
            break;
          }
          case l.ENTER: {
            t.preventDefault(), this.goTo(+i);
            break;
          }
          case l.SPACE: {
            t.preventDefault(), s.click();
            break;
          }
          case l.END: {
            t.preventDefault(), this.focusTab(this.lastIndex);
            break;
          }
          case l.HOME: {
            t.preventDefault(), this.focusTab(0);
            break;
          }
        }
    }
  }
  switchTabOnArrowPress(t) {
    const { key: e, targetIndex: s, event: i } = t;
    switch (i.preventDefault(), e) {
      case l.LEFT:
      case l.UP: {
        if (s !== void 0) {
          const n = s - 1 < 0 ? Number(this.lastIndex) : s - 1;
          this.triggerEvent === c.mouseover ? this.goTo(n) : this.focusTab(n);
        }
        break;
      }
      case l.RIGHT:
      case l.DOWN: {
        if (s !== void 0) {
          const n = s >= Number(this.lastIndex) ? 0 : s + 1;
          this.triggerEvent === c.mouseover ? this.goTo(n) : this.focusTab(n);
        }
        break;
      }
    }
  }
  deleteTab(t) {
    const { targetButton: e, targetIndex: s } = t;
    if (e.dataset.deletable === "true" && s !== void 0 && (this.tabs[s].remove(), this.panels[s].remove(), this.update(), this.tabs.length > 0 && this.panels.length > 0)) {
      const i = this.tabs.length - 1;
      s < this.activeIndex || this.activeIndex > i ? this.goTo(this.activeIndex - 1) : this.goTo(this.activeIndex);
    }
  }
  assignTabsAttributes() {
    var t, e;
    this.tabsWrapper.classList.add(u.TABS_WRAPPER), this.tabsWrapper.setAttribute("aria-orientation", this.orientation), (t = this.tabButtonsList) == null || t.classList.add(u.TAB_LIST), (e = this.tabPanelsList) == null || e.classList.add(u.PANEL_LIST), this.panels.forEach((s, i) => {
      this.tabs[i] && (this.tabs[i].classList.add(u.TAB), this.tabs[i].setAttribute("aria-label", `${i}`), this.tabs[i].setAttribute("role", h(this, E).tab), this.tabs[i].setAttribute("id", `${this.generatedId}-tab-${i}`), this.tabs[i].setAttribute("aria-controls", `${this.generatedId}-tabpanel-${i}`), this.tabs[i].dataset.deletable = `${h(this, w)}`), s.classList.add(u.PANEL), s.setAttribute("aria-labelledby", `${this.generatedId}-tab-${i}`), s.setAttribute("id", `${this.generatedId}-tabpanel-${i}`), s.setAttribute("aria-label", `${i}`), s.setAttribute("role", h(this, E).tabpanel);
    }), this.setUnactiveAll();
  }
  removeTabsAttributes() {
    var t, e;
    this.tabsWrapper.classList.remove(u.TABS_WRAPPER), this.tabsWrapper.removeAttribute("aria-orientation"), (t = this.tabButtonsList) == null || t.classList.remove(u.TAB_LIST), (e = this.tabPanelsList) == null || e.classList.remove(u.PANEL_LIST), this.tabs.forEach((s, i) => {
      if (s.classList.remove(u.TAB), s.classList.remove(u.ACTIVE), s.classList.remove(u.UNACTIVE), s.removeAttribute("tabindex"), s.removeAttribute("aria-label"), s.removeAttribute("aria-selected"), s.removeAttribute("role"), s.removeAttribute("id"), s.removeAttribute("aria-controls"), delete s.dataset.deletable, this.panels[i].classList.remove(u.PANEL), this.panels[i].classList.remove(u.ACTIVE), this.panels[i].classList.remove(u.UNACTIVE), this.panels[i].removeAttribute("aria-labelledby"), this.panels[i].removeAttribute("id"), this.panels[i].removeAttribute("aria-label"), this.panels[i].removeAttribute("role"), this.panels[i].removeAttribute("inert"), h(this, f)) {
        const n = this.panels[i].getAttribute("style");
        if (n) {
          let T = n.split(";").filter((g) => g.trim() !== "");
          T = T.filter((g) => !g.trim().toLowerCase().startsWith("height:"));
          const M = T.join(";");
          this.panels[i].setAttribute("style", M);
        }
        this.panels[i].removeAttribute("style");
      }
    });
  }
  getEventDetails(t) {
    const e = t instanceof KeyboardEvent ? t.key : void 0, s = t.target, i = s.closest(h(this, y).tab), n = i == null ? void 0 : i.getAttribute("aria-label");
    return {
      target: s,
      targetIndex: n ? +n : void 0,
      targetButton: i,
      key: e,
      event: t
    };
  }
  updateProperties() {
    this.lastIndex = this.panels.length - 1, this.nextIndex = this.activeIndex >= this.lastIndex ? 0 : this.activeIndex + 1, this.prevIndex = this.activeIndex - 1 < 0 ? this.lastIndex : this.activeIndex - 1;
  }
  defineTabsAndPanels() {
    this.tabs = D(this.tabButtonsList), this.panels = D(this.tabPanelsList);
  }
}
L = new WeakMap(), m = new WeakMap(), w = new WeakMap(), v = new WeakMap(), A = new WeakMap(), p = new WeakMap(), f = new WeakMap(), b = new WeakMap(), I = new WeakMap(), E = new WeakMap(), y = new WeakMap();
export {
  F as Tabs
};
