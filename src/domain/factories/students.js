import config from '../config'

import SaveStudentsUseCase from '../students/SaveStudentsUseCase'
import GetStudentsUseCase from '../students/GetStudentsUseCase'
import ListStudentsUseCase from '../students/ListStudentsUseCase'

import FireBaseStudentsRepository from '../students/FireBaseStudentsRepository'

export default class StudentsFactory {
  static saveStudentsUseCase () {
    return new SaveStudentsUseCase({
      repository: StudentsFactory.fireBaseStudentsRepository()
    })
  }

  static getStudentsUseCase () {
    return new GetStudentsUseCase({
      repository: StudentsFactory.fireBaseStudentsRepository()
    })
  }

  static listStudentsUseCase () {
    return new ListStudentsUseCase({
      repository: StudentsFactory.fireBaseStudentsRepository()
    })
  }

  static fireBaseStudentsRepository () {
    return new FireBaseStudentsRepository({
      config
    })
  }
}
