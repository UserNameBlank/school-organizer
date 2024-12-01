import { SvelteMap } from 'svelte/reactivity';
import { Database } from './database';
import type { Homework } from './Homework';
import type { Subject } from './Subject';

class SubjectState {
	#subjects = $state<Map<number, Subject>>(new SvelteMap());

	async load() {
		await Database.removeOldHomework();

		const subs = (await Database.getSubjectsWithHomework()).subjects;

		this.#subjects = subs.reduce((map, sub) => {
			const reactiveSubject = $state(sub);
			return map.set(sub.id, reactiveSubject);
		}, new SvelteMap<number, Subject>());
	}

	get subjects(): Iterable<Subject> {
		return this.#subjects.values();
	}

	get(id: number): Subject | undefined {
		return this.#subjects.get(id);
	}

	get size(): number {
		return this.#subjects.size;
	}

	async addSubject(subject: Subject) {
		let { id } = await Database.addSubject(subject);
		subject.id = id;
		const reactiveSubject = $state(subject);
		this.#subjects.set(subject.id, reactiveSubject);
	}

	async removeSubject(subject: Subject) {
		this.#subjects.delete(subject.id);

		return async (del: boolean) => {
			if (del) {
				await Database.removeSubject({ id: subject.id });
			} else {
				this.#subjects.set(subject.id, subject);
			}
		};
	}

	async editSubject(subject: Subject) {
		await Database.editSubject(subject);
		// this.subjects.set(subject.id, subject);
	}

	async addHomework(homework: Homework) {
		let { id, image } = await Database.addHomework(homework);
		homework.id = id;
		homework.image = image;
		this.#subjects.get(homework.subjectId)!.homeworks.push(homework);
	}

	async removeHomework(homework: Homework) {
		await Database.removeHomework({ id: homework.id });
		let homeworks = this.#subjects.get(homework.subjectId)!.homeworks;
		this.#subjects.get(homework.subjectId)!.homeworks = homeworks.filter(
			(hw) => hw.id !== homework.id
		);
	}

	async setHomeworkDone(homework: Homework, done: boolean) {
		Database.setHomeworkDone({ id: homework.id, done: done });
		homework.done = done;
	}
}

export const subjectState = new SubjectState();
export const timetable = $state<(Subject | null)[]>(new Array(5 * 12).fill(null));

class GlobalState {
	currentTab = $state('');

	showNotifications = $state(false);
	notificationTime = $state('17:00');
	notificationInterval = $state(86400000);

	globalTheme = $state('system');
}

export const globalState = new GlobalState();
