package me.lockate.plugins;

import android.util.Log;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MiniSodium extends CordovaPlugin {
	private static final String LOGTAG = "MiniSodium";
	private static char[] HEX_CHARS = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};

	@Override
	public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
		if (actions.equals("crypto_secretbox_easy")){
			String messageHex, nonceHex, keyHex;
			try {
				messageHex = args.getString(0);
				nonceHex = args.getString(1);
				keyHex = args.getString(2);
			} catch (Exception e){
				callbackContext.error(e.getMessage());
				return;
			}

			final byte[] message = fromHex(messageHex);
			final byte[] nonce = fromHex(nonceHex);
			final byte[] key = fromHex(keyHex);

			

			return true;
		} else if (action.equals("crypto_secretbox_open_easy")){

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
