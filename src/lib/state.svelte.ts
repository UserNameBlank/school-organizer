import { SvelteMap } from 'svelte/reactivity';
import { dataService } from './database';
import type { Homework } from './Homework';
import type { Subject } from './Subject';

class SubjectState {
	#subjects = $state<Map<number, Subject>>(new SvelteMap());

	async load() {
		await dataService.removeOldHomework();

		const subs = (await dataService.getSubjectsWithHomework()).subjects;

		this.#subjects = subs.reduce((map, sub) => {
			const reactiveSubject = $state(sub);
			return map.set(sub.id, reactiveSubject);
		}, new SvelteMap<number, Subject>());
	}

	get subjects(): Iterable<Subject> {
		return this.#subjects.values()
	}

	get(id: number): Subject | undefined {
		return this.#subjects.get(id)
	}

	get size(): number {
		return this.#subjects.size;
	}

	async addSubject(subject: Subject) {
		let { id } = await dataService.addSubject(subject);
		subject.id = id;
		const reactiveSubject = $state(subject)
		this.#subjects.set(subject.id, reactiveSubject);
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
		// this.subjects.set(subject.id, subject);
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
		this.#subjects.get(homework.subjectId)!.homeworks = homeworks.filter((hw) => hw.id !== homework.id);
	}

	async setHomeworkDone(homework: Homework, done: boolean) {
		dataService.setHomeworkDone({ id: homework.id, done: done });
		homework.done = done
	}
}

export const subjectState = new SubjectState();
export const timetable = $state<(Subject | null)[]>(new Array(5 * 12).fill(null));

class GlobalState {
	currentTab = $state('');

	showNotifications = $state(false);
	notificationTime = $state('17:00')
	notificationInterval = $state(86400000);

	globalTheme = $state('system');
}

export const globalState = new GlobalState();
