import countries from 'i18n-iso-countries'
import flag from 'country-code-emoji'

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const Countries = {
  fromAlpha2Code: code => {
    return {
      name: countries.getName(code, 'en'),
      emoji: flag(code)
    }
  }
}

export default Countries
