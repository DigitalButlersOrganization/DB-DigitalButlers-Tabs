var C = Object.defineProperty;
var B = (r, t, e) => t in r ? C(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var i = (r, t, e) => (B(r, typeof t != "symbol" ? t + "" : t, e), e), P = (r, t, e) => {
  if (!t.has(r))
    throw TypeError("Cannot " + e);
};
var n = (r, t, e) => (P(r, t, "read from private field"), e ? e.call(r) : t.get(r)), c = (r, t, e) => {
  if (t.has(r))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(r) : t.set(r, e);
}, h = (r, t, e, s) => (P(r, t, "write to private field"), s ? s.call(r, e) : t.set(r, e), e);
const d = {
  ACTIVE: "js--active",
  UNACTIVE: "js--unactive",
  VISIBLE: "js--visible"
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
}, b = {
  TAB: "js--tab",
  PANEL: "js--panel",
  TABS_WRAPPER: "js--tabs-wrapper",
  TAB_LIST: "js--tab-list",
  PANEL_LIST: "js--panel-list",
  ANIMATED_FADE: "js--animated-fade",
  ANIMATED_OPACITY: "js--animated-opacity",
  ANIMATED_SLIDE: "js--animated-slide"
}, y = (r) => r ? Array.prototype.slice.call(r.children) : [], H = (r = 5) => {
  let t = "";
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", s = e.length;
  let a = 0;
  for (; a < r; )
    t += e.charAt(Math.floor(Math.random() * s)), a += 1;
  return t;
};
var u;
(function(r) {
  r.click = "click", r.mouseover = "mouseover";
})(u || (u = {}));
var g, f, L, v, A, p, m, T, I, E, w;
class U {
  constructor(t = '[data-tabs="wrapper"]', { tabbuttonsListSelector: e = '[data-tabs="tabs"]', tabpanelsListSelector: s = '[data-tabs="content"]', deletableTabs: a = !1, initialTab: l = 0, equalHeight: M = !1, orientation: x = "horizontal", triggerEvent: k = u.click, autoplay: S = {
    delay: 0
  }, on: D = {}, matchMediaRule: N }) {
    c(this, g, void 0);
    c(this, f, void 0);
    i(this, "activeIndex");
    i(this, "nextIndex");
    i(this, "prevIndex");
    i(this, "lastIndex");
    c(this, L, void 0);
    i(this, "orientation");
    i(this, "triggerEvent");
    c(this, v, void 0);
    c(this, A, void 0);
    c(this, p, void 0);
    i(this, "generatedId");
    c(this, m, void 0);
    i(this, "tabsWrapper");
    i(this, "tabButtonsList");
    i(this, "tabPanelsList");
    i(this, "tabs");
    i(this, "panels");
    i(this, "on");
    c(this, T, void 0);
    c(this, I, void 0);
    c(this, E, void 0);
    c(this, w, void 0);
    i(this, "matchMediaRule");
    i(this, "isInMatchMedia");
    i(this, "checkMatchMedia", () => {
      this.isInMatchMedia = !this.matchMediaRule || window.matchMedia(this.matchMediaRule).matches;
    });
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
      n(this, I) && (this.activeIndex = t, this.updateProperties(), this.setUnactiveAll(), this.setActiveAttributes(t), this.setActiveClasses(t), e && this.focusTab(t), this.on.tabChange && this.on.tabChange(this));
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
      t in u ? (this.removeListenersForTabs(), this.triggerEvent = t, this.addListenersForTabs()) : console.error("Icorrect type of event");
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
        t.classList.remove(d.ACTIVE), t.classList.add(d.UNACTIVE);
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
      this.tabs[t].classList.remove(d.UNACTIVE), this.tabs[t].classList.add(d.ACTIVE), this.panels[t].classList.remove(d.UNACTIVE), this.panels[t].classList.add(d.ACTIVE);
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
            this.triggerEvent === u.mouseover ? this.goTo(l) : this.focusTab(l);
          }
          break;
        }
        case o.RIGHT:
        case o.DOWN: {
          if (s !== void 0) {
            const l = s >= Number(this.lastIndex) ? 0 : s + 1;
            this.triggerEvent === u.mouseover ? this.goTo(l) : this.focusTab(l);
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
      this.tabsWrapper.classList.add(b.TABS_WRAPPER), this.tabsWrapper.setAttribute("aria-orientation", this.orientation), (t = this.tabButtonsList) == null || t.classList.add(b.TAB_LIST), (e = this.tabPanelsList) == null || e.classList.add(b.PANEL_LIST), this.tabs.forEach((s, a) => {
        s.classList.add(b.TAB), s.setAttribute("aria-label", `${a}`), s.setAttribute("role", n(this, E).tab), s.setAttribute("id", `${this.generatedId}-tab-${a}`), s.setAttribute("aria-controls", `${this.generatedId}-tabpanel-${a}`), s.dataset.deletable = `${n(this, L)}`, this.panels[a].classList.add(b.PANEL), this.panels[a].setAttribute("aria-labelledby", `${this.generatedId}-tab-${a}`), this.panels[a].setAttribute("id", `${this.generatedId}-tabpanel-${a}`), this.panels[a].setAttribute("aria-label", `${a}`), this.panels[a].setAttribute("role", n(this, E).tabpanel);
      }), this.setUnactiveAll();
    });
    i(this, "removeTabsAttributes", () => {
      var t, e;
      this.tabsWrapper.classList.remove(b.TABS_WRAPPER), this.tabsWrapper.removeAttribute("aria-orientation"), (t = this.tabButtonsList) == null || t.classList.remove(b.TAB_LIST), (e = this.tabPanelsList) == null || e.classList.remove(b.PANEL_LIST), this.tabs.forEach((s, a) => {
        s.classList.remove(b.TAB), s.classList.remove(d.ACTIVE), s.classList.remove(d.UNACTIVE), s.removeAttribute("tabindex"), s.removeAttribute("aria-label"), s.removeAttribute("aria-selected"), s.removeAttribute("role"), s.removeAttribute("id"), s.removeAttribute("aria-controls"), delete s.dataset.deletable, this.panels[a].classList.remove(b.PANEL), this.panels[a].classList.remove(d.ACTIVE), this.panels[a].classList.remove(d.UNACTIVE), this.panels[a].removeAttribute("aria-labelledby"), this.panels[a].removeAttribute("id"), this.panels[a].removeAttribute("aria-label"), this.panels[a].removeAttribute("role"), this.panels[a].removeAttribute("inert");
      });
    });
    i(this, "getEventDetails", (t) => {
      const e = t instanceof KeyboardEvent ? t.key : void 0, s = t.target, a = s.closest(n(this, w).tab), l = a == null ? void 0 : a.getAttribute("aria-label");
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
    i(this, "update", () => {
      this.tabs = y(this.tabButtonsList), this.panels = y(this.tabPanelsList), this.isInMatchMedia ? (this.assignTabsAttributes(), this.goTo(this.activeIndex, !1)) : this.removeTabsAttributes();
    });
    i(this, "destroy", () => {
      this.removeTabsAttributes(), this.removeListenersForTabs(), window.removeEventListener("resize", this.setEqualHeight), h(this, T, !0);
    });
    h(this, g, s), h(this, f, e), h(this, L, a), this.tabsWrapper = typeof t == "string" ? document.querySelector(t) : t, this.tabButtonsList = void 0, this.tabPanelsList = void 0, this.tabButtonsList = void 0, this.tabs = [], this.panels = [], this.orientation = x === "vertical" ? "vertical" : "horizontal", this.triggerEvent = k, this.activeIndex = l, this.nextIndex = void 0, this.prevIndex = void 0, this.lastIndex = void 0, h(this, v, S), h(this, A, 0), h(this, p, !1), this.on = D, this.matchMediaRule = N, this.isInMatchMedia = !1, this.generatedId = H(), h(this, m, M), h(this, E, {
      tab: "tab",
      tabpanel: "tabpanel"
    }), h(this, w, {
      tab: '[role="tab"]',
      tabpanel: '[role="tabpanel"]'
    }), h(this, T, !1), h(this, I, !1), this.init();
  }
  init() {
    if (this.tabsWrapper && !n(this, T)) {
      if (this.on.beforeInit && this.on.beforeInit(this), this.checkMatchMedia(), window.addEventListener("resize", this.checkMatchMedia), window.addEventListener("resize", this.update), this.tabButtonsList = this.tabsWrapper.querySelector(n(this, f)), this.tabPanelsList = this.tabsWrapper.querySelector(n(this, g)), this.tabButtonsList && this.tabPanelsList)
        if (this.update(), this.tabs.length > 0 && this.tabs.length === this.panels.length)
          n(this, m) && (this.setEqualHeight(), window.addEventListener("resize", this.setEqualHeight)), n(this, p) || (this.addListenersForTabs(), h(this, p, !0)), n(this, v).delay > 0 && this.isInMatchMedia && this.runAutoPlay();
        else
          throw new Error("Tabs and panels should have the length > 0. And their lengths should be equal");
      else
        throw new Error("Tabs or panels not found");
      h(this, I, !0), this.isInMatchMedia ? (this.assignTabsAttributes(), this.goTo(this.activeIndex, !1)) : this.removeTabsAttributes(), this.on.afterInit && this.on.afterInit(this);
    }
  }
}
g = new WeakMap(), f = new WeakMap(), L = new WeakMap(), v = new WeakMap(), A = new WeakMap(), p = new WeakMap(), m = new WeakMap(), T = new WeakMap(), I = new WeakMap(), E = new WeakMap(), w = new WeakMap();
export {
  U as Tabs
};
//# sourceMappingURL=index.js.map
