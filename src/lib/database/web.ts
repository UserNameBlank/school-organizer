import { WebPlugin } from '@capacitor/core';

import type { DatabasePlugin } from './definitions';
import type { Homework } from '$lib/Homework';
import type { Subject } from '$lib/Subject';

function bufferToBase64(buffer: ArrayBuffer) {
	return btoa(
		new Uint8Array(buffer).reduce((data, byte) => {
			return data + String.fromCharCode(byte);
		}, '')
	);
}

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

	async getSubjectsWithHomework(): Promise<{ subjects: Subject[] }> {
		return {
			subjects: Array.from(this.subjects).map(([_key, val]) => val)
		};
	}

	async addSubject(subject: Subject): Promise<{ id: number }> {
		subject.id = this.idCounter++;
		this.subjects.set(subject.id, subject);
		return { id: subject.id };
	}

	async removeSubject(options: { id: number }): Promise<void> {
		this.subjects.delete(options.id);
	}

	async editSubject(subject: Subject): Promise<void> {
		this.subjects.set(subject.id, subject);
	}

	pickImage(): Promise<{ data: string; uri: string }> {
		return new Promise((resolve) => {
			const input = document.createElement('input');
			input.type = 'file';
			input.accept = 'image/*';

			input.onchange = (e) => {
				const target = e.target as HTMLInputElement;
				const file = target.files?.[0];

				if (file) {
					const reader = new FileReader();
					reader.readAsArrayBuffer(file);

					reader.onload = async (readerEvent) => {
						const content = readerEvent.target?.result as ArrayBuffer;
						const data = 'data:image/jpeg;base64,' + bufferToBase64(content);
						const uri = URL.createObjectURL(file);
						resolve({ data, uri });
					};
				}

				input.remove();
			};

			input.click();
		});
	}

	async getHomeworks(): Promise<{ homeworks: Homework[] }> {
		return {
			homeworks: Array.from(this.subjects)
				.map(([_key, val]) => val.homeworks)
				.flat()
		};
	}

	async addHomework(homework: Homework): Promise<{ id: number; image: string }> {
		return { id: this.idCounter++, image: homework.image as string };
	}

	async removeHomework(options: { id: number }): Promise<void> {
		this.subjects.forEach((subj) => {
			subj.homeworks = subj.homeworks.filter((hw) => hw.id !== options.id);
		});
	}

	async removeOldHomework(): Promise<void> {
		this.subjects.forEach((subj) => {
			subj.homeworks = subj.homeworks.filter(
				(hw) => !(hw.done && (hw.dueTo ?? Infinity) < Date.now())
			);
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

	async setTimetableSlot(options: { id: number; subjectId: number }): Promise<void> {
		this.timetable[options.id] = options.subjectId;
	}

	async getTimetableSlots(): Promise<{ slots: { id: number; subjectId: number }[] }> {
		return {
			slots: this.timetable.filter((val) => val != null).map((s, i) => ({ id: i, subjectId: s }))
		};
	}

	async clearTimetableSlot(options: { id: number }): Promise<void> {
		this.timetable[options.id] = null;
	}

	setNotificationOptions(_options: {
		allow: boolean;
		time: string;
		interval: number;
	}): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async exportContent(): Promise<void> {
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
	}

	async importContent(): Promise<void> {
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
	}
}
