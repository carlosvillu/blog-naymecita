import UseCase from '../UseCase'

export default class GetStudentsUseCase extends UseCase {
  constructor ({repository} = {}) {
    super({repository})

    this._repository = repository
  }

  async execute ({id} = {}) {
    if (!id) {
      throw new Error('[GetStudentsUseCase#execute] id must be defined')
    }
    return this._repository.student({id})
  }
}
