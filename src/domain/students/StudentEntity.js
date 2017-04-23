import Entity from '../Entity'

export default class StudentEntity extends Entity {
  constructor ({
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
    super({
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

    this._name = name
    this._surname = surname
    this._school = school
    this._grade = grade
    this._letter = letter
    this._image = image
    this._consent = consent
    this._title = title
    this._description = description
  }
}
