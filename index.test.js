const app = require('./index')

test('public key is uInt8', () => {
    expect(typeof app.uInt8 !== 'object').toBe(true)
})