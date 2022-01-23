const app = require('./index')

test('connecting to the solana network', () => {
    expect(app.connection('testnet')).toBeTruthy();
})

test('uint8 returns object', () => {
    expect(typeof app.uInt8(app.keypairPubId) === 'object').toBe(true)
})

test('b64 returns string', () => {
    expect(typeof app.b64(app.keypairPubId) === 'string').toBe(true)
})

test('b64 returns wallet string', () => {
    expect(app.b64(app.keypairPubId)).toBe('GKnGbvO4OtT60JyI5+y/JPEfBeDczgCLcS28I0+wAxU=')
})

