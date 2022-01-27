const app = require('./index')

//example wallet. Do not use this wallet for real transactions.
const keypairPubId = [24, 169, 198, 110, 243, 184,  58, 212, 250, 208, 156, 136, 231, 236, 191,  36, 241,  31,   5, 224, 220, 206,   0, 139, 113,  45, 188,  35,  79, 176,   3,  21];
const keypairSecret = [164, 117,  35, 213, 180,  22, 209, 252,  68,  15, 207, 248, 165, 203, 200,   1, 145,   4, 224, 225,   4,  80, 192, 101,  13,  59, 124,  63, 101,  22, 137, 126,  24, 169, 198, 110, 243, 184,  58, 212, 250, 208, 156, 136, 231, 236, 191,  36, 241,  31,   5, 224, 220, 206,   0, 139, 113,  45, 188,  35,  79, 176,   3,  21];

test('connecting to the solana network', () => {
    expect(app.connection('testnet')).toBeTruthy();
})

// test('get slot connection', () => {
//     expect(app.connectionSlot()).toBe(expect.any(Promise));
// })

test('b64 returns string', () => {
    expect(typeof app.b64(keypairPubId) === 'string').toBe(true)
    console.log(app.b64(keypairPubId))
})

test('b64 returns wallet string', () => {
    expect(app.b64(keypairPubId)).toBe('GKnGbvO4OtT60JyI5+y/JPEfBeDczgCLcS28I0+wAxU=')
    console.log(typeof keypairPubId)
})

test('generate keypair', () => {
    expect(typeof app.generateKeyPair() === 'object').toBe(true)
})

test('generate keypair', () => {
    expect(typeof app.generateKeyPair() === 'object').toBe(true)
})


console.log(app.transaction(keypairPubId, keypairPubId))
