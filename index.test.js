const app = require('./index')

console.log(app.connection('testnet'))

test('public key is object', () => {
    expect(typeof app.keypairPubId === 'object').toBe(true)
})

test('secret is object', () => {
    expect(typeof app.keypairPubId === 'object').toBe(true)
})