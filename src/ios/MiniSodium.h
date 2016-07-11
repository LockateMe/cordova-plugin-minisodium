#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface MiniSodium : CDVPlugin

- (void)pluginInitialize;
- (void)crypto_secretbox_easy:(CDVInvokedUrlCommand*)command;
- (void)crypto_secretbox_open_easy:(CDVInvokedUrlCommand*)command;

@end
