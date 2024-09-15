import { getLocaleFromNavigator, locale, waitLocale } from 'svelte-i18n';
import '$lib/i18n';
import type { LayoutLoad } from './$types';
import { Preferences } from '$lib/preferences';
import { App } from '@capacitor/app';
import { notificationInterval, notificationTime, showNotifications } from '$lib/stores';
import { dataService, loadStores } from '$lib/database';

export const prerender = true;
export const ssr = false;
export const load: LayoutLoad = async () => {
	App.addListener('backButton', ({ canGoBack }) => {
		if (!canGoBack) {
			App.exitApp();
		} else {
			window.history.back();
		}
	});

	dataService.addListener('contentImported', () => {
		loadStores();
	});

	locale.set((await Preferences.getString({ key: 'language' })).value ?? getLocaleFromNavigator());
	showNotifications.set(
		(await Preferences.getString({ key: 'show-notifications' })).value == 'true'
	);
	notificationTime.set(
		(await Preferences.getString({ key: 'notification-time' })).value ?? '17:00'
	);
	notificationInterval.set(
		(await Preferences.getLong({ key: 'notification-interval' })).value ?? 86400000
	);
	await waitLocale();
};
