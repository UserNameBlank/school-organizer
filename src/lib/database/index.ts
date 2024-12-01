import { registerPlugin } from '@capacitor/core';
import type { DatabasePlugin } from './definitions';

const Database = registerPlugin<DatabasePlugin>('Database', {
	web: () => import('./web').then((m) => new m.DatabaseWeb())
});

export const dataService = Database;
