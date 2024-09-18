import type { Homework } from './Homework';

export interface Subject {
	id: number;
	name: string;
	color: string;
	homeworks: Homework[];
}
