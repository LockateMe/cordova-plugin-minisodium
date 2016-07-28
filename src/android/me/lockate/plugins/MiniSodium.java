package me.lockate.plugins;

import android.util.Log;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import org.libsodium.jni.Sodium;

public class MiniSodium extends CordovaPlugin {
	private static final String LOGTAG = "MiniSodium";
	private static char[] HEX_CHARS = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};

	//private static Sodium libsodium = new Sodium();

	@Override
	public void initialize(CordovaInterface cordova, CordovaWebView webView){
		super.initialize(cordova, webView);

		Sodium.sodium_init();
	}

	@Override
	public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
		if (action.equals("crypto_secretbox_easy")){
			String messageHex, nonceHex, keyHex;
			try {
				messageHex = args.getString(0);
				nonceHex = args.getString(1);
				keyHex = args.getString(2);
			} catch (Exception e){
				callbackContext.error(e.getMessage());
				return false;
			}

			final byte[] message = fromHex(messageHex);
			final int messageLen = message.length;
			final byte[] nonce = fromHex(nonceHex);
			final byte[] key = fromHex(keyHex);

			cordova.getThreadPool().execute(new Runnable(){
				public void run(){
						byte[] cipher = new byte[messageLen + SodiumConstants.crypto_secretbox_macbytes()];

						int cryptoStatus = Sodium.crypto_secretbox_easy(cipher, message, messageLen, nonce, key);
						if (cryptoStatus != 0){
							callbackContext.error("status:" + cryptoStatus);
							return;
						}

						callbackContext.success(dumpHex(cipher));
				}
			});

			return true;
		} else if (action.equals("crypto_secretbox_open_easy")){
			String cipherHex, nonceHex, keyHex;

			try {
				cipherHex = args.getString(0);
				nonceHex = args.getString(1);
				keyHex = args.getString(2);
			} catch (Exception e){
				callbackContext.error(e.getMessage());
				return false;
			}

			final byte[] cipher = fromHex(cipherHex);
			final int cipherLen = cipher.length;
			final byte[] nonce = fromHex(nonceHex);
			final byte[] key = fromHex(keyHex);

			cordova.getThreadPool().execute(new Runnable(){
				public void run(){
						byte[] message = new byte[cipherLen - Sodium.crypto_secretbox_macbytes()];

						int cryptoStatus = Sodium.crypto_secretbox_open_easy(message, cipher, cipherLen, nonce, key);
						if (cryptoStatus != 0){
							callbackContext.error("status:" + cryptoStatus);
							return;
						}

						callbackContext.success(dumpHex(message));
				}
			});

			return true;
		} else {
			callbackContext.error("Invalid method: " + action);
			return false;
		}
	}

	private static String dumpHex(byte[] data){ //To hex. No spacing between bytes
		final int n = data.length;
		final StringBuilder sb = new StringBuilder(n * 2);
		for (int i = 0; i < n; i++){
			sb.append(HEX_CHARS[(data[i] >> 4) & 0x0f]);
			sb.append(HEX_CHARS[data[i] & 0x0f]);
		}
		return sb.toString();
	}

	private static byte[] fromHex(String h){
		h = h.toLowerCase();
		int hLength = h.length();
		if (hLength % 2 != 0) return null;
		byte[] original = new byte[(int) hLength / 2];

		for (int i = 0; i < hLength; i += 2){
			char lChar = h.charAt(i), rChar = h.charAt(i + 1);
			byte l = 0, r = 0;

			for (int j = 0; j < HEX_CHARS.length; j++){
				if (lChar == HEX_CHARS[j]) l = (byte) j;
				if (rChar == HEX_CHARS[j]) r = (byte) j;
			}
			byte currentByte = (byte) (l * 16 + r);
			original[(int) i / 2] = currentByte;
		}

		return original;
	}
}
