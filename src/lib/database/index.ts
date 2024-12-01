import { registerPlugin } from '@capacitor/core';
import type { DatabasePlugin } from './definitions';

export const Database = registerPlugin<DatabasePlugin>('Database', {
	web: () => import('./web').then((m) => new m.DatabaseWeb())
});
