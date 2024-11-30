import { dataService } from './database';
import type { Homework } from './Homework';
import type { Subject } from './Subject';

class SubjectState {
	#subjects = $state<Map<number, Subject>>(new Map());

	get subjects(): Iterator<Subject> {
		return this.#subjects.values();
	}

	async addSubject(subject: Subject) {
		let { id } = await dataService.addSubject(subject);
		subject.id = id;
		this.#subjects.set(subject.id, subject);
	}

	async removeSubject(subject: Subject) {
		this.#subjects.delete(subject.id);

		return async (del: boolean) => {
			if (del) {
				await dataService.removeSubject({ id: subject.id });
			} else {
				this.#subjects.set(subject.id, subject);
			}
		};
	}

	async editSubject(subject: Subject) {
		await dataService.editSubject(subject);
		this.#subjects.set(subject.id, subject);
	}

	async addHomework(homework: Homework) {
		let { id, image } = await dataService.addHomework(homework);
		homework.id = id;
		homework.image = image;
		this.#subjects.get(homework.subjectId)!.homeworks.push(homework);
	}

	async removeHomework(homework: Homework) {
		await dataService.removeHomework({ id: homework.id });
		let homeworks = this.#subjects.get(homework.subjectId)!.homeworks;
		homeworks = homeworks.filter((hw) => hw.id !== homework.id);
	}
}

export const subjects = $state<Map<number, Subject>>(new Map());
export const timetable = $state<(Subject | null)[]>(new Array(5 * 12).fill(null));

export const currentTab = $state('');

export const showNotifications = $state(false);
export const notificationTime = $state('17:00');
export const notificationInterval = $state(86400000);

export const globalTheme = $state('system');
