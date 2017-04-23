import config from './config'

import StudentsFactory from './factories/students'

class Aralescriptura {
  constructor () {
    this._config = config
    this._map = {}

    this._map['config'] = this._config

    this._map['save_studients_use_case'] = StudentsFactory.saveStudentsUseCase()
    this._map['get_studients_use_case'] = StudentsFactory.getStudentsUseCase()
  }

  get (key) {
    return this._map[key] ? this._map[key]
                          : {execute: () => Promise.reject(new Error(`[Aralescriptura#get] ${key} not defined`))}
  }

  config (key, value) {
    this._config.set(key, value)
    return this
  }
}

export default Aralescriptura
