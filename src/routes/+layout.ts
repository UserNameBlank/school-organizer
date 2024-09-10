import { getLocaleFromNavigator, locale, waitLocale } from 'svelte-i18n';
import '$lib/i18n';
import type { LayoutLoad } from './$types';
import { Preferences } from '@capacitor/preferences';
import { App } from '@capacitor/app';
import { notificationTime, showNotifications } from '$lib/stores';

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

	locale.set((await Preferences.get({ key: 'language' })).value ?? getLocaleFromNavigator());
	showNotifications.set((await Preferences.get({ key: 'show-notifications' })).value == 'true');
	notificationTime.set((await Preferences.get({ key: 'notification-time' })).value ?? '17:00');
	await waitLocale();
};
