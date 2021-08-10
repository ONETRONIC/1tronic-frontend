TESTNET PROFILE

Metadata of "onetronicfactory" was published successfully.
1TronicFactory.sol : 
ipfs://QmdSvM64RM3GMs6nPkjpsRrQzbb3AnU1B9uWTxT5cLUHZG
metadata.json : 
ipfs://Qmf1RHCiPyLTPPHSAvwNo8CHRcBJC4b6zqfkCqteDYtP5J

FACTORY :
0x12E6A1197273ce7dD06c259a3A439825598713e9
INIT_CODE_HASH :
0x6d2c4c0de445f8fb676edf4af7ae3b47cb651cab7bf5f43e3aa9ca482210d5e9
ROUTER :
0x4e613A6034726024C9945856A9ddAd3727CF9707
ROUTER02 :
0x2D4c7BA2F024A9403eC1db983B6E7C979abF5127
WBNB :
0x094616f0bdfb0b526bd735bf66eca0ad254ca81f
step: 

- ganti rpc di env file menjadi bsctestnet rpc url
- ganti router address di src/config/constant/index.ts
- add token profile di src/config/constant/tokenlists/1tronic-default.tokenlists.json dan token.ts
- ganti factory & initcodehash di src/utils/@sdk/constant.ts
- ubah pairname di src/utils/@sdk/entities/pair.ts
- ubah abi source di src/config/hooks/usepair.ts import iuniswapv2pair.sol diganti ke factory/build/ionetronicpair.sol
- buat folder router di src/utils/@onetronic dan isi dg build dr router ambil abi file diremixide
- ganti adrress wbnb di src/utils/@sdk/entities/token.ts
- add IOneTronicPair.json ke src/utils/@sdk
- ganti chainid mainnet jd testnet di src/utils/index.te line 24
- ganti abi json file IOnetTronicRouter02.jso