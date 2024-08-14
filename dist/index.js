var S = Object.defineProperty;
var N = (u, t, e) => t in u ? S(u, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : u[t] = e;
var i = (u, t, e) => (N(u, typeof t != "symbol" ? t + "" : t, e), e), w = (u, t, e) => {
  if (!t.has(u))
    throw TypeError("Cannot " + e);
};
var n = (u, t, e) => (w(u, t, "read from private field"), e ? e.call(u) : t.get(u)), d = (u, t, e) => {
  if (t.has(u))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(u) : t.set(u, e);
}, h = (u, t, e, s) => (w(u, t, "write to private field"), s ? s.call(u, e) : t.set(u, e), e);
const r = {
  ACTIVE: "js--active",
  UNACTIVE: "js--unactive",
  VISIBLE: "js--visible",
  TAB: "js--tab",
  PANEL: "js--panel",
  TABS_WRAPPER: "js--tabs-wrapper",
  TAB_LIST: "js--tab-list",
  PANEL_LIST: "js--panel-list"
}, o = {
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
const B = (u) => u ? Array.prototype.slice.call(u.children) : [], R = (u = 5) => {
  let t = "";
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", s = e.length;
  let a = 0;
  for (; a < u; )
    t += e.charAt(Math.floor(Math.random() * s)), a += 1;
  return t;
};
var c;
(function(u) {
  u.click = "click", u.mouseover = "mouseover";
})(c || (c = {}));
var g, f, I, v, A, p, L, b, E, T, m;
class $ {
  constructor(t = '[data-tabs="wrapper"]', { tabbuttonsListSelector: e = '[data-tabs="tabs"]', tabpanelsListSelector: s = '[data-tabs="content"]', deletableTabs: a = !1, initialTab: l = 0, equalHeight: D = !1, orientation: M = "horizontal", triggerEvent: y = c.click, autoplay: P = {
    delay: 0
  }, on: k = {}, matchMediaRule: x, devMode: C = !1 }) {
    d(this, g, void 0);
    d(this, f, void 0);
    i(this, "activeIndex");
    i(this, "nextIndex");
    i(this, "prevIndex");
    i(this, "lastIndex");
    d(this, I, void 0);
    i(this, "orientation");
    i(this, "triggerEvent");
    d(this, v, void 0);
    d(this, A, void 0);
    d(this, p, void 0);
    i(this, "generatedId");
    d(this, L, void 0);
    i(this, "tabsWrapper");
    i(this, "tabButtonsList");
    i(this, "tabPanelsList");
    i(this, "tabs");
    i(this, "panels");
    i(this, "on");
    d(this, b, void 0);
    d(this, E, void 0);
    d(this, T, void 0);
    d(this, m, void 0);
    i(this, "matchMediaRule");
    i(this, "isInMatchMedia");
    i(this, "devMode");
    i(this, "setEqualHeight", () => {
      this.panels.forEach((e) => {
        e.style.height = "auto";
      });
      const t = Math.max(...this.panels.map((e) => e.offsetHeight));
      this.panels.forEach((e) => {
        e.style.height = `${t}px`;
      });
    });
    i(this, "goTo", (t, e = !0) => {
      n(this, E) && (this.activeIndex = t, this.updateProperties(), this.setUnactiveAll(), this.setActiveAttributes(t), this.setActiveClasses(t), e && this.focusTab(t), this.on.tabChange && this.on.tabChange(this));
    });
    i(this, "goToNext", () => {
      this.goTo(this.nextIndex);
    });
    i(this, "goToPrev", () => {
      this.goTo(this.prevIndex);
    });
    i(this, "stopAutoPlay", () => {
      clearTimeout(n(this, A));
    });
    i(this, "changeTriggerEvent", (t) => {
      if (t in c)
        this.removeListenersForTabs(), this.triggerEvent = t, this.addListenersForTabs();
      else if (this.devMode)
        throw new Error(`Icorrect type of event. Correct types are: ${Object.values(c).join(", ")} | \u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0442\u0438\u043F \u0441\u043E\u0431\u044B\u0442\u0438\u044F. \u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435 \u0442\u0438\u043F\u044B: ${Object.values(c).join(", ")}`);
    });
    i(this, "runAutoPlay", () => {
      h(this, A, setTimeout(() => {
        this.goTo(this.nextIndex, !1), this.runAutoPlay();
      }, n(this, v).delay));
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
        const e = this.getEventDetails(t), { targetButton: s, targetIndex: a, key: l } = e;
        if (s && a !== void 0 && this.tabs.includes(s))
          switch (this.stopAutoPlay(), l) {
            case o.LEFT:
            case o.RIGHT: {
              t.preventDefault(), this.orientation === "horizontal" && this.switchTabOnArrowPress(e);
              break;
            }
            case o.UP:
            case o.DOWN: {
              t.preventDefault(), this.orientation === "vertical" && this.switchTabOnArrowPress(e);
              break;
            }
            case o.DELETE: {
              t.preventDefault(), this.deleteTab(e);
              break;
            }
            case o.ENTER: {
              t.preventDefault(), this.goTo(+a);
              break;
            }
            case o.SPACE: {
              t.preventDefault(), s.click();
              break;
            }
            case o.END: {
              t.preventDefault(), this.focusTab(this.lastIndex);
              break;
            }
            case o.HOME: {
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
      this.tabs[t].setAttribute("tabindex", "0"), this.tabs[t].setAttribute("aria-selected", "true"), this.panels[t].removeAttribute("inert");
    });
    i(this, "setActiveClasses", (t) => {
      this.tabs[t].classList.remove(r.UNACTIVE), this.tabs[t].classList.add(r.ACTIVE), this.panels[t].classList.remove(r.UNACTIVE), this.panels[t].classList.add(r.ACTIVE);
    });
    i(this, "focusTab", (t) => {
      this.tabs[t].focus();
    });
    i(this, "switchTabOnArrowPress", (t) => {
      const { key: e, targetIndex: s, event: a } = t;
      switch (a.preventDefault(), e) {
        case o.LEFT:
        case o.UP: {
          if (s !== void 0) {
            const l = s - 1 < 0 ? Number(this.lastIndex) : s - 1;
            this.triggerEvent === c.mouseover ? this.goTo(l) : this.focusTab(l);
          }
          break;
        }
        case o.RIGHT:
        case o.DOWN: {
          if (s !== void 0) {
            const l = s >= Number(this.lastIndex) ? 0 : s + 1;
            this.triggerEvent === c.mouseover ? this.goTo(l) : this.focusTab(l);
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
      this.tabsWrapper.classList.add(r.TABS_WRAPPER), this.tabsWrapper.setAttribute("aria-orientation", this.orientation), (t = this.tabButtonsList) == null || t.classList.add(r.TAB_LIST), (e = this.tabPanelsList) == null || e.classList.add(r.PANEL_LIST), this.tabs.forEach((s, a) => {
        s.classList.add(r.TAB), s.setAttribute("aria-label", `${a}`), s.setAttribute("role", n(this, T).tab), s.setAttribute("id", `${this.generatedId}-tab-${a}`), s.setAttribute("aria-controls", `${this.generatedId}-tabpanel-${a}`), s.dataset.deletable = `${n(this, I)}`, this.panels[a].classList.add(r.PANEL), this.panels[a].setAttribute("aria-labelledby", `${this.generatedId}-tab-${a}`), this.panels[a].setAttribute("id", `${this.generatedId}-tabpanel-${a}`), this.panels[a].setAttribute("aria-label", `${a}`), this.panels[a].setAttribute("role", n(this, T).tabpanel);
      }), this.setUnactiveAll();
    });
    i(this, "removeTabsAttributes", () => {
      var t, e;
      this.tabsWrapper.classList.remove(r.TABS_WRAPPER), this.tabsWrapper.removeAttribute("aria-orientation"), (t = this.tabButtonsList) == null || t.classList.remove(r.TAB_LIST), (e = this.tabPanelsList) == null || e.classList.remove(r.PANEL_LIST), this.tabs.forEach((s, a) => {
        s.classList.remove(r.TAB), s.classList.remove(r.ACTIVE), s.classList.remove(r.UNACTIVE), s.removeAttribute("tabindex"), s.removeAttribute("aria-label"), s.removeAttribute("aria-selected"), s.removeAttribute("role"), s.removeAttribute("id"), s.removeAttribute("aria-controls"), delete s.dataset.deletable, this.panels[a].classList.remove(r.PANEL), this.panels[a].classList.remove(r.ACTIVE), this.panels[a].classList.remove(r.UNACTIVE), this.panels[a].removeAttribute("aria-labelledby"), this.panels[a].removeAttribute("id"), this.panels[a].removeAttribute("aria-label"), this.panels[a].removeAttribute("role"), this.panels[a].removeAttribute("inert");
      });
    });
    i(this, "getEventDetails", (t) => {
      const e = t instanceof KeyboardEvent ? t.key : void 0, s = t.target, a = s.closest(n(this, m).tab), l = a == null ? void 0 : a.getAttribute("aria-label");
      return {
        target: s,
        targetIndex: l ? +l : void 0,
        targetButton: a,
        key: e,
        event: t
      };
    });
    i(this, "updateProperties", () => {
      this.lastIndex = this.tabs.length - 1, this.nextIndex = this.activeIndex >= this.lastIndex ? 0 : this.activeIndex + 1, this.prevIndex = this.activeIndex - 1 < 0 ? this.lastIndex : this.activeIndex - 1;
    });
    i(this, "updateAttributes", () => {
      this.isInMatchMedia ? (this.assignTabsAttributes(), this.goTo(this.activeIndex, !1)) : this.removeTabsAttributes();
    });
    i(this, "defineTabsAndPanels", () => {
      this.tabs = B(this.tabButtonsList), this.panels = B(this.tabPanelsList);
    });
    i(this, "checkMatchMediaRule", () => {
      this.isInMatchMedia = !this.matchMediaRule || window.matchMedia(this.matchMediaRule).matches;
    });
    i(this, "update", () => {
      this.checkMatchMediaRule(), this.defineTabsAndPanels(), this.updateAttributes();
    });
    i(this, "destroy", () => {
      this.removeTabsAttributes(), this.removeListenersForTabs(), window.removeEventListener("resize", this.setEqualHeight), h(this, b, !0);
    });
    h(this, g, s), h(this, f, e), h(this, I, a), this.tabsWrapper = typeof t == "string" ? document.querySelector(t) : t, this.tabButtonsList = void 0, this.tabPanelsList = void 0, this.tabButtonsList = void 0, this.tabs = [], this.panels = [], this.orientation = M === "vertical" ? "vertical" : "horizontal", this.triggerEvent = y, this.activeIndex = l, this.nextIndex = void 0, this.prevIndex = void 0, this.lastIndex = void 0, h(this, v, P), h(this, A, 0), h(this, p, !1), this.on = k, this.matchMediaRule = x, this.isInMatchMedia = !1, this.generatedId = R(), h(this, L, D), h(this, T, {
      tab: "tab",
      tabpanel: "tabpanel"
    }), h(this, m, {
      tab: '[role="tab"]',
      tabpanel: '[role="tabpanel"]'
    }), h(this, b, !1), h(this, E, !1), this.devMode = C, this.init();
  }
  init() {
    if (this.devMode && console.warn(`Tabs dev mode enabled! Instance ID: ${this.generatedId} | \u0412 \u0442\u0430\u0431\u0430\u0445 \u0432\u043A\u043B\u044E\u0447\u0435\u043D \u0440\u0435\u0436\u0438\u043C \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430! ID \u044D\u043A\u0437\u0435\u043C\u043F\u043B\u044F\u0440\u0430: ${this.generatedId}`), this.tabsWrapper && !n(this, b)) {
      if (this.on.beforeInit && this.on.beforeInit(this), this.tabButtonsList = this.tabsWrapper.querySelector(n(this, f)), this.tabPanelsList = this.tabsWrapper.querySelector(n(this, g)), this.tabButtonsList && this.tabPanelsList) {
        if (this.defineTabsAndPanels(), this.tabs.length > 0 && this.tabs.length === this.panels.length)
          this.checkMatchMediaRule(), window.addEventListener("resize", this.updateAttributes), this.updateAttributes(), n(this, L) && (this.setEqualHeight(), window.addEventListener("resize", this.setEqualHeight)), n(this, p) || (this.addListenersForTabs(), h(this, p, !0)), n(this, v).delay > 0 && this.isInMatchMedia && this.runAutoPlay();
        else if (this.devMode)
          throw new Error(`Tabs and panels should have the length > 0. And their lengths should be equal. Tabs number is: ${this.tabs.length}, panels number is: ${this.panels.length} | \u0422\u0430\u0431\u044B \u0438 \u043F\u0430\u043D\u0435\u043B\u0438 \u0434\u043E\u043B\u0436\u043D\u044B \u0438\u043C\u0435\u0442\u044C \u0440\u0430\u0432\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432. \u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u0430\u0431\u043E\u0432: ${this.tabs.length}, \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u0430\u043D\u0435\u043B\u0435\u0438\u0306: ${this.panels.length}`);
      } else if (this.devMode)
        throw new Error("Tabs or panels not found | \u0422\u0430\u0431\u044B \u0438\u043B\u0438 \u043F\u0430\u043D\u0435\u043B\u0438 \u043D\u0435 \u043D\u0430\u0438\u0306\u0434\u0435\u043D\u044B");
      h(this, E, !0), this.isInMatchMedia ? (this.assignTabsAttributes(), this.goTo(this.activeIndex, !1)) : this.removeTabsAttributes(), this.on.afterInit && this.on.afterInit(this);
    } else if (this.tabsWrapper) {
      if (n(this, b) && this.devMode)
        throw new Error("Tabs already destroyed | \u0422\u0430\u0431\u044B \u0443\u0436\u0435 \u0431\u044B\u043B\u0438 \u0434\u0435\u0441\u0442\u0440\u043E\u0435\u043D\u044B");
    } else if (this.devMode)
      throw new Error("Tabs wrapper not found | \u041E\u0431\u0435\u0440\u0442\u043A\u0430 \u0442\u0430\u0431\u043E\u0432 \u043D\u0435 \u043D\u0430\u0438\u0306\u0434\u0435\u043D\u0430");
  }
}
g = new WeakMap(), f = new WeakMap(), I = new WeakMap(), v = new WeakMap(), A = new WeakMap(), p = new WeakMap(), L = new WeakMap(), b = new WeakMap(), E = new WeakMap(), T = new WeakMap(), m = new WeakMap();
export {
  $ as Tabs
};
//# sourceMappingURL=index.js.map
