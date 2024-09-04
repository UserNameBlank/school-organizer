import { getLocaleFromNavigator, locale, waitLocale } from 'svelte-i18n';
import '$lib/i18n';
import type { LayoutLoad } from './$types';
import { Preferences } from '@capacitor/preferences';
import { App } from '@capacitor/app';

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
	await waitLocale();
};
