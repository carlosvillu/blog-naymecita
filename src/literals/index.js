import Rosetta from '@schibstedspain/rosetta'
import Polyglot from '@schibstedspain/rosetta/lib/adapters/polyglot'

import esCA from './es-CA'
import esES from './es-ES'

const DEFAULT_CULTURE = 'es-ES'
const DEFAULT_CURRENCY = 'EUR'
const i18n = new Rosetta({ adapter: new Polyglot() })
i18n.languages = {'es-CA': esCA, 'es-ES': esES}
i18n.culture = DEFAULT_CULTURE
i18n.currency = DEFAULT_CURRENCY

export default i18n
