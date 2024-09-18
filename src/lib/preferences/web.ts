import { WebPlugin } from '@capacitor/core';

import type { PreferencesPlugin } from './definitions';

export class PreferencesWeb extends WebPlugin implements PreferencesPlugin {
	getString(options: { key: string }): Promise<{ value: string }> {
		return new Promise((resolve) => {
			const value = window.localStorage.getItem(options.key)!!;
			resolve({ value });
		});
	}

	setString(options: { key: string; value: string }): Promise<void> {
		return new Promise((resolve) => {
			window.localStorage.setItem(options.key, options.value);
			resolve();
		});
	}

	getLong(options: { key: string }): Promise<{ value: number }> {
		return new Promise((resolve) => {
			const value = window.localStorage.getItem(options.key)!!;
			resolve({ value: parseInt(value) });
		});
	}

	setLong(options: { key: string; value: number }): Promise<void> {
		return new Promise((resolve) => {
			window.localStorage.setItem(options.key, options.value.toString());
			resolve();
		});
	}
}
