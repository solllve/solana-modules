const solanaWeb3 = require('@solana/web3.js');
//example wallet. Do not use this wallet for real transactions.
const keypairPubId = [24, 169, 198, 110, 243, 184,  58, 212, 250, 208, 156, 136, 231, 236, 191,  36, 241,  31,   5, 224, 220, 206,   0, 139, 113,  45, 188,  35,  79, 176,   3,  21];
const keypairSecret = [164, 117,  35, 213, 180,  22, 209, 252,  68,  15, 207, 248, 165, 203, 200,   1, 145,   4, 224, 225,   4,  80, 192, 101,  13,  59, 124,  63, 101,  22, 137, 126,  24, 169, 198, 110, 243, 184,  58, 212, 250, 208, 156, 136, 231, 236, 191,  36, 241,  31,   5, 224, 220, 206,   0, 139, 113,  45, 188,  35,  79, 176,   3,  21];
module.exports = {
    keypairPubId,
    keypairSecret,
    uInt8: (obj) => {
        typeof obj === 'object' ? Uint8Array.from(obj) : console.error('uInt8 expects a key')
    },
    b64: (obj) => {
        if (typeof obj !== 'object') {
            console.error('b64 expects a key')
        }
        return Buffer.from(obj).toString('base64')
    },
    connection: (env) => {
        if (typeof env === 'string' && env === 'testnet' || env === 'mainnet' || env === 'devnet') {
            return new solanaWeb3.Connection(solanaWeb3.clusterApiUrl(env));
        }
        return console.error('not a valid environment. Please use testnet, devnet or mainnet')
    },
    generateKeyPair: () => {
        return solanaWeb3.Keypair.generate()
    },
    accessWalletFromSecret: (arr) => {
        let secret = module.exports.uInt8(arr)
        return solanaWeb3.Keypair.fromSecretKey(secret)
    },
    transaction: (from, to) => {
        let fromKeypair = from;
        let toKeypair = to;
        let transaction = new solanaWeb3.Transaction();
        transaction.add(
            solanaWeb3.SystemProgram.transfer({
                fromPubkey: fromKeypair.publicKey,
                toPubkey: toKeypair.publicKey,
                lamports: solanaWeb3.LAMPORTS_PER_SOL
            })
        );
        return transaction;
    }
}

