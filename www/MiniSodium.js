"use strict";
var exec = require('cordova/exec');

function isValidInput(i, varName, expectedLength){
	if (expectedLength){
		if (is_hex(i)){
			if (i.length != expectedLength * 2) throw new TypeError(varName + ' must be ' + expectedLength + ' bytes long');
		} else if (i instanceof Uint8Array){
			if (i.length != expectedLength) throw new TypeError(varName + ' must be ' + expectedLength + ' bytes long');
		} else throw new TypeError(varName + ' must be a string or a Uint8Array, and must ' + expectedLength + ' bytes long');
	} else {
		if (!(is_hex(i) || (i instanceof Uint8Array))) throw new TypeError(varName + ' must be either a string or a Uint8Array');
	}
}

function resultHandlerFactory(cb){
	return function(r){
		cb(undefined, r);
	}
}

var MiniSodium = {
	//Secretbox construction (methods and constants)
	crypto_secretbox_KEYBYTES: 32,
	crypto_secretbox_NONCEBYTES: 24,
	crypto_secretbox_MACBYTES: 16,
	crypto_secretbox_easy: function(message, nonce, key, callback){
		if (typeof callback != 'function') throw new TypeError('callback must be a function');

		try {
			isValidInput(message, 'message');
			isValidInput(nonce, 'nonce', MiniSodium.crypto_secretbox_NONCEBYTES);
			isValidInput(key, 'key', MiniSodium.crypto_secretbox_KEYBYTES);
		} catch (e){
			callback(e);
			return;
		}

		message = to_hex(message);
		nonce = to_hex(nonce);
		key = to_hex(key);

		var params = [message, nonce, key];

		cordova.exec(resultHandlerFactory(callback), callback, 'MiniSodium', 'crypto_secretbox_easy', params);
	},
	crypto_secretbox_open_easy: function(ciphertext, nonce, key, callback){
		if (typeof callback != 'function') throw new TypeError('callback must be a function');

		try {
			isValidInput(ciphertext, 'ciphertext');
			isValidInput(nonce, 'nonce', MiniSodium.crypto_secretbox_NONCEBYTES);
			isValidInput(key, 'key', MiniSodium.crypto_secretbox_KEYBYTES);
		} catch (e){
			callback(e);
			return;
		}

		ciphertext = to_hex(ciphertext);
		nonce = to_hex(nonce);
		key = to_hex(key);

		var params = [ciphertext, nonce, key];

		cordova.exec(resultHandlerFactory(callback), callback, 'MiniSodium', 'crypto_secretbox_open_easy', params);
	},
	//Ed25519 methods
	crypto_sign_BYTES: 64,
	crypto_sign_PUBLICKEYBYTES: 32,
	crypto_sign_SECRETKEYBYTES: 64,
	crypto_sign_SEEDBYTES: 32,
	crypto_sign_keypair: function(callback){
		if (typeof callback != 'function') throw new TypeError('callback must be a function')

		cordova.exec(resultHandlerFactory(callback), callback, 'MiniSodium', 'crypto_sign_keypair', []);
	},
	crypto_sign_seed_keypair: function(seed, callback){
		if (typeof callback != 'function') throw new TypeError('callback must be a function');

		try {
			isValidInput(seed, 'seed', MiniSodium.crypto_sign_SEEDBYTES);
		} catch (e){
			callback(e);
			return;
		}

		seed = to_hex(seed);
		var params = [seed];

		cordova.exec(resultHandlerFactory(callback), callback, 'MiniSodium', 'crypto_sign_seed_keypair', params);
	},
	crypto_sign: function(message, secretKey, callback){
		if (typeof callback != 'function') throw new TypeError('callback must be a function');

		try {
			isValidInput(message, 'message');
			isValidInput(secretKey, 'secretKey', MiniSodium.crypto_sign_SECRETKEYBYTES);

			//if (message.length == 0) throw new Error('message cannot be empty');
		} catch (e){
			callback(e);
			return;
		}

		message = to_hex(message);
		secretKey = to_hex(secretKey);

		var params = [message, secretKey];
		cordova.exec(resultHandlerFactory(callback), callback, 'MiniSodium', 'crypto_sign', params);
	},
	crypto_sign_open: function(signedMessage, publicKey, callback){
		if (typeof callback != 'function') throw new TypeError('callback must be a function');

		try {
			isValidInput(signedMessage, 'signedMessage');
			isValidInput(publicKey, 'publicKey', MiniSodium.crypto_sign_PUBLICKEYBYTES);
		} catch (e){
			callback(e);
			return;
		}

		signedMessage = to_hex(signedMessage);
		publicKey = to_hex(publicKey);

		if (signedMessage.length < MiniSodium.crypto_sign_BYTES){
			callback(new Error('signed message must be longer than crypto_sign_BYTES'));
			return;
		}

		var params = [signedMessage, publicKey];
		cordova.exec(resultHandlerFactory(callback), callback, 'MiniSodium', 'crypto_sign_open', params);
	},
	crypto_sign_detached: function(message, secretKey, callback){
		if (typeof callback != 'function') throw new TypeError('callback must be a function');

		try {
			isValidInput(message, 'message');
			isValidInput(secretKey, 'secretKey', MiniSodium.crypto_sign_SECRETKEYBYTES);

			//if (message.length == 0) throw new Error('message cannot be empty');
		} catch (e){
			callback(e);
			return;
		}

		message = to_hex(message);
		secretKey = to_hex(secretKey);

		var params = [message, secretKey];
		cordova.exec(resultHandlerFactory(callback), callback, 'MiniSodium', 'crypto_sign_detached', params);
	},
	crypto_sign_verify_detached: function(signature, message, publicKey, callback){
		if (typeof callback != 'function') throw new TypeError('callback must be a function');

		try {
			isValidInput(signature, 'signature', MiniSodium.crypto_sign_BYTES);
			isValidInput(message, 'message');
			isValidInput(publicKey, 'publicKey', MiniSodium.crypto_sign_PUBLICKEYBYTES);
		} catch (e){
			callback(e);
			return;
		}

		signature = to_hex(signature);
		message = to_hex(message);
		publicKey = to_hex(publicKey);

		var params = [signature, message, publicKey];
		cordova.exec(resultHandlerFactory(callback), callback, 'MiniSodium', 'crypto_sign_verify_detached', params);
	},
	crypto_sign_ed25519_sk_to_seed: function(secretKey, callback){
		if (typeof callback != 'function') throw new TypeError('callback must be a function');

		try {
			isValidInput(secretKey, 'secretKey', MiniSodium.crypto_sign_SECRETKEYBYTES);
		} catch (e){
			callback(e);
			return;
		}

		secretKey = to_hex(secretKey);
		var params = [secretKey];
		cordova.exec(resultHandlerFactory(callback), callback, 'MiniSodium', 'crypto_sign_ed25519_sk_to_seed', params);
	},
	crypto_sign_ed25519_sk_to_pk: function(secretKey, callback){
		if (typeof callback != 'function') throw new TypeError('callback must be a function');

		try {
			isValidInput(secretKey, 'secretKey', MiniSodium.crypto_sign_SECRETKEYBYTES);
		} catch (e){
			callback(e);
			return;
		}

		secretKey = to_hex(secretKey);
		var params = [secretKey];
		cordova.exec(resultHandlerFactory(callback), callback, 'MiniSodium', 'crypto_sign_ed25519_sk_to_pk', params);
	},
	//Hexdecimal encoding helpers
	from_hex: function(str) {
    if (!is_hex(str)) {
      throw new TypeError("The provided string doesn't look like hex data");
    }
    var result = new Uint8Array(str.length / 2);
    for (var i = 0; i < str.length; i += 2) {
      result[i >>> 1] = parseInt(str.substr(i, 2), 16);
    }
    return result;
  },
	to_hex: function(bytes) {
		if (is_hex(bytes)) return bytes;
		if (!(bytes instanceof Uint8Array)) throw new TypeError('bytes must be a Uint8Array instance');

    var str = "", b, c, x;
    for (var i = 0; i < bytes.length; i++) {
      c = bytes[i] & 0xf;
      b = bytes[i] >>> 4;
      x = (87 + c + (((c - 10) >> 8) & ~38)) << 8 |
          (87 + b + (((b - 10) >> 8) & ~38));
      str += String.fromCharCode(x & 0xff) + String.fromCharCode(x >>> 8);
    }
    return str;
  },
	is_hex: function(s){
		return typeof s === 'string' && s.length % 2 === 0 && (s.length > 0 ? /^([a-f]|[0-9])+$/ig.test(s) : true);
	}
};

var from_hex = MiniSodium.from_hex;
var to_hex = MiniSodium.to_hex;
var is_hex = MiniSodium.is_hex;

module.exports = MiniSodium;
