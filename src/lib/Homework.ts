export interface Homework {
	id: number;
	desc: string;
	subject_id: number;
	due_to: Date | null;
	done: boolean;
}
