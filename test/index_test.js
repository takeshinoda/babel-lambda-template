import mocha  from 'mocha'
import sinon  from 'sinon'
import assert from 'power-assert'
import { handler } from '../src/index'

describe('index', () => {
  describe('endpoint', () => {
    it('call succeed.', () => {
      let context = { succeed: (result) => {} }
      let mock = sinon.mock(context)

      mock.expects('succeed').withArgs('success').once()
      handler('log', context)

      assert(mock.verify())
    })
  })
})

