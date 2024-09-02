import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.schoolorganizer.app',
	appName: 'School Organizer',
	webDir: 'build',

	server: {
		androidScheme: 'http'
	},

	plugins: {
		CapacitorSQLite: {
			androidIsEncryption: false,
			androidBiometric: {
				biometricAuth: false,
				biometricTitle: 'Biometric login for capacitor sqlite',
				biometricSubTitle: 'Log in using your biometric credential'
			}
		}
	}
};

export default config;
