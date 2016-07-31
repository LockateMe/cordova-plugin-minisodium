//Test vector harvested from libsodium's test suite
var secretboxEasyCase = {
  k: '1b27556473e985d462cd51197a9a46c76009549eac6474f206c4ee0844f68389',
  n: '69696ee955b62b73cd62bda875fc73d68219e0036b7a0b37',
  m: 'be075fc53c81f2d5cf141316ebeb0c7b5228c52a4c62cbd44b66849b64244ffce5ecbaaf33bd751a1ac728d45e6c61296cdc3c01233561f41db66cce314adb310e3be8250c46f06dceea3a7fa1348057e2f6556ad6b1318a024a838f21af1fde048977eb48f59ffd4924ca1c60902e52f0a089bc76897040e082f937763848645e0705',
  c: 'f3ffc7703f9400e52a7dfb4b3d3305d98e993b9f48681273c29650ba32fc76ce48332ea7164d96a4476fb8c531a1186ac0dfc17c98dce87b4da7f011ec48c97271d2c20f9b928fe2270d6fb863d51738b48eeee314a7cc8ab932164548e526ae90224368517acfeabd6bb3732bc0e9da99832b61ca01b6de56244a9e88d5f9b37973f622a43d14a6599b1f654cb45a74e355a5'
};

var hexMap = [
  "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f",
  "10", "11", "12", "13", "14", "15", "16", "17", "18",	"19",	"1a",	"1b",	"1c",	"1d",	"1e",	"1f",
	"20",	"21",	"22",	"23",	"24",	"25",	"26",	"27", "28",	"29",	"2a",	"2b",	"2c",	"2d",	"2e",	"2f",
	"30",	"31",	"32",	"33",	"34",	"35",	"36",	"37", "38",	"39",	"3a",	"3b",	"3c",	"3d",	"3e",	"3f",
	"40",	"41",	"42",	"43",	"44",	"45",	"46",	"47", "48",	"49",	"4a",	"4b",	"4c",	"4d",	"4e",	"4f",
	"50",	"51",	"52",	"53",	"54",	"55",	"56",	"57", "58",	"59",	"5a",	"5b",	"5c",	"5d",	"5e",	"5f",
	"60",	"61",	"62",	"63",	"64",	"65",	"66",	"67", "68",	"69",	"6a",	"6b",	"6c",	"6d",	"6e",	"6f",
	"70",	"71",	"72",	"73",	"74",	"75",	"76",	"77", "78",	"79",	"7a",	"7b",	"7c",	"7d",	"7e",	"7f",
	"80",	"81",	"82",	"83",	"84",	"85",	"86",	"87", "88",	"89",	"8a",	"8b",	"8c",	"8d",	"8e",	"8f",
	"90",	"91",	"92",	"93",	"94",	"95",	"96",	"97", "98",	"99",	"9a",	"9b",	"9c",	"9d",	"9e",	"9f",
	"a0",	"a1",	"a2",	"a3",	"a4",	"a5",	"a6",	"a7", "a8",	"a9",	"aa",	"ab",	"ac",	"ad",	"ae",	"af",
	"b0",	"b1",	"b2",	"b3",	"b4",	"b5",	"b6",	"b7", "b8",	"b9",	"ba",	"bb",	"bc",	"bd",	"be",	"bf",
	"c0",	"c1",	"c2",	"c3",	"c4",	"c5",	"c6",	"c7", "c8",	"c9",	"ca",	"cb",	"cc",	"cd",	"ce",	"cf",
	"d0",	"d1",	"d2",	"d3",	"d4",	"d5",	"d6",	"d7", "d8",	"d9",	"da",	"db",	"dc",	"dd",	"de",	"df",
	"e0",	"e1",	"e2",	"e3",	"e4",	"e5",	"e6",	"e7", "e8",	"e9",	"ea",	"eb",	"ec",	"ed",	"ee",	"ef",
	"f0",	"f1",	"f2",	"f3",	"f4",	"f5",	"f6",	"f7", "f8",	"f9",	"fa",	"fb",	"fc",	"fd",	"fe",	"ff"
];

