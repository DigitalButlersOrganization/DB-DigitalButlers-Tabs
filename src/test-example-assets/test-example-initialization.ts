import { Tabs } from '../index';

const wrappers: HTMLElement[] = [...document.querySelectorAll('.wrapper')].map((element) => element as HTMLElement);

wrappers.forEach((wrapper) => {
	const tabs = new Tabs(wrapper, {
		tabpanelsListSelector: '[data-tabs="content"]',
		tabbuttonsListSelector: '[data-tabs="tabs"]',
		deletableTabs: true,
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
	devMode: true,
});

document.querySelector('[data-role="next"]')?.addEventListener('click', () => {
	mainTabs.goToNext();
});
document.querySelector('[data-role="prev"]')?.addEventListener('click', () => {
	mainTabs.goToPrev();
});
