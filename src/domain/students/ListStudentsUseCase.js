import UseCase from '../UseCase'
import {streamify} from '@schibstedspain/cv-decorators'

class ListStudentsUseCase extends UseCase {
  constructor ({repository = {}}) {
    super({repository})

    this._repository = repository
  }

  execute ({term, grade} = {}) {
    return this._repository.search({term, grade})
  }
}
export default streamify('execute')(ListStudentsUseCase)
