import { WebPlugin } from '@capacitor/core';

import type { DatabasePlugin } from './definitions';
import type { Homework } from '$lib/Homework';
import type { Subject } from '$lib/Subject';

/// A Debug-Implementation of the DatabasePlugin on Web
export class DatabaseWeb extends WebPlugin implements DatabasePlugin {
	idCounter: number = 0;
	subjects: Map<number, Subject> = new Map();
	timetable: (number | null)[] = new Array(12 * 5).fill(null);

	constructor() {
		super();

		const content = window.localStorage.getItem('content');

		if (content) {
			this.importFromStorage(content);
		}
	}

	importFromStorage(content: string) {
		const json = JSON.parse(content);
		console.log(json);

		const subjects = json.subjects as Subject[];
		for (const subj of subjects) {
			this.subjects.set(subj.id, subj);
		}

		this.timetable = json.timetable as (number | null)[];
		this.idCounter = json.idCounter as number;
	}

	exportToStorage() {
		const obj = {
			subjects: Array.from(this.subjects).map(([_key, val]) => val),
			timetable: this.timetable,
			idCounter: this.idCounter
		};

		const json = JSON.stringify(obj);
		window.localStorage.setItem('content', json);
	}

	getSubjects(): Promise<{ subjects: Subject[] }> {
		return this.getSubjectsWithHomework();
	}

	getSubjectsWithHomework(): Promise<{ subjects: Subject[] }> {
		return new Promise((resolve) =>
			resolve({
				subjects: Array.from(this.subjects).map(([_key, val]) => val)
			})
		);
	}

	addSubject(subject: Subject): Promise<{ id: number }> {
		return new Promise((resolve) => {
			subject.id = this.idCounter++;
			this.subjects.set(subject.id, subject);
			resolve({ id: subject.id });
		});
	}

	removeSubject(options: { id: number }): Promise<void> {
		return new Promise((resolve) => {
			this.subjects.delete(options.id);
			resolve();
		});
	}

	editSubject(subject: Subject): Promise<void> {
		return new Promise((resolve) => {
			this.subjects.set(subject.id, subject);
			resolve();
		});
	}

	getHomeworks(): Promise<{ homeworks: Homework[] }> {
		return new Promise((resolve) =>
			resolve({
				homeworks: Array.from(this.subjects)
					.map(([_key, val]) => val.homeworks)
					.flat()
			})
		);
	}

	addHomework(_homework: Homework): Promise<{ id: number }> {
		return new Promise((resolve) => {
			resolve({ id: this.idCounter++ });
		});
	}

	removeHomework(options: { id: number }): Promise<void> {
		return new Promise((resolve) => {
			this.subjects.forEach((subj) => {
				subj.homeworks = subj.homeworks.filter((hw) => hw.id !== options.id);
			});
			resolve();
		});
	}

	removeOldHomework(): Promise<void> {
		return new Promise((resolve) => {
			this.subjects.forEach((subj) => {
				subj.homeworks = subj.homeworks.filter(
					(hw) => !(hw.done && (hw.dueTo ?? Infinity) < Date.now())
				);
			});
			resolve();
		});
	}

	setHomeworkDone(_options: { id: number; done: boolean }): Promise<void> {
		// return new Promise((resolve) => {
		// 	this.subjects.forEach((subj) => {
		// 		const hw = subj.homeworks.find((it) => it.id === options.id)!!;
		// 		hw.done = options.done;
		// 		resolve();
		// 	});
		// });

		// Since we only hold references the ui will update this
		return Promise.resolve();
	}

	setTimetableSlot(options: { id: number; subjectId: number }): Promise<void> {
		return new Promise((resolve) => {
			this.timetable[options.id] = options.subjectId;
			resolve();
		});
	}

	getTimetableSlots(): Promise<{ slots: { id: number; subjectId: number }[] }> {
		return new Promise((resolve) => {
			resolve({
				slots: this.timetable.filter((val) => val != null).map((s, i) => ({ id: i, subjectId: s }))
			});
		});
	}

	clearTimetableSlot(options: { id: number }): Promise<void> {
		return new Promise((resolve) => {
			this.timetable[options.id] = null;
			resolve();
		});
	}

	setNotificationOptions(_options: {
		allow: boolean;
		time: string;
		interval: number;
	}): Promise<void> {
		throw new Error('Method not implemented.');
	}

	exportContent(): Promise<void> {
		return (async () => {
			const obj = {
				subjects: Array.from(this.subjects).map(([_key, val]) => val),
				timetable: this.timetable
			};

			const content = JSON.stringify(obj, null, 2);
			const blob = new Blob([content], { type: 'application/json' });

			// @ts-expect-error
			if (window.showSaveFilePicker) {
				// @ts-expect-error
				const handler = await window.showSaveFilePicker({
					suggestedName: 'content.json',
					types: [
						{
							description: 'json file',
							accept: { 'text/plain': ['.json'] }
						}
					]
				});
				await handler.createWritable().write([blob]);
			} else {
				let url = URL.createObjectURL(blob);
				let anchor = document.createElement('a');
				anchor.href = url;
				anchor.download = 'content.json';
				anchor.click();
				URL.revokeObjectURL(url);
				anchor.remove();
			}
		})();
	}

	importContent(): Promise<void> {
		return new Promise((resolve) => {
			const input = document.createElement('input');
			input.type = 'file';
			input.accept = '.json';

			input.onchange = (e) => {
				const target = e.target as HTMLInputElement;
				const file = target.files?.[0];

				if (file) {
					const reader = new FileReader();
					reader.readAsText(file, 'UTF-8');

					reader.onload = async (readerEvent) => {
						const content = readerEvent.target?.result as string;
						const json = JSON.parse(content);

						const subjects = json.subjects as Subject[];
						const subjMap = new Map<number, number>();
						for (const subj of subjects) {
							const oldId = subj.id;
							const { id } = await this.addSubject({ ...subj, homeworks: [] });
							subjMap.set(oldId, id);
						}

						const timetable = json.timetable as (number | null)[];
						this.timetable = timetable.map((id) => (id ? subjMap.get(id)!! : null));

						this.notifyListeners('contentImported', null);
					};
				}

				input.remove();
			};

			input.click();

			resolve();
		});
	}
}
