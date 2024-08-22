import { Tabs } from '../index';

const wrappers: HTMLElement[] = [...document.querySelectorAll('.wrapper')].map((element) => element as HTMLElement);

wrappers.forEach((wrapper) => {
	// eslint-disable-next-line no-unused-vars
	const tabs = new Tabs(wrapper, {
		// tabpanelsListSelector: '[data-tabs="content"]',
		// tabbuttonsListSelector: '[data-tabs="tabs"]',
		// deletableTabs: true,
		// triggerEvent: TriggerEvents.mouseover,
	});
});

// eslint-disable-next-line no-unused-vars
const mainTabs = new Tabs('.app', {
	tabpanelsListSelector: '.app-panels',
	tabbuttonsListSelector: '.app-tabs',
	orientation: 'vertical',
	deletableTabs: true,
	matchMediaRule: '(min-width: 600px)',
	equalHeight: true,
	autoplay: {
		delay: 0,
	},
});
