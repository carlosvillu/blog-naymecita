import Repository from '../Repository'

export default class StudentsRepository extends Repository {
  save () {
    throw new Error('[StudentsRepository#save] must be implemented')
  }
}
