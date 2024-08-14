var C = Object.defineProperty;
var D = (r, t, e) => t in r ? C(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var i = (r, t, e) => (D(r, typeof t != "symbol" ? t + "" : t, e), e), w = (r, t, e) => {
  if (!t.has(r))
    throw TypeError("Cannot " + e);
};
var o = (r, t, e) => (w(r, t, "read from private field"), e ? e.call(r) : t.get(r)), c = (r, t, e) => {
  if (t.has(r))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(r) : t.set(r, e);
}, n = (r, t, e, s) => (w(r, t, "write to private field"), s ? s.call(r, e) : t.set(r, e), e);
const h = {
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
const M = (r) => r ? Array.prototype.slice.call(r.children) : [], R = (r = 5) => {
  let t = "";
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", s = e.length;
  let a = 0;
  for (; a < r; )
    t += e.charAt(Math.floor(Math.random() * s)), a += 1;
  return t;
};
var b;
(function(r) {
  r.click = "click", r.mouseover = "mouseover";
})(b || (b = {}));
var I, g, E, v, A, p, L, u, T, f, m;
class $ {
  constructor(t = '[data-tabs="wrapper"]', { tabbuttonsListSelector: e = '[data-tabs="tabs"]', tabpanelsListSelector: s = '[data-tabs="content"]', deletableTabs: a = !1, initialTab: d = 0, equalHeight: P = !1, orientation: y = "horizontal", triggerEvent: x = b.click, autoplay: k = {
    delay: 0
  }, on: B = {}, matchMediaRule: N, devMode: S = !1 }) {
    c(this, I, void 0);
    c(this, g, void 0);
    i(this, "activeIndex");
    i(this, "nextIndex");
    i(this, "prevIndex");
    i(this, "lastIndex");
    c(this, E, void 0);
    i(this, "orientation");
    i(this, "triggerEvent");
    c(this, v, void 0);
    c(this, A, void 0);
    c(this, p, void 0);
    i(this, "generatedId");
    c(this, L, void 0);
    i(this, "tabsWrapper");
    i(this, "tabButtonsList");
    i(this, "tabPanelsList");
    i(this, "tabs");
    i(this, "panels");
    i(this, "on");
    c(this, u, void 0);
    c(this, T, void 0);
    c(this, f, void 0);
    c(this, m, void 0);
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
      o(this, T) && (this.activeIndex = t, this.updateProperties(), this.setUnactiveAll(), this.setActiveAttributes(t), this.setActiveClasses(t), e && this.focusTab(t), this.on.tabChange && this.on.tabChange(this), this.devMode && console.log(`Active tab: ${this.activeIndex}. Next tab: ${this.nextIndex}. Previous tab: ${this.prevIndex}. Last tab: ${this.lastIndex}. Id: ${this.generatedId}`));
    });
    i(this, "goToNext", () => {
      this.goTo(this.nextIndex);
    });
    i(this, "goToPrev", () => {
      this.goTo(this.prevIndex);
    });
    i(this, "stopAutoPlay", () => {
      clearTimeout(o(this, A));
    });
    i(this, "changeTriggerEvent", (t) => {
      t in b ? (this.removeListenersForTabs(), this.triggerEvent = t, this.addListenersForTabs()) : this.devMode && console.error(`Icorrect type of event. Correct types are: ${Object.values(b).join(", ")}`);
    });
    i(this, "runAutoPlay", () => {
      n(this, A, setTimeout(() => {
        this.goTo(this.nextIndex, !1), this.runAutoPlay();
      }, o(this, v).delay));
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
        const e = this.getEventDetails(t), { targetButton: s, targetIndex: a, key: d } = e;
        if (s && a !== void 0 && this.tabs.includes(s))
          switch (this.stopAutoPlay(), d) {
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
              t.preventDefault(), this.goTo(+a);
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
    });
    i(this, "setUnactiveAll", () => {
      this.setUnactiveAttributesAll(), [this.tabs, this.panels].flat().forEach((t) => {
        t.classList.remove(h.ACTIVE), t.classList.add(h.UNACTIVE);
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
      this.tabs[t].classList.remove(h.UNACTIVE), this.tabs[t].classList.add(h.ACTIVE), this.panels[t].classList.remove(h.UNACTIVE), this.panels[t].classList.add(h.ACTIVE);
    });
    i(this, "focusTab", (t) => {
      this.tabs[t].focus();
    });
    i(this, "switchTabOnArrowPress", (t) => {
      const { key: e, targetIndex: s, event: a } = t;
      switch (a.preventDefault(), e) {
        case l.LEFT:
        case l.UP: {
          if (s !== void 0) {
            const d = s - 1 < 0 ? Number(this.lastIndex) : s - 1;
            this.triggerEvent === b.mouseover ? this.goTo(d) : this.focusTab(d);
          }
          break;
        }
        case l.RIGHT:
        case l.DOWN: {
          if (s !== void 0) {
            const d = s >= Number(this.lastIndex) ? 0 : s + 1;
            this.triggerEvent === b.mouseover ? this.goTo(d) : this.focusTab(d);
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
      this.tabsWrapper.classList.add(h.TABS_WRAPPER), this.tabsWrapper.setAttribute("aria-orientation", this.orientation), (t = this.tabButtonsList) == null || t.classList.add(h.TAB_LIST), (e = this.tabPanelsList) == null || e.classList.add(h.PANEL_LIST), this.tabs.forEach((s, a) => {
        s.classList.add(h.TAB), s.setAttribute("aria-label", `${a}`), s.setAttribute("role", o(this, f).tab), s.setAttribute("id", `${this.generatedId}-tab-${a}`), s.setAttribute("aria-controls", `${this.generatedId}-tabpanel-${a}`), s.dataset.deletable = `${o(this, E)}`, this.panels[a].classList.add(h.PANEL), this.panels[a].setAttribute("aria-labelledby", `${this.generatedId}-tab-${a}`), this.panels[a].setAttribute("id", `${this.generatedId}-tabpanel-${a}`), this.panels[a].setAttribute("aria-label", `${a}`), this.panels[a].setAttribute("role", o(this, f).tabpanel);
      }), this.setUnactiveAll();
    });
    i(this, "removeTabsAttributes", () => {
      var t, e;
      this.tabsWrapper.classList.remove(h.TABS_WRAPPER), this.tabsWrapper.removeAttribute("aria-orientation"), (t = this.tabButtonsList) == null || t.classList.remove(h.TAB_LIST), (e = this.tabPanelsList) == null || e.classList.remove(h.PANEL_LIST), this.tabs.forEach((s, a) => {
        s.classList.remove(h.TAB), s.classList.remove(h.ACTIVE), s.classList.remove(h.UNACTIVE), s.removeAttribute("tabindex"), s.removeAttribute("aria-label"), s.removeAttribute("aria-selected"), s.removeAttribute("role"), s.removeAttribute("id"), s.removeAttribute("aria-controls"), delete s.dataset.deletable, this.panels[a].classList.remove(h.PANEL), this.panels[a].classList.remove(h.ACTIVE), this.panels[a].classList.remove(h.UNACTIVE), this.panels[a].removeAttribute("aria-labelledby"), this.panels[a].removeAttribute("id"), this.panels[a].removeAttribute("aria-label"), this.panels[a].removeAttribute("role"), this.panels[a].removeAttribute("inert");
      });
    });
    i(this, "getEventDetails", (t) => {
      const e = t instanceof KeyboardEvent ? t.key : void 0, s = t.target, a = s.closest(o(this, m).tab), d = a == null ? void 0 : a.getAttribute("aria-label");
      return {
        target: s,
        targetIndex: d ? +d : void 0,
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
      this.tabs = M(this.tabButtonsList), this.panels = M(this.tabPanelsList);
    });
    i(this, "checkMatchMediaRule", () => {
      this.isInMatchMedia = !this.matchMediaRule || window.matchMedia(this.matchMediaRule).matches;
    });
    i(this, "update", () => {
      this.checkMatchMediaRule(), this.defineTabsAndPanels(), this.updateAttributes();
    });
    i(this, "destroy", () => {
      this.removeTabsAttributes(), this.removeListenersForTabs(), window.removeEventListener("resize", this.setEqualHeight), n(this, u, !0);
    });
    n(this, I, s), n(this, g, e), n(this, E, a), this.tabsWrapper = typeof t == "string" ? document.querySelector(t) : t, this.tabButtonsList = void 0, this.tabPanelsList = void 0, this.tabButtonsList = void 0, this.tabs = [], this.panels = [], this.orientation = y === "vertical" ? "vertical" : "horizontal", this.triggerEvent = x, this.activeIndex = d, this.nextIndex = void 0, this.prevIndex = void 0, this.lastIndex = void 0, n(this, v, k), n(this, A, 0), n(this, p, !1), this.on = B, this.matchMediaRule = N, this.isInMatchMedia = !1, this.generatedId = R(), n(this, L, P), n(this, f, {
      tab: "tab",
      tabpanel: "tabpanel"
    }), n(this, m, {
      tab: '[role="tab"]',
      tabpanel: '[role="tabpanel"]'
    }), n(this, u, !1), n(this, T, !1), this.devMode = S, this.init();
  }
  init() {
    if (this.tabsWrapper && !o(this, u)) {
      if (this.on.beforeInit && this.on.beforeInit(this), this.tabButtonsList = this.tabsWrapper.querySelector(o(this, g)), this.tabPanelsList = this.tabsWrapper.querySelector(o(this, I)), this.tabButtonsList && this.tabPanelsList) {
        if (this.defineTabsAndPanels(), this.tabs.length > 0 && this.tabs.length === this.panels.length)
          this.checkMatchMediaRule(), window.addEventListener("resize", this.updateAttributes), this.updateAttributes(), o(this, L) && (this.setEqualHeight(), window.addEventListener("resize", this.setEqualHeight)), o(this, p) || (this.addListenersForTabs(), n(this, p, !0)), o(this, v).delay > 0 && this.isInMatchMedia && this.runAutoPlay();
        else if (this.devMode)
          throw new Error(`Tabs and panels should have the length > 0. And their lengths should be equal. Tabs number is: ${this.tabs.length}, panels number is: ${this.panels.length}`);
      } else if (this.devMode)
        throw new Error("Tabs or panels not found");
      n(this, T, !0), this.isInMatchMedia ? (this.assignTabsAttributes(), this.goTo(this.activeIndex, !1)) : this.removeTabsAttributes(), this.on.afterInit && this.on.afterInit(this);
    } else if (this.tabsWrapper) {
      if (o(this, u) && this.devMode)
        throw new Error("Tabs already destroyed");
    } else if (this.devMode)
      throw new Error("Tabs wrapper not found");
  }
}
I = new WeakMap(), g = new WeakMap(), E = new WeakMap(), v = new WeakMap(), A = new WeakMap(), p = new WeakMap(), L = new WeakMap(), u = new WeakMap(), T = new WeakMap(), f = new WeakMap(), m = new WeakMap();
export {
  $ as Tabs
};
//# sourceMappingURL=index.js.map
