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
      var fail = jasmine.createSpy('fail');

      window.plugins.MiniSodium.crypto_secretbox_easy(secretboxEasyCase.m, secretboxEasyCase.n, secretboxEasyCase.k, function(err, cipherHex){
        if (err){
          fail(err);
          return;
        }

        expect(cipherHex == secretboxEasyCase.c).toEqual(true);
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
      var fail = jasmine.createSpy('fail');

      window.plugins.MiniSodium.crypto_secretbox_open_easy(secretboxEasyCase.c, secretboxEasyCase.n, secretboxEasyCase.k, function(err, plainHex){
        if (err){
          fail(err);
          done();
          return;
        }

        expect(plainHex == secretboxEasyCase.m).toEqual(true);
        done();
      });
    });

  });

  describe('random secretbox', function(){
    it('should encrypt and decrypt', function(done){
      var fail = jasmine.createSpy('fail');

      var m = randomBuffer(Math.floor(500 + Math.random() * 501));
      var mHex = to_hex(m);

      var k = randomBuffer(window.plugins.MiniSodium.crypto_secretbox_KEYBYTES);
      var n = randomBuffer(window.plugins.MiniSodium.crypto_secretbox_NONCEBYTES);

      window.plugins.MiniSodium.crypto_secretbox_easy(m, n, k, function(err, cipherHex){
        if (err){
          fail(err);
          done();
          return;
        }

        window.plugins.MiniSodium.crypto_secretbox_open_easy(cipherHex, n, k, function(err, plainHex){
          if (err){
            fail(err);
            done();
            return;
          }

          expect(bufEquals(m, from_hex(plainHex))).toEqual(true);
          done();
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
