import type { Subject } from '$lib/Subject';

interface HomeworkType {
	id: number;
	desc: string;
	subjectId: number;
	dueTo: number | null;
	done: boolean;
}

export interface DatabasePlugin {
	getSubjects(): Promise<{ subjects: Subject[] }>;
	addSubject(subject: Subject): Promise<{ id: number }>;
	removeSubject(options: { id: number }): Promise<void>;
	editSubject(subject: Subject): Promise<void>;

	getHomeworks(): Promise<{ homeworks: HomeworkType[] }>;
	addHomework(homework: HomeworkType): Promise<{ id: number }>;
	removeHomework(options: { id: number }): Promise<void>;
	removeOldHomework(): Promise<void>;
	setHomeworkDone(options: { id: number; done: boolean }): Promise<void>;

	setTimetableSlot(options: { id: number; subjectId: number }): Promise<void>;
	getTimetableSlots(): Promise<{ slots: { id: number; subjectId: number }[] }>;
	clearTimetableSlot(options: { id: number }): Promise<void>;

	setNotificationOptions(options: { allow: boolean; time: string }): Promise<void>;
}
