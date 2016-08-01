//Test vectors harvested from libsodium's test suite

//Harvested from secretbox_easy.c and secretbox_easy.exp
var secretboxEasyCase = {
  k: '1b27556473e985d462cd51197a9a46c76009549eac6474f206c4ee0844f68389',
  n: '69696ee955b62b73cd62bda875fc73d68219e0036b7a0b37',
  m: 'be075fc53c81f2d5cf141316ebeb0c7b5228c52a4c62cbd44b66849b64244ffce5ecbaaf33bd751a1ac728d45e6c61296cdc3c01233561f41db66cce314adb310e3be8250c46f06dceea3a7fa1348057e2f6556ad6b1318a024a838f21af1fde048977eb48f59ffd4924ca1c60902e52f0a089bc76897040e082f937763848645e0705',
  c: 'f3ffc7703f9400e52a7dfb4b3d3305d98e993b9f48681273c29650ba32fc76ce48332ea7164d96a4476fb8c531a1186ac0dfc17c98dce87b4da7f011ec48c97271d2c20f9b928fe2270d6fb863d51738b48eeee314a7cc8ab932164548e526ae90224368517acfeabd6bb3732bc0e9da99832b61ca01b6de56244a9e88d5f9b37973f622a43d14a6599b1f654cb45a74e355a5'
};

//Harvested from ed25519_convert.c and ed25519_convert.exp
var X25519ConversionTestCase = {
  seed: '421151a459faeade3d247115f94aedae42318124095afabe4d1451a559faedee',
  curve25519_pk: 'f1814f0e8ff1043d8a44d25babff3cedcae6c22c3edaa48f857ae70de2baae50',
  curve25519_sk: '8052030376d47112be7f73ed7a019293dd12ad910b654455798b4667d73de166'
};

//Harvested from scalarmult.c and scalarmult.exp
var curve25519Case = {
  alicesk: '77076d0a7318a57d3c16c17251b26645df4c2f87ebc0992ab177fba51db92c2a',
  alicepk: '8520f0098930a754748b7ddcb43ef75a0dbf3a0d26381af4eba4a98eaa9b4e6a',
  bobsk: '5dab087e624a8a4b79e17f8b83800ee66f3bb1292618b6fd1c2f8b27ff88e0eb',
  bobpk: 'de9edb7d7b7dc1b4d35b61c2ece435373f8343c85b78674dadfc7e146f882b4f',
  k: '4a5d9d5ba4ce2de1728e3bf480350f25e07e21c947d19e3376f09b3c1e161742'
}

//Harvested from scalarmult7.c and scalarmult7.exp
var curve25519Case7 = {
  p1: '7220f0098930a754748b7ddcb43ef75a0dbf3a0d26381af4eba4a98eaa9b4eea',
  p2: '8520f0098930a754748b7ddcb43ef75a0dbf3a0d26381af4eba4a98eaa9b4e6a',
  scalar: '0100000000000000000000000000000000000000000000000000000000000000'
};

