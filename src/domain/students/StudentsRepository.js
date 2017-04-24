import Repository from '../Repository'

export default class StudentsRepository extends Repository {
  student () {
    throw new Error('[StudentsRepository#student] must be implemented')
  }

  save () {
    throw new Error('[StudentsRepository#save] must be implemented')
  }

  search () {
    throw new Error('[StudentsRepository#search] must be implemented')
  }
}