var testHexBuffers = [], testHexStrings = [];

exports.defineAutoTests = function(){

  var from_hex = window.plugins.MiniSodium.from_hex;
  var to_hex = window.plugins.MiniSodium.to_hex;
  var is_hex = window.plugins.MiniSodium.is_hex;

  describe('hex type test', function(){
    it('should be a defined function', function(){
      expect(window.plugins.MiniSodium.is_hex).toBeDefined();
      expect(typeof window.plugins.MiniSodium.is_hex).toEqual('function');
    });
  });

  describe('hex encode', function(){
    it('should be a defined function', function(){
      expect(window.plugins.MiniSodium.to_hex).toBeDefined();
      expect(typeof window.plugins.MiniSodium.to_hex).toEqual('function');
    });

    it('should encode correctly', function(){
      for (var i = 0; i < 50; i++){
        var b = randomBuffer(Math.floor(Math.random() * 26 + 25));
        var s = window.plugins.MiniSodium.to_hex(b);

        expect(isCorrectlyEncoded(b, s)).toEqual(true);

        testHexBuffers.push(b);
        testHexStrings.push(s);
      }
    });
  });

  describe('hex decode', function(){
    it('should be a defined function', function(){
      expect(window.plugins.MiniSodium.from_hex).toBeDefined();
      expect(typeof window.plugins.MiniSodium.from_hex).toEqual('function');
    });

    it('should decode correctly', function(){
      for (var i = 0; i < Math.min(testHexBuffers.length, testHexStrings.length); i++){
        var d = window.plugins.MiniSodium.from_hex(testHexStrings[i]);

        expect(bufEquals(d, testHexBuffers[i])).toEqual(true);
      }
    });
  });

  describe('secretbox_easy', function(){

    it('should be a defined function', function(){
      expect(window.plugins.MiniSodium.crypto_secretbox_easy).toBeDefined();
      expect(typeof window.plugins.MiniSodium.crypto_secretbox_easy).toEqual('function');
    });

    it('should encrypt', function(done){
      window.plugins.MiniSodium.crypto_secretbox_easy(secretboxEasyCase.m, secretboxEasyCase.n, secretboxEasyCase.k, function(err, cipher){
        if (err){
          throw err;
          done();
          return;
        }

        expect(bufEquals(cipher, from_hex(secretboxEasyCase.c))).toEqual(true);
        done();
      });
    });

  });

  describe('secretbox_open_easy', function(){

    it('should be a defined function', function(){
      expect(window.plugins.MiniSodium.crypto_secretbox_open_easy).toBeDefined();
      expect(typeof window.plugins.MiniSodium.crypto_secretbox_open_easy).toEqual('function');
    });

    it('should decrypt', function(done){

      window.plugins.MiniSodium.crypto_secretbox_open_easy(secretboxEasyCase.c, secretboxEasyCase.n, secretboxEasyCase.k, function(err, plain){
        if (err){
          throw err;
          done();
          return;
        }

        expect(bufEquals(plain, from_hex(secretboxEasyCase.m))).toEqual(true);
        done();
      });
    });

  });

  describe('random secretbox', function(){
    it('should encrypt and decrypt', function(done){
      var m = randomBuffer(Math.floor(500 + Math.random() * 501));
      var mHex = to_hex(m);

      var k = randomBuffer(window.plugins.MiniSodium.crypto_secretbox_KEYBYTES);
      var n = randomBuffer(window.plugins.MiniSodium.crypto_secretbox_NONCEBYTES);

      window.plugins.MiniSodium.crypto_secretbox_easy(m, n, k, function(err, cipher){
        if (err){
          throw err;
          done();
          return;
        }

        window.plugins.MiniSodium.crypto_secretbox_open_easy(cipher, n, k, function(err, plain){
          if (err){
            throw err;
            done();
            return;
          }

          expect(bufEquals(m, plain)).toEqual(true);
          done();
        });
      });
    });
  });

  describe('ed25519 - attached and detached signatures', function(){
    it('crypto_sign should be a defined function', function(){
      expect(window.plugins.MiniSodium.crypto_sign).toBeDefined();
      expect(typeof window.plugins.MiniSodium.crypto_sign).toEqual('function');
    });

    it('crypto_sign_open should be a defined function', function(){
      expect(window.plugins.MiniSodium.crypto_sign_open).toBeDefined();
      expect(typeof window.plugins.MiniSodium.crypto_sign_open).toEqual('function');
    });

    it('crypto_sign_detached should be a defined function', function(){
      expect(window.plugins.MiniSodium.crypto_sign_detached).toBeDefined();
      expect(typeof window.plugins.MiniSodium.crypto_sign_detached).toEqual('function');
    });

    it('crypto_sign_verify_detached should be a defined function', function(){
      expect(window.plugins.MiniSodium.crypto_sign_verify_detached).toBeDefined();
      expect(typeof window.plugins.MiniSodium.crypto_sign_verify_detached).toEqual('function');
    });

    it('crypto_sign_seed_keypair should be a defined function', function(){
      expect(window.plugins.MiniSodium.crypto_sign_seed_keypair).toBeDefined();
      expect(typeof window.plugins.MiniSodium.crypto_sign_seed_keypair).toEqual('function');
    });

    it('crypto_sign_ed25519_sk_to_seed should be a defined function', function(){
      expect(window.plugins.MiniSodium.crypto_sign_ed25519_sk_to_seed).toBeDefined();
      expect(typeof window.plugins.MiniSodium.crypto_sign_ed25519_sk_to_seed).toEqual('function');
    });

    it('crypto_sign_ed25519_sk_to_pk should be a defined function', function(){
      expect(window.plugins.MiniSodium.crypto_sign_ed25519_sk_to_pk).toBeDefined();
      expect(typeof window.plugins.MiniSodium.crypto_sign_ed25519_sk_to_pk).toEqual('function');
    });

    it('should pass the test vectors', function(done){
      var edVectors = window.plugins.ed25519vectors;
      var vectorIndex = 0;

      function testOne(){
        if (vectorIndex % 128 === 0){
          console.log('Ed25519 testing: ' + Math.round((vectorIndex / edVectors.length) * 100) + '% complete');
        }

        var currentVector = edVectors[vectorIndex];
        for (var vectorProperty in currentVector){
          if (is_hex(currentVector[vectorProperty])) currentVector[vectorProperty] = from_hex(currentVector[vectorProperty]);
        }

        window.plugins.MiniSodium.crypto_sign_ed25519_sk_to_pk(currentVector.sk, function(err, pk){
          if (err){
            throw err;
            done();
            return;
          }

          expect(bufEquals(pk, currentVector.pk)).toEqual(true);

          window.plugins.MiniSodium.crypto_sign_ed25519_sk_to_seed(currentVector.sk, function(err, seed){
            if (err){
              throw err;
              done();
              return;
            }

            expect(bufEquals(seed, currentVector.sk.slice(0, window.plugins.MiniSodium.crypto_sign_SEEDBYTES))).toEqual(true);

            window.plugins.MiniSodium.crypto_sign_seed_keypair(seed, function(err, keyPair){
              if (err){
                throw err;
                done();
                return;
              }

              expect(bufEquals(keyPair.sk, currentVector.sk)).toEqual(true);
              expect(bufEquals(keyPair.pk, currentVector.pk)).toEqual(true);

              window.plugins.MiniSodium.crypto_sign(currentVector.m, currentVector.sk, function(err, sm){
                if (err){
                  throw err;
                  done();
                  return;
                }

                expect(bufEquals(m.slice(0, window.plugin.MiniSodium.crypto_sign_BYTES), currentVector.s)).toEqual(true);
                expect(bufEquals(m.slice(window.plugins.MiniSodium.crypto_sign_BYTES), currentVector.m)).toEqual(true);

                window.plugins.MiniSodium.crypto_sign_open(sm, pk, function(err, m){
                  if (err){
                    throw err;
                    done();
                    return;
                  }

                  expect(bufEquals(m, currentVector.m)).toEqual(true);

                  window.plugins.MiniSodium.crypto_sign_detached(currentVector.m, currentVector.sk, function(err, sig){
                    if (err){
                      throw err;
                      done();
                      return;
                    }

                    expect(bufEquals(sig, currentVector.s)).toEqual(true);

                    window.plugins.MiniSodium.crypto_sign_verify_detached(sig, currentVector.m, currentVector.pk, function(err, isValid){
                      if (err){
                        throw err;
                        done();
                        return;
                      }

                      expect(isValid).toBeTruthy();

                      nextVector();
                    });
                  });
                });
              });
            });
          });
        });
      }

      function nextVector(){
        vectorIndex++;
        if (vectorIndex == edVectors.length){
          console.log('Ed25519 testing - completed');
          done();
        } else setTimeout(testOne, 0);
      }

      testOne();
    }, 120000);
    //Giving it 2 minutes to run 1024 test vectors, before timing out
    //that generous time is to make sure that the test has enough time to complete on a now-obsolete phone (e.g: HTC One M7; how time flies...)
  });

  describe('ed25519 - keypair generation', function(){
    it('crypto_sign_keypair should be a defined function', function(){
      expect(window.plugins.MiniSodium.crypto_sign_keypair).toBeDefined();
      expect(typeof window.plugins.MiniSodium.crypto_sign_keypair).toEqual('function');
    });

    it('should generate a valid keypair', function(done){
      window.plugins.MiniSodium.crypto_sign_keypair(function(err, keyPair){
        if (err){
          throw err;
          done();
          return;
        }

        var m = randomBuffer(Math.floor(Math.random() * 501 + 500));
        window.plugins.MiniSodium.crypto_sign_detached(m, keyPair.sk, function(err, signature){
          if (err){
            throw err;
            done();
            return;
          }

          window.plugins.MiniSodium.crypto_sign_verify_detached(signature, m, keyPair.pk, function(err, isValid){
            if (err){
              throw err;
              done();
              return;
            }

            expect(isValid).toBeTruthy();

            done();
          });
        });
      });
    });
  });

  function binValueOfHexCouple(c){
    if (!(window.plugins.MiniSodium.is_hex(c) && c.length == 2)) throw new TypeError('c must be a 2 char long hex string');

    for (var i = 0; i < hexMap.length; i++){
      if (hexMap[i] == c) return i;
    }
    //Should never be reached because of the type tests performed at the beginning of this method
    return -1;
  }

  function isCorrectlyEncoded(b, s){
    if (!(b instanceof Uint8Array)) throw new TypeError('b must be a Uint8Array');
    if (!window.plugins.MiniSodium.is_hex(s)) throw new TypeError('s must be a hex string');
    if (s.length != 2 * b.length) throw new TypeError('the length of s must be the double of b');

    for (var i = 0; i < b.length; i++){
      if (binValueOfHexCouple(s.substr(2 * i, 2)) != b[i]) return false;
    }

    return true;
  }

  function bufEquals(b1, b2){
    if (!(b1 instanceof Uint8Array)) throw new TypeError('b1 must be a Uint8Array');
    if (!(b2 instanceof Uint8Array)) throw new TypeError('b2 must be a Uint8Array');

    if (b1.length != b2.length) return false;

    var d = 0 | 0; // (0 | 0) == bitwise-or(0, 0) == 0x00000000000...
    for (var i = 0; i < b1.length ; i++){
      d |= b1[i] ^ b2[i];
    }

    return d === 0;
  }

  function randomBuffer(size){
  	if (!(typeof size == 'number' && size > 0 && Math.floor(size) == size)) throw new TypeError('size must be a strictly positive integer');
  	var b = new Uint8Array(size);
  	window.crypto.getRandomValues(b);
  	return b;
  }

};
