import { getLocaleFromNavigator, locale, waitLocale } from 'svelte-i18n';
import '$lib/i18n';
import type { LayoutLoad } from './$types';

export const prerender = true;
export const ssr = false;
export const load: LayoutLoad = async () => {
	locale.set(getLocaleFromNavigator());
	await waitLocale();
};
