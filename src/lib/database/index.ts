import { registerPlugin } from '@capacitor/core';
import type { DatabasePlugin } from './definitions';
import { homeworks, subjects, timetable } from '$lib/stores';
import type { Subject } from '$lib/Subject';
import type { Homework } from '$lib/Homework';
import { get } from 'svelte/store';

const Database = registerPlugin<DatabasePlugin>('Database');

// class DatabaseService {
// 	async init() {}
//
// 	async getSubjects(): Promise<Subject[]> {
// 		return null as any;
// 	}
//
// 	async addSubject(subject: Subject): Promise<number> {
// 		return null as any;
// 	}
//
// 	async removeSubject(id: number) {}
//
// 	async editSubject(subject: Subject) {}
//
// 	async getHomeworks(): Promise<Homework[]> {
// 		return null as any;
// 	}
//
// 	async addHomework(homework: Homework): Promise<number> {
// 		return null as any;
// 	}
//
// 	async removeHomework(id: number) {}
//
// 	async removeOldHomework() {}
//
// 	async setHomeworkDone(id: number, done: boolean) {}
//
// 	async setSlot(slot: number, subject_id: number) {}
//
// 	async getSlots(): Promise<{ slot: number; subject_id: number }[]> {
// 		return null as any;
// 	}
//
// 	async clearSlot(slot: number) {}
//
// 	async saveToStore() {}
// }

export async function loadStores() {
	const subs = (await Database.getSubjects()).subjects;
	subjects.set(
		subs.reduce((map, sub) => {
			return map.set(sub.id, sub);
		}, new Map<number, Subject>())
	);

	// await Database.removeOldHomework();
	const hws = (await Database.getHomeworks()).homeworks;
	homeworks.set(
		hws.reduce((map, hw) => {
			return map.set(hw.id, { ...hw, dueTo: hw.dueTo ? new Date(hw.dueTo) : null });
		}, new Map<number, Homework>())
	);

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
