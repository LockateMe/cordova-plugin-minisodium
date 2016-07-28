#import "MiniSodium.h"

#import <Cordova/CDV.h>
#import <Cordova/CDVPluginResult.h>

#import "sodium.h"

@implementation MiniSodium

- (void)crypto_secretbox_easy:(CDVInvokedUrlCommand*) command {
	//Calling sodium_init at each sodium call. It doesn't overload the required resources, and ensures that an error can be thrown should the call fail
	if (sodium_init() == -1){
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
	if (sodium_init() == -1){
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

		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: mHex];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
	}

	free(m);
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

-(NSString*)to_hex:(unsigned char*)s withLength:(unsigned int) slen {
	NSMutableString *hexMut = [[NSMutableString alloc] init];
	for (int i = 0; i < slen; i++){
		[hexMut appendFormat: @"%02x", s[i]];
	}

	return [hexMut lowercaseString];
}

@end
