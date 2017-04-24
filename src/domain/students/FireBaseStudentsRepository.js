import StudentsRepository from './StudentsRepository'
import uuid from 'uuid/v4'

const fromURLToBlob = url => new Promise(resolve => {
  const xhr = new window.XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    if (this.status === 200) {
      return resolve(this.response)
    }
  }
  xhr.send()
})

const removeEmpty = obj => {
  Object.keys(obj).forEach((key) => (obj[key] == null) && delete obj[key])
  return obj
}

export default class FireBaseStudentsRepository extends StudentsRepository {
  constructor ({config} = {}) {
    super({config})
    this._config = config
  }

  async save ({
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
    const firebase = this._config.get('firebase')
    const id = uuid()

    const lowerName = name.toLowerCase()
    const lowerSurname = surname.toLowerCase()
    const blob = await fromURLToBlob(image)
    const imageStorage = await firebase.storage()
                               .ref()
                               .child(`${lowerName}_${lowerSurname}_${id}`)
                               .put(blob, {contentType: blob.type})
    const student = removeEmpty({
      id,
      name,
      surname,
      school,
      grade,
      letter,
      consent,
      title,
      description,
      image: imageStorage.downloadURL,
      createdAt: Date.now()
    })

    await firebase.database().ref(`/students/${id}`).set(student)
    return student
  }

  async student ({id} = {}) {
    const firebase = this._config.get('firebase')
    const snapshot = await firebase.database().ref(`/students/${id}`).once('value')
    return snapshot.val()
  }

  async search ({term, grade} = {}) {
    console.log({term, grade})
    const firebase = this._config.get('firebase')
    const snapshot = await firebase.database().ref(`/students`).once('value')
    const students = snapshot.val()
    return students
  }
}
