import { assert, describe, it } from 'vitest'

describe('skipped suite', () => {
  it('test', () => {
    // Suite skipped, no error
    assert.equal(Math.sqrt(4), 2)
  })
})

