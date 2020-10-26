
const regexp = /(?:Entrada|Saída)/

describe('TypeValidatorAdapter', () => {
  test('Should return null if regexp doesnt match ', () => {
    const input = 'invalid_input'
    expect(regexp.test(input)).toBe(false)
  })

  test('Should return true if regexp matches ', () => {
    const input = 'Entrada'
    expect(regexp.test(input)).toBe(true)
  })

  test('Should return true if regexp matches ', () => {
    const input = 'Saída'
    expect(regexp.test(input)).toBe(true)
  })
})
