import { expect, describe, it } from 'vitest'
import { plsBe, real, plsNotBe } from '../src/mappings/utils/consolidator'
import { create } from '../src/mappings/utils/entity'
import { CollectionEntity } from '../src/model/generated'


describe('[TEST] Consolidator', () => {
  it('should throw if plsBe', async () => {
    const entity = { id: '1', name: 'test' } as CollectionEntity
    const fn = () => plsBe(real, entity)
    expect(fn).toThrowError('refference')
  })

  it('should throw if plsBeNot', async () => {
    const entity = undefined
    const fn = () => plsNotBe(real, entity)
    expect(fn).toThrowError('refference')
  })
})

