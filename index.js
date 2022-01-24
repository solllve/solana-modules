const web3 = require('@solana/web3.js');
const {struct, u32, ns64} = require("@solana/buffer-layout");
const {Buffer} = require('buffer');
module.exports = {
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
            return new web3.Connection(web3.clusterApiUrl(env));
        }
        return console.error('not a valid environment. Please use testnet, devnet or mainnet')
    },
    connectionSlot: async (env) => {
        let connection = module.exports.connection(env)
        let slot = await connection.getSlot();
    },
    generateKeyPair: () => web3.Keypair.generate(),
    accessWalletFromSecret: (arr) => {
        let secret = module.exports.uInt8(arr)
        return web3.Keypair.fromSecretKey(secret)
    },
    transaction: (from, to) => {
        let fromKeypair = from;
        let toKeypair = to;
        let transaction = new web3.Transaction();
        transaction.add(
            web3.SystemProgram.transfer({
                fromPubkey: fromKeypair.publicKey,
                toPubkey: toKeypair.publicKey,
                lamports: web3.LAMPORTS_PER_SOL
            })
        );
        return transaction;
    },
    sendAndConfirm: () => web3.sendAndConfirmTransaction(env, transaction, key),
    sendAndConfirmWithSigner: (signer) => web3.sendAndConfirmTransaction(env, transaction, signer),
    sendAndConfirmWithSignerAndKey: (signer, key) => web3.sendAndConfirmTransaction(env, transaction, signer, key),
    transactionFull: async () => {
        let keypair = web3.Keypair.generate();
        let payer = web3.Keypair.generate();
        let connection = new web3.Connection(web3.clusterApiUrl('testnet'));

        let airdropSignature = await connection.requestAirdrop(
            payer.publicKey,
            web3.LAMPORTS_PER_SOL,
        );

        await connection.confirmTransaction(airdropSignature);

        let allocateTransaction = new web3.Transaction({
            feePayer: payer.publicKey
        });
        let keys = [{pubkey: keypair.publicKey, isSigner: true, isWritable: true}];
        let params = { space: 100 };

        let allocateStruct = {
        index: 8,
        layout: struct([
            u32('instruction'),
            ns64('space'),
        ])
        };

        let data = Buffer.alloc(allocateStruct.layout.span);
        let layoutFields = Object.assign({instruction: allocateStruct.index}, params);
        allocateStruct.layout.encode(layoutFields, data);

        allocateTransaction.add(new web3.TransactionInstruction({
            keys,
            programId: web3.SystemProgram.programId,
            data,
        }));

        await web3.sendAndConfirmTransaction(connection, allocateTransaction, [payer, keypair]);
    }
    
}

