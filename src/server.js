import i18n from './literals'
import Aralescriptura from './domain'

module.exports = {
  contextFactory: async () => {
    return {i18n, domain: new Aralescriptura()}
  }
}
