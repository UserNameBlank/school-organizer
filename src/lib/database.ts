import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import type { Subject } from './Subject';
import type { Homework } from './Homework';

class DatabaseService {
	platform = Capacitor.getPlatform();
	sqlite = CapacitorSQLite;
	connection = new SQLiteConnection(CapacitorSQLite);
	dbName = 'default';
	db!: SQLiteDBConnection;

	async init() {
		if (this.platform === 'web') {
			await this.connection.initWebStore();
		}

		this.db = await this.connection.createConnection(this.dbName, false, 'no-encryption', 1, false);
		await this.db.open();

		await this.db.execute(`CREATE TABLE IF NOT EXISTS subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      color TEXT NOT NULL
    );`);
		await this.db.execute(`CREATE TABLE IF NOT EXISTS homework (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      desc TEXT NOT NULL,
      subject_id INTEGER NOT NULL,
      due_to INTEGER,
      done INTEGER DEFAULT 0
    );`);
		await this.db.execute(`CREATE TABLE IF NOT EXISTS timetable (
      slot INTEGER PRIMARY KEY,
      subject_id INTEGER NOT NULL
    );`);

		if (this.platform === 'web') {
			await this.saveToStore();
		}
	}

	async getSubjects(): Promise<Subject[]> {
		return (await this.db.query('SELECT * FROM subjects;')).values as Subject[];
	}

	async addSubject(subject: Subject): Promise<number> {
		const res = await this.db.run(`INSERT INTO subjects (name, color) VALUES (?, ?);`, [
			subject.name,
			subject.color
		]);
		if (res.changes !== undefined && res.changes.lastId !== undefined && res.changes.lastId > 0) {
			return res.changes.lastId;
		} else {
			throw new Error('database.addUser: lastId not returned');
		}
	}

	async removeSubject(id: number): Promise<void> {
		await this.db.run(`DELETE FROM subjects WHERE id = ?;`, [id]);
		await this.db.run(`DELETE FROM homework WHERE subject_id = ?;`, [id]);
		await this.db.run(`DELETE FROM timetable WHERE subject_id = ?;`, [id]);
	}

	async editSubject(subject: Subject): Promise<void> {
		await this.db.run(`UPDATE subjects SET name = ?, color = ? WHERE id = ?;`, [
			subject.name,
			subject.color,
			subject.id
		]);
	}

	async getHomeworks(): Promise<Homework[]> {
		return (await this.db.query('SELECT * FROM homework;')).values!.map((it) => {
			return {
				id: it.id,
				desc: it.desc,
				subject_id: it.subject_id,
				due_to: it.due_to === null ? null : new Date(it.due_to),
				done: it.done > 0
			} as Homework;
		});
	}

	async addHomework(homework: Homework): Promise<number> {
		const res = await this.db.run(
			`INSERT INTO homework (desc, subject_id, due_to) VALUES (?, ?, ?);`,
			[homework.desc, homework.subject_id, homework.due_to?.getTime()]
		);
		if (res.changes !== undefined && res.changes.lastId !== undefined && res.changes.lastId > 0) {
			return res.changes.lastId;
		} else {
			throw new Error('database.addUser: lastId not returned');
		}
	}

	async removeHomework(id: number): Promise<void> {
		await this.db.run(`DELETE FROM homework WHERE id = ?;`, [id]);
	}

	async removeOldHomework() {
		await this.db.run(
			`DELETE FROM homework WHERE due_to IS NOT NULL AND done > 0 AND due_to < ?;`,
			[new Date().getTime()]
		);
	}

	async setHomeworkDone(id: number, done: boolean): Promise<void> {
		await this.db.run(`UPDATE homework SET done = ? WHERE id = ?;`, [done ? 1 : 0, id]);
	}

	async setSlot(slot: number, subject_id: number): Promise<void> {
		await this.db.run(`INSERT INTO timetable (slot, subject_id) VALUES (?, ?);`, [
			slot,
			subject_id
		]);
	}

	async getSlots(): Promise<{ slot: number; subject_id: number }[]> {
		return (await this.db.query('SELECT * FROM timetable;')).values as {
			slot: number;
			subject_id: number;
		}[];
	}

	async clearSlot(slot: number): Promise<void> {
		await this.db.run(`DELETE FROM timetable WHERE slot = ?;`, [slot]);
	}

	async saveToStore() {
		await this.connection.saveToStore(this.dbName);
	}
}

export const dataService = new DatabaseService();
