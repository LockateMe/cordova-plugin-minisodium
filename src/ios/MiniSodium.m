#import "MiniSodium.h"

#import <Cordova/CDV.h>
#import <Cordova/CDVPluginResult.h>

#import "sodium.h"

@implementation MiniSodium

- (void)pluginInitialize {
	self.sodiumInitStatus = sodium_init();
}

- (void)crypto_secretbox_easy:(CDVInvokedUrlCommand*) command {
	//Calling sodium_init at each sodium call. It doesn't overload the required resources, and ensures that an error can be thrown should the call fail
	if (self.sodiumInitStatus == -1){
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"SODIUM_INIT_FAILED"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
		return;
	}

	NSString *messageHex = [command.arguments objectAtIndex: 0];
	const unsigned char* message = [self from_hex:messageHex];
	const unsigned long long mlen = (unsigned long long) [messageHex length] / 2;

	NSString *nonceHex = [command.arguments objectAtIndex: 1];
	const unsigned char* nonce = [self from_hex: nonceHex];

	NSString *keyHex = [command.arguments objectAtIndex: 2];
	const unsigned char* key = [self from_hex: keyHex];

 	unsigned long long clen = (unsigned long long)(mlen + crypto_secretbox_MACBYTES);
	unsigned char* c = (unsigned char*) malloc(clen);

	crypto_secretbox_easy(c, message, mlen, nonce, key);

	NSString *cHex = [self to_hex: c withLength: clen];

	CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: cHex];
	[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];

	free(c);
}

- (void)crypto_secretbox_open_easy:(CDVInvokedUrlCommand*) command {
	//Calling sodium_init at each sodium call. It doesn't overload the required resources, and ensures that an error can be thrown should the call fail
	if (self.sodiumInitStatus == -1){
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"SODIUM_INIT_FAILED"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
		return;
	}

	NSString* ciphertextHex = [command.arguments objectAtIndex: 0];
	const unsigned char* ciphertext = [self from_hex: ciphertextHex];
	const unsigned long long clen = (unsigned long long)[ciphertextHex length] / 2;

	NSString *nonceHex = [command.arguments objectAtIndex: 1];
	const unsigned char* nonce = [self from_hex: nonceHex];

	NSString *keyHex = [command.arguments objectAtIndex: 2];
	const unsigned char* key = [self from_hex: keyHex];

	const unsigned long long mlen = (unsigned long long) clen - crypto_secretbox_MACBYTES;
	unsigned char* m = (unsigned char*) malloc(mlen);

	if (crypto_secretbox_open_easy(m , ciphertext, clen, nonce, key) != 0){
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"CANNOT_DECRYPT"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
	} else {
		NSString *mHex = [self to_hex: m withLength: mlen];
		//NSData *mNSData = [[NSData alloc] initWithBytes: m length: mlen];

		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: mHex];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
	}

	free(m);
}

-(void)crypto_sign_keypair:(CDVInvokedUrlCommand*) command {
	if (self.sodiumInitStatus == -1){
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"SODIUM_INIT_FAILED"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
		return;
	}

	//No seed is provided
	unsigned char* pk = (unsigned char*) malloc(crypto_sign_PUBLICKEYBYTES);
	unsigned char* sk = (unsigned char*) malloc(crypto_sign_SECRETKEYBYTES);

	if (crypto_sign_keypair(pk, sk) != 0){
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"CANNOT_GENERATE_KEYPAIR"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
	} else {
		NSString *pkHex = [self to_hex: pk withLength: crypto_sign_PUBLICKEYBYTES];
		NSString *skHex = [self to_hex: sk withLength: crypto_sign_SECRETKEYBYTES];

		NSDictionary *resObj = [NSDictionary dictionaryWithDictionary:@{@"pk": pkHex, @"sk": skHex}];
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsDictionary: resObj];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
	}

	free(pk);
	free(sk);
}

