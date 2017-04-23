/* eslint no-console:0 */
import base from './base'
import development from './development'
import test from './test'
import production from './production'
import preproduction from './preproduction'

console.log('\n\nENV:', process.env.NODE_ENV, '\n\n')

let env
if (process.env.NODE_ENV === 'development') { env = development }
if (process.env.NODE_ENV === 'preproduction') { env = preproduction }
if (process.env.NODE_ENV === 'production') { env = production }
if (process.env.NODE_ENV === 'test') { env = test }

class Config {
  constructor () {
    this._config = Object.assign({}, base, env)
  }

  get (key) {
    return this._config[key]
  }

  set (key, value) {
    this._config[key] = value
    return this
  }
}

const config = new Config()
export default config
