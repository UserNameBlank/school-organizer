set dotenv-load

build-apk:
  bunx cap build android --keystorepath ~/Documents/android-key.jks --keystorealias key0 --keystorepass $KEY_PASSWORD --keystorealiaspass $KEY_PASSWORD --androidreleasetype APK

build-sync:
  bun run build
  bunx cap sync
