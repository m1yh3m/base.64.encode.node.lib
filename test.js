const encode = require('./encode')

const errors = []

function runTest(title, actual, expected, whenFails) {
  const ok = actual === expected
  process.stdout.write(ok ? '√' : 'ƒ')
  !ok && errors.push(`FAIL: ${title} ${whenFails}; actual: ${actual}, expected: ${expected}`)
}

function tests() {
  runTest('encode', typeof encode, 'function', 'encode should be a function')
  runTest('encode', encode('bbc'), 'YmJj', 'encode() should properly work')
  runTest('encode', encode('bb'), 'YmI=', 'encode() should properly work')
  runTest('encode', encode('b'), 'Yg==', 'encode() should properly work')
  runTest('encode', encode(''), '', 'encode() should properly work')

  console.log('\nDONE!')
  errors.length > 0 && console.log(errors)
}

tests()
