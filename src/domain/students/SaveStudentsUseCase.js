import UseCase from '../UseCase'

export default class SaveStudentsUseCase extends UseCase {
  constructor ({repository} = {}) {
    super({repository})

    this._repository = repository
  }

  async execute ({
    name,
    surname,
    school,
    grade,
    letter,
    image,
    consent,
    title,
    description
  } = {}) {
    if (!name || !surname || !school || !grade || !letter || !image) {
      throw new Error('[SaveStudentsUseCase#execute] Missing required params')
    }

    return this._repository.save({
      name,
      surname,
      school,
      grade,
      letter,
      image,
      consent,
      title,
      description
    })
  }
}
