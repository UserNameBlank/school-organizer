import { getLocaleFromNavigator, locale, waitLocale } from 'svelte-i18n';
import '$lib/i18n';
import type { LayoutLoad } from './$types';
import { Preferences } from '@capacitor/preferences';

export const prerender = true;
export const ssr = false;
export const load: LayoutLoad = async () => {
	locale.set((await Preferences.get({ key: 'language' })).value ?? getLocaleFromNavigator());
	await waitLocale();
};
