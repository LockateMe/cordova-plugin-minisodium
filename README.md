# A minimal sodium plugin for Cordova - for iOS and Android

A minimal build of the [libsodium](https://github.com/jedisct1/libsodium.git) library, as a plugin for Cordova applications on iOS and Android.

## Bound methods

### Secretbox construction
* `crypto_secretbox_easy`
* `crypto_secretbox_open_easy`

### Public key signatures (Ed25519)
* `crypto_sign`
* `crypto_sign_open`
* `crypto_sign_detached`
* `crypto_sign_verify_detached`
* `crypto_sign_keypair`
* `crypto_sign_seed_keypair`
* `crypto_sign_ed25519_sk_to_pk`
* `crypto_sign_ed25519_sk_to_seed`

## Installation

	cordova plugin add cordova-plugin-minisodium

__Note:__ This plugin is not built for Android API levels below 16. To set the `minSdkVersion` property in your Cordova app. Add the following line in `config.xml`:
```
<preference name="android-minSdkVersion" value="16"/>
```

## Usage

## Testing

1. Create a Cordova/Phonegap application
2. Add the iOS and/or the Android platforms
3. Add the [testing framework](https://github.com/apache/cordova-plugin-test-framework) and [bind its page](https://github.com/apache/cordova-plugin-test-framework#running-plugin-tests) as the main page of the app
4. Add the following prefenrence in `config.xml`
```
<preference name="android-minSdkVersion" value="16"/>
```
5. Add this plugin
6. Add this plugin's test cases, by adding the plugin located in the `tests` folder
```
	phonegap plugin add https://github.com/LockateMe/cordova-plugin-minisodium.git#:/tests
```

## License

MIT license
