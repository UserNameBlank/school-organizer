export interface Homework {
	id: number;
	desc: string;
	subjectId: number;
	dueTo: Date | null;
	done: boolean;
}
