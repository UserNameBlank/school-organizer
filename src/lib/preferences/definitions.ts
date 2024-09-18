export interface PreferencesPlugin {
	getString(options: { key: string }): Promise<{ value: string }>;
	setString(options: { key: string; value: string }): Promise<void>;

	getLong(options: { key: string }): Promise<{ value: number }>;
	setLong(options: { key: string; value: number }): Promise<void>;
}
