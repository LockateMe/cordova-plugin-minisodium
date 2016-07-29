#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface MiniSodium : CDVPlugin

@property int sodiumInitStatus;

- (void)pluginInitialize;
// Secretbox construction
- (void)crypto_secretbox_easy:(CDVInvokedUrlCommand*)command;
- (void)crypto_secretbox_open_easy:(CDVInvokedUrlCommand*)command;

// Public key signatures (Ed255519)
- (void)crypto_sign_keypair:(CDVInvokedUrlCommand*)command;
- (void)crypto_sign_seed_keypair:(CDVInvokedUrlCommand*)command;
- (void)crypto_sign:(CDVInvokedUrlCommand*)command;
- (void)crypto_sign_open:(CDVInvokedUrlCommand*)command;
- (void)crypto_sign_detached:(CDVInvokedUrlCommand*)command;
- (void)crypto_sign_verify_detached:(CDVInvokedUrlCommand*)command;

// Public key signature (Ed25519) - secret key manipulation methods
- (void)crypto_sign_ed25519_sk_to_seed:(CDVInvokedUrlCommand*)command;
- (void)crypto_sign_ed25519_sk_to_pk:(CDVInvokedUrlCommand*)command;

- (unsigned char*)from_hex:(NSString*)s;
- (NSString*)to_hex:(unsigned char*)s withLength:(unsigned long long) slen;

@end
