import {
	getLocaleFromNavigator,
	locale,
	unwrapFunctionStore,
	format,
	waitLocale
} from 'svelte-i18n';
import '$lib/i18n';
import type { LayoutLoad } from './$types';
import { Preferences } from '$lib/preferences';
import { App } from '@capacitor/app';
import {
	globalTheme,
	notificationInterval,
	notificationTime,
	showNotifications
} from '$lib/stores';
import { dataService, loadStores } from '$lib/database';
import { toast } from 'svelte-sonner';
import { setMode } from 'mode-watcher';

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

	const $format = unwrapFunctionStore(format);

	dataService.addListener('contentImported', () => {
		loadStores();
		toast.success($format('settings.content-imported'));
	});
	dataService.addListener('contentExported', () => {
		toast.success($format('settings.content-exported'));
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
	const theme = (await Preferences.getString({ key: 'theme' })).value ?? 'system';
	globalTheme.set(theme);
	setMode(theme as any);
	await waitLocale();
};
