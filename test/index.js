import mocha  from 'mocha'
import sinon  from 'sinon'
import assert from 'power-assert'
import module from '../dist/index.js'

describe('index', () => {
  describe('endpoint', () => {
    it('call succeed.', () => {
      let context = { succeed: (result) => {} }
      let mock = sinon.mock(context)

      mock.expects('succeed').withArgs('success').once()
      module.handler('log', context)

      assert(mock.verify())
    })
  })
})

