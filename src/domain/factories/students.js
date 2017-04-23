import config from '../config'

import SaveStudentsUseCase from '../students/SaveStudentsUseCase'

import FireBaseStudentsRepository from '../students/FireBaseStudentsRepository'

export default class StudentsFactory {
  static saveStudentsUseCase () {
    return new SaveStudentsUseCase({
      repository: StudentsFactory.fireBaseStudentsRepository()
    })
  }

  static fireBaseStudentsRepository () {
    return new FireBaseStudentsRepository({
      config
    })
  }
}
