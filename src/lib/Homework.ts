export interface Homework {
	id: number;
	desc: string;
	subjectId: number;
	dueTo: number | null;
	done: boolean;
	image: string | null;
}
