export interface PreferencesPlugin {
	getString(options: { key: String }): Promise<{ value: string }>;
	setString(options: { key: String; value: string }): Promise<void>;

	getLong(options: { key: String }): Promise<{ value: number }>;
	setLong(options: { key: String; value: number }): Promise<void>;
}