//Harvested from pwhash_scrypt.c and pwhash_scrypt.exp
var scryptCase1 = [
  { password: "a347ae92bce9f80f6f595a4480fc9c2fe7e7d7148d371e9487d75f5c23008ffae065577a928febd9b1973a5a95073acdbeb6a030cfc0d79caa2dc5cd011cef02c08da232d76d52dfbca38ca8dcbd665b17d1665f7cf5fe59772ec909733b24de97d6f58d220b20c60d7c07ec1fd93c52c31020300c6c1facd77937a597c7a6",
    salt: "5541fbc995d5c197ba290346d2c559dedf405cf97e5f95482143202f9e74f5c2",
    keyLength: 155,
    opsLimit: 481326,
    memLimit: 7256678,
    key: "8d40f5f8c6a1791204f03e19a98cd74f918b6e331b39cfc2415e5014d7738b7bb0a83551fb14a035e07fdd4dc0c60c1a6822ac253918979f6324ff0c87cba75d3b91f88f41ca5414a0f152bdc4d636f42ab2250afd058c19ec31a3374d1bd7133289bf21513ff67cbf8482e626aee9864c58fd05f9ea02e508a10182b7d838157119866f072004987ef6c56683ed207705923921af9d76444a331a"
  },
  { password: "e125cee61c8cb7778d9e5ad0a6f5d978ce9f84de213a8556d9ffe202020ab4a6ed9074a4eb3416f9b168f137510f3a30b70b96cbfa219ff99f6c6eaffb15c06b60e00cc2890277f0fd3c622115772f7048adaebed86e",
    salt: "f1192dd5dc2368b9cd421338b22433455ee0a3699f9379a08b9650ea2c126f0d",
    keyLength: 250,
    opsLimit: 535778,
    memLimit: 7849083,
    key: "d985d4c278343a46d82af0c4268b7ae6b6d1d2dd289675ef45bfb6d0648bffe5bab8c91228f3a31b091154a9c1142670a07b92e70a298333066de07db9300e046fd7cacc99780804683df7babdfc9d019047178400b2875bde0a1ad824dda7a422d9ed48475af9a3876378dd3a2f206e34984e223afb82c0c1e4644c9a458f4666379fdd3e2d9206d87e3c32c3977f35826a27590baaa1ec1a3bd7d15a92bc84c95dcfc56c14fca7c4c9810162dfdf9dc08a191e79fe40250b7e07d3a9317d9a5cb56e1062c419a6cd6a9b73128e8ad79ab7efffbb3cc52c1f49f86d2ebb46e6e4846aecdb14c2d046f5380517ff8cc794e4a772a58b93083dad"
  },
  { password: "92263cbf6ac376499f68a4289d3bb59e5a22335eba63a32e6410249155b956b6a3b48d4a44906b18b897127300b375b8f834f1ceffc70880a885f47c33876717e392be57f7da3ae58da4fd1f43daa7e44bb82d3717af4319349c24cd31e46d295856b0441b6b289992a11ced1cc3bf3011604590244a3eb737ff221129215e4e4347f4915d41292b5173d196eb9add693be5319fdadc242906178bb6c0286c9b6ca6012746711f58c8c392016b2fdfc09c64f0f6b6ab7b",
    salt: "3b840e20e9555e9fb031c4ba1f1747ce25cc1d0ff664be676b9b4a90641ff194",
    keyLength: 249,
    opsLimit: 311757,
    memLimit: 7994791,
    key: "ee7e9e1369267ec555981f0ea088ff6f93953abfcb767d88ec3c46393d24cfbaba5e4e26e0f35b5d5259647748476d65cd8881c96f8cda049d9c877b2d33d932e67f4c0df2cb434b4b4900e0c49c3f8ba9663795420577e65d0b456201ad9162fbc485c7b44f2b34e6673aa3692c123021ee3b624c3bb22b808b89613d8ecc7b87da47f57152eb3f7b10ad206f6b09cb6935b347b5e42bc3b8c9c9bcd8d7b7c44929b367fc279dec48ea78e6ee3e2620d7459700bd0aedb1c9aa5a323ca94403927f5e5c2b73bda7c5c3287b62fe51874cfeb1dc3151cd886b26d83ece68833229d2d432798c602d85b0505947207d8430febbe901164b12ce"
  },
  { password: "027b6d8e8c8c474e9b69c7d9ed4f9971e8e1ce2f6ba95048414c3970f0f09b70e3b6c5ae05872b3d8678705b7d381829c351a5a9c88c233569b35d6b0b809df44b6451a9c273f1150e2ef8a0b5437eb701e373474cd44b97ef0248ebce2ca0400e1b53f3d86221eca3f18eb45b702b9172440f774a82cbf1f6f525df30a6e293c873cce69bb078ed1f0d31e7f9b8062409f37f19f8550aae",
    salt: "eb2a3056a09ad2d7d7f975bcd707598f24cd32518cde3069f2e403b34bfee8a5",
    keyLength: 5,
    opsLimit: 643464,
    memLimit: 1397645,
    key: "1828b82997"
  },
  { password: "4a857e2ee8aa9b6056f2424e84d24a72473378906ee04a46cb05311502d5250b82ad86b83c8f20a23dbb74f6da60b0b6ecffd67134d45946ac8ebfb3064294bc097d43ced68642bfb8bbbdd0f50b30118f5e",
    salt: "39d82eef32010b8b79cc5ba88ed539fbaba741100f2edbeca7cc171ffeabf258",
    keyLength: 190,
    opsLimit: 758010,
    memLimit: 5432947,
    key: "bcc5c2fd785e4781d1201ed43d84925537e2a540d3de55f5812f29e9dd0a4a00451a5c8ddbb4862c03d45c75bf91b7fb49265feb667ad5c899fdbf2ca19eac67aa5e48595d5b02f8183ab07f71b1ce0d76e5df54919f63810ad0893ded7d1ca18fc956ec06ffd4c3d1f77a00ed53608947b25eea5df6bea02272be15815f974c321a2a9208674fdf59d1d798c2a12f1889df68b0c222b37ee9ef0d6391fc160b0281ec53073cb3a3706ce1d71c3af2f5237a1b3d8545d99012eecc0b4abb"
  },
  { password: "1845e375479537e9dd4f4486d5c91ac72775d66605eeb11a787b78a7745f1fd0052d526c67235dbae1b2a4d575a74cb551c8e9096c593a497aee74ba3047d911358ede57bc27c9ea1829824348daaab606217cc931dcb6627787bd6e4e5854f0e8",
    salt: "3ee91a805aa62cfbe8dce29a2d9a44373a5006f4a4ce24022aca9cecb29d1473",
    keyLength: 212,
    opsLimit: 233177,
    memLimit: 13101817,
    key: "82765c040c58c1810f8c053ef5c248556299385476bde44bdd91a0d9a239f24e9b1717fd8b23209ffa45b7aa7937296c601b79e77da99e8d2fda0ea4459be2d0900f5bc5a269b5488d873d4632d1baf75965e509ee24b12501a9ce3bbbd8b7d759987d545a1c221a363195e5802d768b3b9e00ebe5ac0ed8ad2362c1c4157b910a40f94adf2561a2b0d3e65dbb06f244e5ac44d362103df54c9b9175777b3db1cdadb03e977ab8a79baf1e1e18ec9f5d0f25c487ddc53d7e81910f83576b44e9caeece26e2eb376569ad3a8cdccbde8bc355210e"
  },
  { password: "c7b09aec680e7b42fedd7fc792e78b2f6c1bea8f4a884320b648f81e8cf515e8ba9dcfb11d43c4aae114c1734aa69ca82d44998365db9c93744fa28b63fd16000e8261cbbe083e7e2da1e5f696bde0834fe53146d7e0e35e7de9920d041f5a5621aabe02da3e2b09b405b77937efef3197bd5772e41fdb73fb5294478e45208063b5f58e089dbeb6d6342a909c1307b3fff5fe2cf4da56bdae50848f",
    salt: "039c056d933b475032777edbaffac50f143f64c123329ed9cf59e3b65d3f43b6",
    keyLength: 178,
    opsLimit: 234753,
    memLimit: 4886999,
    key: "ca9216d4127e2e4a6ee3584b49be106217bb61cc807016d46d0cfbb1fd722e2bbac33541386bdfeac41a299ead22790993fcaa8e1d23bd1c8426afa5ff4c08e731dc476ef834f142c32dfb2c1be12b9978802e63b2cd6f226b1a8df59f0c79154d7ef4296a68ec654538d987104f9a11aca1b7c83ab2ed8fd69da6b88f0bcbd27d3fea01329cecf10c57ec3ba163d57b38801bd6c3b31ce527b33717bb56a46f78fb96be9f2424a21b3284232388cbba6a74"
  },
  { password: "8f3a06e2fd8711350a517bb12e31f3d3423e8dc0bb14aac8240fca0995938d59bb37bd0a7dfc9c9cc0705684b46612e8c8b1d6655fb0f9887562bb9899791a0250d1320f945eda48cdc20c233f40a5bb0a7e3ac5ad7250ce684f68fc0b8c9633bfd75aad116525af7bdcdbbdb4e00ab163fd4df08f243f12557e",
    salt: "90631f686a8c3dbc0703ffa353bc1fdf35774568ac62406f98a13ed8f47595fd",
    keyLength: 55,
    opsLimit: 695191,
    memLimit: 15738350,
    key: "2732a7566023c8db90a5fdd08dbe6c1b5e70c046d50c5735c8d86a589ba177f69db12d6cc3596319fa27c9e063ed05b8a31970a07dc905"
  },
  { password: "b540beb016a5366524d4605156493f9874514a5aa58818cd0c6dfffaa9e90205f17b",
    salt: "44071f6d181561670bda728d43fb79b443bb805afdebaf98622b5165e01b15fb",
    keyLength: 231,
    opsLimit: 78652,
    memLimit: 6631659,
    key: "d7b1ef464be03ce9050b5108e25f0b8e821299986fe0ff89e17fbae65ba9fad167fbd265866ac03efc86ab0b50d46d6740a59adf5949b44f7f9f3ac3f3d4cc9f128966db9099deb1b6b78505242b2401a193820408eb0780b27162ebafb7c505b0e7c32ce66c6efc0be487008c1201454680498a2fc06e00b454e0b20933906bbb0e43b399b9ee46d882f107df1ebdd1e7cd867c9cdba6015b7e80064ae8b3417d969524bec046e782a13b125f058cd36b5d1ae65886ae7caab45a6d98651ada435b8ee11d5c1224232f5f515df974138dd6cf347b730481d4b073af8ff0394fe9f0b8cdfd99f5"
  },
  { password: "a14975c26c088755a8b715ff2528d647cd343987fcf4aa25e7194a8417fb2b4b3f7268da9f3182b4cfb22d138b2749d673a47ecc7525dd15a0a3c66046971784bb63d7eae24cc84f2631712075a10e10a96b0e0ee67c43e01c423cb9c44e5371017e9c496956b632158da3fe12addecb88912e6759bc37f9af2f45af72c5cae3b179ffb676a697de6ebe45cd4c16d4a9d642d29ddc0186a0a48cb6cd62bfc3dd229d313b301560971e740e2cf1f99a9a090a5b283f35475057e96d7064e2e0fc81984591068d55a3b4169f22cccb0745a2689407ea1901a0a766eb99",
    salt: "3d968b2752b8838431165059319f3ff8910b7b8ecb54ea01d3f54769e9d98daf",
    keyLength: 167,
    opsLimit: 717248,
    memLimit: 10784179,
    key: "1839be14287053bfcd4ea60db82777fad1a6e9535c388b770743e61235449e668717199defd516c438b3ebd79b3529eb32482ef414525292ea1bbec09da10790a2330a4399f2fe6dd63d80954e3c547a5f1c619db5a30bde495b23f2214b4fa7572851d75246f2817775f0b521acc6efbc7832c9a76de7465e3c65cade88e86c973f85a882bb54f92b983977c6e937c88f083ba68c70fb49497065b158e2e789809b1d4cc9ec2d"
  }
];

