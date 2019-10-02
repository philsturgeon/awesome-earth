import countries from 'i18n-iso-countries'
import flag from 'country-code-emoji'

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const Countries = {
  fromAlpha2Code: code => {
    if (code === 'GLOBAL') {
      return {
        name: 'Earth',
        emoji: '🌎'
      }
    }

    return {
      name: countries.getName(code, 'en'),
      emoji: flag(code)
    }
  }
}

export default Countries
