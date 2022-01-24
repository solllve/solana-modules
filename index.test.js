const app = require('./index')

test('connecting to the solana network', () => {
    expect(app.connection('testnet')).toBeTruthy();
})

// test('get slot connection', () => {
//     expect(app.connectionSlot()).toBe(expect.any(Promise));
// })

test('b64 returns string', () => {
    expect(typeof app.b64(app.keypairPubId) === 'string').toBe(true)
    console.log(app.b64(app.keypairPubId))
})

test('b64 returns wallet string', () => {
    expect(app.b64(app.keypairPubId)).toBe('GKnGbvO4OtT60JyI5+y/JPEfBeDczgCLcS28I0+wAxU=')
    console.log(typeof app.keypairPubId)
})

test('generate keypair', () => {
    expect(typeof app.generateKeyPair() === 'object').toBe(true)
})

// test('generate keypair', () => {
//     expect(typeof app.generateKeyPair() === 'object').toBe(true)
// })

console.log(app.transaction(app.keypairPubId, app.keypairPubId))