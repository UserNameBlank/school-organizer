import { writable } from 'svelte/store';
import type { Subject } from './Subject';

export const subjects = writable<Map<number, Subject>>(new Map());
export const timetable = writable<(Subject | null)[]>(new Array(5 * 12).fill(null));

export const currentTab = writable('');

export const showNotifications = writable(false);
export const notificationTime = writable('17:00');
export const notificationInterval = writable(86400000);

export const globalTheme = writable('system');
