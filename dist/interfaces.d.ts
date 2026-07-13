import { Tabs } from '.';
export type OrientationType = 'horizontal' | 'vertical';
export interface AutoPlayModel {
    delay: number;
}
export interface EventsModel {
    tabChange?: (tabs: Tabs) => void;
    beforeInit?: (tabs: Tabs) => void;
    afterInit?: (tabs: Tabs) => void;
}
export type TriggerEvent = 'click' | 'mouseover';
export declare const TRIGGER_EVENTS: readonly TriggerEvent[];
export interface TabsConfigModel {
    tabpanelsListSelector?: string;
    tabbuttonsListSelector?: string;
    deletableTabs?: boolean;
    /** Tab index to activate on init. Use `-1` to start with no active tab. */
    initialTab?: number;
    orientation?: OrientationType;
    equalHeight?: boolean;
    autoplay?: AutoPlayModel;
    triggerEvent?: TriggerEvent;
    on?: EventsModel;
    matchMediaRule?: string;
    devMode?: boolean;
}
export interface EventDetailsModel {
    target: HTMLElement;
    targetButton: HTMLElement;
    targetIndex: number | undefined;
    key: string | undefined;
    event: KeyboardEvent | MouseEvent;
}
export interface TabsModel {
    tabpanelsListSelector: string;
    tabbuttonsListSelector: string;
    /** Current active tab index. `-1` means no tab is active. */
    activeIndex: number;
    nextIndex: number | undefined;
    prevIndex: number | undefined;
    lastIndex: number | undefined;
    deletableTabs: boolean;
    orientation: OrientationType;
    autoplay: AutoPlayModel;
    autoplayTimeout: number;
    listenersAdded: boolean;
    generatedId: string;
    equalHeight: boolean;
    tabsWrapper: HTMLElement;
    tabButtonsList: HTMLElement | undefined;
    tabPanelsList: HTMLElement | undefined;
    tabs: HTMLElement[];
    panels: HTMLElement[];
    on: EventsModel;
    defaultRoles: {
        [key: string]: string;
    };
    defaultSelectors: {
        [key: string]: `[role="${string}"]`;
    };
    matchMediaRule: string;
    isInMatchMedia: boolean;
}
export interface GoToNextPreviousProperties {
    loop?: boolean;
}
