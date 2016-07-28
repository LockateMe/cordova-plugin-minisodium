#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface MiniSodium : CDVPlugin

//- (void)pluginInitialize;
- (void)crypto_secretbox_easy:(CDVInvokedUrlCommand*)command;
- (void)crypto_secretbox_open_easy:(CDVInvokedUrlCommand*)command;
- (unsigned char*)from_hex:(NSString*)s;
- (NSString*)to_hex:(unsigned char*)s withLength:(unsigned int) slen;

@end
