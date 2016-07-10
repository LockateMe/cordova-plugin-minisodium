#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface MiniSodium : CDVPlugin

- (void)crypto_secretbox_easy:(CDVInvokedUrlCommand*)command;
- (void)crypto_secretbox_open_easy:(CDVInvokedUrlCommand*)command;

@end
