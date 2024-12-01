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
import { Database } from '$lib/database';
import { toast } from 'svelte-sonner';
import { setMode } from 'mode-watcher';
import { goto } from '$app/navigation';
import { error } from './stacktrace/stores';
import { globalState, subjectState } from '$lib/state.svelte';

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

	Database.addListener('contentImported', () => {
		subjectState.load();
		toast.success($format('settings.content-imported'));
	});

	Database.addListener('contentExported', () => {
		toast.success($format('settings.content-exported'));
	});

	Database.addListener(
		'errorReceived',
		({ stacktrace, clazz, message }: { stacktrace: string; clazz: string; message: string }) => {
			toast.error('Error received', {
				action: {
					label: 'Stacktrace',
					onClick: () => {
						error.set({
							stacktrace,
							clazz,
							message
						});
						goto('/stacktrace');
					}
				}
			});
		}
	);

	locale.set((await Preferences.getString({ key: 'language' })).value ?? getLocaleFromNavigator());
	globalState.showNotifications =
		(await Preferences.getString({ key: 'show-notifications' })).value == 'true';
	globalState.notificationTime =
		(await Preferences.getString({ key: 'notification-time' })).value ?? '17:00';
	globalState.notificationInterval =
		(await Preferences.getLong({ key: 'notification-interval' })).value ?? 86400000;
	const theme = (await Preferences.getString({ key: 'theme' })).value ?? 'system';
	globalState.globalTheme = theme;
	setMode(theme as any);
	await waitLocale();
};
