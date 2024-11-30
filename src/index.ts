import { CLASSES, KEYS } from './constants/index';

import './style.scss';

import { getChildrenArray, getRandomId } from './utils/index';
import {
	AutoPlayModel,
	EventDetailsModel,
	EventsModel,
	GoToNextPreviousProperties,
	OrientationType,
	TabsConfigModel,
	TriggerEvents,
} from './interfaces';

export class Tabs {
	#tabpanelsListSelector: string;
	#tabbuttonsListSelector: string;
	activeIndex: number;
	nextIndex: number | undefined;
	prevIndex: number | undefined;
	lastIndex: number | undefined;
	#deletableTabs: boolean;
	orientation: OrientationType;
	triggerEvent: TriggerEvents;
	#autoplay: AutoPlayModel;
	#autoplayTimeout: number;
	#listenersAdded: boolean;
	// #maxPanelHeight: number;
	generatedId: string;
	#equalHeight: boolean;
	tabsWrapper: HTMLElement;
	tabButtonsList: HTMLElement | undefined;
	tabPanelsList: HTMLElement | undefined;
	tabs: HTMLElement[];
	panels: HTMLElement[];
	on: EventsModel;
	#destroyed: boolean;
	#inited: boolean;
	#defaultRoles: {
		[key: string]: string;
	};

	#defaultSelectors: {
		[key: string]: `[role="${string}"]`;
	};

	matchMediaRule: string | undefined;
	isInMatchMedia: boolean;
	devMode: boolean;

	// eslint-disable-next-line default-param-last
	constructor(
		tabsWrapper: string | HTMLElement = '[data-tabs="wrapper"]',
		{
			tabbuttonsListSelector = '[data-tabs="tabs"]',
			tabpanelsListSelector = '[data-tabs="content"]',
			deletableTabs = false,
			initialTab = 0,
			equalHeight = false,
			orientation = 'horizontal',
			triggerEvent = TriggerEvents.click,
			autoplay = {
				delay: 0,
			},
			on = {},
			matchMediaRule,
			devMode: developmentMode = false,
		}: TabsConfigModel,
	) {
		this.#tabpanelsListSelector = tabpanelsListSelector;
		this.#tabbuttonsListSelector = tabbuttonsListSelector;
		this.#deletableTabs = deletableTabs;
		this.tabsWrapper = typeof tabsWrapper === 'string' ? (document.querySelector(tabsWrapper) as HTMLElement) : tabsWrapper;
		this.tabButtonsList = undefined;
		this.tabPanelsList = undefined;
		this.tabButtonsList = undefined;
		this.tabs = [];
		this.panels = [];
		this.orientation = orientation === 'vertical' ? 'vertical' : 'horizontal';
		this.triggerEvent = triggerEvent;
		this.activeIndex = initialTab;
		this.nextIndex = undefined;
		this.prevIndex = undefined;
		this.lastIndex = undefined;
		this.#autoplay = autoplay;
		this.#autoplayTimeout = 0;
		this.#listenersAdded = false;
		this.on = on;
		this.matchMediaRule = matchMediaRule;
		this.isInMatchMedia = false;
		// this.#maxPanelHeight = 0;
		this.generatedId = getRandomId();
		this.#equalHeight = equalHeight;
		this.#defaultRoles = {
			tab: 'tab',
			tabpanel: 'tabpanel',
		};
		this.#defaultSelectors = {
			tab: '[role="tab"]',
			tabpanel: '[role="tabpanel"]',
		};
		this.#destroyed = false;
		this.#inited = false;
		this.devMode = developmentMode;
		// this.deleteTab = this.deleteTab.bind(this);
		this.init();
	}

	init() {
		if (this.devMode) {
			// eslint-disable-next-line no-console
			console.warn(
				`Tabs dev mode enabled! Instance ID: ${this.generatedId}. Read the docs https://www.npmjs.com/package/@digital-butlers/tabs | В табах включен режим разработчика! ID экземпляра: ${this.generatedId}. Читай документацию https://www.npmjs.com/package/@digital-butlers/tabs`,
			);
		}
		if (this.tabsWrapper && !this.#destroyed) {
			if (this.on.beforeInit) {
				this.on.beforeInit(this);
			}
			this.tabButtonsList = this.tabsWrapper.querySelector(this.#tabbuttonsListSelector) as HTMLElement;
			this.tabPanelsList = this.tabsWrapper.querySelector(this.#tabpanelsListSelector) as HTMLElement;
			if (this.tabPanelsList) {
				this.defineTabsAndPanels();

				if (this.panels.length > 0) {
					this.checkMatchMediaRule();
					window.addEventListener('resize', this.updateAttributes);
					this.updateAttributes();

					if (this.#equalHeight) {
						this.setEqualHeight();
						window.addEventListener('resize', this.setEqualHeight);
					}

					if (!this.#listenersAdded) {
						this.addListenersForTabs();
						this.#listenersAdded = true;
					}

					if (this.#autoplay.delay > 0 && this.isInMatchMedia) {
						this.runAutoPlay();
					}
				}
			} else if (this.devMode) {
				throw new Error('Panels not found | Панели не найдены с контентом для табов не найдены');
			}
			this.#inited = true;
			if (this.isInMatchMedia) {
				this.assignTabsAttributes();
				this.goTo(this.activeIndex, false);
			} else {
				this.removeTabsAttributes();
			}
			if (this.on.afterInit) {
				this.on.afterInit(this);
			}
		} else if (!this.tabsWrapper) {
			if (this.devMode) {
				throw new Error(`Tabs wrapper not found | Обертка табов не найдена`);
			}
		} else if (this.#destroyed && this.devMode) {
			throw new Error(`Tabs already destroyed | Табы уже были дестроены`);
		}
	}

	// secret() {
	//   return this;
	// }

	setEqualHeight() {
		if (this.isInMatchMedia) {
			this.panels.forEach((element) => {
				element.style.height = 'auto';
			});
			const maxHeight = Math.max(...this.panels.map((element) => element.offsetHeight));
			this.panels.forEach((element) => {
				element.style.height = `${maxHeight}px`;
			});
		}
		// this.secret();
	}

	public goTo = (index: number, setFocus: boolean = true) => {
		// console.log('goto');
		if (this.#inited) {
			this.activeIndex = index;
			this.updateProperties();
			this.setUnactiveAll();
			this.setActiveAttributes(index);
			this.setActiveClasses(index);
			// Set focus when required
			if (setFocus) {
				this.focusTab(index);
			}
			if (this.on.tabChange) {
				this.on.tabChange(this);
			}
		}
	};

	public goToNext = (properties: GoToNextPreviousProperties = {}) => {
		const loopProperty = properties ? (properties.loop ?? true) : true;
		if (loopProperty || (this.lastIndex && this.activeIndex < this.lastIndex)) {
			this.goTo(this.nextIndex as number);
		}
	};

	public goToPrev = (properties: GoToNextPreviousProperties = {}) => {
		const loopProperty = properties ? (properties.loop ?? true) : true;
		if (loopProperty || this.activeIndex > 0) {
			this.goTo(this.prevIndex as number);
		}
	};

	public stopAutoPlay = () => {
		clearTimeout(this.#autoplayTimeout);
	};

	public changeTriggerEvent = (eventName: TriggerEvents) => {
		if (eventName in TriggerEvents) {
			this.removeListenersForTabs();
			this.triggerEvent = eventName;
			this.addListenersForTabs();
		} else if (this.devMode) {
			throw new Error(
				`Icorrect type of event. Correct types are: ${Object.values(TriggerEvents).join(', ')} | Некорректный тип события. Правильные типы: ${Object.values(TriggerEvents).join(', ')}`,
			);
		}
	};

	runAutoPlay() {
		this.#autoplayTimeout = setTimeout(() => {
			this.goTo(this.nextIndex as number, false);
			this.runAutoPlay();
		}, this.#autoplay.delay);
	}

	addListenersForTabs() {
		this.tabsWrapper.addEventListener(this.triggerEvent, this.clickHandler);
		window.addEventListener('keydown', this.keydownHandler);
	}

	removeListenersForTabs() {
		this.tabsWrapper.removeEventListener(this.triggerEvent, this.clickHandler);
		window.removeEventListener('keydown', this.keydownHandler);
	}

	clickHandler = (event: MouseEvent) => {
		if (this.isInMatchMedia) {
			this.stopAutoPlay();
			const { targetIndex, targetButton } = this.getEventDetails(event);
			if (targetIndex !== undefined && this.tabs.includes(targetButton)) {
				this.goTo(+targetIndex);
			}
		}
	};

	keydownHandler(event: KeyboardEvent) {
		if (this.isInMatchMedia) {
			const eventDetails: EventDetailsModel = this.getEventDetails(event);
			const { targetButton, targetIndex, key } = eventDetails;
			if (targetButton && targetIndex !== undefined && this.tabs.includes(targetButton)) {
				this.stopAutoPlay();
				switch (key) {
					case KEYS.LEFT:
					case KEYS.RIGHT: {
						event.preventDefault();
						if (this.orientation === 'horizontal') {
							this.switchTabOnArrowPress(eventDetails);
						}
						break;
					}
					case KEYS.UP:
					case KEYS.DOWN: {
						event.preventDefault(); // prevent page scroll
						if (this.orientation === 'vertical') {
							this.switchTabOnArrowPress(eventDetails);
						}
						break;
					}
					case KEYS.DELETE: {
						event.preventDefault();
						this.deleteTab(eventDetails);
						break;
					}
					case KEYS.ENTER: {
						event.preventDefault();
						this.goTo(+targetIndex);
						break;
					}
					case KEYS.SPACE: {
						event.preventDefault();
						targetButton.click();
						break;
					}
					case KEYS.END: {
						event.preventDefault(); // prevent page scroll
						this.focusTab(this.lastIndex as number);
						break;
					}
					case KEYS.HOME: {
						event.preventDefault(); // prevent page scroll
						this.focusTab(0);
						break;
					}
					default: {
						break;
					}
				}
			}
		}
	}

	protected setUnactiveAll = () => {
		this.setUnactiveAttributesAll();
		[this.tabs, this.panels].flat().forEach((element) => {
			element.classList.remove(CLASSES.ACTIVE);
			element.classList.add(CLASSES.UNACTIVE);
		});
	};

	protected setUnactiveAttributesAll = () => {
		this.tabs.forEach((tabElement) => {
			tabElement.setAttribute('tabindex', '-1');
			tabElement.setAttribute('aria-selected', 'false');
		});
		this.panels.forEach((tabpanel) => {
			tabpanel.setAttribute('inert', 'true');
		});
	};

	protected setActiveAttributes = (index: number) => {
		this.tabs[index]?.setAttribute('tabindex', '0');
		this.tabs[index]?.setAttribute('aria-selected', 'true');
		this.panels[index].removeAttribute('inert');
	};

	protected setActiveClasses = (index: number) => {
		this.tabs[index]?.classList.remove(CLASSES.UNACTIVE);
		this.tabs[index]?.classList.add(CLASSES.ACTIVE);
		this.panels[index].classList.remove(CLASSES.UNACTIVE);
		this.panels[index].classList.add(CLASSES.ACTIVE);
	};

	protected focusTab = (order: number) => {
		this.tabs[order]?.focus();
	};

	// When a tablist is aria-orientation is set to vertical, only up and down arrow
	// should function. In all other cases only left and right arrow function.
	switchTabOnArrowPress(eventDetails: EventDetailsModel) {
		const { key, targetIndex, event } = eventDetails;
		event.preventDefault();
		switch (key) {
			case KEYS.LEFT:
			case KEYS.UP: {
				if (targetIndex !== undefined) {
					const nextIndex = targetIndex - 1 < 0 ? Number(this.lastIndex) : targetIndex - 1;
					// this.focusTab(nextIndex);
					if (this.triggerEvent === TriggerEvents.mouseover) {
						this.goTo(nextIndex);
					} else {
						this.focusTab(nextIndex);
					}
				}
				break;
			}
			case KEYS.RIGHT:
			case KEYS.DOWN: {
				if (targetIndex !== undefined) {
					const nextIndex = targetIndex >= Number(this.lastIndex) ? 0 : targetIndex + 1;
					// this.focusTab(nextIndex);
					if (this.triggerEvent === TriggerEvents.mouseover) {
						this.goTo(nextIndex);
					} else {
						this.focusTab(nextIndex);
					}
				}
				break;
			}
			default: {
				break;
			}
		}
	}

	// Deletes a tab and its panel
	deleteTab(eventDetails: EventDetailsModel) {
		const { targetButton, targetIndex } = eventDetails;
		if (targetButton.dataset.deletable === 'true' && targetIndex !== undefined) {
			this.tabs[targetIndex].remove();
			this.panels[targetIndex].remove();
			this.update();
			if (this.tabs.length > 0 && this.panels.length > 0) {
				const newTabsLength = this.tabs.length - 1;
				if (targetIndex < this.activeIndex || this.activeIndex > newTabsLength) {
					this.goTo(this.activeIndex - 1);
				} else {
					this.goTo(this.activeIndex);
				}
			}
		}
	}

	assignTabsAttributes() {
		this.tabsWrapper.classList.add(CLASSES.TABS_WRAPPER);
		this.tabsWrapper.setAttribute('aria-orientation', this.orientation);
		this.tabButtonsList?.classList.add(CLASSES.TAB_LIST);
		this.tabPanelsList?.classList.add(CLASSES.PANEL_LIST);
		this.panels.forEach((panel, index) => {
			if (this.tabs[index]) {
				this.tabs[index].classList.add(CLASSES.TAB);
				this.tabs[index].setAttribute('aria-label', `${index}`);
				this.tabs[index].setAttribute('role', this.#defaultRoles.tab);
				this.tabs[index].setAttribute('id', `${this.generatedId}-tab-${index}`);
				this.tabs[index].setAttribute('aria-controls', `${this.generatedId}-tabpanel-${index}`);
				this.tabs[index].dataset.deletable = `${this.#deletableTabs}`;
			}
			panel.classList.add(CLASSES.PANEL);
			panel.setAttribute('aria-labelledby', `${this.generatedId}-tab-${index}`);
			panel.setAttribute('id', `${this.generatedId}-tabpanel-${index}`);
			panel.setAttribute('aria-label', `${index}`);
			panel.setAttribute('role', this.#defaultRoles.tabpanel);
		});
		this.setUnactiveAll();
	}

	removeTabsAttributes() {
		this.tabsWrapper.classList.remove(CLASSES.TABS_WRAPPER);
		this.tabsWrapper.removeAttribute('aria-orientation');
		this.tabButtonsList?.classList.remove(CLASSES.TAB_LIST);
		this.tabPanelsList?.classList.remove(CLASSES.PANEL_LIST);
		this.tabs.forEach((tab, index) => {
			tab.classList.remove(CLASSES.TAB);
			tab.classList.remove(CLASSES.ACTIVE);
			tab.classList.remove(CLASSES.UNACTIVE);
			tab.removeAttribute('tabindex');
			tab.removeAttribute('aria-label');
			tab.removeAttribute('aria-selected');
			tab.removeAttribute('role');
			tab.removeAttribute('id');
			tab.removeAttribute('aria-controls');

			delete tab.dataset.deletable;
			this.panels[index].classList.remove(CLASSES.PANEL);
			this.panels[index].classList.remove(CLASSES.ACTIVE);
			this.panels[index].classList.remove(CLASSES.UNACTIVE);
			this.panels[index].removeAttribute('aria-labelledby');
			this.panels[index].removeAttribute('id');
			this.panels[index].removeAttribute('aria-label');
			this.panels[index].removeAttribute('role');
			this.panels[index].removeAttribute('inert');
			if (this.#equalHeight) {
				const currentStyle = this.panels[index].getAttribute('style');
				if (currentStyle) {
					let styles = currentStyle.split(';').filter((s) => s.trim() !== '');
					styles = styles.filter((style) => !style.trim().toLowerCase().startsWith('height:'));
					const newStyle = styles.join(';');
					this.panels[index].setAttribute('style', newStyle);
				}
				this.panels[index].removeAttribute('style');
			}
		});
	}

	getEventDetails(event: KeyboardEvent | MouseEvent): EventDetailsModel {
		const key = event instanceof KeyboardEvent ? event.key : undefined;
		const target = event.target as HTMLElement;
		const targetTab = target.closest(this.#defaultSelectors.tab) as HTMLElement;
		const targetIndex = targetTab?.getAttribute('aria-label');
		return {
			target,
			targetIndex: targetIndex ? +targetIndex : undefined,
			targetButton: targetTab,
			key,
			event,
		};
	}

	updateProperties(): void {
		this.lastIndex = this.panels.length - 1;
		this.nextIndex = this.activeIndex >= this.lastIndex ? 0 : this.activeIndex + 1;
		this.prevIndex = this.activeIndex - 1 < 0 ? this.lastIndex : this.activeIndex - 1;
	}

	updateAttributes = (): void => {
		this.checkMatchMediaRule();
		if (this.isInMatchMedia) {
			this.assignTabsAttributes();
			this.goTo(this.activeIndex, false);
		} else {
			this.removeTabsAttributes();
		}
	};

	defineTabsAndPanels() {
		this.tabs = getChildrenArray(this.tabButtonsList as HTMLElement);
		this.panels = getChildrenArray(this.tabPanelsList as HTMLElement);
	}

	private checkMatchMediaRule = () => {
		this.isInMatchMedia = !this.matchMediaRule || window.matchMedia(this.matchMediaRule).matches;
	};

	public update = () => {
		this.checkMatchMediaRule();
		this.defineTabsAndPanels();
		this.updateAttributes();
	};

	public destroy = () => {
		this.removeTabsAttributes();
		this.removeListenersForTabs();
		window.removeEventListener('resize', this.setEqualHeight);
		this.#destroyed = true;
	};
}
