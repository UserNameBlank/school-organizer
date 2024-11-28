import { writable } from 'svelte/store';

export const error = writable<null | {
	stacktrace: string;
	clazz: string;
	message: string;
}>(null);