-(void)crypto_sign_seed_keypair:(CDVInvokedUrlCommand*) command {
	if (self.sodiumInitStatus == -1){
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"SODIUM_INIT_FAILED"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
		return;
	}

	//A seed is provided
	NSString *seedHex = [command.arguments objectAtIndex: 0];
	const unsigned char* seed = [self from_hex: seedHex];
	const unsigned long long seedlen = (unsigned long long)[seedHex length] / 2;

	if (seedlen != crypto_sign_SEEDBYTES){
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"INVALID_SEED_LENGTH"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
		return;
	}

	unsigned char* pk = (unsigned char*) malloc(crypto_sign_PUBLICKEYBYTES);
	unsigned char* sk = (unsigned char*) malloc(crypto_sign_SECRETKEYBYTES);

	if (crypto_sign_seed_keypair(pk, sk, seed) != 0){
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"CANNOT_GENERATE_KEYPAIR"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
	} else {
		NSString *pkHex = [self to_hex: pk withLength: crypto_sign_PUBLICKEYBYTES];
		NSString *skHex = [self to_hex: sk withLength: crypto_sign_SECRETKEYBYTES];

		NSDictionary *resObj = [NSDictionary dictionaryWithDictionary:@{@"pk": pkHex, @"sk": skHex}];
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsDictionary: resObj];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
	}

	free(pk);
	free(sk);
}

-(void)crypto_sign:(CDVInvokedUrlCommand*) command {
	if (self.sodiumInitStatus == -1){
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"SODIUM_INIT_FAILED"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
		return;
	}

	NSString *mHex = [command.arguments objectAtIndex: 0];
	const unsigned char* m = [self from_hex: mHex];
	const unsigned long long mlen = (unsigned long long) [mHex length] / 2;

	NSString *skHex = [command.arguments objectAtIndex: 1];
	const unsigned char* sk = [self from_hex: skHex];
	const unsigned long long sklen = (unsigned long long) [skHex length] / 2;

	unsigned long long slen = mlen + crypto_sign_BYTES;
	unsigned char* s = (unsigned char*) malloc(slen);

	if (crypto_sign(s, &slen, m, mlen, sk) != 0){
		//Signature failure
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"CANNOT_SIGN"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
	} else {
		//Signature success
		NSString *sHex = [self to_hex: s withLength: slen];
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: sHex];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
	}

	free(s);
}

-(void)crypto_sign_open:(CDVInvokedUrlCommand*) command {
	if (self.sodiumInitStatus == -1){
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"SODIUM_INIT_FAILED"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
		return;
	}

	NSString *sHex = [command.arguments objectAtIndex: 0];
	const unsigned char* s = [self from_hex: sHex];
	const unsigned long long slen = (unsigned long long) [sHex length] / 2;

	NSString *pkHex = [command.arguments objectAtIndex: 1];
	const unsigned char* pk = [self from_hex: pkHex];
	const unsigned long long pklen = (unsigned long long) [pkHex length] / 2;

	unsigned long long mlen = slen - crypto_sign_BYTES;
	unsigned char* m = (unsigned char*) malloc(mlen);

	int sigStatus = crypto_sign_open(m, &mlen, s, slen, pk);

	CDVPluginResult *result;

	if (sigStatus == 0){
		NSString *mHex = [self to_hex: m withLength: mlen];
		result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: mHex];
	} else {
		result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsBool: false];
	}

	[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];

	free(m);
}

-(void)crypto_sign_detached:(CDVInvokedUrlCommand*) command {
	if (self.sodiumInitStatus == -1){
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"SODIUM_INIT_FAILED"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
		return;
	}

	NSString *mHex = [command.arguments objectAtIndex: 0];
	const unsigned char* m = [self from_hex: mHex];
	const unsigned long long mlen = (unsigned long long)[mHex length] / 2;

	NSString *skHex = [command.arguments objectAtIndex: 1];
	const unsigned char* sk = [self from_hex: skHex];

	unsigned long long slen;
	unsigned char* s = (unsigned char*)malloc(crypto_sign_BYTES);

	if (crypto_sign_detached(s, &slen, m, mlen, sk) != 0){
		//Signature failure
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"CANNOT_SIGN"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
	} else {
		//Signature success
		NSString *sHex = [self to_hex: s withLength: slen];
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: sHex];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
	}

	free(s);
}

