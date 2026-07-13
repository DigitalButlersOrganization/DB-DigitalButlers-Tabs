# Tabs

## Usage

### Create an HTML markup

```html
<div data-tabs="wrapper">
	<div data-tabs="tabs">
		<button>Tab 1</button>
		<button>Tab 2</button>
		<button>Tab 3</button>
	</div>
	<ul data-tabs="content">
		<li>
			<p>Tab 1 content</p>
		</li>
		<li>
			<p>Tab 2 content</p>
		</li>
		<li>
			<p>Tab 3 content</p>
		</li>
	</ul>
</div>
```

### Create tabs instance

```javascript
const tabs = new Tabs(
	'[data-tabs="wrapper"]', // your custom wrapper selector or an HTML Element
	{
		// config object
		tabbuttonsListSelector: '[data-tabs="tabs"]', // your custom tab list selector
		tabpanelsListSelector: '[data-tabs="content"]', // your custom content panels list selector
	},
);
```

Tabs will not initialize, if quantity of buttons and content blocks are not equal

### Import styles in CSS or SCSS

```scss
@import '@digital-butlers/tabs/scss';
```

```scss
@import '@digital-butlers/tabs/css';
```

## API

### Config Properties

### `tabbuttonsListSelector`

_Type:_ `string`  
_Default:_ `'[data-tabs="tabs"]'`  
_Description:_ Css selector for elements with tabs

### `tabpanelsListSelector`

_Type:_ `string`  
_Default:_ `'[data-tabs="content"]'`  
_Description:_ Css selector for elements with tabs content

### `deletableTabs`

_Type:_ `boolean`  
_Default:_ `false`  
_Description:_ Ability to delete tabs and their contents.

### `initialTab`

_Type:_ `number`  
_Default:_ `0`  
_Description:_ Index of the tab that will be active after tabs initialization. Use `-1` to start with no active tab.

### `orientation`

_Type:_ `horizontal | vertical`  
_Default:_ `horizontal`  
_Description:_ orientation of tab buttons layout.

### `triggerEvent`

_Type:_ `click | mouseover`  
_Default:_ `click`  
_Description:_ which event will trigger the tab changing.

### `equalHeight`

_Type:_ `boolean`  
_Default:_ `false`  
_Description:_ set height of tab panels as same as the tallest panel.

### `matchMediaRule`

_Type:_ `mediaQueryString`  
_Default:_ `undefined`  
_Description:_ will prevent the tab changings if window.matchmedia doesn't match

### `devMode`

_Type:_ `boolean`  
_Default:_ `false`  
_Description:_ Shows unnecessary errors if something went wrong

### `autoplay`

_Type:_ `object`

#### Autoplay config object

### `delay`

_Type:_ `number`  
_Default:_ `0`  
_Description:_ Autoplay delay. A value of 0 disables autoplay.

### `on`

_Type:_ `object`  
_Description:_ Callbacks that can be initialized after some events with tabs

#### Events callback config object

### `tabChange`

_Type:_ `function`  
_Default:_ `undefined`  
_Description:_ Callback will be started after every tab changing event

### `beforeInit`

_Type:_ `function`  
_Default:_ `undefined`  
_Description:_ Callback will be started before tabs initialization

### `afterInit`

_Type:_ `function`  
_Default:_ `undefined`  
_Description:_ Callback will be started after tabs initialization

### Properties

### `activeIndex`

_Type:_ `number`  
_Description:_ Index of current active tab. `-1` means no tab is active.

### `nextIndex`

_Type:_ `number`  
_Description:_ Index of tab after current active (0 if cuurent tab is last).

### `prevIndex`

_Type:_ `number`  
_Description:_ Index of tab before current active (last if cuurent tab is first).

### `lastIndex`

_Type:_ `number`  
_Description:_ Index of last tab.

### `tabsWrapper`

_Type:_ `HTMLElement`  
_Description:_ Main Tabs wrapper HTML Element.

### `tabList`

_Type:_ `HTMLElement`  
_Description:_ Tab buttons wrapper HTML Element.

### `tabPanelsList`

_Type:_ `HTMLElement`  
_Description:_ Tab content wrapper HTML Element.

### `tabs`

_Type:_ `HTMLElement[]`  
_Description:_ Array of tab-buttons HTML elements

### `panels`

_Type:_ `HTMLElement[]`  
_Description:_ Array of tab-panels HTML elements

### `generatedId`

_Type:_ `string`  
_Description:_ Automatically generated unique identificator which is assigned as the prefix in id's to each element inside main tabs wrapper

### Methods

### `goTo(index, setFocus?)`

_Return:_ -  
_Arguments:_ `index` — tab index (`0` … `lastIndex`), or any invalid value (`-1`, `Infinity`, out-of-range) to close all tabs; `setFocus` — optional, default `true`  
_Description:_ Activates the tab at the given index. If the index is invalid, closes all tabs (`activeIndex` becomes `-1`) without throwing an error.

### `closeAll(setFocus?)`

_Return:_ -  
_Arguments:_ `setFocus` — optional, default `false`  
_Description:_ Closes all tabs so none are active. Equivalent to `goTo(-1)`. Sets `activeIndex` to `-1`.

```javascript
tabs.closeAll();
// or
tabs.goTo(-1);

// open a tab later
tabs.goTo(0);
```

### `goToNext()`

_Return:_ -  
_Arguments:_ `{ loop: boolean }`. By default `loop = true`, so after last tab first tab will turn active
_Description:_ go to next tab.

### `goToPrev()`

_Return:_ -  
_Arguments:_ `{ loop: boolean }`. By default `loop = true`, so after first tab last tab will turn active.
_Description:_ go to previous tab.

### `stopAutoPlay() `

_Return:_ -  
_Arguments:_ -  
_Description:_ Stop the autoplay animation.

### `update()`

_Return:_ -  
_Arguments:_ -  
_Description:_ Update all indexes, properties and attributes for each tab.

### `changeTriggerEvent(event)`

_Return:_ -  
_Arguments:_ 'click' | 'mouseover'  
_Description:_ Changes the trigger event. Shows console error for unsupported events.

### `destroy()`

_Return:_ -  
_Arguments:_ -  
_Description:_ Irreversible action! Remove all indexes, classes, properties and attributes for each tab.

## License

MIT
