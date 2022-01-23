const solanaWeb3 = require('@solana/web3.js');

//example wallet. Do not use this wallet for real transactions.
const keypairPubId =  [
    24, 169, 198, 110, 243, 184,  58, 212,
   250, 208, 156, 136, 231, 236, 191,  36,
   241,  31,   5, 224, 220, 206,   0, 139,
   113,  45, 188,  35,  79, 176,   3,  21
];

const keypairSecret =  [
    164, 117,  35, 213, 180,  22, 209, 252,  68,  15, 207,
    248, 165, 203, 200,   1, 145,   4, 224, 225,   4,  80,
    192, 101,  13,  59, 124,  63, 101,  22, 137, 126,  24,
    169, 198, 110, 243, 184,  58, 212, 250, 208, 156, 136,
    231, 236, 191,  36, 241,  31,   5, 224, 220, 206,   0,
    139, 113,  45, 188,  35,  79, 176,   3,  21
];

module.exports = {
    uInt8: (arr) => {
        return Uint8Array.from(arr)
    },
    generateKeyPair: () => {
        const {Keypair} = require("@solana/web3.js")
        let keypair = Keypair.generate()
        return keypair
    },
    accessWalletFromSecret: (arr) => {
        let secret = Uint8(arr)
        const {Keypair} = require("@solana/web3.js")
        let keypair = Keypair.fromSecretKey(secret)
        return keypair
    }
}


console.log(module.exports.uInt8(keypairSecret))