-(void)crypto_sign_verify_detached:(CDVInvokedUrlCommand*) command {
	if (self.sodiumInitStatus == -1){
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"SODIUM_INIT_FAILED"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
		return;
	}

	NSString *sHex = [command.arguments objectAtIndex: 0];
	const unsigned char* s = [self from_hex: sHex];
	const unsigned long long slen = (unsigned long long)[sHex length] / 2;

	if (slen != crypto_sign_BYTES){
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"INVALID_SIGNATURE_LENGTH"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
		return;
	}

	NSString *mHex = [command.arguments objectAtIndex: 1];
	const unsigned char* m = [self from_hex: mHex];
	const unsigned long long mlen = (unsigned long long) [mHex length] / 2;

	NSString *pkHex = [command.arguments objectAtIndex: 2];
	const unsigned char* pk = [self from_hex: pkHex];
	const unsigned long long pklen = (unsigned long long) [pkHex length] / 2;

	int sigStatus = crypto_sign_verify_detached(s, m, mlen, pk);

	CDVPluginResult *result;
	if (sigStatus == 0){
		result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsBool: true];
	} else {
		result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsBool: false];
	}

	[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
}

-(void)crypto_sign_ed25519_sk_to_seed:(CDVInvokedUrlCommand*) command {
	if (self.sodiumInitStatus == -1){
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"SODIUM_INIT_FAILED"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
		return;
	}

	NSString *skHex = [command.arguments objectAtIndex: 0];
	const unsigned char* sk = [self from_hex: skHex];
	const unsigned long long sklen = (unsigned long long) [skHex length] / 2;

	unsigned char* seed = (unsigned char*) malloc(crypto_sign_SEEDBYTES);

	CDVPluginResult *result;
	if (crypto_sign_ed25519_sk_to_seed(seed, sk) != 0){
		result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"CANNOT_COMPUTE"];
	} else {
		NSString *seedHex = [self to_hex: seed withLength: crypto_sign_SEEDBYTES];
		result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: seedHex];
	}

	[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];

	free(seed);
}

-(void)crypto_sign_ed25519_sk_to_pk:(CDVInvokedUrlCommand*) command {
	if (self.sodiumInitStatus == -1){
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"SODIUM_INIT_FAILED"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
		return;
	}

	NSString *skHex = [command.arguments objectAtIndex: 0];
	const unsigned char* sk = [self from_hex: skHex];
	const unsigned long long sklen = (unsigned long long) [skHex length] / 2;

	unsigned char* pk = (unsigned char*) malloc(crypto_sign_PUBLICKEYBYTES);

	CDVPluginResult *result;
	if (crypto_sign_ed25519_sk_to_pk(pk, sk) != 0){
		result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"CANNOT_COMPUTE"];
	} else {
		NSString *pkHex = [self to_hex: pk withLength: crypto_sign_PUBLICKEYBYTES];
		result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: pkHex];
	}

	[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];

	free(pk);
}

-(unsigned char*)from_hex:(NSString*)s {
	unsigned char whole_byte;
	char byte_chars[3] = {'\0', '\0', '\0'};

	NSMutableData *sMut = [[NSMutableData alloc] init];
	for (int i = 0; i < [s length] / 2; i++){
		byte_chars[0] = [s characterAtIndex: 2*i];
		byte_chars[1] = [s characterAtIndex: 2*i+1];
		whole_byte = strtol(byte_chars, NULL, 16);
		[sMut appendBytes: &whole_byte length: 1];
	}

	unsigned char* sBytes = (unsigned char*) [sMut bytes];
	return sBytes;
}

-(NSString*)to_hex:(unsigned char*)s withLength:(unsigned long long) slen {
	NSMutableString *hexMut = [[NSMutableString alloc] init];
	for (int i = 0; i < slen; i++){
		[hexMut appendFormat: @"%02x", s[i]];
	}

	return [hexMut lowercaseString];
}

@end
