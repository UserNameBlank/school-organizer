import { registerPlugin } from '@capacitor/core';
import type { PreferencesPlugin } from './definitions';

export const Preferences = registerPlugin<PreferencesPlugin>('AppPreferences');
