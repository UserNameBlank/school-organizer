import { registerPlugin } from '@capacitor/core';
import type { DatabasePlugin } from './definitions';
import { subjects, timetable } from '$lib/stores';
import type { Subject } from '$lib/Subject';
import { get } from 'svelte/store';

const Database = registerPlugin<DatabasePlugin>('Database', {
	web: () => import('./web').then((m) => new m.DatabaseWeb())
});

export async function loadStores() {
	subjects.set(new Map());
	timetable.set(new Array(12 * 5));

	await Database.removeOldHomework();

	const subs = (await Database.getSubjectsWithHomework()).subjects;
	subjects.set(
		subs.reduce((map, sub) => {
			return map.set(sub.id, sub);
		}, new Map<number, Subject>())
	);

	// const hws = (await Database.getHomeworks()).homeworks;
	// homeworks.set(
	// 	hws.reduce((map, hw) => {
	// 		return map.set(hw.id, { ...hw, dueTo: hw.dueTo ? new Date(hw.dueTo) : null });
	// 	}, new Map<number, Homework>())
	// );

	const slots = (await Database.getTimetableSlots()).slots;

	const subjectsCloned = get(subjects);

	for (const slot of slots) {
		timetable.update((map) => {
			map[slot.id] = subjectsCloned.get(slot.subjectId)!;
			return map;
		});
	}
}

export const dataService = Database;
