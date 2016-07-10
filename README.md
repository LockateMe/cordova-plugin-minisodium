# A minimal sodium plugin for Cordova - for iOS and Android

A minimal build of the [libsodium](https://github.com/jedisct1/libsodium.git) library, as a plugin for Cordova applications on iOS and Android.

## Installation

	cordova plugin add cordova-plugin-minisodium

## Bound methods

* `crypto_secretbox_easy`
* `crypto_secretbox_open_easy`

## Usage

## Testing

1. Create a Cordova/Phonegap application
2. Add the iOS and/or the Android platforms
3. Add the [testing framework](https://github.com/apache/cordova-plugin-test-framework) and [bind its page](https://github.com/apache/cordova-plugin-test-framework#running-plugin-tests) as the main page of the app
4. Add this plugin
5. Add this plugin's test cases, by adding the plugin located in the `tests` folder
```
	phonegap plugin add https://github.com/LockateMe/cordova-plugin-minisodium.git#:/tests
```

## License

MIT license
