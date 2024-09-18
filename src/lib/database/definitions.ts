import type { Homework } from '$lib/Homework';
import type { Subject } from '$lib/Subject';

export interface DatabasePlugin {
	getSubjects(): Promise<{ subjects: Subject[] }>;
	getSubjectsWithHomework(): Promise<{ subjects: Subject[] }>;
	addSubject(subject: Subject): Promise<{ id: number }>;
	removeSubject(options: { id: number }): Promise<void>;
	editSubject(subject: Subject): Promise<void>;

	getHomeworks(): Promise<{ homeworks: Homework[] }>;
	addHomework(homework: Homework): Promise<{ id: number }>;
	removeHomework(options: { id: number }): Promise<void>;
	removeOldHomework(): Promise<void>;
	setHomeworkDone(options: { id: number; done: boolean }): Promise<void>;

	setTimetableSlot(options: { id: number; subjectId: number }): Promise<void>;
	getTimetableSlots(): Promise<{ slots: { id: number; subjectId: number }[] }>;
	clearTimetableSlot(options: { id: number }): Promise<void>;

	setNotificationOptions(options: {
		allow: boolean;
		time: string;
		interval: number;
	}): Promise<void>;

	exportContent(): Promise<void>;
	importContent(): Promise<void>;

	addListener(name: string, callback: (info: any) => void): void;
}
