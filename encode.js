const { charForBinary } = require('@m1yh3m/base.64.table.node.lib')

function encode(input /* string */) {
  // const words = tokenify(input, 3)

  const encoded = tokenify(input, 3) // create array of 3 letter words
    .map(i => i.split('')) // create array of single items
    .map(i => i.map(k => k.charCodeAt(0))) // map each letter to it's char code
    .map(i => i.map(k => k.toString(2))) // map each char code to binary value
    .map(i => i.map(k => k.padStart(8, '0'))) // JS removes leading 0, add them back to the left
    .map(i => i.join('')) // make 8*3 = 24 bit long string
    .map(i => tokenify(i, 6)) // make 24/6 = 4 bit strings
    .map(i => i.map(k => k.padEnd(6, '0'))) // pad 0 to the end of string
    .map(i => i.map(k => charForBinary(k))) // get character from base64 table
    .map(i => i.join('')) // join to make 3 letter words
    .join('') // join to make string

  const diff = 3 - input.length % 3 // characters required to make string mod 3 whole
  const requiredPadding = diff === 3 ? 0 : diff // padding is required only when the string length is not proper mod 3
  const padded = encoded + ''.padEnd(requiredPadding, '=') // pad as many = as are required to make string length mod 3
  return padded
}

function tokenify(str, count) {
  const length = str.length
  const out = []
  for (let i = 0; i < length; i += count) {
    out.push(str.substr(i, count))
  }
  return out
}

module.exports = encode
