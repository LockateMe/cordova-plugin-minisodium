"use strict";
var exec = require('cordova/exec');

function isValidInput(i, varName, expectedLength){
	if (expectedLength){
		if (is_hex(i)){
			if (i.length != expectedLength * 2) throw new TypeError(varName + ' must be ' + expectedLength + ' bytes long');
		} else if (i instanceof Uint8Array && i.length > 0){
			if (i.length != expectedLength) throw new TypeError(varName + ' must be ' + expectedLength + ' bytes long');
		} else throw new TypeError(varName + ' must be a string or a Uint8Array, and must ' + expectedLength + ' bytes long');
	} else {
		if (!(is_hex(i) || (i instanceof Uint8Array && i.length > 0))) throw new TypeError(varName + ' must be either a string or a Uint8Array');
	}
}

function resultHandlerFactory(cb){
	return function(r){
		cb(undefined, r);
	}
}

var MiniSodium = {
	crypto_secretbox_KEYBYTES: 32,
	crypto_secretbox_NONCEBYTES: 24,
	crypto_secretbox_MACBYTES: 16,
	crypto_secretbox_easy: function(message, nonce, key, callback){
		if (typeof callback != 'function') throw new TypeError('callback must be a function');

		isValidInput(message, 'message');
		isValidInput(nonce, 'nonce', MiniSodium.crypto_secretbox_NONCEBYTES);
		isValidInput(key, 'key', MiniSodium.crypto_secretbox_KEYBYTES);

		message = to_hex(message);
		nonce = to_hex(nonce);
		key = to_hex(key);

		var params = [message, nonce, key];

		cordova.exec(resultHandlerFactory(callback), callback, 'MiniSodium', 'crypto_secretbox_easy', params);
	},
	crypto_secretbox_open_easy: function(ciphertext, nonce, key, callback){
		if (typeof callback != 'function') throw new TypeError('callback must be a function');

		isValidInput(ciphertext, 'ciphertext');
		isValidInput(nonce, 'nonce', MiniSodium.crypto_secretbox_NONCEBYTES);
		isValidInput(key, 'key', MiniSodium.crypto_secretbox_KEYBYTES);

		ciphertext = to_hex(ciphertext);
		nonce = to_hex(nonce);
		key = to_hex(key);

		var params = [ciphertext, nonce, key];

		cordova.exec(resultHandlerFactory(callback), callback, 'MiniSodium', 'crypto_secretbox_open_easy', params);
	},
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
		return typeof s == 'string' && s.length % 2 == 0 && /^([a-f]|[0-9])+$/ig.test(s);
	}
};

module.exports = MiniSodium;
