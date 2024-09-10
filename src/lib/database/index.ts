import { registerPlugin } from '@capacitor/core';
import type { DatabasePlugin } from './definitions';

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

export const dataService = Database;
