import mocha  from 'mocha'
import sinon  from 'sinon'
import assert from 'power-assert'
import { handler } from '../src/index'

describe('index', () => {
  describe('endpoint', () => {
    it('call succeed.', (done) => {
      let callback = (error, result) => {
        assert(error == null)
        assert(result == 'success')
        done()
      }

      handler('log', { context: 'hoge' }, callback)
    })
  })
})

