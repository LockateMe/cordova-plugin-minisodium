#import <libsodium.h>
#import <Cordova/CDV.h>
#import <Cordova/CDVPluginResult.h>

@implementation MiniSodium

- (void)crypto_secretbox_easy:(CDVInvokedUrlCommand*) command {
	NSString *message = [command.arguments objectAtIndex: 0];
	NSMutableData = *messageMut = [[NSMutableData alloc] init];
	unsigned char whole_byte;
	char byte_chars[3] = {'\0', '\0', '\0'};
	for (int i = 0; i < [message length] / 2; i++){
		byte_chars[0] = [message charAt: 2*i];
		byte_chars[1] = [message charAt: 2*i+1];
		whole_byte = strsol(byte_chars, NULL, 16);
		[messageMut appendBytes: &whole_byte length: 1];
	}
}

- (void)crypto_secretbox_open_easy:(CDVInvokedUrlCommand*) command {

}

@end
