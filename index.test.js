const uInt8 = require('./index').uInt8
const testPubKey = require('./index').keypairPubId
const sum = require('./index').sum

console.log('test ket' + uInt8)

test('public key is uInt8', () => {
    expect(typeof uInt8 !== 'array').toBe(true)
})