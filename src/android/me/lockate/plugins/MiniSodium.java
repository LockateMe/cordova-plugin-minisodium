package me.lockate.plugins;

import android.util.Log;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import org.libsodium.jni.NaCl;
import org.libsodium.jni.Sodium;

public class MiniSodium extends CordovaPlugin {
	private static final String LOGTAG = "MiniSodium";
	private static char[] HEX_CHARS = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};

	private static Sodium libsodium;

	@Override
	public void initialize(CordovaInterface cordova, CordovaWebView webView){
		super.initialize(cordova, webView);

		libsodium = NaCl.sodium();
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
						byte[] cipher = new byte[messageLen + libsodium.crypto_secretbox_macbytes()];

						int cryptoStatus = libsodium.crypto_secretbox_easy(cipher, message, messageLen, nonce, key);
						if (cryptoStatus != 0){
							Log.d(LOGTAG, "cryptoStatus:" + cryptoStatus);
							callbackContext.error("CANNOT_ENCRYPT");
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
						byte[] message = new byte[cipherLen - libsodium.crypto_secretbox_macbytes()];

						int cryptoStatus = libsodium.crypto_secretbox_open_easy(message, cipher, cipherLen, nonce, key);
						if (cryptoStatus != 0){
							Log.d(LOGTAG, "cryptoStatus:" + cryptoStatus);
							callbackContext.error("CANNOT_DECRYPT");
							return;
						}

						callbackContext.success(dumpHex(message));
				}
			});

			return true;
		} else if (action.equals("crypto_sign_keypair")){
			cordova.getThreadPool().execute(new Runnable(){
				public void run(){
					byte[] pk = new byte[libsodium.crypto_sign_publickeybytes()];
					byte[] sk = new byte[libsodium.crypto_sign_secretkeybytes()];

					int cryptoStatus = libsodium.crypto_sign_keypair(pk, sk);

					if (cryptoStatus != 0){
						Log.d(LOGTAG, "cryptoStatus:" + cryptoStatus);
						callbackContext.error("CANNOT_GENERATE_KEYPAIR");
						return;
					}

					JSONObject resultObj = new JSONObject();
					try {
						resultObj.put("sk", dumpHex(sk));
						resultObj.put("pk", dumpHex(pk));
					} catch (Exception e){
						callbackContext.error(e.getMessage());
						return;
					}

					callbackContext.success(resultObj);
				}
			});

			return true;
		} else if (action.equals("crypto_sign_seed_keypair")){
			String seedHex;

			try {
				seedHex = args.getString(0);
			} catch (Exception e){
				callbackContext.error(e.getMessage());
				return false;
			}

			final byte[] seed = fromHex(seedHex);

			cordova.getThreadPool().execute(new Runnable(){
				public void run(){
					byte[] pk = new byte[libsodium.crypto_sign_publickeybytes()];
					byte[] sk = new byte[libsodium.crypto_sign_secretkeybytes()];

					int cryptoStatus = libsodium.crypto_sign_seed_keypair(pk, sk, seed);

					if (cryptoStatus != 0){
						Log.d(LOGTAG, "cryptoStatus:" + cryptoStatus);
						callbackContext.error("CANNOT_GENERATE_KEYPAIR");
						return;
					}

					JSONObject resultObj = new JSONObject();
					try {
						resultObj.put("sk", dumpHex(sk));
						resultObj.put("pk", dumpHex(pk));
					} catch (Exception e){
						callbackContext.error(e.getMessage());
						return;
					}

					callbackContext.success(resultObj);
				}
			});

			return true;
		} else if (action.equals("crypto_sign")){
			String mHex, skHex;

			try {
				mHex = args.getString(0);
				skHex = args.getString(1);
			} catch (Exception e){
				callbackContext.error(e.getMessage());
				return false;
			}

			final byte[] m = fromHex(mHex);
			final int mlen = m.length;
			final byte[] sk = fromHex(skHex);

			cordova.getThreadPool().execute(new Runnable(){
				public void run(){
					byte[] sig = new byte[mlen + libsodium.crypto_sign_bytes()];
					int[] slen = new int[1];
					slen[0] = sig.length;

					int cryptoStatus = libsodium.crypto_sign(sig, slen, m, mlen, sk);

					if (cryptoStatus != 0){
						Log.d(LOGTAG, "cryptoStatus:" + cryptoStatus);
						callbackContext.error("CANNOT_SIGN");
						return;
					}

					callbackContext.success(dumpHex(sig));
				}
			});

			return true;
		} else if (action.equals("crypto_sign_open")){
			String sigHex, pkHex;

			try {
				sigHex = args.getString(0);
				pkHex = args.getString(1);
			} catch (Exception e){
				callbackContext.error(e.getMessage());
				return false;
			}

			final byte[] sig = fromHex(sigHex);
			final int slen = sig.length;
			final byte[] pk = fromHex(pkHex);

			cordova.getThreadPool().execute(new Runnable(){
				public void run(){
					byte[] m = new byte[slen - libsodium.crypto_sign_bytes()];
					int[] mlen = new int[1];
					mlen[0] = m.length;

					int cryptoStatus = libsodium.crypto_sign_open(m, mlen, sig, slen, pk);

					if (cryptoStatus != 0){
						Log.d(LOGTAG, "cryptoStatus:" + cryptoStatus);
						callbackContext.success(0);
					} else {
						callbackContext.success(dumpHex(m));
					}
				}
			});

			return true;
		} else if (action.equals("crypto_sign_detached")){
			String mHex, skHex;

			try {
				mHex = args.getString(0);
				skHex = args.getString(1);
			} catch (Exception e){
				callbackContext.error(e.getMessage());
				return false;
			}

			final byte[] m = fromHex(mHex);
			final int mlen = m.length;
			final byte[] sk = fromHex(skHex);

			cordova.getThreadPool().execute(new Runnable(){
				public void run(){
					byte[] sig = new byte[libsodium.crypto_sign_bytes()];
					int[] slen = new int[1];
					slen[0] = libsodium.crypto_sign_bytes();

					int cryptoStatus = libsodium.crypto_sign_detached(sig, slen, m, mlen, sk);

					if (cryptoStatus != 0){
						Log.d(LOGTAG, "cryptoStatus:" + cryptoStatus);
						callbackContext.error("CANNOT_SIGN");
						return;
					}

					callbackContext.success(dumpHex(sig));
				}
			});

			return true;
		} else if (action.equals("crypto_sign_verify_detached")){
			String sHex, mHex, pkHex;

			try {
				sHex = args.getString(0);
				mHex = args.getString(1);
				pkHex = args.getString(2);
			} catch (Exception e){
				callbackContext.error(e.getMessage());
				return false;
			}

			final byte[] s = fromHex(sHex);
			final byte[] m = fromHex(mHex);
			final int mlen = m.length;
			final byte[] pk = fromHex(pkHex);

			cordova.getThreadPool().execute(new Runnable(){
				public void run(){
					int cryptoStatus = libsodium.crypto_sign_verify_detached(s, m, mlen, pk);

					if (cryptoStatus == 0){
						callbackContext.success(1);
					} else {
						callbackContext.success(0);
					}
				}
			});

			return true;
		} else if (action.equals("crypto_sign_ed25519_sk_to_seed")){
			String skHex;

			try {
				skHex = args.getString(0);
			} catch (Exception e){
				callbackContext.error(e.getMessage());
				return false;
			}

			final byte[] sk = fromHex(skHex);

			cordova.getThreadPool().execute(new Runnable(){
				public void run(){
					byte[] seed = new byte[libsodium.crypto_sign_seedbytes()];

					int cryptoStatus = libsodium.crypto_sign_ed25519_sk_to_seed(seed, sk);

					if (cryptoStatus != 0){
						Log.d(LOGTAG, "cryptoStatus:" + cryptoStatus);
						callbackContext.error("CANNOT_COMPUTE");
						return;
					}

					callbackContext.success(dumpHex(seed));
				}
			});

			return true;
		} else if (action.equals("crypto_sign_ed25519_sk_to_pk")){
			String skHex;

			try {
				skHex = args.getString(0);
			} catch (Exception e){
				callbackContext.error(e.getMessage());
				return false;
			}

			final byte[] sk = fromHex(skHex);

			cordova.getThreadPool().execute(new Runnable(){
				public void run(){
					byte[] pk = new byte[libsodium.crypto_sign_publickeybytes()];

					int cryptoStatus = libsodium.crypto_sign_ed25519_sk_to_pk(pk, sk);

					if (cryptoStatus != 0){
						Log.d(LOGTAG, "cryptoStatus:" + cryptoStatus);
						callbackContext.error("CANNOT_COMPUTE");
						return;
					}

					callbackContext.success(dumpHex(pk));
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
