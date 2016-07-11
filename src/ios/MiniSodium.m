#import <Cordova/CDV.h>
#import <Cordova/CDVPluginResult.h>

#import <sodium.h>

@implementation MiniSodium

- (void)crypto_secretbox_easy:(CDVInvokedUrlCommand*) command {
	//Calling sodium_init at each sodium call. It doesn't overload the required resources, and ensures that an error can be thrown should the call fail
	if (sodium_init() == -1){
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"SODIUM_INIT_FAILED"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
		return;
	}

	unsigned char whole_byte;
	char byte_chars[3] = {'\0', '\0', '\0'};

	NSString *messageHex = [command.arguments objectAtIndex: 0];
	NSMutableData *messageMut = [[NSMutableData alloc] init];
	for (int i = 0; i < [messageHex length] / 2; i++){
		byte_chars[0] = [messageHex charAt: 2*i];
		byte_chars[1] = [messageHex charAt: 2*i+1];
		whole_byte = strsol(byte_chars, NULL, 16);
		[messageMut appendBytes: &whole_byte length: 1];
	}
	const unsigned char* message = (unsigned char*) [messageMut bytes];
	const unsigned long long mlen = (unsigned long long) [messageMut length];

	NSString *nonceHex = [command.arguments objectAtIndex: 1];
	NSMutableData *nonceMut = [[NSMutableData alloc] init];
	for (int i = 0; i < [nonceHex length] / 2; i++){
		byte_chars[0] = [nonceHex charAt: 2*i];
		byte_chars[1] = [nonceHex charAt: 2*i+1];
		whole_byte = strsol(byte_chars, NULL, 16);
		[nonceMut appendBytes: &whole_byte length: 1];
	}
	const unsigned char* nonce = (unsigned char*) [nonceMut bytes];

	NSString *keyHex = [command.arguments objectAtIndex: 2];
	NSMutableData *keyMut = [[NSMutableData alloc] init];
	for (int i = 0; i < [keyHex length] / 2; i++){
		byte_chars[0] = [keyHex charAt: 2*i];
		byte_chars[1] = [keyHex charAt: 2*i+1];
		whole_byte = strsol(byte_chars, NULL, 16);
		[keyMut appendBytes: &whole_byte length: 1];
	}
	const unsigned char* key = (unsigned char*) [keyMut bytes];

	unsigned long long clen = (unsigned long long)(mlen + crypto_secretbox_MACBYTES);
	unsigned char c = new unsigned char[clen];

	crypto_secretbox_easy(c, message, mlen, nonce, key);

	NSMutableString cHexMut = [[NSMutableString alloc] init];
	for (int i = 0; i < clen; i++){
		[cHexMut appendFormat: @"%02x", c[i]];
	}

	CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: [cHexMut lowercaseString]];
	[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
}

- (void)crypto_secretbox_open_easy:(CDVInvokedUrlCommand*) command {
	//Calling sodium_init at each sodium call. It doesn't overload the required resources, and ensures that an error can be thrown should the call fail
	if (sodium_init() == -1){
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"SODIUM_INIT_FAILED"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
		return;
	}

	unsigned char whole_byte;
	char byte_chars[3] = {'\0', '\0', '\0'};

	NSString* ciphertextHex = [command.arguments objectAtIndex: 0];
	NSMutableData *ciphertextMut = [[NSMutableData alloc] init];
	for (int i = 0; i < [ciphertextHex length] / 2; i++){
		byte_chars[0] = [ciphertextHex charAt: 2*i];
		byte_chars[1] = [ciphertextHex charAt: 2*i+1];
		whole_byte = strsol(byte_chars, NULL, 16);
		[ciphertextMut appendBytes: &whole_byte length: 1];
	}
	const unsigned char* ciphertext = (unsigned char*) [ciphertextMut bytes];
	const unsigned long long clen = [ciphertextMut length];

	NSString *nonceHex = [command.arguments objectAtIndex: 1];
	NSMutableData *nonceMut = [[NSMutableData alloc] init];
	for (int i = 0; i < [nonceHex length] / 2; i++){
		byte_chars[0] = [nonceHex charAt: 2*i];
		byte_chars[1] = [nonceHex charAt: 2*i+1];
		whole_byte = strsol(byte_chars, NULL, 16);
		[nonceMut appendBytes: &whole_byte length: 1];
	}
	const unsigned char* nonce = (unsigned char*) [nonceMut bytes];

	NSString *keyHex = [command.arguments objectAtIndex: 2];
	NSMutableData *keyMut = [[NSMutableData alloc] init];
	for (int i = 0; i < [keyHex length] / 2; i++){
		byte_chars[0] = [keyHex charAt: 2*i];
		byte_chars[1] = [keyHex charAt: 2*i+1];
		whole_byte = strsol(byte_chars, NULL, 16);
		[keyMut appendBytes: &whole_byte length: 1];
	}
	const unsigned char* key = (unsigned char*) [keyMut bytes];

	const unsigned long long mlen = clen - crypto_secretbox_MACBYTES;
	const unsigned char* m = new unsigned char[mlen];

	if (crypto_secretbox_open_easy(m , ciphertext, clen, nonce, key) != 0){
		CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"CANNOT_DECRYPT"];
		[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
		return;
	}

	NSMutableString mHexMut = [[NSMutableString alloc] init];
	for (int i = 0; i < mlen; i++){
		[mHexMut appendFormat: @"%02x", m[i]];
	}

	CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString: [mHexMut lowercaseString]];
	[self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
}

@end