//Harvested from pwhash_scrypt_ll.c and pwhash_scrypt_ll.exp
var scryptLLCase = [
  {
    password: '',
    salt: '',
    keyLength: 64,
    opsLimit: 16,
    r: 1,
    p: 1,
    key: '77d6576238657b203b19ca42c18a0497f16b4844e3074ae8dfdffa3fede21442fcd0069ded0948f8326a753a0fc81f17e8d3e0fb2e0d3628cf35e20c38d18906'
  },
  {
    password: 'password',
    salt: 'NaCl',
    keyLength: 64,
    opsLimit: 1024,
    r: 8,
    p: 16,
    key: 'fdbabe1c9d3472007856e7190d01e9fe7c6ad7cbc8237830e77376634b3731622eaf30d92e22a3886ff109279d9830dac727afb94a83ee6d8360cbdfa2cc0640'
  },
  {
    password: 'pleaseletmein',
    salt: 'SodiumChloride',
    keyLength: 64,
    opsLimit: 16384,
    r: 8,
    p: 1,
    key: '7023bdcb3afd7348461c06cd81fd38ebfda8fbba904f8e3ea9b543f6545da1f2d5432955613f0fcf62d49705242a9af9e61e85dc0d651e40dfcf017b45575887'
  }
];

//Harvested from box_easy.c and box_easy.exp
var boxEasyCase = {
  alicesk: '77076d0a7318a57d3c16c17251b26645df4c2f87ebc0992ab177fba51db92c2a',
  bobpk: 'de9edb7d7b7dc1b4d35b61c2ece435373f8343c85b78674dadfc7e146f882b4f',
  nonce: '69696ee955b62b73cd62bda875fc73d68219e0036b7a0b37',
  message: 'be075fc53c81f2d5cf141316ebeb0c7b5228c52a4c62cbd44b66849b64244ffce5ecbaaf33bd751a1ac728d45e6c61296cdc3c01233561f41db66cce314adb310e3be8250c46f06dceea3a7fa1348057e2f6556ad6b1318a024a838f21af1fde048977eb48f59ffd4924ca1c60902e52f0a089bc76897040e082f937763848645e0705',
  cipher: 'f3ffc7703f9400e52a7dfb4b3d3305d98e993b9f48681273c29650ba32fc76ce48332ea7164d96a4476fb8c531a1186ac0dfc17c98dce87b4da7f011ec48c97271d2c20f9b928fe2270d6fb863d51738b48eeee314a7cc8ab932164548e526ae90224368517acfeabd6bb3732bc0e9da99832b61ca01b6de56244a9e88d5f9b37973f622a43d14a6599b1f654cb45a74e355a5'
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

  var MiniSodium = window.plugins.MiniSodium;
  var from_hex = MiniSodium.from_hex;
  var to_hex = MiniSodium.to_hex;
  var is_hex = MiniSodium.is_hex;

  describe('hex type test', function(){
    it('should be a defined function', function(){
      expect(MiniSodium.is_hex).toBeDefined();
      expect(typeof MiniSodium.is_hex).toEqual('function');
    });
  });

  describe('hex encode', function(){
    it('should be a defined function', function(){
      expect(MiniSodium.to_hex).toBeDefined();
      expect(typeof MiniSodium.to_hex).toEqual('function');
    });

    it('should encode correctly', function(){
      for (var i = 0; i < 50; i++){
        var b = randomBuffer(Math.floor(Math.random() * 26 + 25));
        var s = MiniSodium.to_hex(b);

        expect(isCorrectlyEncoded(b, s)).toEqual(true);

        testHexBuffers.push(b);
        testHexStrings.push(s);
      }
    });
  });

  describe('hex decode', function(){
    it('should be a defined function', function(){
      expect(MiniSodium.from_hex).toBeDefined();
      expect(typeof MiniSodium.from_hex).toEqual('function');
    });

    it('should decode correctly', function(){
      for (var i = 0; i < Math.min(testHexBuffers.length, testHexStrings.length); i++){
        var d = MiniSodium.from_hex(testHexStrings[i]);

        expect(bufEquals(d, testHexBuffers[i])).toEqual(true);
      }
    });
  });

  describe('secretbox_easy', function(){

    it('should be a defined function', function(){
      expect(MiniSodium.crypto_secretbox_easy).toBeDefined();
      expect(typeof MiniSodium.crypto_secretbox_easy).toEqual('function');
    });

    it('should encrypt', function(done){
      MiniSodium.crypto_secretbox_easy(secretboxEasyCase.m, secretboxEasyCase.n, secretboxEasyCase.k, function(err, cipher){
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
      expect(MiniSodium.crypto_secretbox_open_easy).toBeDefined();
      expect(typeof MiniSodium.crypto_secretbox_open_easy).toEqual('function');
    });

    it('should decrypt', function(done){

      MiniSodium.crypto_secretbox_open_easy(secretboxEasyCase.c, secretboxEasyCase.n, secretboxEasyCase.k, function(err, plain){
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

      var k = randomBuffer(MiniSodium.crypto_secretbox_KEYBYTES);
      var n = randomBuffer(MiniSodium.crypto_secretbox_NONCEBYTES);

      MiniSodium.crypto_secretbox_easy(m, n, k, function(err, cipher){
        if (err){
          throw err;
          done();
          return;
        }

        MiniSodium.crypto_secretbox_open_easy(cipher, n, k, function(err, plain){
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
      expect(MiniSodium.crypto_sign).toBeDefined();
      expect(typeof MiniSodium.crypto_sign).toEqual('function');
    });

    it('crypto_sign_open should be a defined function', function(){
      expect(MiniSodium.crypto_sign_open).toBeDefined();
      expect(typeof MiniSodium.crypto_sign_open).toEqual('function');
    });

    it('crypto_sign_detached should be a defined function', function(){
      expect(MiniSodium.crypto_sign_detached).toBeDefined();
      expect(typeof MiniSodium.crypto_sign_detached).toEqual('function');
    });

    it('crypto_sign_verify_detached should be a defined function', function(){
      expect(MiniSodium.crypto_sign_verify_detached).toBeDefined();
      expect(typeof MiniSodium.crypto_sign_verify_detached).toEqual('function');
    });

    it('crypto_sign_seed_keypair should be a defined function', function(){
      expect(MiniSodium.crypto_sign_seed_keypair).toBeDefined();
      expect(typeof MiniSodium.crypto_sign_seed_keypair).toEqual('function');
    });

    it('crypto_sign_ed25519_sk_to_seed should be a defined function', function(){
      expect(MiniSodium.crypto_sign_ed25519_sk_to_seed).toBeDefined();
      expect(typeof MiniSodium.crypto_sign_ed25519_sk_to_seed).toEqual('function');
    });

    it('crypto_sign_ed25519_sk_to_pk should be a defined function', function(){
      expect(MiniSodium.crypto_sign_ed25519_sk_to_pk).toBeDefined();
      expect(typeof MiniSodium.crypto_sign_ed25519_sk_to_pk).toEqual('function');
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

        MiniSodium.crypto_sign_ed25519_sk_to_pk(currentVector.sk, function(err, pk){
          if (err){
            throw err;
            done();
            return;
          }

          expect(bufEquals(pk, currentVector.pk)).toEqual(true);

          MiniSodium.crypto_sign_ed25519_sk_to_seed(currentVector.sk, function(err, seed){
            if (err){
              throw err;
              done();
              return;
            }

            expect(bufEquals(seed, currentVector.sk.subarray(0, MiniSodium.crypto_sign_SEEDBYTES))).toEqual(true);

            MiniSodium.crypto_sign_seed_keypair(seed, function(err, keyPair){
              if (err){
                throw err;
                done();
                return;
              }

              expect(bufEquals(keyPair.sk, currentVector.sk)).toEqual(true);
              expect(bufEquals(keyPair.pk, currentVector.pk)).toEqual(true);

              MiniSodium.crypto_sign(currentVector.m, currentVector.sk, function(err, sm){
                if (err){
                  throw err;
                  done();
                  return;
                }

                expect(bufEquals(sm.subarray(0, MiniSodium.crypto_sign_BYTES), currentVector.s)).toEqual(true);
                expect(bufEquals(sm.subarray(MiniSodium.crypto_sign_BYTES), currentVector.m)).toEqual(true);

                MiniSodium.crypto_sign_open(sm, pk, function(err, m){
                  if (err){
                    throw err;
                    done();
                    return;
                  }

                  expect(bufEquals(m, currentVector.m)).toEqual(true);

                  MiniSodium.crypto_sign_detached(currentVector.m, currentVector.sk, function(err, sig){
                    if (err){
                      throw err;
                      done();
                      return;
                    }

                    expect(bufEquals(sig, currentVector.s)).toEqual(true);

                    MiniSodium.crypto_sign_verify_detached(sig, currentVector.m, currentVector.pk, function(err, isValid){
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
      expect(MiniSodium.crypto_sign_keypair).toBeDefined();
      expect(typeof MiniSodium.crypto_sign_keypair).toEqual('function');
    });

    it('should generate a valid keypair', function(done){
      MiniSodium.crypto_sign_keypair(function(err, keyPair){
        if (err){
          throw err;
          done();
          return;
        }

        var m = randomBuffer(Math.floor(Math.random() * 501 + 500));
        MiniSodium.crypto_sign_detached(m, keyPair.sk, function(err, signature){
          if (err){
            throw err;
            done();
            return;
          }

          MiniSodium.crypto_sign_verify_detached(signature, m, keyPair.pk, function(err, isValid){
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

  describe('ed25519 -> curve25519 conversion methods', function(){
    it('crypto_sign_ed25519_sk_to_curve25519 should be a defined function', function(){
      expect(MiniSodium.crypto_sign_ed25519_sk_to_curve25519).toBeDefined();
      expect(typeof MiniSodium.crypto_sign_ed25519_sk_to_curve25519).toEqual('function');
    });

    it('crypto_sign_ed25519_pk_to_curve25519 should be a defined function', function(){
      expect(MiniSodium.crypto_sign_ed25519_pk_to_curve25519).toBeDefined();
      expect(typeof MiniSodium.crypto_sign_ed25519_pk_to_curve25519).toEqual('function');
    });

    it('should pass the test vector', function(done){
      for (var prop in X25519ConversionTestCase){
        if (is_hex(X25519ConversionTestCase[prop])) X25519ConversionTestCase[prop] = from_hex(X25519ConversionTestCase[prop]);
      }

      MiniSodium.crypto_sign_seed_keypair(X25519ConversionTestCase.seed, function(err, keyPair){
        if (err){
          throw err;
          done();
          return;
        }

        MiniSodium.crypto_sign_ed25519_sk_to_curve25519(keyPair.sk, function(err, curve25519_sk){
          if (err){
            throw err;
            done();
            return;
          }

          expect(bufEquals(curve25519_sk, X25519ConversionTestCase.curve25519_sk)).toEqual(true);

          MiniSodium.crypto_sign_ed25519_pk_to_curve25519(keyPair.pk, function(err, curve25519_pk){
            if (err){
              throw err;
              done();
              return;
            }

            expect(bufEquals(curve25519_pk, X25519ConversionTestCase.curve25519_pk)).toEqual(true);

            done();
          });
        });
      });
    });
  });

  describe('curve25519 - key exchange', function(){
    it('crypto_scalarmult should be a defined function', function(){
      expect(MiniSodium.crypto_scalarmult).toBeDefined();
      expect(typeof MiniSodium.crypto_scalarmult).toEqual('function');
    });

    it('crypto_scalarmult_base should be a defined function', function(){
      expect(MiniSodium.crypto_scalarmult_base).toBeDefined();
      expect(typeof MiniSodium.crypto_scalarmult_base).toEqual('function');
    });

    it('should pass the test vector', function(done){
      for (var prop in curve25519Case){
        if (is_hex(curve25519Case[prop])) curve25519Case[prop] = from_hex(curve25519Case[prop]);
      }

      MiniSodium.crypto_scalarmult_base(curve25519Case.alicesk, function(err, alicepk){
        if (err){
          throw err;
          done();
          return;
        }

        expect(bufEquals(alicepk, curve25519Case.alicepk)).toEqual(true);

        MiniSodium.crypto_scalarmult_base(curve25519Case.bobsk, function(err, bobpk){
          if (err){
            throw err;
            done();
            return;
          }

          expect(bufEquals(bobpk, curve25519Case.bobpk)).toEqual(true);

          MiniSodium.crypto_scalarmult(curve25519Case.alicesk, bobpk, function(err, k){
            if (err){
              throw err;
              done();
              return;
            }

            expect(bufEquals(k, curve25519Case.k)).toEqual(true);

            MiniSodium.crypto_scalarmult(curve25519Case.bobsk, alicepk, function(err, k){
              if (err){
                throw err;
                done();
                return;
              }

              expect(bufEquals(k, curve25519Case.k)).toEqual(true);

              done();
            });
          });
        });
      });
    });

    it('should perform the case 7 (multiplication by a constant)', function(done){
      MiniSodium.crypto_scalarmult(curve25519Case7.scalar, curve25519Case7.p1, function(err, out1){
        if (err){
          throw err;
          done();
          return;
        }

        MiniSodium.crypto_scalarmult(curve25519Case7.scalar, curve25519Case7.p2, function(err, out2){
          if (err){
            throw err;
            done();
            return;
          }

          expect(bufEquals(out1, out2)).toEqual(false);

          done();
        });
      });
    });
  });

  describe('scrypt - memory-hard password derivation function', function(){
    it('crypto_pwhash_scryptsalsa208sha256 should be a defined function', function(){
      expect(MiniSodium.crypto_pwhash_scryptsalsa208sha256).toBeDefined();
      expect(typeof MiniSodium.crypto_pwhash_scryptsalsa208sha256).toEqual('function');
    });

    it('crypto_pwhash_scryptsalsa208sha256_ll should be a defined function', function(){
      expect(MiniSodium.crypto_pwhash_scryptsalsa208sha256_ll).toBeDefined();
      expect(typeof MiniSodium.crypto_pwhash_scryptsalsa208sha256_ll).toEqual('function');
    });

    it('should pass the vectors of case 1', function(done){
      var vectorIndex = 0;
      var currentVector;

      function testOne(){
        console.log('Scrypt test vector ' + (vectorIndex + 1));
        currentVector = scryptCase1[vectorIndex];

        for (var prop in currentVector){
          if (is_hex(currentVector[prop])) currentVector[prop] = from_hex(currentVector[prop]);
        }

        MiniSodium.crypto_pwhash_scryptsalsa208sha256(currentVector.keyLength, currentVector.password, currentVector.salt, currentVector.opsLimit, currentVector.memLimit, function(err, key){
          if (err){
            throw err;
            done();
            return;
          }

          expect(bufEquals(key, currentVector.key)).toEqual(true);

          next();
        });
      }

      function next(){
        vectorIndex++;
        if (vectorIndex == scryptCase1.length) done();
        else testOne();
      }

      testOne();

    }, 30000);

    it('should pass the vectors of the LL case', function(done){
      var vectorIndex = 0;
      var currentVector;

      function testOne(){
        console.log('Scrypt_ll test vector ' + (vectorIndex + 1));
        currentVector = scryptLLCase[vectorIndex];

        for (var prop in currentVector){
          if (prop == 'password' || prop == 'salt') currentVector[prop] = MiniSodium.from_string(currentVector[prop]);
          else if (is_hex(currentVector[prop])) currentVector[prop] = from_hex(currentVector[prop]);
        }

        MiniSodium.crypto_pwhash_scryptsalsa208sha256_ll(currentVector.password, currentVector.salt, currentVector.opsLimit, currentVector.r, currentVector.p, currentVector.keyLength, function(err, key){
          if (err){
            throw err;
            done();
            return;
          }

          expect(bufEquals(key, currentVector.key)).toEqual(true);

          next();
        });
      }

      function next(){
        vectorIndex++;
        if (vectorIndex == scryptLLCase.length) done();
        else testOne();
      }

      testOne();

    }, 30000);
  });

  describe('Box construction', function(){
    it('crypto_box_keypair should be a defined function', function(){
      expect(MiniSodium.crypto_box_keypair).toBeDefined();
      expect(typeof MiniSodium.crypto_box_keypair).toEqual('function');
    });

    it('crypto_box_easy should be a defined function', function(){
      expect(MiniSodium.crypto_box_easy).toBeDefined();
      expect(typeof MiniSodium.crypto_box_easy).toEqual('function');
    });

    it('crypto_box_open_easy should be a defined function', function(){
      expect(MiniSodium.crypto_box_open_easy).toBeDefined();
      expect(typeof MiniSodium.crypto_box_open_easy).toEqual('function');
    });

    for (var prop in boxEasyCase){
      if (is_hex(boxEasyCase[prop])) boxEasyCase[prop] = from_hex(boxEasyCase[prop]);
    }

    it('should pass the test vector', function(done){
      MiniSodium.crypto_box_easy(boxEasyCase.message, boxEasyCase.nonce, boxEasyCase.bobpk, boxEasyCase.alicesk, function(err, cipher){
        if (err){
          throw err;
          done();
          return;
        }

        expect(bufEquals(boxEasyCase.cipher, cipher)).toEqual(true);

        MiniSodium.crypto_box_open_easy(cipher, boxEasyCase.nonce, boxEasyCase.bobpk, boxEasyCase.alicesk, function(err, message){
          if (err){
            throw err;
            done();
            return;
          }

          expect(bufEquals(boxEasyCase.message, message)).toEqual(true);

          done();
        });
      });
    });
  });

  describe('Sealed box construction', function(){
    it('crypto_box_seal should be a defined function', function(){
      expect(MiniSodium.crypto_box_seal).toBeDefined();
      expect(typeof MiniSodium.crypto_box_seal).toEqual('function');
    });

    it('crypto_box_seal_open should be a defined function', function(){
      expect(MiniSodium.crypto_box_seal_open).toBeDefined();
      expect(typeof MiniSodium.crypto_box_seal_open).toEqual('function');
    });

    it('should seal a random message and be able to decrypt it', function(done){
      var m = randomBuffer(Math.floor(500 + Math.random() * 501));

      MiniSodium.crypto_box_keypair(function(err, keyPair){
        if (err){
          throw err;
          done();
          return;
        }

        MiniSodium.crypto_box_seal(m, keyPair.pk, function(err, sealedBox){
          if (err){
            throw err;
            done();
            return;
          }

          MiniSodium.crypto_box_seal_open(sealedBox, keyPair.pk, keyPair.sk, function(err, m2){
            if (err){
              throw err;
              done();
              return;
            }

            expect(bufEquals(m, m2)).toEqual(true);

            done();
          });
        });
      });
    });
  });

  describe('Generic hashing', function(){
    it('crypto_generichash should be a defined function', function(){
      expect(MiniSodium.crypto_generichash).toBeDefined();
      expect(typeof MiniSodium.crypto_generichash).toEqual('function');
    });

    it('should pass the test vectors', function(done){
      var vectors = window.plugins.generichashVectors;
      var key = vectors.key;
      vectors = vectors.vectors;
      var currentVector;
      var vectorIndex = 0;

      function testOne(){
        currentVector = vectors[vectorIndex];
        console.log('current hash vector:' + (vectorIndex + 1));
        //from_hex, before testing the vector
        /*for (var prop in currentVector){
          if (is_hex(currentVector[prop])) currentVector[prop] = from_hex(currentVector[prop]);
        }*/

        var hashLength = is_hex(currentVector.hash) ? currentVector.hash.length / 2 : currentVector.hash.length;
        MiniSodium.crypto_generichash(hashLength, currentVector.input, key, function(err, hash){
          if (err){
            throw err;
            done();
            return;
          }

          expect(to_hex(hash)).toEqual(currentVector.hash);

          next();
        });
      }

      function next(){
        vectorIndex++;
        if (vectorIndex == vectors.length) done();
        else testOne();
      }

      testOne();
    }, 30000);
  });

  function binValueOfHexCouple(c){
    if (!(MiniSodium.is_hex(c) && c.length == 2)) throw new TypeError('c must be a 2 char long hex string');

    for (var i = 0; i < hexMap.length; i++){
      if (hexMap[i] == c) return i;
    }
    //Should never be reached because of the type tests performed at the beginning of this method
    return -1;
  }

  function isCorrectlyEncoded(b, s){
    if (!(b instanceof Uint8Array)) throw new TypeError('b must be a Uint8Array');
    if (!MiniSodium.is_hex(s)) throw new TypeError('s must be a hex string');
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
